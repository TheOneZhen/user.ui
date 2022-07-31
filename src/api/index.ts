import { isString } from 'lodash'
import { STATE } from '../global/state/stateCode'
import { API } from './api'

export function getUrl (url: string): string {
  if (!url) throw new Error(STATE.PARAM_NULL)
  if (!isString(url)) throw new Error(STATE.DATA_TYPE_ERROR)
  if (!(url in API)) throw new Error(STATE.DATA_NOT_EXIST)
  return url
}
