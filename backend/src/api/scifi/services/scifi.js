'use strict';

/**
 * scifi service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::scifi.scifi');
