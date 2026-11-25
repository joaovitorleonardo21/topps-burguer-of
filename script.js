/* =========================================================
   TOPPS BURGUER - SISTEMA DE CARDÁPIO, CARRINHO E WHATSAPP
   Todos os valores monetários são calculados em centavos inteiros.
   ========================================================= */

(() => {
  'use strict';

  const WHATSAPP_NUMBER = '5584996554600';
  const STORAGE_CART_KEY = 'topps_burguer_cart_v1';
  const STORAGE_ADDRESS_KEY = 'topps_burguer_address_v1';

  /* =======================================================
     CARDÁPIO OFICIAL DA TOPPS BURGUER
     ======================================================= */
  const CATEGORY_META = [
    { id: 'burgers', title: 'Hambúrgueres e Lanches', badge: 'Lanche' },
    { id: 'sucos', title: 'Sucos', badge: 'Suco' },
    { id: 'vitaminas', title: 'Vitaminas', badge: 'Vitamina' },
    { id: 'refrigerantes', title: 'Refrigerantes', badge: 'Bebida' },
    { id: 'acrescimos', title: 'Acréscimos', badge: 'Adicional' }
  ];

  // Preços em centavos inteiros para evitar erros de ponto flutuante
  const MENU_PRODUCTS = [
    // 9.1 Hambúrgueres e lanches
    {
      id: 'burguer',
      category: 'burgers',
      name: 'BURGUER',
      priceCents: 900,
      ingredients: 'Pão, hambúrguer, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'burguer-completo',
      category: 'burgers',
      name: 'BURGUER COMPLETO',
      priceCents: 1000,
      ingredients: 'Pão, hambúrguer, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'x-frango',
      category: 'burgers',
      name: 'X - FRANGO',
      priceCents: 1300,
      ingredients: 'Pão, frango, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'x-calabresa',
      category: 'burgers',
      name: 'X - CALABRESA',
      priceCents: 1400,
      ingredients: 'Pão, calabresa, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'x-bacon',
      category: 'burgers',
      name: 'X - BACON',
      priceCents: 1400,
      ingredients: 'Pão, bacon, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'sertanejo',
      category: 'burgers',
      name: 'SERTANEJO',
      priceCents: 1400,
      ingredients: 'Pão, carne de sol, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'fran-catupiry',
      category: 'burgers',
      name: 'FRAN - CATUPIRY',
      priceCents: 1400,
      ingredients: 'Pão, frango, catupiry, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'frango-e-cheddar',
      category: 'burgers',
      name: 'FRANGO E CHEDDAR',
      priceCents: 1400,
      ingredients: 'Pão, frango, cheddar, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'double',
      category: 'burgers',
      name: 'DOUBLE',
      priceCents: 1600,
      ingredients: 'Pão, milho, batata palha, 2 hambúrgueres, 2 ovos, 2 queijos, 2 presuntos, salada e molho especial.'
    },
    {
      id: 'fran-bacon',
      category: 'burgers',
      name: 'FRAN - BACON',
      priceCents: 1700,
      ingredients: 'Pão, frango, bacon, ovo, salada, queijo, presunto e molho especial.'
    },
    {
      id: 'matuto',
      category: 'burgers',
      name: 'MATUTO',
      priceCents: 1800,
      ingredients: 'Pão, carne de sol, bacon, queijo coalho, cebola assada, catupiry, presunto e molho especial.'
    },

    // 9.2 Sucos
    {
      id: 'suco-acerola-goiaba-caja',
      category: 'sucos',
      name: 'ACEROLA, GOIABA E CAJÁ',
      priceCents: 600,
      ingredients: 'Suco — sabores disponíveis: Acerola, Goiaba e Cajá.'
    },
    {
      id: 'suco-uva-maracuja',
      category: 'sucos',
      name: 'UVA E MARACUJÁ',
      priceCents: 600,
      ingredients: 'Suco — sabores disponíveis: Uva e Maracujá.'
    },

    // 9.3 Vitaminas
    {
      id: 'vitamina-acerola-goiaba-caja',
      category: 'vitaminas',
      name: 'ACEROLA, GOIABA E CAJÁ',
      priceCents: 800,
      ingredients: 'Vitamina — sabores disponíveis: Acerola, Goiaba e Cajá.'
    },
    {
      id: 'vitamina-uva-maracuja',
      category: 'vitaminas',
      name: 'UVA E MARACUJÁ',
      priceCents: 1000,
      ingredients: 'Vitamina — sabores disponíveis: Uva e Maracujá.'
    },

    // 9.4 Refrigerantes
    {
      id: 'refri-lata-350ml',
      category: 'refrigerantes',
      name: 'LATA 350ML',
      priceCents: 700,
      ingredients: 'Refrigerante em lata 350ml.'
    },
    {
      id: 'refri-guarana-1l',
      category: 'refrigerantes',
      name: 'GUARANÁ 1L',
      priceCents: 900,
      ingredients: 'Refrigerante Guaraná 1 litro.'
    },
    {
      id: 'refri-pepsi-1l',
      category: 'refrigerantes',
      name: 'PEPSI 1L',
      priceCents: 900,
      ingredients: 'Refrigerante Pepsi 1 litro.'
    },
    {
      id: 'refri-coca-1l',
      category: 'refrigerantes',
      name: 'COCA 1L',
      priceCents: 1000,
      ingredients: 'Refrigerante Coca 1 litro.'
    },
    {
      id: 'refri-coca-2l',
      category: 'refrigerantes',
      name: 'COCA 2L',
      priceCents: 1500,
      ingredients: 'Refrigerante Coca 2 litros.'
    },
    {
      id: 'refri-guarana-2l',
      category: 'refrigerantes',
      name: 'GUARANÁ 2L',
      priceCents: 1300,
      ingredients: 'Refrigerante Guaraná 2 litros.'
    },
    {
      id: 'refri-laranja-2l',
      category: 'refrigerantes',
      name: 'LARANJA 2L',
      priceCents: 1300,
      ingredients: 'Refrigerante Laranja 2 litros.'
    },
    {
      id: 'refri-uva-2l',
      category: 'refrigerantes',
      name: 'UVA 2L',
      priceCents: 1300,
      ingredients: 'Refrigerante Uva 2 litros.'
    },

    // 9.5 Acréscimos (preservando integralmente os 7 cadastros da imagem original)
    {
      id: 'acrescimo-catupiry-1',
      addonKey: 'queijo-catupiry',
      category: 'acrescimos',
      name: 'QUEIJO CATUPIRY',
      priceCents: 200,
      ingredients: 'Acréscimo de queijo catupiry para personalizar seu lanche.'
    },
    {
      id: 'acrescimo-catupiry-2',
      addonKey: 'queijo-catupiry',
      category: 'acrescimos',
      name: 'QUEIJO CATUPIRY',
      priceCents: 200,
      ingredients: 'Acréscimo de queijo catupiry para personalizar seu lanche.'
    },
    {
      id: 'acrescimo-coalho',
      addonKey: 'queijo-coalho',
      category: 'acrescimos',
      name: 'QUEIJO COALHO',
      priceCents: 200,
      ingredients: 'Acréscimo de queijo coalho para personalizar seu lanche.'
    },
    {
      id: 'acrescimo-frango',
      addonKey: 'frango',
      category: 'acrescimos',
      name: 'FRANGO',
      priceCents: 300,
      ingredients: 'Acréscimo de frango para personalizar seu lanche.'
    },
    {
      id: 'acrescimo-calabresa',
      addonKey: 'calabresa',
      category: 'acrescimos',
      name: 'CALABRESA',
      priceCents: 300,
      ingredients: 'Acréscimo de calabresa para personalizar seu lanche.'
    },
    {
      id: 'acrescimo-carne-de-sol',
      addonKey: 'carne-de-sol',
      category: 'acrescimos',
      name: 'CARNE DE SOL',
      priceCents: 400,
      ingredients: 'Acréscimo de carne de sol para personalizar seu lanche.'
    },
    {
      id: 'acrescimo-bacon',
      addonKey: 'bacon',
      category: 'acrescimos',
      name: 'BACON',
      priceCents: 400,
      ingredients: 'Acréscimo de bacon para personalizar seu lanche.'
    }
  ];

  // Opções únicas de adicionais para personalização dos hambúrgueres
  const ADDON_OPTIONS = [
    { id: 'queijo-catupiry', name: 'Queijo Catupiry', priceCents: 200 },
    { id: 'queijo-coalho', name: 'Queijo Coalho', priceCents: 200 },
    { id: 'frango', name: 'Frango', priceCents: 300 },
    { id: 'calabresa', name: 'Calabresa', priceCents: 300 },
    { id: 'carne-de-sol', name: 'Carne de Sol', priceCents: 400 },
    { id: 'bacon', name: 'Bacon', priceCents: 400 }
  ];

  /* =======================================================
     ESTADO DA APLICAÇÃO
     ======================================================= */
  let state = {
    activeCategory: 'all',
    searchQuery: '',
    cart: loadCart(),
    checkoutStep: 1,
    deliveryData: loadDeliveryData(),
    modalProduct: null,
    modalQty: 1,
    modalAddons: {} // { addonId: qty }
  };

  /* =======================================================
     UTILITÁRIOS
     ======================================================= */
  function formatBRL(cents) {
    const safeCents = Number.isFinite(cents) ? Math.round(cents) : 0;
    const reais = (safeCents / 100).toFixed(2).replace('.', ',');
    return `R$ ${reais}`;
  }

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function buildSignature(productId, addonsArray) {
    const normalized = [...addonsArray]
      .filter((a) => a.qty > 0)
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((a) => `${a.id}:${a.qty}`)
      .join('|');
    return `${productId}__${normalized}`;
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(state.cart));
    } catch {
      // Ignora erro caso armazenamento esteja indisponível
    }
  }

  function loadDeliveryData() {
    const defaults = {
      name: '',
      phone: '',
      cep: '',
      city: '',
      neighborhood: '',
      street: '',
      number: '',
      complement: '',
      reference: '',
      notes: ''
    };
    try {
      const raw = localStorage.getItem(STORAGE_ADDRESS_KEY);
      if (!raw) return defaults;
      return { ...defaults, ...JSON.parse(raw) };
    } catch {
      return defaults;
    }
  }

  function saveDeliveryData(data) {
    state.deliveryData = data;
    try {
      localStorage.setItem(STORAGE_ADDRESS_KEY, JSON.stringify(data));
    } catch {
      // Ignora erro de armazenamento
    }
  }

  function showToast(message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  function getCategoryIconSVG(category) {
    switch (category) {
      case 'burgers':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M4 11h16a2 2 0 0 0-2-6H6a2 2 0 0 0-2 6z"></path>
          <path d="M3 14h18"></path>
          <path d="M5 17h14a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3z"></path>
        </svg>`;
      case 'sucos':
      case 'vitaminas':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M8 2h8l-1 18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2L8 2z"></path>
          <path d="M12 2l3-1"></path>
          <path d="M8.5 10h7"></path>
        </svg>`;
      case 'refrigerantes':
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <rect x="7" y="4" width="10" height="17" rx="2"></rect>
          <path d="M9 4V2h6v2"></path>
          <path d="M7 10h10"></path>
        </svg>`;
      default:
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="9"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>`;
    }
  }

  /* =======================================================
     CÁLCULOS DO CARRINHO (100% EM CENTAVOS)
     ======================================================= */
  function calculateCartTotals() {
    let productsSubtotalCents = 0;
    let addonsSubtotalCents = 0;
    let totalItemsCount = 0;

    state.cart.forEach((item) => {
      totalItemsCount += item.quantity;

      if (item.category === 'acrescimos') {
        addonsSubtotalCents += item.basePriceCents * item.quantity;
      } else {
        productsSubtotalCents += item.basePriceCents * item.quantity;
        const unitAddonsCents = (item.addons || []).reduce(
          (sum, addon) => sum + addon.priceCents * addon.qty,
          0
        );
        addonsSubtotalCents += unitAddonsCents * item.quantity;
      }
    });

    const grandTotalCents = productsSubtotalCents + addonsSubtotalCents;

    return {
      productsSubtotalCents,
      addonsSubtotalCents,
      grandTotalCents,
      totalItemsCount
    };
  }

  function getItemLineTotalCents(item) {
    const unitAddonsCents = (item.addons || []).reduce(
      (sum, addon) => sum + addon.priceCents * addon.qty,
      0
    );
    return (item.basePriceCents + unitAddonsCents) * item.quantity;
  }

  /* =======================================================
     RENDERIZAÇÃO DO CARDÁPIO
     ======================================================= */
  function renderMenu() {
    const container = document.getElementById('menuContainer');
    const query = state.searchQuery.trim().toLowerCase();

    const categoriesToRender =
      state.activeCategory === 'all'
        ? CATEGORY_META
        : CATEGORY_META.filter((c) => c.id === state.activeCategory);

    let html = '';
    let renderedCount = 0;

    categoriesToRender.forEach((cat) => {
      const items = MENU_PRODUCTS.filter((prod) => {
        if (prod.category !== cat.id) return false;
        if (!query) return true;
        return (
          prod.name.toLowerCase().includes(query) ||
          prod.ingredients.toLowerCase().includes(query) ||
          cat.title.toLowerCase().includes(query)
        );
      });

      if (items.length === 0) return;
      renderedCount += items.length;

      html += `
        <div class="menu-category-block">
          <div class="menu-category-heading">
            <h3>${escapeHTML(cat.title)}</h3>
            <span class="menu-category-count">${items.length} ${items.length === 1 ? 'item' : 'itens'}</span>
          </div>
          <div class="menu-grid">
            ${items.map((item) => renderProductCard(item, cat.badge)).join('')}
          </div>
        </div>
      `;
    });

    if (renderedCount === 0) {
      html = `
        <div class="menu-no-results">
          <p>Nenhum produto encontrado para "<strong>${escapeHTML(state.searchQuery)}</strong>".</p>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  function renderProductCard(product, badgeLabel) {
    const isBurger = product.category === 'burgers';
    const actionLabel = isBurger ? 'Personalizar e Pedir' : 'Adicionar';

    return `
      <article class="product-card">
        <div>
          <div class="product-card-top">
            <div class="product-illustration">
              ${getCategoryIconSVG(product.category)}
            </div>
            <div class="product-title-area">
              <span class="product-badge">${escapeHTML(badgeLabel)}</span>
              <h4 class="product-name">${escapeHTML(product.name)}</h4>
            </div>
          </div>
          <p class="product-ingredients">${escapeHTML(product.ingredients)}</p>
        </div>

        <div class="product-card-footer">
          <span class="product-price">${formatBRL(product.priceCents)}</span>
          <button
            type="button"
            class="btn btn-primary btn-sm add-product-btn"
            data-product-id="${escapeHTML(product.id)}"
          >
            ${actionLabel}
          </button>
        </div>
      </article>
    `;
  }

  /* =======================================================
     PERSONALIZAÇÃO DE HAMBÚRGUERES (MODAL DE ADICIONAIS)
     ======================================================= */
  function openAddonModal(product) {
    state.modalProduct = product;
    state.modalQty = 1;
    state.modalAddons = {};
    ADDON_OPTIONS.forEach((a) => {
      state.modalAddons[a.id] = 0;
    });

    document.getElementById('addonModalTitle').textContent = product.name;
    document.getElementById('addonModalIngredients').textContent = product.ingredients;
    document.getElementById('addonModalBasePrice').textContent = formatBRL(product.priceCents);
    document.getElementById('modalProductQty').textContent = '1';

    renderAddonsPicker();
    updateAddonModalTotal();

    document.getElementById('addonModal').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeAddonModal() {
    document.getElementById('addonModal').hidden = true;
    state.modalProduct = null;
    if (document.getElementById('cartDrawerOverlay').hidden) {
      document.body.style.overflow = '';
    }
  }

  function renderAddonsPicker() {
    const list = document.getElementById('addonsPickerList');
    list.innerHTML = ADDON_OPTIONS.map((addon) => {
      const qty = state.modalAddons[addon.id] || 0;
      return `
        <div class="addon-picker-row ${qty > 0 ? 'selected' : ''}">
          <div class="addon-info">
            <strong>${escapeHTML(addon.name)}</strong>
            <span>+ ${formatBRL(addon.priceCents)} cada</span>
          </div>
          <div class="qty-control">
            <button
              type="button"
              class="qty-btn addon-qty-btn"
              data-addon-id="${escapeHTML(addon.id)}"
              data-delta="-1"
              aria-label="Remover adicional ${escapeHTML(addon.name)}"
            >-</button>
            <span class="qty-value">${qty}</span>
            <button
              type="button"
              class="qty-btn addon-qty-btn"
              data-addon-id="${escapeHTML(addon.id)}"
              data-delta="1"
              aria-label="Adicionar ${escapeHTML(addon.name)}"
            >+</button>
          </div>
        </div>
      `;
    }).join('');
  }

  function updateAddonModalTotal() {
    if (!state.modalProduct) return;
    let addonsPerUnitCents = 0;
    ADDON_OPTIONS.forEach((addon) => {
      const qty = state.modalAddons[addon.id] || 0;
      addonsPerUnitCents += addon.priceCents * qty;
    });
    const totalCents = (state.modalProduct.priceCents + addonsPerUnitCents) * state.modalQty;
    document.getElementById('addonModalTotalPrice').textContent = formatBRL(totalCents);
  }

  function confirmModalProductToCart() {
    if (!state.modalProduct) return;

    const selectedAddons = ADDON_OPTIONS
      .filter((addon) => (state.modalAddons[addon.id] || 0) > 0)
      .map((addon) => ({
        id: addon.id,
        name: addon.name,
        priceCents: addon.priceCents,
        qty: state.modalAddons[addon.id]
      }));

    addToCart(state.modalProduct, state.modalQty, selectedAddons);
    const productName = state.modalProduct.name;
    closeAddonModal();
    showToast(`${productName} adicionado à sacola!`);
  }

  /* =======================================================
     OPERAÇÕES DO CARRINHO
     ======================================================= */
  function addToCart(product, quantity = 1, addons = []) {
    const signature = buildSignature(product.id, addons);
    const existing = state.cart.find((item) => item.signature === signature);

    if (existing) {
      existing.quantity += quantity;
    } else {
      const displayName =
        product.category === 'refrigerantes' && !product.name.toLowerCase().includes('refrigerante')
          ? `Refrigerante ${product.name}`
          : product.category === 'sucos'
          ? `Suco ${product.name}`
          : product.category === 'vitaminas'
          ? `Vitamina ${product.name}`
          : product.name;

      state.cart.push({
        uid: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        signature,
        productId: product.id,
        name: displayName,
        category: product.category,
        basePriceCents: product.priceCents,
        quantity,
        addons
      });
    }

    saveCart();
    updateCartUI(true);
  }

  function handleDirectProductClick(productId) {
    const product = MENU_PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    if (product.category === 'burgers') {
      openAddonModal(product);
      return;
    }

    if (product.category === 'acrescimos') {
      handleExtraCardClick(product);
      return;
    }

    addToCart(product, 1, []);
    showToast(`${product.name} adicionado à sacola!`);
  }

  function handleExtraCardClick(extraProduct) {
    const burgersInCart = state.cart.filter((item) => item.category === 'burgers');
    const addonOption = ADDON_OPTIONS.find((a) => a.id === extraProduct.addonKey);

    if (burgersInCart.length === 0 || !addonOption) {
      addToCart(extraProduct, 1, []);
      showToast(`Acréscimo ${extraProduct.name} adicionado ao pedido!`);
      return;
    }

    // Oferece vincular o acréscimo a um hambúrguer já na sacola ou adicionar avulso
    const modal = document.getElementById('extraChoiceModal');
    document.getElementById('extraChoiceTitle').textContent = `${extraProduct.name} (${formatBRL(extraProduct.priceCents)})`;
    const list = document.getElementById('extraChoiceList');

    list.innerHTML = burgersInCart
      .map(
        (burgerItem) => `
          <button
            type="button"
            class="btn btn-outline btn-sm attach-extra-btn"
            data-cart-uid="${escapeHTML(burgerItem.uid)}"
            data-addon-id="${escapeHTML(addonOption.id)}"
          >
            Vincular a: ${escapeHTML(burgerItem.quantity)}x ${escapeHTML(burgerItem.name)}
          </button>
        `
      )
      .join('') +
      `
        <button
          type="button"
          class="btn btn-primary btn-sm add-standalone-extra-btn"
          data-product-id="${escapeHTML(extraProduct.id)}"
        >
          Adicionar como acréscimo avulso no pedido
        </button>
      `;

    modal.hidden = false;
  }

  function attachAddonToCartItem(cartUid, addonId) {
    const item = state.cart.find((c) => c.uid === cartUid);
    const addonOpt = ADDON_OPTIONS.find((a) => a.id === addonId);
    if (!item || !addonOpt) return;

    const existingAddon = (item.addons || []).find((a) => a.id === addonId);
    if (existingAddon) {
      existingAddon.qty += 1;
    } else {
      item.addons = item.addons || [];
      item.addons.push({
        id: addonOpt.id,
        name: addonOpt.name,
        priceCents: addonOpt.priceCents,
        qty: 1
      });
    }

    item.signature = buildSignature(item.productId, item.addons);
    saveCart();
    updateCartUI(true);
    document.getElementById('extraChoiceModal').hidden = true;
    showToast(`${addonOpt.name} vinculado ao ${item.name}!`);
  }

  function changeCartItemQuantity(uid, delta) {
    const index = state.cart.findIndex((item) => item.uid === uid);
    if (index === -1) return;

    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }

    saveCart();
    updateCartUI();
  }

  function removeCartItem(uid) {
    state.cart = state.cart.filter((item) => item.uid !== uid);
    saveCart();
    updateCartUI();
  }

  function removeAddonFromCartItem(uid, addonId) {
    const item = state.cart.find((c) => c.uid === uid);
    if (!item) return;

    item.addons = (item.addons || []).filter((a) => a.id !== addonId);
    item.signature = buildSignature(item.productId, item.addons);

    saveCart();
    updateCartUI();
  }

  function clearCart() {
    state.cart = [];
    saveCart();
    updateCartUI();
    showToast('Sacola esvaziada.');
  }

  /* =======================================================
     ATUALIZAÇÃO DA INTERFACE DO CARRINHO
     ======================================================= */
  function updateCartUI(animateBadge = false) {
    const totals = calculateCartTotals();

    // Cabeçalho
    const badge = document.getElementById('headerCartCount');
    badge.textContent = String(totals.totalItemsCount);

    if (animateBadge) {
      const trigger = document.getElementById('openCartBtn');
      trigger.classList.remove('bump');
      void trigger.offsetWidth;
      trigger.classList.add('bump');
    }

    // Barra mobile inferior
    const mobileBar = document.getElementById('mobileCartBar');
    if (totals.totalItemsCount > 0) {
      mobileBar.hidden = false;
      document.body.classList.add('has-mobile-bar');
      document.getElementById('mobileCartCount').textContent =
        `${totals.totalItemsCount} ${totals.totalItemsCount === 1 ? 'item' : 'itens'}`;
      document.getElementById('mobileCartTotal').textContent = formatBRL(totals.grandTotalCents);
    } else {
      mobileBar.hidden = true;
      document.body.classList.remove('has-mobile-bar');
    }

    // Lista dentro da gaveta
    const itemsContainer = document.getElementById('cartItemsContainer');
    const emptyState = document.getElementById('cartEmptyState');
    const summaryBox = document.getElementById('cartSummaryBox');

    if (state.cart.length === 0) {
      itemsContainer.innerHTML = '';
      emptyState.hidden = false;
      summaryBox.hidden = true;
      if (state.checkoutStep > 1) {
        setCheckoutStep(1);
      }
      return;
    }

    emptyState.hidden = true;
    summaryBox.hidden = false;

    itemsContainer.innerHTML = state.cart.map((item) => {
      const lineTotal = getItemLineTotalCents(item);
      const addonsHtml =
        item.addons && item.addons.length > 0
          ? `
            <ul class="cart-item-addons">
              ${item.addons
                .map(
                  (addon) => `
                    <li class="cart-addon-line">
                      <span>+ ${addon.qty}x ${escapeHTML(addon.name)} (${formatBRL(addon.priceCents * addon.qty)}/unid.)</span>
                      <button
                        type="button"
                        class="remove-addon-btn"
                        data-uid="${escapeHTML(item.uid)}"
                        data-addon-id="${escapeHTML(addon.id)}"
                      >Remover</button>
                    </li>
                  `
                )
                .join('')}
            </ul>
          `
          : '';

      return `
        <div class="cart-item-card">
          <div class="cart-item-header">
            <div>
              <div class="cart-item-name">${escapeHTML(item.name)}</div>
              <div class="cart-item-unit">Unitário base: ${formatBRL(item.basePriceCents)}</div>
            </div>
            <button type="button" class="remove-item-btn" data-uid="${escapeHTML(item.uid)}">
              Remover
            </button>
          </div>
          ${addonsHtml}
          <div class="cart-item-footer">
            <div class="qty-control">
              <button type="button" class="qty-btn cart-qty-btn" data-uid="${escapeHTML(item.uid)}" data-delta="-1" aria-label="Diminuir quantidade">-</button>
              <span class="qty-value">${item.quantity}</span>
              <button type="button" class="qty-btn cart-qty-btn" data-uid="${escapeHTML(item.uid)}" data-delta="1" aria-label="Aumentar quantidade">+</button>
            </div>
            <span class="cart-item-subtotal">${formatBRL(lineTotal)}</span>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('cartProductsSubtotal').textContent = formatBRL(totals.productsSubtotalCents);
    document.getElementById('cartAddonsSubtotal').textContent = formatBRL(totals.addonsSubtotalCents);
    document.getElementById('cartGrandTotal').textContent = formatBRL(totals.grandTotalCents);
  }

  /* =======================================================
     NAVEGAÇÃO DA GAVETA (1: SACOLA, 2: ENTREGA, 3: REVISÃO)
     ======================================================= */
  function openCartDrawer(step = 1) {
    setCheckoutStep(step);
    document.getElementById('cartDrawerOverlay').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    document.getElementById('cartDrawerOverlay').hidden = true;
    if (document.getElementById('addonModal').hidden) {
      document.body.style.overflow = '';
    }
  }

  function setCheckoutStep(step) {
    state.checkoutStep = step;

    const stepCart = document.getElementById('stepCart');
    const stepAddress = document.getElementById('stepAddress');
    const stepReview = document.getElementById('stepReview');

    stepCart.hidden = step !== 1;
    stepAddress.hidden = step !== 2;
    stepReview.hidden = step !== 3;

    const titles = {
      1: { label: 'Etapa 1 de 3', title: 'Sua Sacola' },
      2: { label: 'Etapa 2 de 3', title: 'Endereço de Entrega' },
      3: { label: 'Etapa 3 de 3', title: 'Revisão do Pedido' }
    };

    document.getElementById('drawerStepLabel').textContent = titles[step].label;
    document.getElementById('cartDrawerTitle').textContent = titles[step].title;

    document.querySelectorAll('.step-pill').forEach((pill) => {
      const pillStep = Number(pill.dataset.step);
      pill.classList.toggle('active', pillStep === step);
      pill.classList.toggle('done', pillStep < step);
    });

    if (step === 2) {
      populateDeliveryForm();
    } else if (step === 3) {
      document.getElementById('whatsappSentNotice').hidden = true;
      renderReviewScreen();
    }

    document.querySelector('.drawer-body').scrollTop = 0;
  }

  /* =======================================================
     FORMULÁRIO DE ENTREGA E VALIDAÇÕES
     ======================================================= */
  function populateDeliveryForm() {
    const d = state.deliveryData;
    document.getElementById('customerName').value = d.name || '';
    document.getElementById('customerPhone').value = d.phone || '';
    document.getElementById('addressCep').value = d.cep || '';
    document.getElementById('addressCity').value = d.city || '';
    document.getElementById('addressNeighborhood').value = d.neighborhood || '';
    document.getElementById('addressStreet').value = d.street || '';
    document.getElementById('addressNumber').value = d.number || '';
    document.getElementById('addressComplement').value = d.complement || '';
    document.getElementById('addressReference').value = d.reference || '';
    document.getElementById('orderNotes').value = d.notes || '';
  }

  function readDeliveryForm() {
    return {
      name: document.getElementById('customerName').value.trim(),
      phone: document.getElementById('customerPhone').value.trim(),
      cep: document.getElementById('addressCep').value.trim(),
      city: document.getElementById('addressCity').value.trim(),
      neighborhood: document.getElementById('addressNeighborhood').value.trim(),
      street: document.getElementById('addressStreet').value.trim(),
      number: document.getElementById('addressNumber').value.trim(),
      complement: document.getElementById('addressComplement').value.trim(),
      reference: document.getElementById('addressReference').value.trim(),
      notes: document.getElementById('orderNotes').value.trim()
    };
  }

  function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach((el) => {
      el.textContent = '';
    });
    document.querySelectorAll('.delivery-form input').forEach((el) => {
      el.classList.remove('invalid');
    });
    const banner = document.getElementById('formGlobalError');
    banner.hidden = true;
    banner.textContent = '';
  }

  function setFieldError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`error-${inputId}`);
    if (input) input.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  }

  function validateDeliveryForm(data) {
    clearFormErrors();
    let isValid = true;

    if (data.name.length < 2) {
      setFieldError('customerName', 'Informe seu nome completo.');
      isValid = false;
    }

    if (data.phone) {
      const digits = data.phone.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 11) {
        setFieldError('customerPhone', 'Informe um telefone válido com DDD ou deixe em branco.');
        isValid = false;
      }
    }

    const cepDigits = data.cep.replace(/\D/g, '');
    if (cepDigits.length !== 8) {
      setFieldError('addressCep', 'Informe um CEP válido com 8 dígitos.');
      isValid = false;
    }

    if (data.city.length < 2) {
      setFieldError('addressCity', 'Informe a cidade.');
      isValid = false;
    }

    if (data.neighborhood.length < 2) {
      setFieldError('addressNeighborhood', 'Informe o bairro.');
      isValid = false;
    }

    if (data.street.length < 2) {
      setFieldError('addressStreet', 'Informe o nome da rua ou avenida.');
      isValid = false;
    }

    if (data.number.length < 1) {
      setFieldError('addressNumber', 'Informe o número.');
      isValid = false;
    }

    if (data.reference.length < 2) {
      setFieldError('addressReference', 'Informe um ponto de referência para facilitar a entrega.');
      isValid = false;
    }

    if (!isValid) {
      const banner = document.getElementById('formGlobalError');
      banner.textContent = 'Por favor, preencha os campos obrigatórios destacados antes de continuar.';
      banner.hidden = false;
    }

    return isValid;
  }

  /* =======================================================
     REVISÃO DO PEDIDO E MENSAGEM DO WHATSAPP
     ======================================================= */
  function renderReviewScreen() {
    const d = state.deliveryData;
    const totals = calculateCartTotals();
    const container = document.getElementById('reviewContent');

    const productsListHtml = state.cart.map((item) => {
      const lineTotal = getItemLineTotalCents(item);
      const addonsText =
        item.addons && item.addons.length > 0
          ? item.addons
              .map((a) => `${a.qty}x ${a.name} (${formatBRL(a.priceCents * a.qty)}/unid.)`)
              .join(', ')
          : '';

      return `
        <li class="review-product-row">
          <div class="review-product-top">
            <span>${item.quantity}x ${escapeHTML(item.name)}</span>
            <span>${formatBRL(lineTotal)}</span>
          </div>
          <div class="review-product-sub">
            Unitário base: ${formatBRL(item.basePriceCents)}
            ${addonsText ? `<br>Adicionais por lanche: ${escapeHTML(addonsText)}` : ''}
          </div>
        </li>
      `;
    }).join('');

    container.innerHTML = `
      <div class="review-card">
        <h4>Dados do Cliente</h4>
        <p><strong>Nome:</strong> ${escapeHTML(d.name)}</p>
        ${d.phone ? `<p><strong>Telefone:</strong> ${escapeHTML(d.phone)}</p>` : ''}
      </div>

      <div class="review-card">
        <h4>Endereço de Entrega</h4>
        <p>
          ${escapeHTML(d.street)}, Nº ${escapeHTML(d.number)}
          ${d.complement ? ` — ${escapeHTML(d.complement)}` : ''}<br>
          Bairro: ${escapeHTML(d.neighborhood)} — ${escapeHTML(d.city)}<br>
          CEP: ${escapeHTML(d.cep)}<br>
          Referência: ${escapeHTML(d.reference)}
        </p>
        ${d.notes ? `<p style="margin-top:0.5rem;"><strong>Observações:</strong> ${escapeHTML(d.notes)}</p>` : ''}
      </div>

      <div class="review-card">
        <h4>Produtos Selecionados</h4>
        <ul class="review-products-list">
          ${productsListHtml}
        </ul>
      </div>

      <div class="review-card review-total-card">
        <h4>Resumo dos Valores</h4>
        <div class="summary-row">
          <span>Subtotal dos produtos</span>
          <strong>${formatBRL(totals.productsSubtotalCents)}</strong>
        </div>
        <div class="summary-row">
          <span>Subtotal dos adicionais</span>
          <strong>${formatBRL(totals.addonsSubtotalCents)}</strong>
        </div>
        <div class="summary-row summary-note">
          <span>Taxa de entrega</span>
          <span>Taxa de entrega a confirmar pelo WhatsApp.</span>
        </div>
        <div class="summary-row summary-total">
          <span>Total dos produtos e adicionais</span>
          <strong>${formatBRL(totals.grandTotalCents)}</strong>
        </div>
      </div>
    `;
  }

  function buildWhatsAppMessage() {
    const d = state.deliveryData;
    const totals = calculateCartTotals();

    const lines = [];
    lines.push('Olá, Topps Burguer! Gostaria de fazer um pedido.');
    lines.push('');
    lines.push('*MEU PEDIDO*');
    lines.push('');
    lines.push(`*Cliente:* ${d.name}.`);
    if (d.phone) {
      lines.push(`*Telefone:* ${d.phone}.`);
    }
    lines.push('');
    lines.push('*ENDEREÇO DE ENTREGA*');
    lines.push(`CEP: ${d.cep}.`);
    lines.push(`Cidade: ${d.city}.`);
    lines.push(`Bairro: ${d.neighborhood}.`);
    lines.push(`Rua: ${d.street}.`);
    lines.push(`Número: ${d.number}.`);
    if (d.complement) {
      lines.push(`Complemento: ${d.complement}.`);
    }
    lines.push(`Referência: ${d.reference}.`);
    lines.push('');
    lines.push('*PRODUTOS*');

    const addonLines = [];

    state.cart.forEach((item) => {
      if (item.category === 'acrescimos') {
        addonLines.push(
          `${item.quantity}x ${item.name} (avulso) — ${formatBRL(item.basePriceCents * item.quantity)}.`
        );
      } else {
        const prodLineTotal = item.basePriceCents * item.quantity;
        const unitInfo = item.quantity > 1 ? ` (unid. ${formatBRL(item.basePriceCents)})` : '';
        const hasAddons = item.addons && item.addons.length > 0;
        const addonSummaryInline = hasAddons
          ? ` [c/ ${item.addons.map((a) => `${a.qty}x ${a.name}`).join(', ')}]`
          : '';

        lines.push(`${item.quantity}x ${item.name}${addonSummaryInline}${unitInfo} — ${formatBRL(prodLineTotal)}.`);

        if (hasAddons) {
          item.addons.forEach((addon) => {
            const totalAddonQty = addon.qty * item.quantity;
            const totalAddonCents = addon.priceCents * totalAddonQty;
            addonLines.push(
              `${totalAddonQty}x ${addon.name} (no ${item.name}) — ${formatBRL(totalAddonCents)}.`
            );
          });
        }
      }
    });

    if (addonLines.length > 0) {
      lines.push('');
      lines.push('*ADICIONAIS*');
      addonLines.forEach((l) => lines.push(l));
    }

    if (d.notes) {
      lines.push('');
      lines.push('*OBSERVAÇÕES*');
      lines.push(d.notes);
    }

    lines.push('');
    lines.push('*RESUMO DO PEDIDO*');
    lines.push(`Subtotal dos produtos: ${formatBRL(totals.productsSubtotalCents)}.`);
    lines.push(`Subtotal dos adicionais: ${formatBRL(totals.addonsSubtotalCents)}.`);
    lines.push('Taxa de entrega: A confirmar pelo WhatsApp.');
    lines.push('');
    lines.push(`*TOTAL DOS PRODUTOS E ADICIONAIS: ${formatBRL(totals.grandTotalCents)}.*`);
    lines.push('');
    lines.push('Aguardo a confirmação do pedido. Obrigado!');

    return lines.join('\n');
  }

  function handleConfirmWhatsapp() {
    if (state.cart.length === 0) {
      showToast('Sua sacola está vazia.');
      setCheckoutStep(1);
      return;
    }

    if (!validateDeliveryForm(state.deliveryData)) {
      setCheckoutStep(2);
      return;
    }

    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    document.getElementById('whatsappSentNotice').hidden = false;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /* =======================================================
     MÁSCARAS DE INPUT E ANIMAÇÕES DE ROLAGEM
     ======================================================= */
  function setupInputMasks() {
    const cepInput = document.getElementById('addressCep');
    cepInput.addEventListener('input', (e) => {
      let digits = e.target.value.replace(/\D/g, '').slice(0, 8);
      if (digits.length > 5) {
        digits = `${digits.slice(0, 5)}-${digits.slice(5)}`;
      }
      e.target.value = digits;
    });

    const phoneInput = document.getElementById('customerPhone');
    phoneInput.addEventListener('input', (e) => {
      let digits = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (digits.length > 10) {
        digits = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      } else if (digits.length > 6) {
        digits = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else if (digits.length > 2) {
        digits = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
      }
      e.target.value = digits;
    });
  }

  function setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* =======================================================
     EVENTOS E INICIALIZAÇÃO
     ======================================================= */
  function bindEvents() {
    // Menu Mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });

    // Filtros e busca do cardápio
    document.querySelector('.category-tabs').addEventListener('click', (e) => {
      const tab = e.target.closest('.category-tab');
      if (!tab) return;
      state.activeCategory = tab.dataset.category;
      document.querySelectorAll('.category-tab').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });
      renderMenu();
    });

    document.getElementById('menuSearchInput').addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenu();
    });

    // Clique em produtos do cardápio
    document.getElementById('menuContainer').addEventListener('click', (e) => {
      const btn = e.target.closest('.add-product-btn');
      if (!btn) return;
      handleDirectProductClick(btn.dataset.productId);
    });

    // Modal de adicionais
    document.getElementById('closeAddonModalBtn').addEventListener('click', closeAddonModal);
    document.getElementById('addonModal').addEventListener('click', (e) => {
      if (e.target.id === 'addonModal') closeAddonModal();
    });

    document.getElementById('addonsPickerList').addEventListener('click', (e) => {
      const btn = e.target.closest('.addon-qty-btn');
      if (!btn) return;
      const addonId = btn.dataset.addonId;
      const delta = Number(btn.dataset.delta);
      const current = state.modalAddons[addonId] || 0;
      state.modalAddons[addonId] = Math.max(0, current + delta);
      renderAddonsPicker();
      updateAddonModalTotal();
    });

    document.getElementById('modalQtyMinus').addEventListener('click', () => {
      state.modalQty = Math.max(1, state.modalQty - 1);
      document.getElementById('modalProductQty').textContent = String(state.modalQty);
      updateAddonModalTotal();
    });

    document.getElementById('modalQtyPlus').addEventListener('click', () => {
      state.modalQty += 1;
      document.getElementById('modalProductQty').textContent = String(state.modalQty);
      updateAddonModalTotal();
    });

    document.getElementById('confirmAddProductBtn').addEventListener('click', confirmModalProductToCart);

    // Modal de escolha para acréscimo avulso/vinculado
    document.getElementById('closeExtraChoiceBtn').addEventListener('click', () => {
      document.getElementById('extraChoiceModal').hidden = true;
    });

    document.getElementById('extraChoiceList').addEventListener('click', (e) => {
      const attachBtn = e.target.closest('.attach-extra-btn');
      if (attachBtn) {
        attachAddonToCartItem(attachBtn.dataset.cartUid, attachBtn.dataset.addonId);
        return;
      }

      const standaloneBtn = e.target.closest('.add-standalone-extra-btn');
      if (standaloneBtn) {
        const prod = MENU_PRODUCTS.find((p) => p.id === standaloneBtn.dataset.productId);
        if (prod) {
          addToCart(prod, 1, []);
          showToast(`Acréscimo ${prod.name} adicionado ao pedido!`);
        }
        document.getElementById('extraChoiceModal').hidden = true;
      }
    });

    // Abrir / Fechar Gaveta do Carrinho
    document.getElementById('openCartBtn').addEventListener('click', () => openCartDrawer(1));
    document.getElementById('mobileCartBarBtn').addEventListener('click', () => openCartDrawer(1));
    document.getElementById('contactOpenCartBtn').addEventListener('click', () => openCartDrawer(1));
    document.getElementById('closeCartBtn').addEventListener('click', closeCartDrawer);

    document.getElementById('cartDrawerOverlay').addEventListener('click', (e) => {
      if (e.target.id === 'cartDrawerOverlay') closeCartDrawer();
    });

    document.getElementById('emptyGoToMenuBtn').addEventListener('click', () => {
      closeCartDrawer();
      document.getElementById('cardapio').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('continueShoppingBtn').addEventListener('click', closeCartDrawer);
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);

    // Ações dentro da lista do carrinho
    document.getElementById('cartItemsContainer').addEventListener('click', (e) => {
      const qtyBtn = e.target.closest('.cart-qty-btn');
      if (qtyBtn) {
        changeCartItemQuantity(qtyBtn.dataset.uid, Number(qtyBtn.dataset.delta));
        return;
      }

      const removeItemBtn = e.target.closest('.remove-item-btn');
      if (removeItemBtn) {
        removeCartItem(removeItemBtn.dataset.uid);
        return;
      }

      const removeAddonBtn = e.target.closest('.remove-addon-btn');
      if (removeAddonBtn) {
        removeAddonFromCartItem(removeAddonBtn.dataset.uid, removeAddonBtn.dataset.addonId);
      }
    });

    // Fluxo de Checkout
    document.getElementById('goToAddressBtn').addEventListener('click', () => {
      if (state.cart.length === 0) return;
      setCheckoutStep(2);
    });

    document.getElementById('backToCartBtn').addEventListener('click', () => setCheckoutStep(1));

    document.getElementById('deliveryForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = readDeliveryForm();
      saveDeliveryData(formData);
      if (validateDeliveryForm(formData)) {
        setCheckoutStep(3);
      }
    });

    document.getElementById('backToAddressBtn').addEventListener('click', () => setCheckoutStep(2));
    document.getElementById('reviewToCartBtn').addEventListener('click', () => setCheckoutStep(1));
    document.getElementById('confirmWhatsappBtn').addEventListener('click', handleConfirmWhatsapp);

    // Fechar modais/gaveta com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (!document.getElementById('addonModal').hidden) {
        closeAddonModal();
      } else if (!document.getElementById('extraChoiceModal').hidden) {
        document.getElementById('extraChoiceModal').hidden = true;
      } else if (!document.getElementById('cartDrawerOverlay').hidden) {
        closeCartDrawer();
      }
    });
  }

  function init() {
    document.getElementById('currentYear').textContent = String(new Date().getFullYear());
    renderMenu();
    updateCartUI();
    setupInputMasks();
    setupScrollReveal();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
