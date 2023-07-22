/**
 * @author: liqiushi liqiushi@nanshe-arch.com
 * @Date: 2023-06-29 11:13:42
 * @description: 生成业务路由规则与外链路由规则
 */
import type { RouteRecordNormalized } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', { eager: true })
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true,
})

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule) return
    const moduleList = Array.isArray(defaultModule) ? [...defaultModule] : [defaultModule]
    result.push(...moduleList)
  })
  return result
}

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, [])

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(externalModules, [])
