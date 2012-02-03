/*!
 * Hypermodal/1.0 for Prototype.js
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
		this.modalWidth  = p.modalWidth  || '500px';
		this.modalHeight = p.modalHeight || 'auto';
		
		this.title       = p.title       || p.subject || '';
		this.description = p.description || p.message || '';
		this.content     = p.content     || p.body    || '';
		this.buttons     = p.buttons     || p.btns    || null;
		
		this.onBeforeClose = p.onBeforeClose || null;
		this.onClose       = p.onClose       || null;
		this.onRendered    = p.onRendered    || null;
		
		this.disableCloseButton = p.disableCloseButton || false;
		this.disableCloseByMask = p.disableCloseByMask || false;
	}//<--initialize()
	,
	/**
	 * Render
	**/
	render: function _render(e) {
		// where to render?
		if (typeof e === 'undefined') {
			e = document.getElementsByTagName('body')[0] || $$('body').first();
		}
		
		this._e = e;
		
		// create modal
		var modal = this._modal = new Element('div').setStyle({
			width : this.modalWidth,
			height: this.modalHeight
		}).observe('click', function _safeArea(e) {
			e.stop();
		});
		
		// header
		modal.insert(
			new Element('div', {className: 'hypermodal-header'}).insert(
				(this.disableCloseButton)
				? null
				: new Element('span', {className: 'hypermodal-button hypermodal-button-close'}).insert(
					'&times;'
				).observe('click', this.close.bind(this))
			).insert(
				new Element('h3').insert(this.title)
			).insert(
				new Element('p').insert(this.description)
			)
		);
		
		// content
		if (this.content !== '') {
			modal.insert(new Element('div', {className: 'hypermodal-content'}).insert(this.content));
		}
		
		// footer
		if (this.buttons === null) {
			this.buttons = [
				{
					label   : 'OK',
					color   : '#04c',
					onClick : this.close.bind(this),
					disabled: false
				}
			];
		}
		
		var footer = new Element('div', {className: 'hypermodal-footer hypermodal-clearfix'});
		
		this.buttons.each(function _eachBtns(btn) {
			var button = btn._button = new Element('span', {className: 'hypermodal-button'}).insert(btn.label);
			
			// button methods
			btn.init = function _initBtn() {
				if (btn.disabled === true) {
					button.addClassName('hypermodal-button-disabled');
					button.stopObserving('click');
				} else {
					button.removeClassName('hypermodal-button-disabled');
					if (typeof btn.onClick !== 'undefined') button.observe('click', btn.onClick);
				}
				
				if (typeof btn.color !== 'undefined') button.style.backgroundColor = btn.color;
			};
			
			btn.enable = function _enableBtn() {
				btn.disabled = false;
				btn.init();
			};
			
			btn.disable = function _disableBtn() {
				btn.disabled = true;
				btn.init();
			};
			
			btn.init();
			footer.insert(button);
		}.bind(this));
		
		modal.insert(footer);
		
		// create base
		var base = this._base = new Element('div', {
			className: this.modalClass
		}).insert(
			new Element('div').insert(
				modal
			)
		);
		
		if (this.disableCloseByMask === false) {
			base.observe('click', this.close.bind(this));
		}
		
		// set id attr
		if (this.modalID !== null) {
			base.setAttribute('id', this.modalID);
		}
		
		// insert container to render element
		$(e).insert(base);
		
		// positioning
		this.positioning();
		
		// appear
		this._modal.setOpacity(0);
		
		this.showTimer = setTimeout(function _showTimr() {
			this._modal.setOpacity(1);
		}.bind(this), 50);
		
		// Event: onRendered
		if (this.onRendered !== null) this.onRendered();
	}//<--render()
	,
	/**
	 * Close
	**/
	close: function _close(e) {
		// stop bubbling
		if (typeof e !== 'undefined') try { e.stop(); } catch (e) {}
		
		// Event: onBeforeClose
		if (this.onBeforeClose !== null) if (this.onBeforeClose() === false) return;//abort closing
		
		// clear
		clearTimeout(this.showTimer);
		clearInterval(this.positioningInterval);
		
		// remove
		this._base.remove();
		
		// Event: onClose
		if (this.onClose !== null) this.onClose();
	}//<--close()
	,
	/**
	 * Positioning
	**/
	positioning: function _positioning() {
		clearInterval(this.positioningInterval);
		
		var baseHeight  = 0;
		var modalHeight = 0;
		
		this.positioningInterval = setInterval(function _posIntrvl() {
			if ((baseHeight === this._base.getHeight()) && (modalHeight === this._modal.getHeight())) return;
			
			baseHeight  = this._base.getHeight();
			modalHeight = this._modal.getHeight();
			
			var pos = (baseHeight / 2) - (modalHeight / 2);
			
			if (pos < 0) return;
			
			this._base.firstChild.style.top = pos + 'px';
		}.bind(this), 50);
	}//<--positioning()
});