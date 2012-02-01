/*!
 * Hypermodal/dev for Prototype.js
 *
 * Copyright (c) 2012 Yuki KAN
 * Licensed under the MIT-License.
 *
 * http://akkar.in/projects/hypermodal/
**/
var Hypermodal = Class.create({
	/**
	 * Constructor
	**/
	initialize: function _init(p) {
		this.modalID     = p.modalID     || null;
		this.modalClass  = p.modalClass  || 'hypermodal';
		this.modalWidth  = p.modalWidth  || 'auto';
		this.modalHeight = p.modalHeight || 'auto';
		this.modalStyle  = p.modalStyle  || {};
		this.title       = p.title       || p.subject || '';
		this.description = p.description || p.message || '';
		this.buttons     = p.buttons     || p.btns    || [];
		
		this.disableCloseButton = p.disableCloseButton || false;
		this.disableCloseByMask = p.disableCloseByMask || false;
	}//<--initialize()
});