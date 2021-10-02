ESTDesigner.gateway.ParallelGateway = ESTDesigner.event.BaseEvent.extend({
			init : function(attr) {
				this._super($.extend({
							path : Config.Image.Parallel_Gateway_Ico
						}, attr));
				this.createPort("hybrid", new draw2d.layout.locator.LeftLocator());
				this.createPort("hybrid", new draw2d.layout.locator.RightLocator());
				this.createPort("hybrid", new draw2d.layout.locator.BottomLocator());
				this.createPort("hybrid", new draw2d.layout.locator.TopLocator());
			},
			toXML : function() {
				var xml = '<parallelGateway id="' + this.id + '" name="' + this.id
						+ '"></parallelGateway>\n';
				return xml;
			}
		});
ESTDesigner.gateway.ExclusiveGateway = ESTDesigner.event.BaseEvent.extend({
			init : function(attr) {
				this._super($.extend({
							path : Config.Image.Exclusive_Gateway_Ico
						}, attr));
				this.createPort("hybrid", new draw2d.layout.locator.LeftLocator());
				this.createPort("hybrid", new draw2d.layout.locator.RightLocator());
				this.createPort("hybrid", new draw2d.layout.locator.BottomLocator());
				this.createPort("hybrid", new draw2d.layout.locator.TopLocator());
			},
			toXML : function() {
				var xml = '<exclusiveGateway id="' + this.id + '" name="' + this.id
						+ '"></exclusiveGateway>\n';
				return xml;
			}
		});