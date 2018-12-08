module.exports = {
    title: '实用代码段',
    description: '整理实用的代码段',
    base: '/practical-code-snippet/',
    dest: 'docs',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    contentLoading: true,
    markdown: {
        lineNumbers: true,
        toc: { includeLevel: [1, 2, 3] }
    },
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        ['@vuepress/back-to-top'],
        ['@vuepress/google-analytics', {
            ga: 'UA-130628058-1'
        }],
        ['@vuepress/last-updated',{
            transformer: (timestamp, lang) => {
                // 不要忘了安装 moment
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).fromNow()
            }
        }]
    ],
    themeConfig: {
        lastUpdated: '上次更新',
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'js',
                items: [
                    { text: 'javascript', link: '/js/javascript/' },
                    { text: 'Vue', link: '/js/Vue/' },
                    { text: 'React', link: '/js/React/' },
                    { text: 'jQuery', link: '/js/jQuery/' },
                ]
            },
            {
                text: 'css',
                items: [
                    { text: 'css', link: '/css/css/' },
                    { text: 'Stylus', link: '/css/Stylus/' }
                ]
            },
            { text: 'html', link: '/html/' },
            { 
                text: '工具',
                items: [
                    { text: 'git', link: '/tool/git/' }
                ]
            },
            { text: 'Github', link: 'https://github.com/fxss5201/practical-code-snippet' },
            {
                text: '博客',
                items: [
                    {
                        text: 'fxss5201',
                        items: [
                            { text: 'CSDN博客', link: 'https://blog.csdn.net/fxss5201' },
                            { text: '个人博客', link: 'http://www.fxss5201.cn/' }
                        ] 
                    }
                ]
            }
        ],
        serviceWorker: {
            updatePopup: true, // Boolean | Object, 默认值是 undefined.
            // 如果设置为 true, 默认的文本配置将是: 
            updatePopup: {
                message: "有新内容，点击刷新按钮进行查看。",
                buttonText: "刷新"
            }
        }
    }
}