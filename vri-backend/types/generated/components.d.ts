import type { Schema, Struct } from '@strapi/strapi';

export interface CompartidoDocumento extends Struct.ComponentSchema {
  collectionName: 'components_compartido_documentos';
  info: {
    displayName: 'Documento con Titulo';
    icon: 'file-pdf';
  };
  attributes: {
    archivo: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    nombre: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'compartido.documento': CompartidoDocumento;
    }
  }
}
