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
		this.onYes       = p.onYes       || null;
		this.onNo        = p.onNo        || null;
		this.onOk        = p.onOk        || null;
		this.onClose     = p.onClose     || null;
		this.title       = p.title       || '';
		this.description = p.description || '';
		
		this.disableCloseButton = p.disableCloseButton || false;
		this.disableCloseByMask = p.disableCloseByMask || false;
	}//<--initialize()
});