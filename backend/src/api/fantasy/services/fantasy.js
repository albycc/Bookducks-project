'use strict';

/**
 * fantasy service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fantasy.fantasy');
