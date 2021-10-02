import ESTDesigner from './Packages'
import './Application'
import Config from './Config'
import draw2d from 'draw2d'

ESTDesigner.gateway.ParallelGateway = ESTDesigner.event.BaseEvent.extend({
  init: function(attr) {
    this._super($.extend({
      path: Config.Image.Parallel_Gateway_Ico
    }, attr))
    this.createPort('hybrid', new draw2d.layout.locator.LeftLocator())
    this.createPort('hybrid', new draw2d.layout.locator.RightLocator())
    this.createPort('hybrid', new draw2d.layout.locator.BottomLocator())
    this.createPort('hybrid', new draw2d.layout.locator.TopLocator())
  },
  toXML: function() {
    var xml = '<parallelGateway id="' + this.id + '" name="' + this.id +
      '"></parallelGateway>\n'
    return xml
  }
})
ESTDesigner.gateway.ExclusiveGateway = ESTDesigner.event.BaseEvent.extend({
  init: function(attr) {
    this._super($.extend({
      path: Config.Image.Exclusive_Gateway_Ico
    }, attr))
    this.geteWay = { 'id': '', 'name': '', 'order': '' }
    this.createPort('hybrid', new draw2d.layout.locator.LeftLocator())
    this.createPort('hybrid', new draw2d.layout.locator.RightLocator())
    this.createPort('hybrid', new draw2d.layout.locator.BottomLocator())
    this.createPort('hybrid', new draw2d.layout.locator.TopLocator())
  },
  toXML: function() {

    var xml = '<exclusiveGateway id="' + this.id + '" name="' + this.id +
      '"></exclusiveGateway>\n'
    return xml
  },
  toXML1: function(order) {
    this.geteWay.id = this.id
    this.geteWay.name = this.name
    this.geteWay.order = order
    return this.geteWay
  }
})
export default {
  ParallelGateway(attr) {
    return new ESTDesigner.gateway.ParallelGateway(attr)
  },
  ExclusiveGateway(attr) {
    return new ESTDesigner.gateway.ExclusiveGateway(attr)
  }
}
