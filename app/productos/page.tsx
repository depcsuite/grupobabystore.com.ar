"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowRight,
  ChevronLeft,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useCart } from "@/components/cart-context";
import { useAuthSession } from "@/components/auth-session-sync";
import { AccountMenu } from "@/components/account-menu";
import { SiteFooter } from "@/components/site-footer";
import { PromoTopbar } from "@/components/promo-topbar";

const products = [
  {
    id: "nutrilon-1-brick",
    category: "Leches Infantiles",
    brand: "Nutrilon",
    name: "Nutrilon Profutura 1 Brick x 200 ml",
    code: "AA NUT 1 BRICK PR",
    price: 1808,
    originalPrice: 2232,
    packItems: 4,
  },
  {
    id: "nutrilon-1-tarro",
    category: "Leches Infantiles",
    brand: "Nutrilon",
    name: "Nutrilon Profutura 1 Tarro x 800 g",
    code: "AA NUT 1 TARRO PR",
    price: 35855,
    originalPrice: 44266,
  },
  {
    id: "nutrilon-1-pack",
    category: "Leches Infantiles",
    brand: "Nutrilon",
    name: "Nutrilon Profutura 1 Pack x 1,2 kg",
    code: "AA NUT 1 POUCH PR",
    price: 46161,
    originalPrice: 56989,
    packItems: 6,
  },
  {
    id: "nutrilon-2-brick",
    category: "Leches Infantiles",
    brand: "Nutrilon",
    name: "Nutrilon Profutura 2 Brick x 200 ml",
    code: "AA NUT 2 BRICK PR",
    price: 1720,
    originalPrice: 2123,
  },
  {
    id: "vital-4",
    category: "Leches Infantiles",
    brand: "Vital",
    name: "Vital 4 Fórmula infantil",
    code: "AA VIT 4 TARRO",
    price: 24000,
  },
  {
    id: "nan-1",
    category: "Leches Infantiles",
    brand: "NAN",
    name: "NAN Expert Pro 1 Fórmula infantil",
    code: "AA NAN 1 TARRO",
    price: 29500,
  },
];
const money = (value: number) => `$${value.toLocaleString("es-AR")}`;
type FilterGroup = {
  name: string;
  items: string[];
  brand: string;
};

const brandSubitems: Record<string, string[]> = {
  Nutrilon: ["Etapa 1", "Etapa 2", "Etapa 3", "Etapa 4"],
  Vital: ["Etapa 1", "Etapa 2", "Etapa 3", "Etapa 4"],
  "La Serenísima Baby": ["Etapa 1", "Etapa 2", "Etapa 3"],
  Sancor: ["Etapa 1", "Etapa 2", "Etapa 3"],
  NAN: ["Etapa 1", "Etapa 2", "Etapa 3", "Expert Pro Medicamentosa"],
  Nidina: ["Etapa 1", "Etapa 2", "Etapa 3"],
  Nido: ["Etapa 3", "Etapa 4", "FortiGrow"],
  Avent: ["Promociones", "Eléctricos", "Accesorios para lactancia", "Mamaderas y tetinas", "Chupetes", "Vasos"],
  NUK: ["Combos", "Peppa Pig", "Promociones", "Disney", "Accesorios", "Eléctricos", "Alimentación", "Accesorios para lactancia", "Chupetes", "Cuidado Bucal", "Mamaderas", "Tetinas", "Vasos", "Repuestos"],
  Lansinoh: ["Promociones", "Cuidar", "Extraer", "Guardar", "Alimentar", "Postparto", "Repuestos"],
  Chicco: ["Promociones", "Perfumería - Chicco POP", "Silicona", "Antimosquitos", "Accesorios", "Lactancia", "Mamaderas y tetinas", "Chupetes", "Mordillos", "Vasos", "Alimentación", "Higiene", "Higiene Bucal", "Luz de Noche"],
  Nuby: ["Promociones", "Lactancia", "Mamaderas", "Tetinas", "Alimentación", "Higiene", "Juguetes", "Mordillos", "Chupetes", "Vasos"],
  Bbox: ["Promociones", "Mordillos y Chupetes p/ Fruta", "Accesorios", "Vasos", "Alimentación", "Termos", "Higiene", "Repuestos"],
  Suavinex: ["Promociones", "Colección Zero.Zero", "Repuestos", "Colección Colour Essence", "Colección Prints", "Colección Night & Day", "Colección Wonderland", "Accesorios", "Tetinas para Colour Essence, Prints y Wonderland"],
  Bibs: ["Portachupetes", "Mamaderas con tetina de silicona", "Mamaderas con tetina de caucho", "Tetinas", "Mordillos", "Chupetes"],
  Lillo: ["Mamaderas", "Tetinas", "Chupetes", "Vasos"],
  Polymem: ["Nursimom", "Accesorios", "Fajas", "Fulares", "Mochilas"],
  "Nursimom Baby": ["Accesorios para Chupete", "Alimentadores de Fruta", "Almacenamiento de Alimentos", "Higiene", "Juguetes", "Lactancia", "Mordillos", "Vajilla y Cubiertos"],
  Dema: ["Faja Post Parto", "Faja Pre Parto"],
  "Baby Innovation": ["Promociones", "Accesorios", "Accesorios para Chupetes", "Chupete Inicial", "Chupete Premium", "Chupete Ortodóntico", "Chupete Fisiológico", "Mordillos", "Alimentación", "Vasos", "Baño", "Higiene Bucal", "Higiene de Manos", "Higiene de Nariz", "Higiene del Pelo", "Paseo", "Puertas de Seguridad", "Seguridad", "Varios"],
  Loopi: ["Promociones", "Loopi"],
  Punti: ["Alimentación", "Baberos", "Seguridad", "Butacas para Auto", "Bañeras", "Pelelas y Reductores", "Sillas de Comer", "Cambiadores", "Catre de Baño"],
  Ingenuity: [],
  "Bright Starts": [],
  "Baby Einstein": [],
  Bubba: [],
  Contigo: [],
  Termy: ["Mates", "Termos", "Viandas"],
  Minikoioi: ["Puzzle", "Bowly", "Flexi Bibs", "Scoops", "Mini cup", "Flexi Straws", "Pulps", "Icy Pops"],
  Tatoon: [],
  Tramontina: ["Línea Baby Friends", "Línea Le Petit", "Línea Lellos", "Línea Monster Baby"],
  "Baby Safe": [],
  "OK Baby": ["Alfombras Antigolpes", "Promos Alfombras Antigolpe", "Bañeras y reductores", "Pelelas", "Sillas de comer", "Butacas"],
  "A Wish": ["Novedades", "Bolsas de Dormir", "Red de Baño", "Luncheras", "Sábanas", "Protectores", "Acolchados", "Chichoneras", "Mantas", "Almohadón y Nidos", "Fulares Elásticos", "Fulares Pre-Armados", "Cambiadores", "Baberos y Babitas", "Muñecos de Apego", "Toallas y toallones", "Accesorios"],
  "Floating Baby": [],
  "Min Renée": ["Baberos", "Babitas", "Blanquería", "Sets"],
  "Poco Piano": [],
  "Woody Toys": ["Gimnasios y Barrales", "Móviles", "Cuneros", "Libros", "Sonajeros", "Portachupete", "Peluche"],
  "Soft Blocks": [],
  "J'adore": ["Colgantes y Sonajeros", "Baño", "Pelotas y Animales", "Apilables y Encastres", "Sets"],
  "Baby Favorite": [],
  "Little Learner": [],
  "Baby Sunki": [],
  Vtech: ["Primera Infancia"],
  "5 Sentidos": ["Doypack Económico", "Agua", "Bebés", "Didácticos"],
  Bimbi: [],
  Duravit: ["Patapata", "Didácticos Primera Infancia", "Hogar", "Masas", "Blocks", "Rodados Minis", "Rodados Chicos", "Rodados Medianos", "Rodados Grandes", "Estaciones de servicio", "Juegos", "Playa"],
  Rondi: ["Baldes de Juego", "Transportes y Camiones", "Bebé", "Andadores", "Triciclos", "Cocinas", "Estaciones de Servicio y Garages", "Juegos de Rol", "Outdoor", "Metegoles y Flippers"],
  Juliana: ["Juliana Valija Chica", "Juliana Valija Grande"],
  "Phi Phi Toys": ["Puzzles", "Encastres"],
  Bestway: ["Licencias", "Botes y Asientos", "Salvavidas", "Antiparras", "Accesorios Natación"],
};

const categoryFilters = [
  "Leches Infantiles",
  "Puericultura Liviana",
  "Juguetes",
  "Hidratación",
];

const filterGroups: FilterGroup[] = Object.entries(brandSubitems).map(
  ([brand, subitems]) => ({ name: brand, items: subitems, brand }),
);
function ProductosContent() {
  const { isLoggedIn, isReady: authChecked } = useAuthSession();
  const searchParams = useSearchParams();
  const { items, addItem, updateQuantity, removeItem, subtotal, count } =
    useCart();
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filterOptionQuery, setFilterOptionQuery] = useState("");
  useEffect(() => {
    setSelectedBrand(searchParams.get("marca") ?? "");
    setSelectedCategory(searchParams.get("categoria") ?? "");
  }, [searchParams]);
  const [openFilterGroups, setOpenFilterGroups] = useState<string[]>([
    filterGroups[0].name,
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [promoIndex, setPromoIndex] = useState(0);
  const promoMessages = [
    "Hacé tu pedido y retiralo o recibilo en el mismo día",
    "¡Nuevos ingresos! Mamaderas, tetines y chupetes",
    "Hasta 50% OFF en promociones",
  ];
  const visiblePromoMessages = isLoggedIn
    ? promoMessages
    : promoMessages.slice(1);
  useEffect(() => {
    setPromoIndex(0);
    const timer = window.setInterval(
      () =>
        setPromoIndex((current) => (current + 1) % visiblePromoMessages.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, [isLoggedIn, visiblePromoMessages.length]);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [selectedPriceBrands, setSelectedPriceBrands] = useState<string[]>([]);
  const [noveltyIndex, setNoveltyIndex] = useState(0);
  const [quantityErrors, setQuantityErrors] = useState<Record<string, string>>({});
  const brands = Array.from(
    new Set(filterGroups.flatMap((group) => group.items)),
  );
  const handleAddToCart = (product: (typeof products)[number]) => {
    addItem(product);
    setCartOpen(false);
    setCartPulse(true);
    window.setTimeout(() => setCartPulse(false), 650);
  };
  const downloadPriceList = () => {
    const exportProducts = selectedPriceBrands.length
      ? products.filter((product) =>
          selectedPriceBrands.includes(product.brand),
        )
      : products;
    const rows = exportProducts
      .map(
        (product) =>
          `<tr><td>${product.brand}</td><td>${product.name}</td><td>${product.code}</td><td>${product.price}</td><td>${product.originalPrice ?? ""}</td></tr>`,
      )
      .join("");
    const blob = new Blob(
      [
        `<table><tr><th>Marca</th><th>Producto</th><th>Código</th><th>Precio sin IVA</th><th>Precio anterior</th></tr>${rows}</table>`,
      ],
      { type: "application/vnd.ms-excel" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lista-de-precios-grupo-baby-store.xls";
    link.click();
    URL.revokeObjectURL(url);
  };
  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          `${product.name} ${product.code}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (!selectedBrand ||
            product.brand.toLowerCase() === selectedBrand.toLowerCase()) &&
          (!selectedCategory ||
            product.category
              .toLowerCase()
              .includes(selectedCategory.toLowerCase()) ||
            product.name
              .toLowerCase()
              .includes(selectedCategory.toLowerCase())),
      ),
    [query, selectedBrand, selectedCategory],
  );
  const incomingProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.category
            .toLowerCase()
            .includes(selectedCategory.toLowerCase()) ||
          product.name.toLowerCase().includes(selectedCategory.toLowerCase()),
      )
    : products;
  const incomingMaxIndex = Math.max(0, incomingProducts.length - 3);
  useEffect(() => {
    setNoveltyIndex(0);
  }, [selectedCategory]);
  if (!authChecked)
    return <main className="site-shell catalog-shell" aria-busy="true" />;
  return (
    <main
      className={`site-shell catalog-shell ${isLoggedIn ? "is-logged-in" : "is-guest"}`}
    >
      <PromoTopbar />
      <header className="site-header catalog-site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="Grupo Baby Store inicio">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg"
              alt="Grupo Baby Store"
            />
          </a>
          <nav className="main-nav" aria-label="Navegación principal">
            <a href="/">Inicio</a>
            <a className="active" href="/productos">
              Productos
            </a>
            <a href="/nosotros">Nosotros</a>
            <a href="/como-comprar">Cómo comprar</a>
            <a href="/contacto">Contacto</a>
          </nav>
          <div className="header-actions">
            <AccountMenu />
            <button
              className="icon-button"
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-row catalog-header-search">
            <Search size={18} />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscá una marca o producto"
              aria-label="Buscar una marca o producto"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Cerrar búsqueda"
            >
              ×
            </button>
          </div>
        )}
      </header>
      <section className="product-category-cloud" aria-labelledby="product-category-cloud-title">
        <div className="product-category-cloud-heading">
          <div>
            <span className="eyebrow">EXPLORÁ POR CATEGORÍA</span>
            <h2 id="product-category-cloud-title">Encontrá lo que buscás</h2>
          </div>
          {(selectedBrand || selectedCategory) && (
            <button
              className="filter-clear"
              type="button"
              onClick={() => {
                setSelectedBrand("");
                setSelectedCategory("");
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
        <div className="product-category-cloud-list" role="list">
          {categoryFilters.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <a
                className={isSelected ? "is-active" : ""}
                href={`/productos?categoria=${encodeURIComponent(category)}`}
                key={category}
                role="listitem"
                aria-current={isSelected ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setSelectedCategory(isSelected ? "" : category);
                  setSelectedBrand("");
                }}
              >
                {category}
              </a>
            );
          })}
        </div>
      </section>
      <section className="wholesale-catalog">
        <div className="wholesale-sidebar-stack">
          {isLoggedIn && (
            <a className="express-catalog-note" href="/envio-express">
              <img src="/logo-express.svg" alt="Express" />
              <div>
                <strong>Envíos y retiros express</strong>
                <span>
                  Hacé tu pedido antes de las 12 hs y recibilo o retiralo en el
                  día.
                </span>
                <b>
                  Ver condiciones <ArrowRight size={13} />
                </b>
              </div>
            </a>
          )}
          <aside className="wholesale-sidebar">
          <div className="eyebrow">CATÁLOGO MAYORISTA</div>
          <div className="catalog-filter-panel">
            <label className="quick-filter">
              <Search size={14} />
              <input
                value={filterOptionQuery}
                onChange={(event) => setFilterOptionQuery(event.target.value)}
                placeholder="Buscar en filtros"
                aria-label="Buscar entre las opciones de filtros"
              />
              {filterOptionQuery && (
                <button
                  type="button"
                  onClick={() => setFilterOptionQuery("")}
                  aria-label="Limpiar búsqueda de filtros"
                >
                  ×
                </button>
              )}
            </label>
            {(selectedBrand || selectedCategory) && (
              <button
                className="filter-clear"
                type="button"
                onClick={() => {
                  setSelectedBrand("");
                  setSelectedCategory("");
                }}
              >
                Limpiar filtros
              </button>
            )}
            {filterGroups.map((group) => {
              const isOpen = openFilterGroups.includes(group.name);
              const isSelected = selectedBrand === group.brand;
              const brandCount = products.filter(
                (product) => product.brand.toLowerCase() === group.brand.toLowerCase(),
              ).length;
              const visibleItems = group.items.filter((item) =>
                item.toLowerCase().includes(filterOptionQuery.toLowerCase()),
              );
              return (
                <section className="filter-group" key={group.name}>
                  <button
                    className={`filter-group-heading ${isSelected ? "selected" : ""}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedBrand(isSelected ? "" : group.brand);
                      setSelectedCategory("");
                      setOpenFilterGroups(
                        isOpen
                          ? openFilterGroups.filter((name) => name !== group.name)
                          : [...openFilterGroups, group.name],
                      );
                    }}
                  >
                    <span>{group.brand}</span>
                    <small>{brandCount}</small>
                    <b>{isOpen ? "−" : "+"}</b>
                  </button>
                  {isOpen && visibleItems.length > 0 && (
                    <ul className="filter-sublist">
                      {visibleItems.map((item) => (
                        <li key={`${group.brand}-${item}`}>
                          <a
                            href={`/productos?marca=${encodeURIComponent(group.brand)}`}
                            onClick={() => {
                              setSelectedBrand(group.brand);
                              setSelectedCategory("");
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </aside>
        </div>
        <div className="wholesale-results">
          <div className="catalog-toolbar">
            <div className="catalog-search-row">
              <div className="catalog-search-field">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar por nombre o código"
                  aria-label="Buscar por nombre o código"
                />
              </div>
              <label className="catalog-brand-select">
                <span className="sr-only">Buscar por marca</span>
                <select
                  value={selectedBrand}
                  onChange={(event) => setSelectedBrand(event.target.value)}
                  aria-label="Buscar por marca"
                >
                  <option value="">Todas las marcas</option>
                  {[...new Set(products.map((product) => product.brand))].sort().map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </label>
              <div className="catalog-tools">
                <span>{filtered.length} productos</span>
                <button
                  type="button"
                  className="price-list-download"
                  onClick={() => setPriceModalOpen(true)}
                >
                  <ArrowDownToLine size={17} aria-hidden="true" />
                  <span>Descargar lista de precios</span>
                  <span className="excel-brand-icon" aria-hidden="true">
                    XLS
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="catalog-columns">
            <span>Producto</span>
            {isLoggedIn ? (
              <>
                <span>Valor unitario</span>
  <span>Cant x bulto</span>
  <span>Cantidad</span>
                <span>Total ítem</span>
              </>
            ) : (
              <span>Acceso</span>
            )}
          </div>
          <section
            className="stage-group catalog-product-list"
            aria-label="Listado de productos"
          >
            {filtered.length === 0 ? (
              <p className="catalog-empty">
                No encontramos productos para tu búsqueda.
              </p>
            ) : (
              filtered.map((product) => {
                const quantity =
                  items.find((item) => item.id === product.id)?.quantity || 0;
                return (
                  <article className="wholesale-product" key={product.id}>
                    <a
                      href="/productos/nutrilon-pro-futura-1"
                      className="wholesale-product-image"
                      aria-label={`Ver ${product.name}`}
                    >
                      <img src="/hero-nutrilon-1.jpg" alt="" />
                    </a>
                    <div className="wholesale-product-info">
                      {product.originalPrice && (
                        <span className="promo-badge">PROMO</span>
                      )}
                      <h3>
                        <a href="/productos/nutrilon-pro-futura-1">
                          {product.name}
                        </a>
                      </h3>
                      <p>{product.category}</p>
                      <p className="product-code-line">
                        Código: <strong>{product.code}</strong>
                      </p>
                    </div>
                    <div
                      className={
                        product.originalPrice
                          ? "unit-price has-promo"
                          : "unit-price"
                      }
                    >
                      {product.originalPrice && (
                        <del>{money(product.originalPrice)}</del>
                      )}
                      {money(product.price)}
                      <small>+ IVA</small>
                    </div>
                    {isLoggedIn && (
                      <div className="product-pack-column">
                        <span
                          className="product-pack-value"
                          aria-label={`Cantidad por bulto de ${product.name}`}
                        >
                          {product.packItems ?? 1}
                        </span>
                      </div>
                    )}
                    {isLoggedIn && (
                      <div className="product-quantity-column">
                        <div className="quantity-stepper">
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.id,
                                quantity - (product.packItems ?? 1),
                              )
                            }
                            disabled={!quantity}
                            aria-label={`Quitar ${product.name}`}
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            className="product-quantity-input"
                            type="text"
                            inputMode="numeric"
                            min="0"
                            step={product.packItems ?? 1}
                            value={quantity || ""}
                            onChange={(event) => {
                              const rawValue = event.target.value;
                              const nextQuantity = Number(rawValue);
                              const packSize = product.packItems ?? 1;
                              if (rawValue === "") {
                                setQuantityErrors((current) => ({
                                  ...current,
                                  [product.id]: "",
                                }));
                                updateQuantity(product.id, 0);
                                return;
                              }
                              if (!Number.isInteger(nextQuantity) || nextQuantity < 0) {
                                setQuantityErrors((current) => ({
                                  ...current,
                                  [product.id]: "Ingresá una cantidad válida.",
                                }));
                                return;
                              }
                              if (nextQuantity > 0 && nextQuantity % packSize !== 0) {
                                setQuantityErrors((current) => ({
                                  ...current,
                                  [product.id]: `Debe ser múltiplo de ${packSize}.`,
                                }));
                                return;
                              }
                              setQuantityErrors((current) => ({
                                ...current,
                                [product.id]: "",
                              }));
                              updateQuantity(product.id, nextQuantity);
                            }}
                            aria-label={`Cantidad de ${product.name}`}
                          />
                          <button
                            onClick={() => {
                              setQuantityErrors((current) => ({
                                ...current,
                                [product.id]: "",
                              }));
                              handleAddToCart(product);
                            }}
                            aria-label={`Agregar ${product.name}`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        {quantityErrors[product.id] && (
                          <small className="quantity-validation-error" role="alert">
                            {quantityErrors[product.id]}
                          </small>
                        )}
                      </div>
                    )}
                    {isLoggedIn && (
                      <div className="item-total">
                        <strong>{money(product.price * quantity)}</strong>
                      </div>
                    )}
                    {!isLoggedIn && (
                      <div className="product-login-column">
                        <a
                          className="add-product-button product-login-link"
                          href="/iniciar-sesion"
                        >
                          Iniciar sesión
                        </a>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </section>
        </div>
      </section>
      <section className="catalog-novelties" aria-labelledby="novelties-title">
        <div className="catalog-novelties-head">
          <div>
            <span className="eyebrow">LO MÁS VENDIDO</span>
            {selectedCategory && (
              <small className="novelty-context">{selectedCategory}</small>
            )}
          </div>
          <div className="novelty-controls">
            <button
              type="button"
              onClick={() => setNoveltyIndex(Math.max(0, noveltyIndex - 1))}
              disabled={noveltyIndex === 0}
              aria-label="Ingreso anterior"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() =>
                setNoveltyIndex(Math.min(incomingMaxIndex, noveltyIndex + 1))
              }
              disabled={noveltyIndex >= incomingMaxIndex}
              aria-label="Ingreso siguiente"
            >
              ›
            </button>
          </div>
        </div>
        <div className="novelty-carousel">
          <div
            className="novelty-track"
            style={{
              transform: `translateX(calc(-${noveltyIndex} * (25% + 12px))`,
            }}
          >
            {incomingProducts.map((product) => (
              <article className="novelty-card" key={product.id}>
                <div className="novelty-image">
                  <span>NUEVO</span>
                  <a
                    className="novelty-product-link"
                    href="/productos/nutrilon-pro-futura-1"
                    aria-label={`Ver ${product.name}`}
                  >
                    <img src="/hero-nutrilon-1.jpg" alt={product.name} />
                  </a>
                </div>
                <div className="novelty-card-body">
                  <h2 className="novelty-product-title">
                    <a href="/productos/nutrilon-pro-futura-1">
                      {product.name}
                    </a>
                  </h2>
                  <small className="novelty-product-code">
                    Código: {product.code}
                  </small>
                  {product.packItems && (
                    <span className="pack-quantity">
                      Pack de {product.packItems} unidades
                    </span>
                  )}
                  <button
                    className="novelty-cart-button"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!isLoggedIn) {
                        window.location.href = "/iniciar-sesion";
                        return;
                      }
                      handleAddToCart(product);
                    }}
                  >
                    <ShoppingCart size={16} aria-hidden="true" />
                    {isLoggedIn ? "Agregar al carrito" : "Iniciar sesión"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter showContact={false} />
      {priceModalOpen && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setPriceModalOpen(false)}
        >
          <div
            className="price-export-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="price-export-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              onClick={() => setPriceModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <span className="eyebrow">LISTA DE PRECIOS</span>
            <h2 id="price-export-title">¿Qué marcas querés exportar?</h2>
            <p>
              Podés descargar la lista completa o seleccionar una o varias
              marcas. Todas las marcas disponibles aparecen en la lista.
            </p>
            <div className="price-brand-options">
              <label>
                <input
                  type="checkbox"
                  checked={selectedPriceBrands.length === 0}
                  onChange={() => setSelectedPriceBrands([])}
                />{" "}
                Todas las marcas
              </label>
              {brands.map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedPriceBrands.includes(brand)}
                    onChange={() =>
                      setSelectedPriceBrands((current) =>
                        current.includes(brand)
                          ? current.filter((item) => item !== brand)
                          : [...current, brand],
                      )
                    }
                  />{" "}
                  {brand}
                </label>
              ))}
            </div>
            <div className="price-export-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setPriceModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  downloadPriceList();
                  setPriceModalOpen(false);
                }}
              >
                <ArrowDownToLine size={16} /> Descargar lista
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className={`floating-cart-button${cartPulse ? " is-pulsing" : ""}`}
        type="button"
        onClick={() => setCartOpen(true)}
        aria-label={`Abrir carrito con ${count} productos`}
      >
        <ShoppingCart size={20} />
        <span>Carrito</span>
        {count > 0 && <b>{count}</b>}
      </button>
      <aside
        className={cartOpen ? "cart-sidebar is-open" : "cart-sidebar"}
        aria-label="Carrito de pedido"
      >
        <div className="cart-sidebar-head">
          <div>
            <span className="eyebrow">PEDIDO MAYORISTA</span>
            <h2>
              Tu carrito <small>Total: {count} ítems</small>
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>
        {items.length === 0 ? (
          <div className="cart-empty">
            <ShoppingCart size={30} />
            <p>Tu carrito está vacío.</p>
            <span>Agregá productos para comenzar tu pedido.</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src="/hero-nutrilon-1.jpg" alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.code}</small>
                    <div className="cart-item-controls">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity - (item.packItems ?? 1),
                          )
                        }
                        aria-label={`Disminuir cantidad de ${item.name}`}
                      >
                        <Minus size={12} />
                      </button>
                      <input
                        className="cart-quantity-input"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, Number(event.target.value) || 1),
                          )
                        }
                        aria-label={`Cantidad de ${item.name}`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.quantity + (item.packItems ?? 1),
                          )
                        }
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        className="cart-remove"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                  <b>{money(item.price * item.quantity)}</b>
                </div>
              ))}
            </div>
            <div className="cart-sidebar-total">
              <span>Subtotal sin IVA</span>
              <strong>{money(subtotal)}</strong>
                  <div className="cart-action-buttons">
                    <button
                      type="button"
                      className="cart-continue-button"
                      onClick={() => setCartOpen(false)}
                    >
                      Seguir comprando
                    </button>
                    <a href="/checkout" className="cart-checkout-button">
                      Finalizar pedido <ArrowRight size={16} />
                    </a>
                  </div>
            </div>
          </>
        )}
      </aside>
      {cartOpen && (
        <button
          className="cart-backdrop"
          onClick={() => setCartOpen(false)}
          aria-label="Cerrar carrito"
        />
      )}
    </main>
  );
}

export default function ProductosPage() {
  return (
    <Suspense
      fallback={<main className="site-shell catalog-shell" aria-busy="true" />}
    >
      <ProductosContent />
    </Suspense>
  );
}
