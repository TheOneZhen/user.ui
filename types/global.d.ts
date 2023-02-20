declare interface Window {
  app: App<Element>
}
// declaration comes from @element-plus/icons-vue types
declare const ElementPlusIconsVue: Record<
  string,
  import('vue').DefineComponent<
    {}, {}, {}, {}, {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    import('vue').EmitsOptions,
    string,
    import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
    Readonly<import('vue').ExtractPropTypes<{}>>,
    {}
  >
>
