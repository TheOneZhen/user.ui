import { RouterName } from '@/router/router.config'
import dayjs from 'dayjs'
import { BLOGAPI } from './blog.api'
import { uniqueId } from 'lodash-es'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import { record } from '@/utils/record'
import { ElMenu, ElMenuItem, ElSubMenu, ElText } from 'element-plus'

/**
 * 博客节点
 */
export class Blog {
  articleMap = new Map<ArticleType['id'], ArticleType>()
  tagMap = new Map<TagType['id'], TagType>()
  catalog = reactive(new Array<CatalogItemType>())
  marked: Marked
  sections = ref<Array<SectionNavType>>([])
  isGenSectionNav = ref(false)

  constructor () {
    const self = this
    this.marked = new Marked(
      markedHighlight({
        async: true,
        langPrefix: 'hljs language-',
        highlight (code, lang) {
          // 如果是mermaid，单独渲染
          if (/mermaid/.test(lang) && window.mermaid) {
            return window.mermaid.render(uniqueId('z-mermaid-'), code).then(({ svg }) => svg)
          }
          if (window.hljs) {
            const language = window.hljs.getLanguage(lang) ? lang : 'plaintext'
            return new Promise(resolve => resolve(window.hljs.highlight(code, { language }).value)).then(res => res as string)
          }
          return Promise.reject(new Error('代码格式化失败！'))
        }
      }),
      {
        hooks: {
          preprocess (markdown) {
            self.sections.value = []
            return markdown
          },
          postprocess (html) { return html }
        },
        renderer: {
          heading (text, level) {
            const result = `
              <h${level} class="g-anchor">
                <a name="${text}" href="#${text}">#</a>
                ${text}
              </h${level}>
            `
            if (self.isGenSectionNav.value) {
              let middle = self.sections.value
              while (level !== 1) {
                middle = middle[middle.length - 1].children
                level--
              }
              middle.push({ title: text, children: [] })
            }
            return result
          }
        }
      }
    )
  }

  init () {
    this.getCatalog()
    this.getBlogTags()
  }

  @record('正在加载博客目录！')
  getCatalog () {
    return app
      .request
      .post<Array<CatalogItemType>>(BLOGAPI.GET_CATALOG, {})
      .then(data => {
        this.catalog.splice(
          0,
          this.catalog.length,
          ...data.sort((a, b) => -(dayjs(a.createTime) > dayjs(b.createTime)))
        )
      })
  }

  @record('正在获取标签内容！')
  getBlogTags () {
    return app
      .request.get<Array<TagType>>(BLOGAPI.GET_TAGS, {})
      .then(data => data.forEach(tag => this.tagMap.set(tag.id, tag)))
  }

  getArticleTags (id: ArticleType['id']) {
    const article = this.articleMap.get(id)
    const result: Array<TagType> = []
    if (!article) return result
    article
      .tagIds
      .forEach(tagId => {
        const tag = this.tagMap.get(tagId)
        tag && result.push(tag)
      })
    return result
  }

  @record('正在加载文章！', '', '文章加载失败，请尝试刷新页面！')
  async getArticle (index: ArticleType['id']) {
    let article = this.articleMap.get(index)
    if (!article) {
      article = await app.request.post<ArticleType>(BLOGAPI.GET_ARTICLE, { index })
      this.articleMap.set(article.id, article)
    }
    return article
  }

  toArticle (index: ArticleType['id']) {
    app.router?.push({ name: RouterName.ARTICLE, params: { index } })
  }

  /** markown转html */
  async converterMdToHTML (text: string, generateNav = false): Promise<string> {
    if (!window.hljs) {
      return new Promise(
        resolve => setTimeout(() => resolve(this.converterMdToHTML(text)), 100)
      )
    }
    this.isGenSectionNav.value = generateNav
    const html = await this.marked.parse(text) || ''
    this.isGenSectionNav.value = false
    return html
  }

  formatDate (date: string) {
    return dayjs(date).format('YYYY年MM月DD日')
  }

  genSectionNav () {
    const GenText = (title: string) => h(ElText, { truncated: true, onClick: () => {
      location.hash = `#${title}`
      document.getElementById(title)?.scrollIntoView()
    } }, () => title)
    const GenSub = (list: SectionNavType[]) => {
      return list.map(({title, children}) => children.length > 0
        ? h(ElSubMenu, { index: title }, { default: () => GenSub(children), title: () => GenText(title) })
        : h(ElMenuItem, { index: title }, () => GenText(title))
      )
    }
    return h(
      ElMenu,
      {
        style: 'position: fixed; width: 12%; top: 5%; right: 5%'
      },
      () => GenSub(this.sections.value)
    )
  }
}
