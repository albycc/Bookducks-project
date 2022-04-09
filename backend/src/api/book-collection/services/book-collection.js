'use strict';

/**
 * book-collection service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-collection.book-collection');
