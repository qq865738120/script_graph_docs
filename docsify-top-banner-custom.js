/**
 * docsify-top-banner-plugin 自定义版本
 * 采用游戏像素风格，与项目整体风格统一
 */
(function () {
  // 防止重复创建横幅的标记
  let bannerCreated = false;
  let autoCloseTimer = null;
  let isClosing = false;

  function plugin(hook, vm) {
    hook.ready(function () {
      const { topBanner } = vm.config;
      if (!topBanner || bannerCreated) {
        return;
      }

      // 检查是否已存在横幅
      const existingBanner = document.getElementById('TOPBANNER');
      if (existingBanner) {
        return;
      }

      // 标记横幅已创建
      bannerCreated = true;

      const defaultTag = topBanner.defaultTag || 'div';
      const bannerContent = vm.compiler.compile(topBanner.content);
      const textAlign = topBanner.textAlign || 'center';
      const bannerPosition = topBanner.position || 'fixed';
      const bannerZIndex = topBanner.zIndex || '9999';
      const autoCloseDuration = topBanner.autoCloseDuration !== undefined ? topBanner.autoCloseDuration : 8000; // 默认8秒

      // 创建 banner 元素
      const bannerElement = document.createElement(defaultTag);
      bannerElement.setAttribute('id', 'TOPBANNER');
      bannerElement.className = 'pixel-top-banner';

      // 添加到 DOM
      const placeholder = document.querySelector('body');
      if (!placeholder) {
        // 理论上不会发生，仅作为安全保护
        bannerCreated = false;
        return;
      }
      placeholder.insertBefore(bannerElement, placeholder.firstChild);

      // 添加内容
      const contentEl = document.querySelector(`${defaultTag}#TOPBANNER`);
      if (!contentEl) {
        // 如果找不到元素，回退到刚创建的 bannerElement
        bannerElement.innerHTML = bannerContent;
      } else {
        contentEl.innerHTML = bannerContent;
        // 设置样式
        contentEl.style.position = bannerPosition;
        contentEl.style.zIndex = bannerZIndex;
        contentEl.style.textAlign = textAlign;
      }

      const getCurrentBanner = () => document.getElementById('TOPBANNER');

      // 关闭横幅的函数
      const closeBanner = () => {
        if (isClosing) {
          return;
        }

        const currentBanner = getCurrentBanner();
        if (!currentBanner) {
          bannerCreated = false;
          return;
        }

        isClosing = true;

        if (autoCloseTimer) {
          clearTimeout(autoCloseTimer);
          autoCloseTimer = null;
        }

        currentBanner.style.animation = 'bannerFadeOut 0.3s ease-out forwards';
        setTimeout(() => {
          const parent = currentBanner.parentNode;
          if (parent) {
            parent.removeChild(currentBanner);
          }
          bannerCreated = false; // 重置标记，允许再次创建
          isClosing = false;
        }, 300);
      };

      const actualContentEl = getCurrentBanner() || bannerElement;

      // 点击链接关闭 banner
      const links = actualContentEl.querySelectorAll('a');
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          // 如果链接有 href，不阻止默认行为
          if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            e.preventDefault();
          }
          closeBanner();
        });
      });

      // 自动关闭（如果设置了自动关闭时间）
      if (autoCloseDuration > 0) {
        autoCloseTimer = setTimeout(() => {
          closeBanner();
        }, autoCloseDuration);
      }
    });
  }

  // 注册插件
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins || []);
})();

