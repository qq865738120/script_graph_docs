/**
 * 侧边栏配置文件
 * 在这里配置侧边栏的分类、目录和国际化内容
 */

window.CUSTOM_SIDEBAR_CONFIG = {
  // 默认语言
  defaultLanguage: 'zh-CN',
  
  // 侧边栏分类配置
  categories: [
    {
      // 分类名称（支持多语言）
      name: {
        'zh-CN': '快速开始',
        'en-US': 'Quick Start'
      },
      // 分类下的文档条目
      items: [
        {
          // 条目标题（支持多语言）
          title: {
            'zh-CN': '项目介绍',
            'en-US': 'Introduction'
          },
          // 文档路径（支持多语言）
          path: {
            'zh-CN': 'project-introduction/index.md',
            'en-US': 'project-introduction/index-en.md'
          }
        }
      ]
    },
    {
      name: {
        'zh-CN': '更新日志',
        'en-US': 'Changelog'
      },
      items: [
        {
          title: {
            'zh-CN': '开发日志',
            'en-US': 'Development Log'
          },
          path: {
            'zh-CN': 'changelog/index.md',
            'en-US': 'changelog/index-en.md'
          }
        }
      ]
    },
    {
      name: {
        'zh-CN': '节点手册',
        'en-US': 'Node Manual'
      },
      items: [
        {
          title: {
            'zh-CN': '事件节点',
            'en-US': 'Event Nodes'
          },
          path: {
            'zh-CN': 'node-manual/event-nodes.md',
            'en-US': 'node-manual/event-nodes-en.md'
          }
        }
      ]
    },
    {
      name: {
        'zh-CN': '参考资料',
        'en-US': 'Reference'
      },
      items: [
        {
          title: {
            'zh-CN': '术语表',
            'en-US': 'Glossary'
          },
          path: {
            'zh-CN': '_glossary.md',
            'en-US': '_glossary-en.md'
          }
        }
      ]
    },
    // {
    //   name: {
    //     'zh-CN': '测试演示',
    //     'en-US': 'Demo & Test'
    //   },
    //   items: [
    //     {
    //       title: {
    //         'zh-CN': '侧边栏演示',
    //         'en-US': 'Sidebar Demo'
    //       },
    //       path: {
    //         'zh-CN': 'test/custom-sidebar-demo.md',
    //         'en-US': 'test/custom-sidebar-demo-en.md'
    //       }
    //     },
    //     {
    //       title: {
    //         'zh-CN': '测试文档',
    //         'en-US': 'Test Document'
    //       },
    //       path: {
    //         'zh-CN': 'test/test.md',
    //         'en-US': 'test/test-en.md'
    //       }
    //     }
    //   ]
    // }
  ],
};
