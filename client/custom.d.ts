declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.module.css'

declare const PUBLIC_PATH: string
declare const SERVER_URL: string
declare const ASSETS_PATH: string
declare namespace NodeJS {
  interface Global {
    SSR: boolean
  }
}

declare type ReactProps = {
  children: JSX.Element
}
