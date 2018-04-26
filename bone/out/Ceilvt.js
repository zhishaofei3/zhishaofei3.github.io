"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Ceilvt = /** @class */ (function (_super) {
    __extends(Ceilvt, _super);
    function Ceilvt() {
        var _this = _super.call(this) || this;
        _this.ori = {};
        _this._resources.push("resource/ceilvt/ceilvt_ske.json", "resource/ceilvt/ceilvt_tex.json", "resource/ceilvt/ceilvt_tex.png");
        return _this;
    }
    Ceilvt.prototype._onStart = function () {
        var factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/ceilvt/ceilvt_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/ceilvt/ceilvt_tex.json"].data, this._pixiResources["resource/ceilvt/ceilvt_tex.png"].texture);
        this.armatureDisplay = factory.buildArmatureDisplay('ceilvt');
        this.addChild(this.armatureDisplay);
        this.bulletSlot = this.armatureDisplay.armature.getBone("ceilvt");
        this.armatureDisplay.interactive = true;
        var _self = this;
        this.armatureDisplay.pointerdown = function (e) {
            var p = e.data.global;
            _self.ori = { 'x': p.x, 'y': p.y };
            console.log('start');
            _self.armatureDisplay.pointermove = function (e2) {
                var p2 = e2.data.global;
                console.log(p2.x, p2.y);
                var x1 = p2.x - _self.ori.x;
                var y1 = p2.y - _self.ori.y;
                _self._moveTo(x1, y1);
                _self.ori = { 'x': p2.x, 'y': p2.y };
            };
        };
        document.body.addEventListener('touchend', function () {
            console.log('抬起');
            _self.armatureDisplay.pointermove = null;
        });
    };
    Ceilvt.prototype._moveTo = function (_x, _y) {
        this.bulletSlot.offset.x += _x; // Random scale.
        this.bulletSlot.offset.y += _y; // Random scale.
        // this.bulletSlot.offset.y +=_y;
        this.bulletSlot.invalidUpdate();
    };
    return Ceilvt;
}(BaseDemo));
