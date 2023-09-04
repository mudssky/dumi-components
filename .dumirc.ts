import { defineConfig } from 'dumi'

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'dumi-components',
    logo: false,
    // 不配置时默认为约定式路由
    // nav
    // 不配置时默认为约定式侧边栏
    // sidebar
    showLineNums: true,
    // 默认开启的
    nprogress: true,
    prefersColor: { default: 'auto', switch: true },
    socialLinks: {
      github: 'https://github.com/mudssky',
    },
  },

  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'tool', dir: 'src/tools' },
    ],
  },
  locales: [{ id: 'zh-CN', name: '中文' }],
})
