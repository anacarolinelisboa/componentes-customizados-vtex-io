import React from 'react';
import { SliderLayout } from "vtex.slider-layout"; // Importa o SliderLayout

export interface SliderImgsWithCaptionProps {
  items: SliderImgsWithCaptionPropsContent[];
  infinite?: boolean;
  numDesktop?: boolean;
  numTablet?: boolean;
  numPhone?: boolean;
  itemsPerPage?: itemsPerPageProps;
  showNavigationArrows?: "mobileOnly" | "desktopOnly" | "always" | "never";
  showPaginationDots?: "mobileOnly" | "desktopOnly" | "always" | "never";
  autoplay?: autoplayProps;
  slideTransition?: slideTransitionProps;
}

interface SliderImgsWithCaptionPropsContent { 
  image: string
  alt?: string
  link?: string
  openInNewTab?: boolean
  text?: string
  tagText?: keyof JSX.IntrinsicElements // Definir o tipo do tagText de acordo com os elementos HTML válidos
  width?: number
  height?: number
  loading?: "eager" | "lazy" 
} 
interface slideTransitionProps { 
  speed?: number
  delay?: number
  timing?: string 
}
interface autoplayProps { 
  timeout?: number
  stopOnHover?: boolean
}
interface itemsPerPageProps { 
  desktop?: number
  tablet?: number
  phone?: number
}

export default function SliderImgsWithCaption({ items, itemsPerPage, slideTransition, autoplay, infinite, showNavigationArrows, showPaginationDots }: SliderImgsWithCaptionProps) {
  if (!items || items.length === 0) {
    return null; 
  }
  return (
    <>
      <SliderLayout
        itemsPerPage={{
          desktop: itemsPerPage?.desktop || 5,
          tablet: itemsPerPage?.tablet || 3,
          phone: itemsPerPage?.phone || 1,
        }}
        slideTransition={{
          speed: slideTransition?.speed || 0,
          delay: slideTransition?.delay || 0,
          timing: slideTransition?.timing || '',
        }}
        autoplay={
          autoplay?.timeout !== undefined
            ? {
                timeout: autoplay.timeout,
                ...(autoplay.stopOnHover !== undefined && { stopOnHover: autoplay.stopOnHover }),
              }
            : undefined
        }     
        infinite={infinite || false}
        showNavigationArrows={showNavigationArrows || "always"}
        showPaginationDots={showPaginationDots || "never"}
        fullWidth
      >
        {items.map((item, index) => {
          const Tag = item.tagText || 'h2'  // Se não houver tagText, usa h2 por padrão
          const content = (
            <>
              <img 
                src={item.image}
                width={item.width || "auto"}
                height={item.height || "auto"}
                loading={item.loading || "eager"}
                alt={item.alt || item.text || ""}
                className="vtex-image-and-text-0-x-image" 
              />
              <div className="vtex-image-and-text-0-x-gradient"></div>
              {item.text && <Tag className="vtex-image-and-text-0-x-text">{item.text}</Tag>}
            </>
          )

          // Se houver link, envolver o conteúdo no <a>
          return (
            <div key={index} className="vtex-image-and-text-0-x-block">
              {item.link ? (
                <a 
                  href={item.link} 
                  target={item.openInNewTab ? "_blank" : "_self"} 
                  rel={item.openInNewTab ? "noopener noreferrer" : ""}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          )
        })}
      </SliderLayout>
    </>
  )
}

SliderImgsWithCaption.schema = {
  title: 'Slider de Imagem e texto',
  description: 'Componente que exibe uma lista de itens com imagem e texto em slide',
  type: 'object',
  properties: {
    items: {
      type: 'array',
      title: 'Itens de Imagem e Texto',
      items: {
        type: 'object',
        title: 'Item',
        properties: {
          image: {
            title: 'Imagem',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          alt: {
            title: 'Texto alternativo (alt)',
            type: 'string',
            default: '',
          },
          link: {
            title: 'Link',
            type: 'string',
            default: '',
          },
          openInNewTab: {
            title: 'Abrir em nova aba?',
            type: 'boolean',
            default: false,
          },
          text: {
            title: 'Texto',
            type: 'string',
            default: '',
          },
          tagText: {
            title: 'Tag do Texto',
            type: 'string',
            enum: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
            enumNames: ['Título H2', 'Título H3', 'Título H4', 'Título H5', 'Título H6', 'Parágrafo'],
            widget: { 'ui:widget': 'select' },
          },
          width: {
            title: 'Largura da Imagem',
            type: 'number',
            default: null,
          },
          height: {
            title: 'Altura da Imagem',
            type: 'number',
            default: null,
          },
          loading: {
            title: 'Carregamento da Imagem',
            type: 'string',
            enum: ['eager', 'lazy'],
            enumNames: ['Carregamento Imediato', 'Carregamento Lento'],
            default: 'eager',
          }
        },
      },
    },
    itemsPerPage: {
      title: 'Configuração de Itens por Página',
      type: 'object',
      properties: {
        desktop: { title: 'Itens por Página - Desktop', type: 'number' },
        tablet: { title: 'Itens por Página - Tablet', type: 'number' },
        phone: { title: 'Itens por Página - Celular', type: 'number' }
      }
    },
    slideTransition: {
      title: 'Configuração de Transição do Slide',
      type: 'object',
      properties: {
        speed: { title: 'Velocidade', type: 'number' },
        delay: { title: 'Atraso', type: 'number' },
        timing: { title: 'Timing', type: 'string' }
      }
    },
    autoplay: {
      title: 'Configurações de Autoplay',
      type: 'object',
      properties: {
        timeout: { title: 'Intervalo de Tempo', type: 'number' },
        stopOnHover: { title: 'Parar ao passar o mouse', type: 'boolean' }
      }
    },
    infinite: {
      title: 'Infinito',
      type: 'boolean',
      default: false
    },
    showNavigationArrows: {
      title: 'Exibir Setas de Navegação',
      type: 'string',
      enum: ['mobileOnly', 'desktopOnly', 'always', 'never'],
      enumNames: ['Apenas Mobile', 'Apenas Desktop', 'Sempre', 'Nunca'],
      default: 'always'
    },
    showPaginationDots: {
      title: 'Exibir Pontos de Paginação',
      type: 'string',
      enum: ['mobileOnly', 'desktopOnly', 'always', 'never'],
      enumNames: ['Apenas Mobile', 'Apenas Desktop', 'Sempre', 'Nunca'],
      default: 'never'
    }
  },
}
