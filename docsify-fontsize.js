/**
 * docsify-fontsize-plugin 自定义版本
 * 采用游戏像素风格，与项目整体风格统一
 */
(function () {
  // 默认配置
  const DEFAULT_CONFIG = {
    defaultSize: 16,
    minSize: 12,
    maxSize: 24,
    step: 1,
    storageKey: 'docsify-fontsize'
  };

  let config = {};
  let currentSize = DEFAULT_CONFIG.defaultSize;

  /**
   * 获取当前字体大小
   */
  function getCurrentSize() {
    const saved = localStorage.getItem(config.storageKey);
    if (saved) {
      const size = parseInt(saved, 10);
      if (!isNaN(size) && size >= config.minSize && size <= config.maxSize) {
        return size;
      }
    }
    return config.defaultSize;
  }

  /**
   * 保存字体大小
   */
  function saveSize(size) {
    localStorage.setItem(config.storageKey, size);
  }

  /**
   * 应用字体大小
   */
  function applyFontSize(size) {
    const markdownSection = document.querySelector('.markdown-section');
    if (markdownSection) {
      markdownSection.style.fontSize = `${size}px`;
      currentSize = size;
      updateDisplay();
      saveSize(size);
    }
  }

  /**
   * 更新显示
   */
  function updateDisplay() {
    const display = document.querySelector('.pixel-fontsize-display');
    if (display) {
      display.textContent = `${currentSize}px`;
    }

    // 更新按钮状态
    const decreaseBtn = document.querySelector('.pixel-fontsize-btn[data-action="decrease"]');
    const increaseBtn = document.querySelector('.pixel-fontsize-btn[data-action="increase"]');

    if (decreaseBtn) {
      decreaseBtn.disabled = currentSize <= config.minSize;
    }
    if (increaseBtn) {
      increaseBtn.disabled = currentSize >= config.maxSize;
    }
  }

  /**
   * 增加字体大小
   */
  function increaseFontSize() {
    const newSize = Math.min(currentSize + config.step, config.maxSize);
    if (newSize !== currentSize) {
      applyFontSize(newSize);
    }
  }

  /**
   * 减小字体大小
   */
  function decreaseFontSize() {
    const newSize = Math.max(currentSize - config.step, config.minSize);
    if (newSize !== currentSize) {
      applyFontSize(newSize);
    }
  }

  /**
   * 创建控制面板
   */
  function createControlPanel() {
    // 检查是否已存在
    if (document.querySelector('.pixel-fontsize-control')) {
      return;
    }

    const container = document.createElement('div');
    container.className = 'pixel-fontsize-control';
    container.innerHTML = `
      <button class="pixel-fontsize-btn" data-action="decrease" aria-label="减小字体" title="减小字体">A-</button>
      <div class="pixel-fontsize-display">${currentSize}px</div>
      <button class="pixel-fontsize-btn" data-action="increase" aria-label="增大字体" title="增大字体">A+</button>
    `;

    // 添加到 markdown-section 顶部
    const markdownSection = document.querySelector('.markdown-section');
    if (markdownSection && markdownSection.firstChild) {
      markdownSection.insertBefore(container, markdownSection.firstChild);
    } else if (markdownSection) {
      markdownSection.appendChild(container);
    }

    // 绑定事件
    const decreaseBtn = container.querySelector('[data-action="decrease"]');
    const increaseBtn = container.querySelector('[data-action="increase"]');

    if (decreaseBtn) {
      decreaseBtn.addEventListener('click', decreaseFontSize);
    }
    if (increaseBtn) {
      increaseBtn.addEventListener('click', increaseFontSize);
    }

    // 更新按钮状态
    updateDisplay();
  }

  /**
   * 插件主函数
   */
  function plugin(hook, vm) {
    // 合并配置
    config = Object.assign({}, DEFAULT_CONFIG, vm.config.fontsize || {});

    // 初始化
    hook.init(function () {
      currentSize = getCurrentSize();
    });

    // DOM 准备完成后创建控制面板
    hook.doneEach(function () {
      // 应用保存的字体大小
      applyFontSize(currentSize);

      // 移除旧的控制面板（因为每次路由切换都会重新渲染 markdown-section）
      const oldControl = document.querySelector('.pixel-fontsize-control');
      if (oldControl) {
        oldControl.remove();
      }

      // 创建新的控制面板
      createControlPanel();
    });
  }

  // 注册插件
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins || []);
})();

