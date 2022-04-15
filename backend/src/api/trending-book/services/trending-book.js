'use strict';

/**
 * trending-book service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::trending-book.trending-book');
