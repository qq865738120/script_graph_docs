/**
 * Docsify 定制侧边栏插件
 * 支持分类、多级目录、国际化
 */
(function () {
  'use strict';

  // 从全局配置获取侧边栏配置，如果没有则使用默认配置
  const sidebarConfig = window.CUSTOM_SIDEBAR_CONFIG || {
    defaultLanguage: 'zh-CN',
    categories: []
  };

  /**
   * 获取当前语言
   */
  function getCurrentLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('zh') ? 'zh-CN' : 'en-US';
  }

  /**
   * 获取文本（支持国际化）
   */
  function getText(textObj, lang) {
    lang = lang || getCurrentLanguage();
    return textObj[lang] || textObj[sidebarConfig.defaultLanguage] || Object.values(textObj)[0];
  }

  /**
   * 获取路由模式
   */
  function getRouterMode() {
    return window.$docsify?.routerMode || 'hash';
  }

  /**
   * 生成路径
   */
  function generatePath(path) {
    const mode = getRouterMode();
    if (mode === 'history') {
      return path;
    }
    return '#/' + path;
  }

  /**
   * 生成侧边栏HTML
   */
  function generateSidebarHTML(lang) {
    lang = lang || getCurrentLanguage();
    
    let html = '<nav class="custom-sidebar">';
    
    // 添加搜索框
    html += `
      <div class="sidebar-search">
        <input type="search" class="search-input" placeholder="搜索文档..." />
      </div>
    `;
    
    // 添加 Logo 和项目名称
    html += `
      <a href="/" class="app-name-link">
        <div class="app-name">
          <span class="app-logo"></span>
          Script Graph
        </div>
      </a>
    `;
    
    sidebarConfig.categories.forEach((category, categoryIndex) => {
      const categoryName = getText(category.name, lang);
      const categoryId = `category-${categoryIndex}`;
      
      // 分类标题
      html += `
        <div class="sidebar-category">
          <div class="category-header" data-category-id="${categoryId}">
            <span class="category-name">${categoryName}</span>
            <span class="category-toggle"></span>
          </div>
          <ul class="category-items" id="${categoryId}">
      `;
      
      // 分类下的条目
      category.items.forEach((item, itemIndex) => {
        const itemTitle = getText(item.title, lang);
        const itemPath = getText(item.path, lang);
        const itemId = `item-${categoryIndex}-${itemIndex}`;
        const href = generatePath(itemPath);
        
        html += `
          <li class="sidebar-item" data-item-id="${itemId}" data-path="${itemPath}">
            <a href="${href}" class="item-link">
              <span class="item-title">${itemTitle}</span>
            </a>
            <ul class="item-subsections" id="${itemId}-subsections"></ul>
          </li>
        `;
      });
      
      html += `
          </ul>
        </div>
      `;
    });
    
    html += '</nav>';
    return html;
  }

  /**
   * 解析Markdown标题
   */
  function parseHeadings() {
    const headings = [];
    
    // 等待 DOM 更新
    setTimeout(() => {
      const content = document.querySelector('.markdown-section');
      if (!content) return;
      
      // 获取所有 h2 标题
      const h2Elements = content.querySelectorAll('h2');
      h2Elements.forEach(h2 => {
        const text = h2.textContent.trim();
        const id = h2.getAttribute('id') || text
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
          .replace(/\s+/g, '-');
        
        headings.push({
          level: 2,
          text: text,
          slug: id
        });
      });
      
      // 渲染子章节
      const activeItem = document.querySelector('.sidebar-item.active');
      if (activeItem) {
        const itemId = activeItem.getAttribute('data-item-id');
        renderSubsections(itemId, headings);
      }
    }, 100);
    
    return headings;
  }

  /**
   * 渲染子章节
   */
  function renderSubsections(itemId, headings) {
    const subsectionsContainer = document.getElementById(`${itemId}-subsections`);
    if (!subsectionsContainer) return;
    
    // 获取当前文档路径
    const sidebarItem = document.querySelector(`[data-item-id="${itemId}"]`);
    const currentPath = sidebarItem?.getAttribute('data-path') || '';
    
    let html = '';
    headings.forEach(heading => {
      if (heading.level === 2) { // 只显示 h2 级别的标题
        const mode = getRouterMode();
        let href;
        if (mode === 'history') {
          href = `/${currentPath}?id=${heading.slug}`;
        } else {
          href = `#/${currentPath}?id=${heading.slug}`;
        }
        
        html += `
          <li class="subsection-item">
            <a href="${href}" class="subsection-link" data-slug="${heading.slug}">
              <span class="subsection-icon">-</span>
              <span class="subsection-text">${heading.text}</span>
            </a>
          </li>
        `;
      }
    });
    
    subsectionsContainer.innerHTML = html;
    
    // 绑定子章节点击事件
    subsectionsContainer.querySelectorAll('.subsection-link').forEach(link => {
      link.addEventListener('click', function() {
        const slug = this.getAttribute('data-slug');
        
        // 更新激活状态
        setTimeout(() => {
          updateSubsectionActiveState(slug);
          
          // 滚动到目标位置
          const targetElement = document.getElementById(slug);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    });
  }

  /**
   * 更新子章节激活状态
   */
  function updateSubsectionActiveState(slug) {
    document.querySelectorAll('.subsection-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-slug') === slug) {
        link.classList.add('active');
      }
    });
  }

  /**
   * 更新激活状态
   */
  function updateActiveState() {
    const mode = getRouterMode();
    let currentPath;
    
    if (mode === 'history') {
      currentPath = window.location.pathname.replace(/^\//, '');
    } else {
      currentPath = window.location.hash.replace('#/', '');
    }
    
    const pathWithoutAnchor = currentPath.split('?')[0].split('#')[0];
    
    // 移除所有激活状态
    document.querySelectorAll('.sidebar-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // 查找并激活当前路径
    document.querySelectorAll('.sidebar-item').forEach(item => {
      const itemPath = item.getAttribute('data-path');
      if (itemPath === pathWithoutAnchor) {
        item.classList.add('active');
        
        // 展开所属分类
        const category = item.closest('.sidebar-category');
        if (category) {
          category.classList.add('expanded');
        }
      }
    });
    
    // 更新子章节的激活状态
    const searchParams = mode === 'history' 
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams(window.location.hash.split('?')[1]);
    const id = searchParams.get('id');
    
    if (id) {
      updateSubsectionActiveState(id);
    } else {
      // 清除所有子章节激活状态
      document.querySelectorAll('.subsection-link').forEach(link => {
        link.classList.remove('active');
      });
    }
  }

  /**
   * 初始化搜索功能
   */
  function initSearch() {
    const searchInput = document.querySelector('.sidebar-search .search-input');
    if (!searchInput) return;
    
    // 集成 docsify 的搜索功能
    searchInput.addEventListener('focus', function() {
      // 触发 docsify 搜索
      const docsifySearch = document.querySelector('.search input[type="search"]');
      if (docsifySearch) {
        docsifySearch.focus();
      }
    });
    
    searchInput.addEventListener('input', function() {
      const docsifySearch = document.querySelector('.search input[type="search"]');
      if (docsifySearch) {
        docsifySearch.value = this.value;
        docsifySearch.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  /**
   * 初始化分类折叠功能
   */
  function initCategoryToggle() {
    document.querySelectorAll('.category-header').forEach(header => {
      header.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const category = this.closest('.sidebar-category');
        category.classList.toggle('expanded');
        
        // 保存状态到 localStorage
        const categoryId = this.getAttribute('data-category-id');
        const isExpanded = category.classList.contains('expanded');
        localStorage.setItem(`sidebar-category-${categoryId}`, isExpanded);
      });
    });
    
    // 恢复展开状态
    document.querySelectorAll('.sidebar-category').forEach(category => {
      const header = category.querySelector('.category-header');
      const categoryId = header.getAttribute('data-category-id');
      const savedState = localStorage.getItem(`sidebar-category-${categoryId}`);
      
      // 默认展开第一个分类，或者根据保存的状态
      if (savedState === 'true' || (savedState === null && category.parentElement.firstElementChild === category)) {
        category.classList.add('expanded');
      }
    });
  }

  /**
   * Docsify 插件
   */
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = (window.$docsify.plugins || []).concat(function (hook) {
    
    // 在初始化前替换默认侧边栏
    hook.init(function() {
      // 禁用默认侧边栏
      window.$docsify.loadSidebar = false;
    });
    
    // 页面准备就绪后渲染自定义侧边栏
    hook.mounted(function() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        const lang = getCurrentLanguage();
        sidebar.innerHTML = generateSidebarHTML(lang);
        initCategoryToggle();
        initSearch();
        updateActiveState();
        
        // 隐藏 docsify 原生搜索框（使用自定义的）
        setTimeout(() => {
          const docsifySearchContainer = document.querySelector('.search');
          if (docsifySearchContainer) {
            docsifySearchContainer.style.display = 'none';
          }
        }, 100);
      }
    });
    
    // 页面切换后更新状态
    hook.doneEach(function() {
      updateActiveState();
      
      // 解析当前页面标题，生成子章节
      parseHeadings();
    });
    
    // 监听路由变化
    hook.beforeEach(function(content) {
      return content;
    });
  });

  // 监听 hashchange 事件
  window.addEventListener('hashchange', function() {
    updateActiveState();
  });

})();
