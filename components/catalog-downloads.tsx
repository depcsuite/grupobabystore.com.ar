"use client";

import { FileSpreadsheet, FileText } from "lucide-react";

type CatalogProduct = {
  id: string;
  category: string;
  brand: string;
  name: string;
  code: string;
};

type CatalogDownloadsProps = {
  canViewPrices: boolean;
  onDownloadPriceList: () => void;
};

type CatalogPrintDocumentProps = {
  products: CatalogProduct[];
};

function getProductsByCategory(products: CatalogProduct[]) {
  return products.reduce<Record<string, CatalogProduct[]>>((groups, product) => {
    const category = product.category || "Otros";
    groups[category] ??= [];
    groups[category].push(product);
    return groups;
  }, {});
}

function getProductCountLabel(count: number) {
  return `${count} ${count === 1 ? "producto" : "productos"}`;
}

export function CatalogDownloadOptions({
  canViewPrices,
  onDownloadPriceList,
}: CatalogDownloadsProps) {
  return (
    <div
      className="catalog-download-actions"
      role="group"
      aria-label="Descargas del catálogo"
    >
      <button
        className="catalog-download-action catalog-download-action-pdf"
        type="button"
        onClick={() => window.print()}
        aria-label="Abrir el catálogo digital para guardarlo o imprimirlo como PDF"
      >
        <FileText size={16} aria-hidden="true" />
        <span>Catálogo digital</span>
      </button>

      {canViewPrices ? (
        <button
          className="catalog-download-action catalog-download-action-excel"
          type="button"
          onClick={onDownloadPriceList}
          aria-label="Abrir la lista de precios"
        >
          <FileSpreadsheet size={16} aria-hidden="true" />
          <span>Lista de precios</span>
        </button>
      ) : (
        <a
          className="catalog-download-action catalog-download-action-excel"
          href="/iniciar-sesion"
          aria-label="Iniciá sesión para consultar la lista de precios"
          title="Iniciá sesión para consultar la lista de precios"
        >
          <FileSpreadsheet size={16} aria-hidden="true" />
          <span>Lista de precios</span>
        </a>
      )}
    </div>
  );
}

export function CatalogPrintDocument({
  products,
}: CatalogPrintDocumentProps) {
  const productGroups = getProductsByCategory(products);

  return (
    <section className="catalog-print-document" aria-label="Catálogo digital">
      <header className="catalog-print-header">
        <span className="catalog-print-brand">Grupo Baby Store</span>
        <div className="catalog-print-header-row">
          <div>
            <p className="catalog-print-kicker">CATÁLOGO MAYORISTA</p>
            <h1>Catálogo digital</h1>
            <p className="catalog-print-summary">Todos los productos del catálogo, sin precios.</p>
          </div>
          <span className="catalog-print-count">
            {getProductCountLabel(products.length)}
          </span>
        </div>
      </header>

      <div className="catalog-print-groups">
        {Object.entries(productGroups).map(([category, categoryProducts]) => (
          <section className="catalog-print-group" key={category}>
            <h2>{category}</h2>
            <div className="catalog-print-grid">
              {categoryProducts.map((product) => (
                <article className="catalog-print-product" key={product.id}>
                  <p className="catalog-print-product-brand">{product.brand}</p>
                  <h3>{product.name}</h3>
                  <p className="catalog-print-product-code">Código: {product.code}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="catalog-print-footer">
        Grupo Baby Store · Catálogo digital
      </footer>
    </section>
  );
}
