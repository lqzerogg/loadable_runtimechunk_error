declare const ROOT_PATH: string
declare const SERVER_ASSETS_PATH: string

declare namespace NodeJS {
  interface Global {
    SSR: boolean
  }
}
