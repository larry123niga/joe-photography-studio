/*-------------------------------------------------------------------------------------
[TABLE OF CONTENTS]

01. SMARTMENUS
02. STICKY HEADER
03. HAMBURGER MENU ICON
04. PICTUREFILL RETINA IMAGE
05. AOS
06. PLYR
07. WAYPOINTS
08. COUNTER UP
09. PROGRESSBAR
10. COUNTDOWN
11. PRETTIFY
12. VIDEO WRAPPER
13. GO TO TOP
14. LIGHTGALLERY
15. MOUSEWHEEL
16. LAZY LOAD GOOGLE MAPS
17. VANILLA
18. CUBE PORTFOLIO
19. ISOTOPE
20. IMAGESLOADED
21. SWIPER
23. FLICKR FEED
24. TYPER
25. COCOEN
26. SLIDE PORTFOLIO
27. EASING
28. BACKSTRETCH
29. ISCROLL
30. FOOTER REVEAL
31. COLLAGEPLUS
-------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------*/
/*	01. SMARTMENUS
/*-----------------------------------------------------------------------------------*/
/*! SmartMenus jQuery Plugin - v1.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */
(function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery)
})(function($) {
    function initMouseDetection(t) {
        var e = ".smartmenus_mouse";
        if (mouseDetectionEnabled || t) mouseDetectionEnabled && t && ($(document).off(e), mouseDetectionEnabled = !1);
        else {
            var i = !0,
                s = null,
                o = {
                    mousemove: function(t) {
                        var e = {
                            x: t.pageX,
                            y: t.pageY,
                            timeStamp: (new Date).getTime()
                        };
                        if (s) {
                            var o = Math.abs(s.x - e.x),
                                a = Math.abs(s.y - e.y);
                            if ((o > 0 || a > 0) && 2 >= o && 2 >= a && 300 >= e.timeStamp - s.timeStamp && (mouse = !0, i)) {
                                var n = $(t.target).closest("a");
                                n.is("a") && $.each(menuTrees, function() {
                                    return $.contains(this.$root[0], n[0]) ? (this.itemEnter({
                                        currentTarget: n[0]
                                    }), !1) : void 0
                                }), i = !1
                            }
                        }
                        s = e
                    }
                };
            o[touchEvents ? "touchstart" : "pointerover pointermove pointerout MSPointerOver MSPointerMove MSPointerOut"] = function(t) {
                isTouchEvent(t.originalEvent) && (mouse = !1)
            }, $(document).on(getEventsNS(o, e)), mouseDetectionEnabled = !0
        }
    }

    function isTouchEvent(t) {
        return !/^(4|mouse)$/.test(t.pointerType)
    }

    function getEventsNS(t, e) {
        e || (e = "");
        var i = {};
        for (var s in t) i[s.split(" ").join(e + " ") + e] = t[s];
        return i
    }
    var menuTrees = [],
        mouse = !1,
        touchEvents = "ontouchstart" in window,
        mouseDetectionEnabled = !1,
        requestAnimationFrame = window.requestAnimationFrame || function(t) {
            return setTimeout(t, 1e3 / 60)
        },
        cancelAnimationFrame = window.cancelAnimationFrame || function(t) {
            clearTimeout(t)
        },
        canAnimate = !!$.fn.animate;
    return $.SmartMenus = function(t, e) {
        this.$root = $(t), this.opts = e, this.rootId = "", this.accessIdPrefix = "", this.$subArrow = null, this.activatedItems = [], this.visibleSubMenus = [], this.showTimeout = 0, this.hideTimeout = 0, this.scrollTimeout = 0, this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.idInc = 0, this.$firstLink = null, this.$firstSub = null, this.disabled = !1, this.$disableOverlay = null, this.$touchScrollingSub = null, this.cssTransforms3d = "perspective" in t.style || "webkitPerspective" in t.style, this.wasCollapsible = !1, this.init()
    }, $.extend($.SmartMenus, {
        hideAll: function() {
            $.each(menuTrees, function() {
                this.menuHideAll()
            })
        },
        destroy: function() {
            for (; menuTrees.length;) menuTrees[0].destroy();
            initMouseDetection(!0)
        },
        prototype: {
            init: function(t) {
                var e = this;
                if (!t) {
                    menuTrees.push(this), this.rootId = ((new Date).getTime() + Math.random() + "").replace(/\D/g, ""), this.accessIdPrefix = "sm-" + this.rootId + "-", this.$root.hasClass("sm-rtl") && (this.opts.rightToLeftSubMenus = !0);
                    var i = ".smartmenus";
                    this.$root.data("smartmenus", this).attr("data-smartmenus-id", this.rootId).dataSM("level", 1).on(getEventsNS({
                        "mouseover focusin": $.proxy(this.rootOver, this),
                        "mouseout focusout": $.proxy(this.rootOut, this),
                        keydown: $.proxy(this.rootKeyDown, this)
                    }, i)).on(getEventsNS({
                        mouseenter: $.proxy(this.itemEnter, this),
                        mouseleave: $.proxy(this.itemLeave, this),
                        mousedown: $.proxy(this.itemDown, this),
                        focus: $.proxy(this.itemFocus, this),
                        blur: $.proxy(this.itemBlur, this),
                        click: $.proxy(this.itemClick, this)
                    }, i), "a"), i += this.rootId, this.opts.hideOnClick && $(document).on(getEventsNS({
                        touchstart: $.proxy(this.docTouchStart, this),
                        touchmove: $.proxy(this.docTouchMove, this),
                        touchend: $.proxy(this.docTouchEnd, this),
                        click: $.proxy(this.docClick, this)
                    }, i)), $(window).on(getEventsNS({
                        "resize orientationchange": $.proxy(this.winResize, this)
                    }, i)), this.opts.subIndicators && (this.$subArrow = $("<span/>").addClass("sub-arrow"), this.opts.subIndicatorsText && this.$subArrow.html(this.opts.subIndicatorsText)), initMouseDetection()
                }
                if (this.$firstSub = this.$root.find("ul").each(function() {
                        e.menuInit($(this))
                    }).eq(0), this.$firstLink = this.$root.find("a").eq(0), this.opts.markCurrentItem) {
                    var s = /(index|default)\.[^#\?\/]*/i,
                        o = /#.*/,
                        a = window.location.href.replace(s, ""),
                        n = a.replace(o, "");
                    this.$root.find("a").each(function() {
                        var t = this.href.replace(s, ""),
                            i = $(this);
                        (t == a || t == n) && (i.addClass("current"), e.opts.markCurrentTree && i.parentsUntil("[data-smartmenus-id]", "ul").each(function() {
                            $(this).dataSM("parent-a").addClass("current")
                        }))
                    })
                }
                this.wasCollapsible = this.isCollapsible()
            },
            destroy: function(t) {
                if (!t) {
                    var e = ".smartmenus";
                    this.$root.removeData("smartmenus").removeAttr("data-smartmenus-id").removeDataSM("level").off(e), e += this.rootId, $(document).off(e), $(window).off(e), this.opts.subIndicators && (this.$subArrow = null)
                }
                this.menuHideAll();
                var i = this;
                this.$root.find("ul").each(function() {
                    var t = $(this);
                    t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.dataSM("shown-before") && ((i.opts.subMenusMinWidth || i.opts.subMenusMaxWidth) && t.css({
                        width: "",
                        minWidth: "",
                        maxWidth: ""
                    }).removeClass("sm-nowrap"), t.dataSM("scroll-arrows") && t.dataSM("scroll-arrows").remove(), t.css({
                        zIndex: "",
                        top: "",
                        left: "",
                        marginLeft: "",
                        marginTop: "",
                        display: ""
                    })), 0 == (t.attr("id") || "").indexOf(i.accessIdPrefix) && t.removeAttr("id")
                }).removeDataSM("in-mega").removeDataSM("shown-before").removeDataSM("scroll-arrows").removeDataSM("parent-a").removeDataSM("level").removeDataSM("beforefirstshowfired").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeAttr("aria-expanded"), this.$root.find("a.has-submenu").each(function() {
                    var t = $(this);
                    0 == t.attr("id").indexOf(i.accessIdPrefix) && t.removeAttr("id")
                }).removeClass("has-submenu").removeDataSM("sub").removeAttr("aria-haspopup").removeAttr("aria-controls").removeAttr("aria-expanded").closest("li").removeDataSM("sub"), this.opts.subIndicators && this.$root.find("span.sub-arrow").remove(), this.opts.markCurrentItem && this.$root.find("a.current").removeClass("current"), t || (this.$root = null, this.$firstLink = null, this.$firstSub = null, this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), menuTrees.splice($.inArray(this, menuTrees), 1))
            },
            disable: function(t) {
                if (!this.disabled) {
                    if (this.menuHideAll(), !t && !this.opts.isPopup && this.$root.is(":visible")) {
                        var e = this.$root.offset();
                        this.$disableOverlay = $('<div class="sm-jquery-disable-overlay"/>').css({
                            position: "absolute",
                            top: e.top,
                            left: e.left,
                            width: this.$root.outerWidth(),
                            height: this.$root.outerHeight(),
                            zIndex: this.getStartZIndex(!0),
                            opacity: 0
                        }).appendTo(document.body)
                    }
                    this.disabled = !0
                }
            },
            docClick: function(t) {
                return this.$touchScrollingSub ? (this.$touchScrollingSub = null, void 0) : ((this.visibleSubMenus.length && !$.contains(this.$root[0], t.target) || $(t.target).closest("a").length) && this.menuHideAll(), void 0)
            },
            docTouchEnd: function() {
                if (this.lastTouch) {
                    if (!(!this.visibleSubMenus.length || void 0 !== this.lastTouch.x2 && this.lastTouch.x1 != this.lastTouch.x2 || void 0 !== this.lastTouch.y2 && this.lastTouch.y1 != this.lastTouch.y2 || this.lastTouch.target && $.contains(this.$root[0], this.lastTouch.target))) {
                        this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                        var t = this;
                        this.hideTimeout = setTimeout(function() {
                            t.menuHideAll()
                        }, 350)
                    }
                    this.lastTouch = null
                }
            },
            docTouchMove: function(t) {
                if (this.lastTouch) {
                    var e = t.originalEvent.touches[0];
                    this.lastTouch.x2 = e.pageX, this.lastTouch.y2 = e.pageY
                }
            },
            docTouchStart: function(t) {
                var e = t.originalEvent.touches[0];
                this.lastTouch = {
                    x1: e.pageX,
                    y1: e.pageY,
                    target: e.target
                }
            },
            enable: function() {
                this.disabled && (this.$disableOverlay && (this.$disableOverlay.remove(), this.$disableOverlay = null), this.disabled = !1)
            },
            getClosestMenu: function(t) {
                for (var e = $(t).closest("ul"); e.dataSM("in-mega");) e = e.parent().closest("ul");
                return e[0] || null
            },
            getHeight: function(t) {
                return this.getOffset(t, !0)
            },
            getOffset: function(t, e) {
                var i;
                "none" == t.css("display") && (i = {
                    position: t[0].style.position,
                    visibility: t[0].style.visibility
                }, t.css({
                    position: "absolute",
                    visibility: "hidden"
                }).show());
                var s = t[0].getBoundingClientRect && t[0].getBoundingClientRect(),
                    o = s && (e ? s.height || s.bottom - s.top : s.width || s.right - s.left);
                return o || 0 === o || (o = e ? t[0].offsetHeight : t[0].offsetWidth), i && t.hide().css(i), o
            },
            getStartZIndex: function(t) {
                var e = parseInt(this[t ? "$root" : "$firstSub"].css("z-index"));
                return !t && isNaN(e) && (e = parseInt(this.$root.css("z-index"))), isNaN(e) ? 1 : e
            },
            getTouchPoint: function(t) {
                return t.touches && t.touches[0] || t.changedTouches && t.changedTouches[0] || t
            },
            getViewport: function(t) {
                var e = t ? "Height" : "Width",
                    i = document.documentElement["client" + e],
                    s = window["inner" + e];
                return s && (i = Math.min(i, s)), i
            },
            getViewportHeight: function() {
                return this.getViewport(!0)
            },
            getViewportWidth: function() {
                return this.getViewport()
            },
            getWidth: function(t) {
                return this.getOffset(t)
            },
            handleEvents: function() {
                return !this.disabled && this.isCSSOn()
            },
            handleItemEvents: function(t) {
                return this.handleEvents() && !this.isLinkInMegaMenu(t)
            },
            isCollapsible: function() {
                return "static" == this.$firstSub.css("position")
            },
            isCSSOn: function() {
                return "inline" != this.$firstLink.css("display")
            },
            isFixed: function() {
                var t = "fixed" == this.$root.css("position");
                return t || this.$root.parentsUntil("body").each(function() {
                    return "fixed" == $(this).css("position") ? (t = !0, !1) : void 0
                }), t
            },
            isLinkInMegaMenu: function(t) {
                return $(this.getClosestMenu(t[0])).hasClass("mega-menu")
            },
            isTouchMode: function() {
                return !mouse || this.opts.noMouseOver || this.isCollapsible()
            },
            itemActivate: function(t, e) {
                var i = t.closest("ul"),
                    s = i.dataSM("level");
                if (s > 1 && (!this.activatedItems[s - 2] || this.activatedItems[s - 2][0] != i.dataSM("parent-a")[0])) {
                    var o = this;
                    $(i.parentsUntil("[data-smartmenus-id]", "ul").get().reverse()).add(i).each(function() {
                        o.itemActivate($(this).dataSM("parent-a"))
                    })
                }
                if ((!this.isCollapsible() || e) && this.menuHideSubMenus(this.activatedItems[s - 1] && this.activatedItems[s - 1][0] == t[0] ? s : s - 1), this.activatedItems[s - 1] = t, this.$root.triggerHandler("activate.smapi", t[0]) !== !1) {
                    var a = t.dataSM("sub");
                    a && (this.isTouchMode() || !this.opts.showOnClick || this.clickActivated) && this.menuShow(a)
                }
            },
            itemBlur: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && this.$root.triggerHandler("blur.smapi", e[0])
            },
            itemClick: function(t) {
                var e = $(t.currentTarget);
                if (this.handleItemEvents(e)) {
                    if (this.$touchScrollingSub && this.$touchScrollingSub[0] == e.closest("ul")[0]) return this.$touchScrollingSub = null, t.stopPropagation(), !1;
                    if (this.$root.triggerHandler("click.smapi", e[0]) === !1) return !1;
                    var i = $(t.target).is(".sub-arrow"),
                        s = e.dataSM("sub"),
                        o = s ? 2 == s.dataSM("level") : !1,
                        a = this.isCollapsible(),
                        n = /toggle$/.test(this.opts.collapsibleBehavior),
                        r = /link$/.test(this.opts.collapsibleBehavior),
                        h = /^accordion/.test(this.opts.collapsibleBehavior);
                    if (s && !s.is(":visible")) {
                        if ((!r || !a || i) && (this.opts.showOnClick && o && (this.clickActivated = !0), this.itemActivate(e, h), s.is(":visible"))) return this.focusActivated = !0, !1
                    } else if (a && (n || i)) return this.itemActivate(e, h), this.menuHide(s), n && (this.focusActivated = !1), !1;
                    return this.opts.showOnClick && o || e.hasClass("disabled") || this.$root.triggerHandler("select.smapi", e[0]) === !1 ? !1 : void 0
                }
            },
            itemDown: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && e.dataSM("mousedown", !0)
            },
            itemEnter: function(t) {
                var e = $(t.currentTarget);
                if (this.handleItemEvents(e)) {
                    if (!this.isTouchMode()) {
                        this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                        var i = this;
                        this.showTimeout = setTimeout(function() {
                            i.itemActivate(e)
                        }, this.opts.showOnClick && 1 == e.closest("ul").dataSM("level") ? 1 : this.opts.showTimeout)
                    }
                    this.$root.triggerHandler("mouseenter.smapi", e[0])
                }
            },
            itemFocus: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && (!this.focusActivated || this.isTouchMode() && e.dataSM("mousedown") || this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0] == e[0] || this.itemActivate(e, !0), this.$root.triggerHandler("focus.smapi", e[0]))
            },
            itemLeave: function(t) {
                var e = $(t.currentTarget);
                this.handleItemEvents(e) && (this.isTouchMode() || (e[0].blur(), this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0)), e.removeDataSM("mousedown"), this.$root.triggerHandler("mouseleave.smapi", e[0]))
            },
            menuHide: function(t) {
                if (this.$root.triggerHandler("beforehide.smapi", t[0]) !== !1 && (canAnimate && t.stop(!0, !0), "none" != t.css("display"))) {
                    var e = function() {
                        t.css("z-index", "")
                    };
                    this.isCollapsible() ? canAnimate && this.opts.collapsibleHideFunction ? this.opts.collapsibleHideFunction.call(this, t, e) : t.hide(this.opts.collapsibleHideDuration, e) : canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, t, e) : t.hide(this.opts.hideDuration, e), t.dataSM("scroll") && (this.menuScrollStop(t), t.css({
                        "touch-action": "",
                        "-ms-touch-action": "",
                        "-webkit-transform": "",
                        transform: ""
                    }).off(".smartmenus_scroll").removeDataSM("scroll").dataSM("scroll-arrows").hide()), t.dataSM("parent-a").removeClass("highlighted").attr("aria-expanded", "false"), t.attr({
                        "aria-expanded": "false",
                        "aria-hidden": "true"
                    });
                    var i = t.dataSM("level");
                    this.activatedItems.splice(i - 1, 1), this.visibleSubMenus.splice($.inArray(t, this.visibleSubMenus), 1), this.$root.triggerHandler("hide.smapi", t[0])
                }
            },
            menuHideAll: function() {
                this.showTimeout && (clearTimeout(this.showTimeout), this.showTimeout = 0);
                for (var t = this.opts.isPopup ? 1 : 0, e = this.visibleSubMenus.length - 1; e >= t; e--) this.menuHide(this.visibleSubMenus[e]);
                this.opts.isPopup && (canAnimate && this.$root.stop(!0, !0), this.$root.is(":visible") && (canAnimate && this.opts.hideFunction ? this.opts.hideFunction.call(this, this.$root) : this.$root.hide(this.opts.hideDuration))), this.activatedItems = [], this.visibleSubMenus = [], this.clickActivated = !1, this.focusActivated = !1, this.zIndexInc = 0, this.$root.triggerHandler("hideAll.smapi")
            },
            menuHideSubMenus: function(t) {
                for (var e = this.activatedItems.length - 1; e >= t; e--) {
                    var i = this.activatedItems[e].dataSM("sub");
                    i && this.menuHide(i)
                }
            },
            menuInit: function(t) {
                if (!t.dataSM("in-mega")) {
                    t.hasClass("mega-menu") && t.find("ul").dataSM("in-mega", !0);
                    for (var e = 2, i = t[0];
                        (i = i.parentNode.parentNode) != this.$root[0];) e++;
                    var s = t.prevAll("a").eq(-1);
                    s.length || (s = t.prevAll().find("a").eq(-1)), s.addClass("has-submenu").dataSM("sub", t), t.dataSM("parent-a", s).dataSM("level", e).parent().dataSM("sub", t);
                    var o = s.attr("id") || this.accessIdPrefix + ++this.idInc,
                        a = t.attr("id") || this.accessIdPrefix + ++this.idInc;
                    s.attr({
                        id: o,
                        "aria-haspopup": "true",
                        "aria-controls": a,
                        "aria-expanded": "false"
                    }), t.attr({
                        id: a,
                        role: "group",
                        "aria-hidden": "true",
                        "aria-labelledby": o,
                        "aria-expanded": "false"
                    }), this.opts.subIndicators && s[this.opts.subIndicatorsPos](this.$subArrow.clone())
                }
            },
            menuPosition: function(t) {
                var e, i, s = t.dataSM("parent-a"),
                    o = s.closest("li"),
                    a = o.parent(),
                    n = t.dataSM("level"),
                    r = this.getWidth(t),
                    h = this.getHeight(t),
                    u = s.offset(),
                    l = u.left,
                    c = u.top,
                    d = this.getWidth(s),
                    m = this.getHeight(s),
                    p = $(window),
                    f = p.scrollLeft(),
                    v = p.scrollTop(),
                    b = this.getViewportWidth(),
                    S = this.getViewportHeight(),
                    g = a.parent().is("[data-sm-horizontal-sub]") || 2 == n && !a.hasClass("sm-vertical"),
                    M = this.opts.rightToLeftSubMenus && !o.is("[data-sm-reverse]") || !this.opts.rightToLeftSubMenus && o.is("[data-sm-reverse]"),
                    w = 2 == n ? this.opts.mainMenuSubOffsetX : this.opts.subMenusSubOffsetX,
                    T = 2 == n ? this.opts.mainMenuSubOffsetY : this.opts.subMenusSubOffsetY;
                if (g ? (e = M ? d - r - w : w, i = this.opts.bottomToTopSubMenus ? -h - T : m + T) : (e = M ? w - r : d - w, i = this.opts.bottomToTopSubMenus ? m - T - h : T), this.opts.keepInViewport) {
                    var y = l + e,
                        I = c + i;
                    if (M && f > y ? e = g ? f - y + e : d - w : !M && y + r > f + b && (e = g ? f + b - r - y + e : w - r), g || (S > h && I + h > v + S ? i += v + S - h - I : (h >= S || v > I) && (i += v - I)), g && (I + h > v + S + .49 || v > I) || !g && h > S + .49) {
                        var x = this;
                        t.dataSM("scroll-arrows") || t.dataSM("scroll-arrows", $([$('<span class="scroll-up"><span class="scroll-up-arrow"></span></span>')[0], $('<span class="scroll-down"><span class="scroll-down-arrow"></span></span>')[0]]).on({
                            mouseenter: function() {
                                t.dataSM("scroll").up = $(this).hasClass("scroll-up"), x.menuScroll(t)
                            },
                            mouseleave: function(e) {
                                x.menuScrollStop(t), x.menuScrollOut(t, e)
                            },
                            "mousewheel DOMMouseScroll": function(t) {
                                t.preventDefault()
                            }
                        }).insertAfter(t));
                        var A = ".smartmenus_scroll";
                        if (t.dataSM("scroll", {
                                y: this.cssTransforms3d ? 0 : i - m,
                                step: 1,
                                itemH: m,
                                subH: h,
                                arrowDownH: this.getHeight(t.dataSM("scroll-arrows").eq(1))
                            }).on(getEventsNS({
                                mouseover: function(e) {
                                    x.menuScrollOver(t, e)
                                },
                                mouseout: function(e) {
                                    x.menuScrollOut(t, e)
                                },
                                "mousewheel DOMMouseScroll": function(e) {
                                    x.menuScrollMousewheel(t, e)
                                }
                            }, A)).dataSM("scroll-arrows").css({
                                top: "auto",
                                left: "0",
                                marginLeft: e + (parseInt(t.css("border-left-width")) || 0),
                                width: r - (parseInt(t.css("border-left-width")) || 0) - (parseInt(t.css("border-right-width")) || 0),
                                zIndex: t.css("z-index")
                            }).eq(g && this.opts.bottomToTopSubMenus ? 0 : 1).show(), this.isFixed()) {
                            var C = {};
                            C[touchEvents ? "touchstart touchmove touchend" : "pointerdown pointermove pointerup MSPointerDown MSPointerMove MSPointerUp"] = function(e) {
                                x.menuScrollTouch(t, e)
                            }, t.css({
                                "touch-action": "none",
                                "-ms-touch-action": "none"
                            }).on(getEventsNS(C, A))
                        }
                    }
                }
                t.css({
                    top: "auto",
                    left: "0",
                    marginLeft: e,
                    marginTop: i - m
                })
            },
            menuScroll: function(t, e, i) {
                var s, o = t.dataSM("scroll"),
                    a = t.dataSM("scroll-arrows"),
                    n = o.up ? o.upEnd : o.downEnd;
                if (!e && o.momentum) {
                    if (o.momentum *= .92, s = o.momentum, .5 > s) return this.menuScrollStop(t), void 0
                } else s = i || (e || !this.opts.scrollAccelerate ? this.opts.scrollStep : Math.floor(o.step));
                var r = t.dataSM("level");
                if (this.activatedItems[r - 1] && this.activatedItems[r - 1].dataSM("sub") && this.activatedItems[r - 1].dataSM("sub").is(":visible") && this.menuHideSubMenus(r - 1), o.y = o.up && o.y >= n || !o.up && n >= o.y ? o.y : Math.abs(n - o.y) > s ? o.y + (o.up ? s : -s) : n, t.css(this.cssTransforms3d ? {
                        "-webkit-transform": "translate3d(0, " + o.y + "px, 0)",
                        transform: "translate3d(0, " + o.y + "px, 0)"
                    } : {
                        marginTop: o.y
                    }), mouse && (o.up && o.y > o.downEnd || !o.up && o.y < o.upEnd) && a.eq(o.up ? 1 : 0).show(), o.y == n) mouse && a.eq(o.up ? 0 : 1).hide(), this.menuScrollStop(t);
                else if (!e) {
                    this.opts.scrollAccelerate && o.step < this.opts.scrollStep && (o.step += .2);
                    var h = this;
                    this.scrollTimeout = requestAnimationFrame(function() {
                        h.menuScroll(t)
                    })
                }
            },
            menuScrollMousewheel: function(t, e) {
                if (this.getClosestMenu(e.target) == t[0]) {
                    e = e.originalEvent;
                    var i = (e.wheelDelta || -e.detail) > 0;
                    t.dataSM("scroll-arrows").eq(i ? 0 : 1).is(":visible") && (t.dataSM("scroll").up = i, this.menuScroll(t, !0))
                }
                e.preventDefault()
            },
            menuScrollOut: function(t, e) {
                mouse && (/^scroll-(up|down)/.test((e.relatedTarget || "").className) || (t[0] == e.relatedTarget || $.contains(t[0], e.relatedTarget)) && this.getClosestMenu(e.relatedTarget) == t[0] || t.dataSM("scroll-arrows").css("visibility", "hidden"))
            },
            menuScrollOver: function(t, e) {
                if (mouse && !/^scroll-(up|down)/.test(e.target.className) && this.getClosestMenu(e.target) == t[0]) {
                    this.menuScrollRefreshData(t);
                    var i = t.dataSM("scroll"),
                        s = $(window).scrollTop() - t.dataSM("parent-a").offset().top - i.itemH;
                    t.dataSM("scroll-arrows").eq(0).css("margin-top", s).end().eq(1).css("margin-top", s + this.getViewportHeight() - i.arrowDownH).end().css("visibility", "visible")
                }
            },
            menuScrollRefreshData: function(t) {
                var e = t.dataSM("scroll"),
                    i = $(window).scrollTop() - t.dataSM("parent-a").offset().top - e.itemH;
                this.cssTransforms3d && (i = -(parseFloat(t.css("margin-top")) - i)), $.extend(e, {
                    upEnd: i,
                    downEnd: i + this.getViewportHeight() - e.subH
                })
            },
            menuScrollStop: function(t) {
                return this.scrollTimeout ? (cancelAnimationFrame(this.scrollTimeout), this.scrollTimeout = 0, t.dataSM("scroll").step = 1, !0) : void 0
            },
            menuScrollTouch: function(t, e) {
                if (e = e.originalEvent, isTouchEvent(e)) {
                    var i = this.getTouchPoint(e);
                    if (this.getClosestMenu(i.target) == t[0]) {
                        var s = t.dataSM("scroll");
                        if (/(start|down)$/i.test(e.type)) this.menuScrollStop(t) ? (e.preventDefault(), this.$touchScrollingSub = t) : this.$touchScrollingSub = null, this.menuScrollRefreshData(t), $.extend(s, {
                            touchStartY: i.pageY,
                            touchStartTime: e.timeStamp
                        });
                        else if (/move$/i.test(e.type)) {
                            var o = void 0 !== s.touchY ? s.touchY : s.touchStartY;
                            if (void 0 !== o && o != i.pageY) {
                                this.$touchScrollingSub = t;
                                var a = i.pageY > o;
                                void 0 !== s.up && s.up != a && $.extend(s, {
                                    touchStartY: i.pageY,
                                    touchStartTime: e.timeStamp
                                }), $.extend(s, {
                                    up: a,
                                    touchY: i.pageY
                                }), this.menuScroll(t, !0, Math.abs(i.pageY - o))
                            }
                            e.preventDefault()
                        } else void 0 !== s.touchY && ((s.momentum = 15 * Math.pow(Math.abs(i.pageY - s.touchStartY) / (e.timeStamp - s.touchStartTime), 2)) && (this.menuScrollStop(t), this.menuScroll(t), e.preventDefault()), delete s.touchY)
                    }
                }
            },
            menuShow: function(t) {
                if ((t.dataSM("beforefirstshowfired") || (t.dataSM("beforefirstshowfired", !0), this.$root.triggerHandler("beforefirstshow.smapi", t[0]) !== !1)) && this.$root.triggerHandler("beforeshow.smapi", t[0]) !== !1 && (t.dataSM("shown-before", !0), canAnimate && t.stop(!0, !0), !t.is(":visible"))) {
                    var e = t.dataSM("parent-a"),
                        i = this.isCollapsible();
                    if ((this.opts.keepHighlighted || i) && e.addClass("highlighted"), i) t.removeClass("sm-nowrap").css({
                        zIndex: "",
                        width: "auto",
                        minWidth: "",
                        maxWidth: "",
                        top: "",
                        left: "",
                        marginLeft: "",
                        marginTop: ""
                    });
                    else {
                        if (t.css("z-index", this.zIndexInc = (this.zIndexInc || this.getStartZIndex()) + 1), (this.opts.subMenusMinWidth || this.opts.subMenusMaxWidth) && (t.css({
                                width: "auto",
                                minWidth: "",
                                maxWidth: ""
                            }).addClass("sm-nowrap"), this.opts.subMenusMinWidth && t.css("min-width", this.opts.subMenusMinWidth), this.opts.subMenusMaxWidth)) {
                            var s = this.getWidth(t);
                            t.css("max-width", this.opts.subMenusMaxWidth), s > this.getWidth(t) && t.removeClass("sm-nowrap").css("width", this.opts.subMenusMaxWidth)
                        }
                        this.menuPosition(t)
                    }
                    var o = function() {
                        t.css("overflow", "")
                    };
                    i ? canAnimate && this.opts.collapsibleShowFunction ? this.opts.collapsibleShowFunction.call(this, t, o) : t.show(this.opts.collapsibleShowDuration, o) : canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, t, o) : t.show(this.opts.showDuration, o), e.attr("aria-expanded", "true"), t.attr({
                        "aria-expanded": "true",
                        "aria-hidden": "false"
                    }), this.visibleSubMenus.push(t), this.$root.triggerHandler("show.smapi", t[0])
                }
            },
            popupHide: function(t) {
                this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0);
                var e = this;
                this.hideTimeout = setTimeout(function() {
                    e.menuHideAll()
                }, t ? 1 : this.opts.hideTimeout)
            },
            popupShow: function(t, e) {
                if (!this.opts.isPopup) return alert('SmartMenus jQuery Error:\n\nIf you want to show this menu via the "popupShow" method, set the isPopup:true option.'), void 0;
                if (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), this.$root.dataSM("shown-before", !0), canAnimate && this.$root.stop(!0, !0), !this.$root.is(":visible")) {
                    this.$root.css({
                        left: t,
                        top: e
                    });
                    var i = this,
                        s = function() {
                            i.$root.css("overflow", "")
                        };
                    canAnimate && this.opts.showFunction ? this.opts.showFunction.call(this, this.$root, s) : this.$root.show(this.opts.showDuration, s), this.visibleSubMenus[0] = this.$root
                }
            },
            refresh: function() {
                this.destroy(!0), this.init(!0)
            },
            rootKeyDown: function(t) {
                if (this.handleEvents()) switch (t.keyCode) {
                    case 27:
                        var e = this.activatedItems[0];
                        if (e) {
                            this.menuHideAll(), e[0].focus();
                            var i = e.dataSM("sub");
                            i && this.menuHide(i)
                        }
                        break;
                    case 32:
                        var s = $(t.target);
                        if (s.is("a") && this.handleItemEvents(s)) {
                            var i = s.dataSM("sub");
                            i && !i.is(":visible") && (this.itemClick({
                                currentTarget: t.target
                            }), t.preventDefault())
                        }
                }
            },
            rootOut: function(t) {
                if (this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && (this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0), !this.opts.showOnClick || !this.opts.hideOnClick)) {
                    var e = this;
                    this.hideTimeout = setTimeout(function() {
                        e.menuHideAll()
                    }, this.opts.hideTimeout)
                }
            },
            rootOver: function(t) {
                this.handleEvents() && !this.isTouchMode() && t.target != this.$root[0] && this.hideTimeout && (clearTimeout(this.hideTimeout), this.hideTimeout = 0)
            },
            winResize: function(t) {
                if (this.handleEvents()) {
                    if (!("onorientationchange" in window) || "orientationchange" == t.type) {
                        var e = this.isCollapsible();
                        this.wasCollapsible && e || (this.activatedItems.length && this.activatedItems[this.activatedItems.length - 1][0].blur(), this.menuHideAll()), this.wasCollapsible = e
                    }
                } else if (this.$disableOverlay) {
                    var i = this.$root.offset();
                    this.$disableOverlay.css({
                        top: i.top,
                        left: i.left,
                        width: this.$root.outerWidth(),
                        height: this.$root.outerHeight()
                    })
                }
            }
        }
    }), $.fn.dataSM = function(t, e) {
        return e ? this.data(t + "_smartmenus", e) : this.data(t + "_smartmenus")
    }, $.fn.removeDataSM = function(t) {
        return this.removeData(t + "_smartmenus")
    }, $.fn.smartmenus = function(options) {
        if ("string" == typeof options) {
            var args = arguments,
                method = options;
            return Array.prototype.shift.call(args), this.each(function() {
                var t = $(this).data("smartmenus");
                t && t[method] && t[method].apply(t, args)
            })
        }
        return this.each(function() {
            var dataOpts = $(this).data("sm-options") || null;
            if (dataOpts) try {
                dataOpts = eval("(" + dataOpts + ")")
            } catch (e) {
                dataOpts = null, alert('ERROR\n\nSmartMenus jQuery init:\nInvalid "data-sm-options" attribute value syntax.')
            }
            new $.SmartMenus(this, $.extend({}, $.fn.smartmenus.defaults, options, dataOpts))
        })
    }, $.fn.smartmenus.defaults = {
        isPopup: !1,
        mainMenuSubOffsetX: 0,
        mainMenuSubOffsetY: 0,
        subMenusSubOffsetX: 0,
        subMenusSubOffsetY: 0,
        subMenusMinWidth: "10em",
        subMenusMaxWidth: "30em",
        subIndicators: !0,
        subIndicatorsPos: "append",
        subIndicatorsText: "",
        scrollStep: 30,
        scrollAccelerate: !0,
        showTimeout: 150,
        hideTimeout: 150,
        showDuration: 0,
        showFunction: null,
        hideDuration: 0,
        hideFunction: function(t, e) {
            t.fadeOut(200, e)
        },
        collapsibleShowDuration: 0,
        collapsibleShowFunction: function(t, e) {
            t.slideDown(200, e)
        },
        collapsibleHideDuration: 0,
        collapsibleHideFunction: function(t, e) {
            t.slideUp(200, e)
        },
        showOnClick: !1,
        hideOnClick: !0,
        noMouseOver: !1,
        keepInViewport: !0,
        keepHighlighted: !0,
        markCurrentItem: !1,
        markCurrentTree: !0,
        rightToLeftSubMenus: !1,
        bottomToTopSubMenus: !1,
        collapsibleBehavior: "default"
    }, $
});
/*! SmartMenus jQuery Plugin Bootstrap 4 Addon - v0.1.0 - September 17, 2017
 * http://www.smartmenus.org/
 * Copyright Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com; Licensed MIT */
(function(t) {
    "function" == typeof define && define.amd ? define(["jquery", "smartmenus"], t) : "object" == typeof module && "object" == typeof module.exports ? module.exports = t(require("jquery")) : t(jQuery)
})(function(t) {
    return t.extend(t.SmartMenus.Bootstrap = {}, {
        keydownFix: !1,
        init: function() {
            var e = t("ul.navbar-nav:not([data-sm-skip])");
            e.each(function() {
                function e() {
                    o.find("a.current").each(function() {
                        var e = t(this);
                        (e.hasClass("dropdown-item") ? e : e.parent()).addClass("active")
                    }), o.find("a.has-submenu").each(function() {
                        var e = t(this);
                        e.is('[data-toggle="dropdown"]') && e.dataSM("bs-data-toggle-dropdown", !0).removeAttr("data-toggle"), !n && e.hasClass("dropdown-toggle") && e.dataSM("bs-dropdown-toggle", !0).removeClass("dropdown-toggle")
                    })
                }

                function s() {
                    o.find("a.current").each(function() {
                        var e = t(this);
                        (e.hasClass("active") ? e : e.parent()).removeClass("active")
                    }), o.find("a.has-submenu").each(function() {
                        var e = t(this);
                        e.dataSM("bs-dropdown-toggle") && e.addClass("dropdown-toggle").removeDataSM("bs-dropdown-toggle"), e.dataSM("bs-data-toggle-dropdown") && e.attr("data-toggle", "dropdown").removeDataSM("bs-data-toggle-dropdown")
                    })
                }

                function i(t) {
                    var e = a.getViewportWidth();
                    (e != u || t) && (a.isCollapsible() ? o.addClass("sm-collapsible") : o.removeClass("sm-collapsible"), u = e)
                }
                var o = t(this),
                    a = o.data("smartmenus");
                if (!a) {
                    var n = o.is("[data-sm-skip-collapsible-behavior]"),
                        r = o.hasClass("ml-auto") || o.prevAll(".mr-auto").length > 0;
                    o.smartmenus({
                        subMenusSubOffsetX: -1,
                        subMenusSubOffsetY: 0,
                        subIndicators: !n,
                        collapsibleShowFunction: null,
                        collapsibleHideFunction: null,
                        rightToLeftSubMenus: 0,
                        bottomToTopSubMenus: o.closest(".fixed-bottom").length > 0,
                        bootstrapHighlightClasses: ""
                    }).on({
                        "show.smapi": function(e, s) {
                            var i = t(s),
                                o = i.dataSM("scroll-arrows");
                            o && o.css("background-color", i.css("background-color")), i.parent().addClass("show"), a.opts.keepHighlighted && i.dataSM("level") > 2 && i.prevAll("a").addClass(a.opts.bootstrapHighlightClasses)
                        },
                        "hide.smapi": function(e, s) {
                            var i = t(s);
                            i.parent().removeClass("show"), a.opts.keepHighlighted && i.dataSM("level") > 2 && i.prevAll("a").removeClass(a.opts.bootstrapHighlightClasses)
                        }
                    }), a = o.data("smartmenus"), e(), a.refresh = function() {
                        t.SmartMenus.prototype.refresh.call(this), e(), i(!0)
                    }, a.destroy = function(e) {
                        s(), t.SmartMenus.prototype.destroy.call(this, e)
                    }, n && (a.opts.collapsibleBehavior = "toggle");
                    var u;
                    i(), t(window).on("resize.smartmenus" + a.rootId, i)
                }
            }), e.length && !t.SmartMenus.Bootstrap.keydownFix && (t(document).off("keydown.bs.dropdown.data-api", ".dropdown-menu"), t.fn.dropdown && t.fn.dropdown.Constructor && t(document).on("keydown.bs.dropdown.data-api", ".dropdown-menu.show", t.fn.dropdown.Constructor._dataApiKeydownHandler), t.SmartMenus.Bootstrap.keydownFix = !0)
        }
    }), t(t.SmartMenus.Bootstrap.init), t
});
// SmartMenus mod - hide the menus on document click just in collapsible mode
$.SmartMenus.prototype._docClick = $.SmartMenus.prototype.docClick, $.SmartMenus.prototype._docTouchEnd = $.SmartMenus.prototype.docTouchEnd, $.SmartMenus.prototype.docClick = function(a) {
    this.isCollapsible() && this._docClick(a)
}, $.SmartMenus.prototype.docTouchEnd = function(a) {
    this.isCollapsible() && this._docTouchEnd(a)
}, $(function() {
    $(".navbar-nav").bind("click.smapi", function(a, b) {
        var c = $(this).data("smartmenus");
        if (c.isCollapsible()) {
            var d = $(b).dataSM("sub");
            if (d && d.is(":visible")) return c.menuHide(d), !1
        }
    })
});
/*-----------------------------------------------------------------------------------*/
/*	02. STICKY HEADER
/*-----------------------------------------------------------------------------------*/
/*!
 * Headhesive.js v1.2.3 - An on-demand sticky header
 * Author: Copyright (c) Mark Goodyear <@markgdyr> <http://markgoodyear.com>
 * Url: http://markgoodyear.com/labs/headhesive
 * License: MIT
 */
! function(t, e) {
    "function" == typeof define && define.amd ? define([], function() {
        return e()
    }) : "object" == typeof exports ? module.exports = e() : t.Headhesive = e()
}(this, function() {
    "use strict";
    var t = function(e, s) {
            for (var o in s) s.hasOwnProperty(o) && (e[o] = "object" == typeof s[o] ? t(e[o], s[o]) : s[o]);
            return e
        },
        e = function(t, e) {
            var s, o, i, n = Date.now || function() {
                    return (new Date).getTime()
                },
                l = null,
                c = 0,
                r = function() {
                    c = n(), l = null, i = t.apply(s, o), s = o = null
                };
            return function() {
                var f = n(),
                    h = e - (f - c);
                return s = this, o = arguments, 0 >= h ? (clearTimeout(l), l = null, c = f, i = t.apply(s, o), s = o = null) : l || (l = setTimeout(r, h)), i
            }
        },
        s = function() {
            return void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
        },
        o = function(t, e) {
            for (var s = 0, o = t.offsetHeight; t;) s += t.offsetTop, t = t.offsetParent;
            return "bottom" === e && (s += o), s
        },
        i = function(e, s) {
            "querySelector" in document && "addEventListener" in window && (this.visible = !1, this.options = {
                offset: 300,
                offsetSide: "top",
                classes: {
                    clone: "headhesive",
                    stick: "headhesive--stick",
                    unstick: "headhesive--unstick"
                },
                throttle: 250,
                onInit: function() {},
                onStick: function() {},
                onUnstick: function() {},
                onDestroy: function() {}
            }, this.elem = "string" == typeof e ? document.querySelector(e) : e, this.options = t(this.options, s), this.init())
        };
    return i.prototype = {
        constructor: i,
        init: function() {
            if (this.clonedElem = this.elem.cloneNode(!0), this.clonedElem.className += " " + this.options.classes.clone, document.body.insertBefore(this.clonedElem, document.body.firstChild), "number" == typeof this.options.offset) this.scrollOffset = this.options.offset;
            else {
                if ("string" != typeof this.options.offset) throw new Error("Invalid offset: " + this.options.offset);
                this._setScrollOffset()
            }
            this._throttleUpdate = e(this.update.bind(this), this.options.throttle), this._throttleScrollOffset = e(this._setScrollOffset.bind(this), this.options.throttle), window.addEventListener("scroll", this._throttleUpdate, !1), window.addEventListener("resize", this._throttleScrollOffset, !1), this.options.onInit.call(this)
        },
        _setScrollOffset: function() {
            "string" == typeof this.options.offset && (this.scrollOffset = o(document.querySelector(this.options.offset), this.options.offsetSide))
        },
        destroy: function() {
            document.body.removeChild(this.clonedElem), window.removeEventListener("scroll", this._throttleUpdate), window.removeEventListener("resize", this._throttleScrollOffset), this.options.onDestroy.call(this)
        },
        stick: function() {
            this.visible || (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.unstick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.stick, this.visible = !0, this.options.onStick.call(this))
        },
        unstick: function() {
            this.visible && (this.clonedElem.className = this.clonedElem.className.replace(new RegExp("(^|\\s)*" + this.options.classes.stick + "(\\s|$)*", "g"), ""), this.clonedElem.className += " " + this.options.classes.unstick, this.visible = !1, this.options.onUnstick.call(this))
        },
        update: function() {
            s() > this.scrollOffset ? this.stick() : this.unstick()
        }
    }, i
});
/*-----------------------------------------------------------------------------------*/
/*	03. HAMBURGER MENU ICON
/*-----------------------------------------------------------------------------------*/
/*!
 * jquery-hmbrgr.js v0.0.2
 * https://github.com/MorenoDiDomenico/jquery-hmbrgr
 *
 * Copyright 2015, Moreno Di Domenico
 * Released under the MIT license
 * http://mdd.mit-license.org
 *
 */

! function(a) {
    a.fn.hmbrgr = function(b) {
        function g(b) {
            a(b).css({
                width: c.width,
                height: c.height
            }).html("<span /><span /><span />").find("span").css({
                position: "absolute",
                width: "100%",
                height: c.barHeight,
                "border-radius": c.barRadius,
                "background-color": c.barColor,
                "transition-duration": c.speed + "ms"
            }), h(b), a.isFunction(c.onInit) && c.onInit.call(this)
        }

        function h(b) {
            a(b).data("clickable", !0).find("span").eq(0).css({
                top: d
            }), a(b).find("span").eq(1).css({
                top: e
            }), a(b).find("span").eq(2).css({
                top: f
            })
        }

        function i(b) {
            a(b).on("click", function(c) {
                c.preventDefault(), a(this).data("clickable") && (a(this).data("clickable", !1), a(b).toggleClass("cross"), a(b).hasClass("cross") ? j(b) : k(b))
            })
        }

        function j(b) {
            a(b).find("span").css({
                top: e
            }), setTimeout(function() {
                a(b).addClass(c.animation).data("clickable", !0), a.isFunction(c.onOpen) && c.onOpen.call(this)
            }, c.speed)
        }

        function k(b) {
            a(b).removeClass(c.animation), setTimeout(function() {
                h(b), a.isFunction(c.onClose) && c.onClose.call(this)
            }, c.speed)
        }
        var c = a.extend({
                width: 60,
                height: 50,
                speed: 200,
                barHeight: 8,
                barRadius: 0,
                barColor: "#ffffff",
                animation: "expand",
                onInit: null,
                onOpen: null,
                onClose: null
            }, b),
            d = 0,
            e = c.height / 2 - c.barHeight / 2,
            f = c.height - c.barHeight;
        return this.each(function() {
            g(this), i(this)
        })
    }
}(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	04. PICTUREFILL RETINA IMAGE
/*-----------------------------------------------------------------------------------*/
/*! Picturefill - v2.3.1 - 2015-04-09
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT */
window.matchMedia || (window.matchMedia = function() {
        "use strict";
        var a = window.styleMedia || window.media;
        if (!a) {
            var b = document.createElement("style"),
                c = document.getElementsByTagName("script")[0],
                d = null;
            b.type = "text/css", b.id = "matchmediajs-test", c.parentNode.insertBefore(b, c), d = "getComputedStyle" in window && window.getComputedStyle(b, null) || b.currentStyle, a = {
                matchMedium: function(a) {
                    var c = "@media " + a + "{ #matchmediajs-test { width: 1px; } }";
                    return b.styleSheet ? b.styleSheet.cssText = c : b.textContent = c, "1px" === d.width
                }
            }
        }
        return function(b) {
            return {
                matches: a.matchMedium(b || "all"),
                media: b || "all"
            }
        }
    }()),
    function(a, b, c) {
        "use strict";

        function d(b) {
            "object" == typeof module && "object" == typeof module.exports ? module.exports = b : "function" == typeof define && define.amd && define("picturefill", function() {
                return b
            }), "object" == typeof a && (a.picturefill = b)
        }

        function e(a) {
            var b, c, d, e, f, i = a || {};
            b = i.elements || g.getAllElements();
            for (var j = 0, k = b.length; k > j; j++)
                if (c = b[j], d = c.parentNode, e = void 0, f = void 0, "IMG" === c.nodeName.toUpperCase() && (c[g.ns] || (c[g.ns] = {}), i.reevaluate || !c[g.ns].evaluated)) {
                    if (d && "PICTURE" === d.nodeName.toUpperCase()) {
                        if (g.removeVideoShim(d), e = g.getMatch(c, d), e === !1) continue
                    } else e = void 0;
                    (d && "PICTURE" === d.nodeName.toUpperCase() || !g.sizesSupported && c.srcset && h.test(c.srcset)) && g.dodgeSrcset(c), e ? (f = g.processSourceSet(e), g.applyBestCandidate(f, c)) : (f = g.processSourceSet(c), (void 0 === c.srcset || c[g.ns].srcset) && g.applyBestCandidate(f, c)), c[g.ns].evaluated = !0
                }
        }

        function f() {
            function c() {
                clearTimeout(d), d = setTimeout(h, 60)
            }
            g.initTypeDetects(), e();
            var d, f = setInterval(function() {
                    return e(), /^loaded|^i|^c/.test(b.readyState) ? void clearInterval(f) : void 0
                }, 250),
                h = function() {
                    e({
                        reevaluate: !0
                    })
                };
            a.addEventListener ? a.addEventListener("resize", c, !1) : a.attachEvent && a.attachEvent("onresize", c)
        }
        if (a.HTMLPictureElement) return void d(function() {});
        b.createElement("picture");
        var g = a.picturefill || {},
            h = /\s+\+?\d+(e\d+)?w/;
        g.ns = "picturefill",
            function() {
                g.srcsetSupported = "srcset" in c, g.sizesSupported = "sizes" in c, g.curSrcSupported = "currentSrc" in c
            }(), g.trim = function(a) {
                return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
            }, g.makeUrl = function() {
                var a = b.createElement("a");
                return function(b) {
                    return a.href = b, a.href
                }
            }(), g.restrictsMixedContent = function() {
                return "https:" === a.location.protocol
            }, g.matchesMedia = function(b) {
                return a.matchMedia && a.matchMedia(b).matches
            }, g.getDpr = function() {
                return a.devicePixelRatio || 1
            }, g.getWidthFromLength = function(a) {
                var c;
                if (!a || a.indexOf("%") > -1 != !1 || !(parseFloat(a) > 0 || a.indexOf("calc(") > -1)) return !1;
                a = a.replace("vw", "%"), g.lengthEl || (g.lengthEl = b.createElement("div"), g.lengthEl.style.cssText = "border:0;display:block;font-size:1em;left:0;margin:0;padding:0;position:absolute;visibility:hidden", g.lengthEl.className = "helper-from-picturefill-js"), g.lengthEl.style.width = "0px";
                try {
                    g.lengthEl.style.width = a
                } catch (d) {}
                return b.body.appendChild(g.lengthEl), c = g.lengthEl.offsetWidth, 0 >= c && (c = !1), b.body.removeChild(g.lengthEl), c
            }, g.detectTypeSupport = function(b, c) {
                var d = new a.Image;
                return d.onerror = function() {
                    g.types[b] = !1, e()
                }, d.onload = function() {
                    g.types[b] = 1 === d.width, e()
                }, d.src = c, "pending"
            }, g.types = g.types || {}, g.initTypeDetects = function() {
                g.types["image/jpeg"] = !0, g.types["image/gif"] = !0, g.types["image/png"] = !0, g.types["image/svg+xml"] = b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), g.types["image/webp"] = g.detectTypeSupport("image/webp", "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=")
            }, g.verifyTypeSupport = function(a) {
                var b = a.getAttribute("type");
                if (null === b || "" === b) return !0;
                var c = g.types[b];
                return "string" == typeof c && "pending" !== c ? (g.types[b] = g.detectTypeSupport(b, c), "pending") : "function" == typeof c ? (c(), "pending") : c
            }, g.parseSize = function(a) {
                var b = /(\([^)]+\))?\s*(.+)/g.exec(a);
                return {
                    media: b && b[1],
                    length: b && b[2]
                }
            }, g.findWidthFromSourceSize = function(c) {
                for (var d, e = g.trim(c).split(/\s*,\s*/), f = 0, h = e.length; h > f; f++) {
                    var i = e[f],
                        j = g.parseSize(i),
                        k = j.length,
                        l = j.media;
                    if (k && (!l || g.matchesMedia(l)) && (d = g.getWidthFromLength(k))) break
                }
                return d || Math.max(a.innerWidth || 0, b.documentElement.clientWidth)
            }, g.parseSrcset = function(a) {
                for (var b = [];
                    "" !== a;) {
                    a = a.replace(/^\s+/g, "");
                    var c, d = a.search(/\s/g),
                        e = null;
                    if (-1 !== d) {
                        c = a.slice(0, d);
                        var f = c.slice(-1);
                        if (("," === f || "" === c) && (c = c.replace(/,+$/, ""), e = ""), a = a.slice(d + 1), null === e) {
                            var g = a.indexOf(","); - 1 !== g ? (e = a.slice(0, g), a = a.slice(g + 1)) : (e = a, a = "")
                        }
                    } else c = a, a = "";
                    (c || e) && b.push({
                        url: c,
                        descriptor: e
                    })
                }
                return b
            }, g.parseDescriptor = function(a, b) {
                var c, d = b || "100vw",
                    e = a && a.replace(/(^\s+|\s+$)/g, ""),
                    f = g.findWidthFromSourceSize(d);
                if (e)
                    for (var h = e.split(" "), i = h.length - 1; i >= 0; i--) {
                        var j = h[i],
                            k = j && j.slice(j.length - 1);
                        if ("h" !== k && "w" !== k || g.sizesSupported) {
                            if ("x" === k) {
                                var l = j && parseFloat(j, 10);
                                c = l && !isNaN(l) ? l : 1
                            }
                        } else c = parseFloat(parseInt(j, 10) / f)
                    }
                return c || 1
            }, g.getCandidatesFromSourceSet = function(a, b) {
                for (var c = g.parseSrcset(a), d = [], e = 0, f = c.length; f > e; e++) {
                    var h = c[e];
                    d.push({
                        url: h.url,
                        resolution: g.parseDescriptor(h.descriptor, b)
                    })
                }
                return d
            }, g.dodgeSrcset = function(a) {
                a.srcset && (a[g.ns].srcset = a.srcset, a.srcset = "", a.setAttribute("data-pfsrcset", a[g.ns].srcset))
            }, g.processSourceSet = function(a) {
                var b = a.getAttribute("srcset"),
                    c = a.getAttribute("sizes"),
                    d = [];
                return "IMG" === a.nodeName.toUpperCase() && a[g.ns] && a[g.ns].srcset && (b = a[g.ns].srcset), b && (d = g.getCandidatesFromSourceSet(b, c)), d
            }, g.backfaceVisibilityFix = function(a) {
                var b = a.style || {},
                    c = "webkitBackfaceVisibility" in b,
                    d = b.zoom;
                c && (b.zoom = ".999", c = a.offsetWidth, b.zoom = d)
            }, g.setIntrinsicSize = function() {
                var c = {},
                    d = function(a, b, c) {
                        b && a.setAttribute("width", parseInt(b / c, 10))
                    };
                return function(e, f) {
                    var h;
                    e[g.ns] && !a.pfStopIntrinsicSize && (void 0 === e[g.ns].dims && (e[g.ns].dims = e.getAttribute("width") || e.getAttribute("height")), e[g.ns].dims || (f.url in c ? d(e, c[f.url], f.resolution) : (h = b.createElement("img"), h.onload = function() {
                        if (c[f.url] = h.width, !c[f.url]) try {
                            b.body.appendChild(h), c[f.url] = h.width || h.offsetWidth, b.body.removeChild(h)
                        } catch (a) {}
                        e.src === f.url && d(e, c[f.url], f.resolution), e = null, h.onload = null, h = null
                    }, h.src = f.url)))
                }
            }(), g.applyBestCandidate = function(a, b) {
                var c, d, e;
                a.sort(g.ascendingSort), d = a.length, e = a[d - 1];
                for (var f = 0; d > f; f++)
                    if (c = a[f], c.resolution >= g.getDpr()) {
                        e = c;
                        break
                    }
                e && (e.url = g.makeUrl(e.url), b.src !== e.url && (g.restrictsMixedContent() && "http:" === e.url.substr(0, "http:".length).toLowerCase() ? void 0 !== window.console && console.warn("Blocked mixed content image " + e.url) : (b.src = e.url, g.curSrcSupported || (b.currentSrc = b.src), g.backfaceVisibilityFix(b))), g.setIntrinsicSize(b, e))
            }, g.ascendingSort = function(a, b) {
                return a.resolution - b.resolution
            }, g.removeVideoShim = function(a) {
                var b = a.getElementsByTagName("video");
                if (b.length) {
                    for (var c = b[0], d = c.getElementsByTagName("source"); d.length;) a.insertBefore(d[0], c);
                    c.parentNode.removeChild(c)
                }
            }, g.getAllElements = function() {
                for (var a = [], c = b.getElementsByTagName("img"), d = 0, e = c.length; e > d; d++) {
                    var f = c[d];
                    ("PICTURE" === f.parentNode.nodeName.toUpperCase() || null !== f.getAttribute("srcset") || f[g.ns] && null !== f[g.ns].srcset) && a.push(f)
                }
                return a
            }, g.getMatch = function(a, b) {
                for (var c, d = b.childNodes, e = 0, f = d.length; f > e; e++) {
                    var h = d[e];
                    if (1 === h.nodeType) {
                        if (h === a) return c;
                        if ("SOURCE" === h.nodeName.toUpperCase()) {
                            null !== h.getAttribute("src") && void 0 !== typeof console && console.warn("The `src` attribute is invalid on `picture` `source` element; instead, use `srcset`.");
                            var i = h.getAttribute("media");
                            if (h.getAttribute("srcset") && (!i || g.matchesMedia(i))) {
                                var j = g.verifyTypeSupport(h);
                                if (j === !0) {
                                    c = h;
                                    break
                                }
                                if ("pending" === j) return !1
                            }
                        }
                    }
                }
                return c
            }, f(), e._ = g, d(e)
    }(window, window.document, new window.Image);
/*-----------------------------------------------------------------------------------*/
/*	05. AOS
/*-----------------------------------------------------------------------------------*/
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.AOS = t() : e.AOS = t()
}(this, function() {
    return function(e) {
        function t(o) {
            if (n[o]) return n[o].exports;
            var i = n[o] = {
                exports: {},
                id: o,
                loaded: !1
            };
            return e[o].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "dist/", t(0)
    }([function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var i = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
                }
                return e
            },
            r = n(1),
            a = (o(r), n(6)),
            u = o(a),
            c = n(7),
            f = o(c),
            s = n(8),
            d = o(s),
            l = n(9),
            p = o(l),
            m = n(10),
            b = o(m),
            v = n(11),
            y = o(v),
            g = n(14),
            h = o(g),
            w = [],
            k = !1,
            x = document.all && !window.atob,
            j = {
                offset: 120,
                delay: 0,
                easing: "ease",
                duration: 400,
                disable: !1,
                once: !1,
                startEvent: "DOMContentLoaded"
            },
            O = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if (e && (k = !0), k) return w = (0, y.default)(w, j), (0, b.default)(w, j.once), w
            },
            S = function() {
                w = (0, h.default)(), O()
            },
            _ = function() {
                w.forEach(function(e, t) {
                    e.node.removeAttribute("data-aos"), e.node.removeAttribute("data-aos-easing"), e.node.removeAttribute("data-aos-duration"), e.node.removeAttribute("data-aos-delay")
                })
            },
            E = function(e) {
                return e === !0 || "mobile" === e && p.default.mobile() || "phone" === e && p.default.phone() || "tablet" === e && p.default.tablet() || "function" == typeof e && e() === !0
            },
            z = function(e) {
                return j = i(j, e), w = (0, h.default)(), E(j.disable) || x ? _() : (document.querySelector("body").setAttribute("data-aos-easing", j.easing), document.querySelector("body").setAttribute("data-aos-duration", j.duration), document.querySelector("body").setAttribute("data-aos-delay", j.delay), "DOMContentLoaded" === j.startEvent && ["complete", "interactive"].indexOf(document.readyState) > -1 ? O(!0) : "load" === j.startEvent ? window.addEventListener(j.startEvent, function() {
                    O(!0)
                }) : document.addEventListener(j.startEvent, function() {
                    O(!0)
                }), window.addEventListener("resize", (0, f.default)(O, 50, !0)), window.addEventListener("orientationchange", (0, f.default)(O, 50, !0)), window.addEventListener("scroll", (0, u.default)(function() {
                    (0, b.default)(w, j.once)
                }, 99)), document.addEventListener("DOMNodeRemoved", function(e) {
                    var t = e.target;
                    t && 1 === t.nodeType && t.hasAttribute && t.hasAttribute("data-aos") && (0, f.default)(S, 50, !0)
                }), (0, d.default)("[data-aos]", S), w)
            };
        e.exports = {
            init: z,
            refresh: O,
            refreshHard: S
        }
    }, function(e, t) {}, , , , , function(e, t) {
        (function(t) {
            "use strict";

            function n(e, t, n) {
                function o(t) {
                    var n = b,
                        o = v;
                    return b = v = void 0, k = t, g = e.apply(o, n)
                }

                function r(e) {
                    return k = e, h = setTimeout(s, t), S ? o(e) : g
                }

                function a(e) {
                    var n = e - w,
                        o = e - k,
                        i = t - n;
                    return _ ? j(i, y - o) : i
                }

                function c(e) {
                    var n = e - w,
                        o = e - k;
                    return void 0 === w || n >= t || n < 0 || _ && o >= y
                }

                function s() {
                    var e = O();
                    return c(e) ? d(e) : void(h = setTimeout(s, a(e)))
                }

                function d(e) {
                    return h = void 0, E && b ? o(e) : (b = v = void 0, g)
                }

                function l() {
                    void 0 !== h && clearTimeout(h), k = 0, b = w = v = h = void 0
                }

                function p() {
                    return void 0 === h ? g : d(O())
                }

                function m() {
                    var e = O(),
                        n = c(e);
                    if (b = arguments, v = this, w = e, n) {
                        if (void 0 === h) return r(w);
                        if (_) return h = setTimeout(s, t), o(w)
                    }
                    return void 0 === h && (h = setTimeout(s, t)), g
                }
                var b, v, y, g, h, w, k = 0,
                    S = !1,
                    _ = !1,
                    E = !0;
                if ("function" != typeof e) throw new TypeError(f);
                return t = u(t) || 0, i(n) && (S = !!n.leading, _ = "maxWait" in n, y = _ ? x(u(n.maxWait) || 0, t) : y, E = "trailing" in n ? !!n.trailing : E), m.cancel = l, m.flush = p, m
            }

            function o(e, t, o) {
                var r = !0,
                    a = !0;
                if ("function" != typeof e) throw new TypeError(f);
                return i(o) && (r = "leading" in o ? !!o.leading : r, a = "trailing" in o ? !!o.trailing : a), n(e, t, {
                    leading: r,
                    maxWait: t,
                    trailing: a
                })
            }

            function i(e) {
                var t = "undefined" == typeof e ? "undefined" : c(e);
                return !!e && ("object" == t || "function" == t)
            }

            function r(e) {
                return !!e && "object" == ("undefined" == typeof e ? "undefined" : c(e))
            }

            function a(e) {
                return "symbol" == ("undefined" == typeof e ? "undefined" : c(e)) || r(e) && k.call(e) == d
            }

            function u(e) {
                if ("number" == typeof e) return e;
                if (a(e)) return s;
                if (i(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = i(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(l, "");
                var n = m.test(e);
                return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e
            }
            var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                f = "Expected a function",
                s = NaN,
                d = "[object Symbol]",
                l = /^\s+|\s+$/g,
                p = /^[-+]0x[0-9a-f]+$/i,
                m = /^0b[01]+$/i,
                b = /^0o[0-7]+$/i,
                v = parseInt,
                y = "object" == ("undefined" == typeof t ? "undefined" : c(t)) && t && t.Object === Object && t,
                g = "object" == ("undefined" == typeof self ? "undefined" : c(self)) && self && self.Object === Object && self,
                h = y || g || Function("return this")(),
                w = Object.prototype,
                k = w.toString,
                x = Math.max,
                j = Math.min,
                O = function() {
                    return h.Date.now()
                };
            e.exports = o
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        (function(t) {
            "use strict";

            function n(e, t, n) {
                function i(t) {
                    var n = b,
                        o = v;
                    return b = v = void 0, O = t, g = e.apply(o, n)
                }

                function r(e) {
                    return O = e, h = setTimeout(s, t), S ? i(e) : g
                }

                function u(e) {
                    var n = e - w,
                        o = e - O,
                        i = t - n;
                    return _ ? x(i, y - o) : i
                }

                function f(e) {
                    var n = e - w,
                        o = e - O;
                    return void 0 === w || n >= t || n < 0 || _ && o >= y
                }

                function s() {
                    var e = j();
                    return f(e) ? d(e) : void(h = setTimeout(s, u(e)))
                }

                function d(e) {
                    return h = void 0, E && b ? i(e) : (b = v = void 0, g)
                }

                function l() {
                    void 0 !== h && clearTimeout(h), O = 0, b = w = v = h = void 0
                }

                function p() {
                    return void 0 === h ? g : d(j())
                }

                function m() {
                    var e = j(),
                        n = f(e);
                    if (b = arguments, v = this, w = e, n) {
                        if (void 0 === h) return r(w);
                        if (_) return h = setTimeout(s, t), i(w)
                    }
                    return void 0 === h && (h = setTimeout(s, t)), g
                }
                var b, v, y, g, h, w, O = 0,
                    S = !1,
                    _ = !1,
                    E = !0;
                if ("function" != typeof e) throw new TypeError(c);
                return t = a(t) || 0, o(n) && (S = !!n.leading, _ = "maxWait" in n, y = _ ? k(a(n.maxWait) || 0, t) : y, E = "trailing" in n ? !!n.trailing : E), m.cancel = l, m.flush = p, m
            }

            function o(e) {
                var t = "undefined" == typeof e ? "undefined" : u(e);
                return !!e && ("object" == t || "function" == t)
            }

            function i(e) {
                return !!e && "object" == ("undefined" == typeof e ? "undefined" : u(e))
            }

            function r(e) {
                return "symbol" == ("undefined" == typeof e ? "undefined" : u(e)) || i(e) && w.call(e) == s
            }

            function a(e) {
                if ("number" == typeof e) return e;
                if (r(e)) return f;
                if (o(e)) {
                    var t = "function" == typeof e.valueOf ? e.valueOf() : e;
                    e = o(t) ? t + "" : t
                }
                if ("string" != typeof e) return 0 === e ? e : +e;
                e = e.replace(d, "");
                var n = p.test(e);
                return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e
            }
            var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                c = "Expected a function",
                f = NaN,
                s = "[object Symbol]",
                d = /^\s+|\s+$/g,
                l = /^[-+]0x[0-9a-f]+$/i,
                p = /^0b[01]+$/i,
                m = /^0o[0-7]+$/i,
                b = parseInt,
                v = "object" == ("undefined" == typeof t ? "undefined" : u(t)) && t && t.Object === Object && t,
                y = "object" == ("undefined" == typeof self ? "undefined" : u(self)) && self && self.Object === Object && self,
                g = v || y || Function("return this")(),
                h = Object.prototype,
                w = h.toString,
                k = Math.max,
                x = Math.min,
                j = function() {
                    return g.Date.now()
                };
            e.exports = n
        }).call(t, function() {
            return this
        }())
    }, function(e, t) {
        "use strict";

        function n(e, t) {
            a.push({
                selector: e,
                fn: t
            }), !u && r && (u = new r(o), u.observe(i.documentElement, {
                childList: !0,
                subtree: !0,
                removedNodes: !0
            })), o()
        }

        function o() {
            for (var e, t, n = 0, o = a.length; n < o; n++) {
                e = a[n], t = i.querySelectorAll(e.selector);
                for (var r, u = 0, c = t.length; u < c; u++) r = t[u], r.ready || (r.ready = !0, e.fn.call(r, r))
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = window.document,
            r = window.MutationObserver || window.WebKitMutationObserver,
            a = [],
            u = void 0;
        t.default = n
    }, function(e, t) {
        "use strict";

        function n(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function o() {
            return navigator.userAgent || navigator.vendor || window.opera || ""
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                    }
                }
                return function(t, n, o) {
                    return n && e(t.prototype, n), o && e(t, o), t
                }
            }(),
            r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            f = function() {
                function e() {
                    n(this, e)
                }
                return i(e, [{
                    key: "phone",
                    value: function() {
                        var e = o();
                        return !(!r.test(e) && !a.test(e.substr(0, 4)))
                    }
                }, {
                    key: "mobile",
                    value: function() {
                        var e = o();
                        return !(!u.test(e) && !c.test(e.substr(0, 4)))
                    }
                }, {
                    key: "tablet",
                    value: function() {
                        return this.mobile() && !this.phone()
                    }
                }]), e
            }();
        t.default = new f
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e, t, n) {
                var o = e.node.getAttribute("data-aos-once");
                t > e.position ? e.node.classList.add("aos-animate") : "undefined" != typeof o && ("false" === o || !n && "true" !== o) && e.node.classList.remove("aos-animate")
            },
            o = function(e, t) {
                var o = window.pageYOffset,
                    i = window.innerHeight;
                e.forEach(function(e, r) {
                    n(e, i + o, t)
                })
            };
        t.default = o
    }, function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(12),
            r = o(i),
            a = function(e, t) {
                return e.forEach(function(e, n) {
                    e.node.classList.add("aos-init"), e.position = (0, r.default)(e.node, t.offset)
                }), e
            };
        t.default = a
    }, function(e, t, n) {
        "use strict";

        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = n(13),
            r = o(i),
            a = function(e, t) {
                var n = 0,
                    o = 0,
                    i = window.innerHeight,
                    a = {
                        offset: e.getAttribute("data-aos-offset"),
                        anchor: e.getAttribute("data-aos-anchor"),
                        anchorPlacement: e.getAttribute("data-aos-anchor-placement")
                    };
                switch (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)), a.anchor && document.querySelectorAll(a.anchor) && (e = document.querySelectorAll(a.anchor)[0]), n = (0, r.default)(e).top, a.anchorPlacement) {
                    case "top-bottom":
                        break;
                    case "center-bottom":
                        n += e.offsetHeight / 2;
                        break;
                    case "bottom-bottom":
                        n += e.offsetHeight;
                        break;
                    case "top-center":
                        n += i / 2;
                        break;
                    case "bottom-center":
                        n += i / 2 + e.offsetHeight;
                        break;
                    case "center-center":
                        n += i / 2 + e.offsetHeight / 2;
                        break;
                    case "top-top":
                        n += i;
                        break;
                    case "bottom-top":
                        n += e.offsetHeight + i;
                        break;
                    case "center-top":
                        n += e.offsetHeight / 2 + i
                }
                return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o
            };
        t.default = a
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            for (var t = 0, n = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0), n += e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0), e = e.offsetParent;
            return {
                top: n,
                left: t
            }
        };
        t.default = n
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            e = e || document.querySelectorAll("[data-aos]");
            var t = [];
            return [].forEach.call(e, function(e, n) {
                t.push({
                    node: e
                })
            }), t
        };
        t.default = n
    }])
});
/*-----------------------------------------------------------------------------------*/
/*	06. PLYR
/*-----------------------------------------------------------------------------------*/
! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = t(e, document) : "function" == typeof define && define.amd ? define([], function() {
        return t(e, document)
    }) : e.plyr = t(e, document)
}("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

    function n() {
        var e, n, r, a = navigator.userAgent,
            s = navigator.appName,
            o = "" + parseFloat(navigator.appVersion),
            i = parseInt(navigator.appVersion, 10),
            l = !1,
            u = !1,
            c = !1,
            d = !1;
        return -1 !== navigator.appVersion.indexOf("Windows NT") && -1 !== navigator.appVersion.indexOf("rv:11") ? (l = !0, s = "IE", o = "11") : -1 !== (n = a.indexOf("MSIE")) ? (l = !0, s = "IE", o = a.substring(n + 5)) : -1 !== (n = a.indexOf("Chrome")) ? (c = !0, s = "Chrome", o = a.substring(n + 7)) : -1 !== (n = a.indexOf("Safari")) ? (d = !0, s = "Safari", o = a.substring(n + 7), -1 !== (n = a.indexOf("Version")) && (o = a.substring(n + 8))) : -1 !== (n = a.indexOf("Firefox")) ? (u = !0, s = "Firefox", o = a.substring(n + 8)) : (e = a.lastIndexOf(" ") + 1) < (n = a.lastIndexOf("/")) && (s = a.substring(e, n), o = a.substring(n + 1), s.toLowerCase() === s.toUpperCase() && (s = navigator.appName)), -1 !== (r = o.indexOf(";")) && (o = o.substring(0, r)), -1 !== (r = o.indexOf(" ")) && (o = o.substring(0, r)), i = parseInt("" + o, 10), isNaN(i) && (o = "" + parseFloat(navigator.appVersion), i = parseInt(navigator.appVersion, 10)), {
            name: s,
            version: i,
            isIE: l,
            isFirefox: u,
            isChrome: c,
            isSafari: d,
            isIos: /(iPad|iPhone|iPod)/g.test(navigator.platform),
            isIphone: /(iPhone|iPod)/g.test(navigator.userAgent),
            isTouch: "ontouchstart" in t.documentElement
        }
    }

    function r(e, t) {
        var n = e.media;
        if ("video" === e.type) switch (t) {
            case "video/webm":
                return !(!n.canPlayType || !n.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, ""));
            case "video/mp4":
                return !(!n.canPlayType || !n.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ""));
            case "video/ogg":
                return !(!n.canPlayType || !n.canPlayType('video/ogg; codecs="theora"').replace(/no/, ""))
        } else if ("audio" === e.type) switch (t) {
            case "audio/mpeg":
                return !(!n.canPlayType || !n.canPlayType("audio/mpeg;").replace(/no/, ""));
            case "audio/ogg":
                return !(!n.canPlayType || !n.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""));
            case "audio/wav":
                return !(!n.canPlayType || !n.canPlayType('audio/wav; codecs="1"').replace(/no/, ""))
        }
        return !1
    }

    function a(e) {
        if (!t.querySelectorAll('script[src="' + e + '"]').length) {
            var n = t.createElement("script");
            n.src = e;
            var r = t.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(n, r)
        }
    }

    function s(e, t) {
        return Array.prototype.indexOf && -1 !== e.indexOf(t)
    }

    function o(e, t, n) {
        return e.replace(new RegExp(t.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, "\\$1"), "g"), n)
    }

    function i(e, t) {
        e.length || (e = [e]);
        for (var n = e.length - 1; n >= 0; n--) {
            var r = n > 0 ? t.cloneNode(!0) : t,
                a = e[n],
                s = a.parentNode,
                o = a.nextSibling;
            return r.appendChild(a), o ? s.insertBefore(r, o) : s.appendChild(r), r
        }
    }

    function l(e) {
        e && e.parentNode.removeChild(e)
    }

    function u(e, t) {
        e.insertBefore(t, e.firstChild)
    }

    function c(e, t) {
        for (var n in t) e.setAttribute(n, O.boolean(t[n]) && t[n] ? "" : t[n])
    }

    function d(e, n, r) {
        var a = t.createElement(e);
        c(a, r), u(n, a)
    }

    function p(e) {
        return e.replace(".", "")
    }

    function m(e, t, n) {
        if (e)
            if (e.classList) e.classList[n ? "add" : "remove"](t);
            else {
                var r = (" " + e.className + " ").replace(/\s+/g, " ").replace(" " + t + " ", "");
                e.className = r + (n ? " " + t : "")
            }
    }

    function f(e, t) {
        return !!e && (e.classList ? e.classList.contains(t) : new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className))
    }

    function y(e, n) {
        var r = Element.prototype;
        return (r.matches || r.webkitMatchesSelector || r.mozMatchesSelector || r.msMatchesSelector || function(e) {
            return -1 !== [].indexOf.call(t.querySelectorAll(e), this)
        }).call(e, n)
    }

    function b(e, t, n, r, a) {
        n && g(e, t, function(t) {
            n.apply(e, [t])
        }, a), g(e, t, function(t) {
            r.apply(e, [t])
        }, a)
    }

    function v(e, t, n, r, a) {
        var s = t.split(" ");
        if (O.boolean(a) || (a = !1), e instanceof NodeList)
            for (var o = 0; o < e.length; o++) e[o] instanceof Node && v(e[o], arguments[1], arguments[2], arguments[3]);
        else
            for (var i = 0; i < s.length; i++) e[r ? "addEventListener" : "removeEventListener"](s[i], n, a)
    }

    function g(e, t, n, r) {
        e && v(e, t, n, !0, r)
    }

    function h(e, t, n, r) {
        e && v(e, t, n, !1, r)
    }

    function k(e, t, n, r) {
        if (e && t) {
            O.boolean(n) || (n = !1);
            var a = new CustomEvent(t, {
                bubbles: n,
                detail: r
            });
            e.dispatchEvent(a)
        }
    }

    function w(e, t) {
        if (e) return t = O.boolean(t) ? t : !e.getAttribute("aria-pressed"), e.setAttribute("aria-pressed", t), t
    }

    function x(e, t) {
        return 0 === e || 0 === t || isNaN(e) || isNaN(t) ? 0 : (e / t * 100).toFixed(2)
    }

    function T() {
        var e = arguments;
        if (e.length) {
            if (1 === e.length) return e[0];
            for (var t = Array.prototype.shift.call(e), n = e.length, r = 0; r < n; r++) {
                var a = e[r];
                for (var s in a) a[s] && a[s].constructor && a[s].constructor === Object ? (t[s] = t[s] || {}, T(t[s], a[s])) : t[s] = a[s]
            }
            return t
        }
    }

    function S(e) {
        return e.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/) ? RegExp.$2 : e
    }

    function E(e) {
        return e.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : e
    }

    function _() {
        var e = {
                supportsFullScreen: !1,
                isFullScreen: function() {
                    return !1
                },
                requestFullScreen: function() {},
                cancelFullScreen: function() {},
                fullScreenEventName: "",
                element: null,
                prefix: ""
            },
            n = "webkit o moz ms khtml".split(" ");
        if (O.undefined(t.cancelFullScreen))
            for (var r = 0, a = n.length; r < a; r++) {
                if (e.prefix = n[r], !O.undefined(t[e.prefix + "CancelFullScreen"])) {
                    e.supportsFullScreen = !0;
                    break
                }
                if (!O.undefined(t.msExitFullscreen) && t.msFullscreenEnabled) {
                    e.prefix = "ms", e.supportsFullScreen = !0;
                    break
                }
            } else e.supportsFullScreen = !0;
        return e.supportsFullScreen && (e.fullScreenEventName = "ms" === e.prefix ? "MSFullscreenChange" : e.prefix + "fullscreenchange", e.isFullScreen = function(e) {
            switch (O.undefined(e) && (e = t.body), this.prefix) {
                case "":
                    return t.fullscreenElement === e;
                case "moz":
                    return t.mozFullScreenElement === e;
                default:
                    return t[this.prefix + "FullscreenElement"] === e
            }
        }, e.requestFullScreen = function(e) {
            return O.undefined(e) && (e = t.body), "" === this.prefix ? e.requestFullScreen() : e[this.prefix + ("ms" === this.prefix ? "RequestFullscreen" : "RequestFullScreen")]()
        }, e.cancelFullScreen = function() {
            return "" === this.prefix ? t.cancelFullScreen() : t[this.prefix + ("ms" === this.prefix ? "ExitFullscreen" : "CancelFullScreen")]()
        }, e.element = function() {
            return "" === this.prefix ? t.fullscreenElement : t[this.prefix + "FullscreenElement"]
        }), e
    }

    function C(v, C) {
        function j(e, t, n, r) {
            k(e, t, n, T({}, r, {
                plyr: We
            }))
        }

        function R(t, n) {
            C.debug && e.console && (n = Array.prototype.slice.call(n), O.string(C.logPrefix) && C.logPrefix.length && n.unshift(C.logPrefix), console[t].apply(console, n))
        }

        function V() {
            return {
                url: C.iconUrl,
                absolute: 0 === C.iconUrl.indexOf("http") || Ye.browser.isIE && !e.svg4everybody
            }
        }

        function q() {
            var e = [],
                t = V(),
                n = (t.absolute ? "" : t.url) + "#" + C.iconPrefix;
            return s(C.controls, "play-large") && e.push('<button type="button" data-plyr="play" class="plyr__play-large">', '<svg><use xlink:href="' + n + '-play" /></svg>', '<span class="plyr__sr-only">' + C.i18n.play + "</span>", "</button>"), e.push('<div class="plyr__controls">'), s(C.controls, "restart") && e.push('<button type="button" data-plyr="restart">', '<svg><use xlink:href="' + n + '-restart" /></svg>', '<span class="plyr__sr-only">' + C.i18n.restart + "</span>", "</button>"), s(C.controls, "rewind") && e.push('<button type="button" data-plyr="rewind">', '<svg><use xlink:href="' + n + '-rewind" /></svg>', '<span class="plyr__sr-only">' + C.i18n.rewind + "</span>", "</button>"), s(C.controls, "play") && e.push('<button type="button" data-plyr="play">', '<svg><use xlink:href="' + n + '-play" /></svg>', '<span class="plyr__sr-only">' + C.i18n.play + "</span>", "</button>", '<button type="button" data-plyr="pause">', '<svg><use xlink:href="' + n + '-pause" /></svg>', '<span class="plyr__sr-only">' + C.i18n.pause + "</span>", "</button>"), s(C.controls, "fast-forward") && e.push('<button type="button" data-plyr="fast-forward">', '<svg><use xlink:href="' + n + '-fast-forward" /></svg>', '<span class="plyr__sr-only">' + C.i18n.forward + "</span>", "</button>"), s(C.controls, "progress") && (e.push('<span class="plyr__progress">', '<label for="seek{id}" class="plyr__sr-only">Seek</label>', '<input id="seek{id}" class="plyr__progress--seek" type="range" min="0" max="100" step="0.1" value="0" data-plyr="seek">', '<progress class="plyr__progress--played" max="100" value="0" role="presentation"></progress>', '<progress class="plyr__progress--buffer" max="100" value="0">', "<span>0</span>% " + C.i18n.buffered, "</progress>"), C.tooltips.seek && e.push('<span class="plyr__tooltip">00:00</span>'), e.push("</span>")), s(C.controls, "current-time") && e.push('<span class="plyr__time">', '<span class="plyr__sr-only">' + C.i18n.currentTime + "</span>", '<span class="plyr__time--current">00:00</span>', "</span>"), s(C.controls, "duration") && e.push('<span class="plyr__time">', '<span class="plyr__sr-only">' + C.i18n.duration + "</span>", '<span class="plyr__time--duration">00:00</span>', "</span>"), s(C.controls, "mute") && e.push('<button type="button" data-plyr="mute">', '<svg class="icon--muted"><use xlink:href="' + n + '-muted" /></svg>', '<svg><use xlink:href="' + n + '-volume" /></svg>', '<span class="plyr__sr-only">' + C.i18n.toggleMute + "</span>", "</button>"), s(C.controls, "volume") && e.push('<span class="plyr__volume">', '<label for="volume{id}" class="plyr__sr-only">' + C.i18n.volume + "</label>", '<input id="volume{id}" class="plyr__volume--input" type="range" min="' + C.volumeMin + '" max="' + C.volumeMax + '" value="' + C.volume + '" data-plyr="volume">', '<progress class="plyr__volume--display" max="' + C.volumeMax + '" value="' + C.volumeMin + '" role="presentation"></progress>', "</span>"), s(C.controls, "captions") && e.push('<button type="button" data-plyr="captions">', '<svg class="icon--captions-on"><use xlink:href="' + n + '-captions-on" /></svg>', '<svg><use xlink:href="' + n + '-captions-off" /></svg>', '<span class="plyr__sr-only">' + C.i18n.toggleCaptions + "</span>", "</button>"), s(C.controls, "fullscreen") && e.push('<button type="button" data-plyr="fullscreen">', '<svg class="icon--exit-fullscreen"><use xlink:href="' + n + '-exit-fullscreen" /></svg>', '<svg><use xlink:href="' + n + '-enter-fullscreen" /></svg>', '<span class="plyr__sr-only">' + C.i18n.toggleFullscreen + "</span>", "</button>"), e.push("</div>"), e.join("")
        }

        function D() {
            if (Ye.supported.full && ("audio" !== Ye.type || C.fullscreen.allowAudio) && C.fullscreen.enabled) {
                var e = N.supportsFullScreen;
                e || C.fullscreen.fallback && !$() ? ($e((e ? "Native" : "Fallback") + " fullscreen enabled"), e || m(Ye.container, C.classes.fullscreen.fallback, !0), m(Ye.container, C.classes.fullscreen.enabled, !0)) : $e("Fullscreen not supported and fallback disabled"), Ye.buttons && Ye.buttons.fullscreen && w(Ye.buttons.fullscreen, !1), J()
            }
        }

        function H() {
            if ("video" === Ye.type) {
                X(C.selectors.captions) || Ye.videoContainer.insertAdjacentHTML("afterbegin", '<div class="' + p(C.selectors.captions) + '"></div>'), Ye.usingTextTracks = !1, Ye.media.textTracks && (Ye.usingTextTracks = !0);
                for (var e, t = "", n = Ye.media.childNodes, r = 0; r < n.length; r++) "track" === n[r].nodeName.toLowerCase() && ("captions" !== (e = n[r].kind) && "subtitles" !== e || (t = n[r].getAttribute("src")));
                if (Ye.captionExists = !0, "" === t ? (Ye.captionExists = !1, $e("No caption track found")) : $e("Caption track found; URI: " + t), Ye.captionExists) {
                    for (var a = Ye.media.textTracks, s = 0; s < a.length; s++) a[s].mode = "hidden";
                    if (Y(), (Ye.browser.isIE && Ye.browser.version >= 10 || Ye.browser.isFirefox && Ye.browser.version >= 31) && ($e("Detected browser with known TextTrack issues - using manual fallback"), Ye.usingTextTracks = !1), Ye.usingTextTracks) {
                        $e("TextTracks supported");
                        for (var o = 0; o < a.length; o++) {
                            var i = a[o];
                            "captions" !== i.kind && "subtitles" !== i.kind || g(i, "cuechange", function() {
                                this.activeCues[0] && "text" in this.activeCues[0] ? U(this.activeCues[0].getCueAsHTML()) : U()
                            })
                        }
                    } else if ($e("TextTracks not supported so rendering captions manually"), Ye.currentCaption = "", Ye.captions = [], "" !== t) {
                        var l = new XMLHttpRequest;
                        l.onreadystatechange = function() {
                            if (4 === l.readyState)
                                if (200 === l.status) {
                                    var e, t = [],
                                        n = l.responseText,
                                        r = "\r\n"; - 1 === n.indexOf(r + r) && (r = -1 !== n.indexOf("\r\r") ? "\r" : "\n"), t = n.split(r + r);
                                    for (var a = 0; a < t.length; a++) {
                                        e = t[a], Ye.captions[a] = [];
                                        var s = e.split(r),
                                            o = 0; - 1 === s[o].indexOf(":") && (o = 1), Ye.captions[a] = [s[o], s[o + 1]]
                                    }
                                    Ye.captions.shift(), $e("Successfully loaded the caption file via AJAX")
                                } else Je(C.logPrefix + "There was a problem loading the caption file via AJAX")
                        }, l.open("get", t, !0), l.send()
                    }
                } else m(Ye.container, C.classes.captions.enabled)
            }
        }

        function U(e) {
            var n = X(C.selectors.captions),
                r = t.createElement("span");
            n.innerHTML = "", O.undefined(e) && (e = ""), O.string(e) ? r.innerHTML = e.trim() : r.appendChild(e), n.appendChild(r);
            n.offsetHeight
        }

        function W(e) {
            function t(e, t) {
                var n = [];
                n = e.split(" --\x3e ");
                for (var a = 0; a < n.length; a++) n[a] = n[a].replace(/(\d+:\d+:\d+\.\d+).*/, "$1");
                return r(n[t])
            }

            function n(e) {
                return t(e, 1)
            }

            function r(e) {
                if (null === e || void 0 === e) return 0;
                var t = [],
                    n = [];
                return t = e.split(","), n = t[0].split(":"), Math.floor(60 * n[0] * 60) + Math.floor(60 * n[1]) + Math.floor(n[2])
            }
            if (!Ye.usingTextTracks && "video" === Ye.type && Ye.supported.full && (Ye.subcount = 0, e = O.number(e) ? e : Ye.media.currentTime, Ye.captions[Ye.subcount])) {
                for (; n(Ye.captions[Ye.subcount][0]) < e.toFixed(1);)
                    if (Ye.subcount++, Ye.subcount > Ye.captions.length - 1) {
                        Ye.subcount = Ye.captions.length - 1;
                        break
                    }
                Ye.media.currentTime.toFixed(1) >= function(e) {
                    return t(e, 0)
                }(Ye.captions[Ye.subcount][0]) && Ye.media.currentTime.toFixed(1) <= n(Ye.captions[Ye.subcount][0]) ? (Ye.currentCaption = Ye.captions[Ye.subcount][1], U(Ye.currentCaption)) : U()
            }
        }

        function Y() {
            if (Ye.buttons.captions) {
                m(Ye.container, C.classes.captions.enabled, !0);
                var e = Ye.storage.captionsEnabled;
                O.boolean(e) || (e = C.captions.defaultActive), e && (m(Ye.container, C.classes.captions.active, !0), w(Ye.buttons.captions, !0))
            }
        }

        function B(e) {
            return Ye.container.querySelectorAll(e)
        }

        function X(e) {
            return B(e)[0]
        }

        function $() {
            try {
                return e.self !== e.top
            } catch (e) {
                return !0
            }
        }

        function J() {
            var e = B("input:not([disabled]), button:not([disabled])"),
                t = e[0],
                n = e[e.length - 1];
            g(Ye.container, "keydown", function(e) {
                9 === e.which && Ye.isFullscreen && (e.target !== n || e.shiftKey ? e.target === t && e.shiftKey && (e.preventDefault(), n.focus()) : (e.preventDefault(), t.focus()))
            })
        }

        function z(e, t) {
            if (O.string(t)) d(e, Ye.media, {
                src: t
            });
            else if (t.constructor === Array)
                for (var n = t.length - 1; n >= 0; n--) d(e, Ye.media, t[n])
        }

        function G() {
            if (C.loadSprite) {
                var e = V();
                e.absolute ? ($e("AJAX loading absolute SVG sprite" + (Ye.browser.isIE ? " (due to IE)" : "")), F(e.url, "sprite-plyr")) : $e("Sprite will be used as external resource directly")
            }
            var n = C.html;
            $e("Injecting custom controls"), n || (n = q()), n = o(n = o(n, "{seektime}", C.seekTime), "{id}", Math.floor(1e4 * Math.random())), C.title && (n = o(n, "{title}", C.title));
            var r;
            if (O.string(C.selectors.controls.container) && (r = t.querySelector(C.selectors.controls.container)), O.htmlElement(r) || (r = Ye.container), r.insertAdjacentHTML("beforeend", n), C.tooltips.controls)
                for (var a = B([C.selectors.controls.wrapper, " ", C.selectors.labels, " .", C.classes.hidden].join("")), s = a.length - 1; s >= 0; s--) {
                    var i = a[s];
                    m(i, C.classes.hidden, !1), m(i, C.classes.tooltip, !0)
                }
        }

        function K() {
            try {
                return Ye.controls = X(C.selectors.controls.wrapper), Ye.buttons = {}, Ye.buttons.seek = X(C.selectors.buttons.seek), Ye.buttons.play = B(C.selectors.buttons.play), Ye.buttons.pause = X(C.selectors.buttons.pause), Ye.buttons.restart = X(C.selectors.buttons.restart), Ye.buttons.rewind = X(C.selectors.buttons.rewind), Ye.buttons.forward = X(C.selectors.buttons.forward), Ye.buttons.fullscreen = X(C.selectors.buttons.fullscreen), Ye.buttons.mute = X(C.selectors.buttons.mute), Ye.buttons.captions = X(C.selectors.buttons.captions), Ye.progress = {}, Ye.progress.container = X(C.selectors.progress.container), Ye.progress.buffer = {}, Ye.progress.buffer.bar = X(C.selectors.progress.buffer), Ye.progress.buffer.text = Ye.progress.buffer.bar && Ye.progress.buffer.bar.getElementsByTagName("span")[0], Ye.progress.played = X(C.selectors.progress.played), Ye.progress.tooltip = Ye.progress.container && Ye.progress.container.querySelector("." + C.classes.tooltip), Ye.volume = {}, Ye.volume.input = X(C.selectors.volume.input), Ye.volume.display = X(C.selectors.volume.display), Ye.duration = X(C.selectors.duration), Ye.currentTime = X(C.selectors.currentTime), Ye.seekTime = B(C.selectors.seekTime), !0
            } catch (e) {
                return Je("It looks like there is a problem with your controls HTML"), Z(!0), !1
            }
        }

        function Q() {
            m(Ye.container, C.selectors.container.replace(".", ""), Ye.supported.full)
        }

        function Z(e) {
            e && s(C.types.html5, Ye.type) ? Ye.media.setAttribute("controls", "") : Ye.media.removeAttribute("controls")
        }

        function ee(e) {
            var t = C.i18n.play;
            if (O.string(C.title) && C.title.length && (t += ", " + C.title, Ye.container.setAttribute("aria-label", C.title)), Ye.supported.full && Ye.buttons.play)
                for (var n = Ye.buttons.play.length - 1; n >= 0; n--) Ye.buttons.play[n].setAttribute("aria-label", t);
            O.htmlElement(e) && e.setAttribute("title", C.i18n.frameTitle.replace("{title}", C.title))
        }

        function te() {
            var t = null;
            Ye.storage = {}, L.supported && C.storage.enabled && (e.localStorage.removeItem("plyr-volume"), (t = e.localStorage.getItem(C.storage.key)) && (/^\d+(\.\d+)?$/.test(t) ? ne({
                volume: parseFloat(t)
            }) : Ye.storage = JSON.parse(t)))
        }

        function ne(t) {
            L.supported && C.storage.enabled && (T(Ye.storage, t), e.localStorage.setItem(C.storage.key, JSON.stringify(Ye.storage)))
        }

        function re() {
            if (Ye.media) {
                if (Ye.supported.full && (m(Ye.container, C.classes.type.replace("{0}", Ye.type), !0), s(C.types.embed, Ye.type) && m(Ye.container, C.classes.type.replace("{0}", "video"), !0), m(Ye.container, C.classes.stopped, C.autoplay), m(Ye.container, C.classes.isIos, Ye.browser.isIos), m(Ye.container, C.classes.isTouch, Ye.browser.isTouch), "video" === Ye.type)) {
                    var e = t.createElement("div");
                    e.setAttribute("class", C.classes.videoWrapper), i(Ye.media, e), Ye.videoContainer = e
                }
                s(C.types.embed, Ye.type) && ae()
            } else Je("No media element found!")
        }

        function ae() {
            var n, r = t.createElement("div"),
                s = Ye.type + "-" + Math.floor(1e4 * Math.random());
            switch (Ye.type) {
                case "youtube":
                    n = S(Ye.embedId);
                    break;
                case "vimeo":
                    n = E(Ye.embedId);
                    break;
                default:
                    n = Ye.embedId
            }
            for (var o = B('[id^="' + Ye.type + '-"]'), i = o.length - 1; i >= 0; i--) l(o[i]);
            if (m(Ye.media, C.classes.videoWrapper, !0), m(Ye.media, C.classes.embedWrapper, !0), "youtube" === Ye.type) Ye.media.appendChild(r), r.setAttribute("id", s), O.object(e.YT) ? oe(n, r) : (a(C.urls.youtube.api), e.onYouTubeReadyCallbacks = e.onYouTubeReadyCallbacks || [], e.onYouTubeReadyCallbacks.push(function() {
                oe(n, r)
            }), e.onYouTubeIframeAPIReady = function() {
                e.onYouTubeReadyCallbacks.forEach(function(e) {
                    e()
                })
            });
            else if ("vimeo" === Ye.type)
                if (Ye.supported.full ? Ye.media.appendChild(r) : r = Ye.media, r.setAttribute("id", s), O.object(e.Vimeo)) ie(n, r);
                else {
                    a(C.urls.vimeo.api);
                    var u = e.setInterval(function() {
                        O.object(e.Vimeo) && (e.clearInterval(u), ie(n, r))
                    }, 50)
                }
            else if ("soundcloud" === Ye.type) {
                var d = t.createElement("iframe");
                d.loaded = !1, g(d, "load", function() {
                    d.loaded = !0
                }), c(d, {
                    src: "https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/" + n,
                    id: s
                }), r.appendChild(d), Ye.media.appendChild(r), e.SC || a(C.urls.soundcloud.api);
                var p = e.setInterval(function() {
                    e.SC && d.loaded && (e.clearInterval(p), le.call(d))
                }, 50)
            }
        }

        function se() {
            Ye.supported.full && (He(), Ue()), ee(X("iframe"))
        }

        function oe(t, n) {
            Ye.embed = new e.YT.Player(n.id, {
                videoId: t,
                playerVars: {
                    autoplay: C.autoplay ? 1 : 0,
                    controls: Ye.supported.full ? 0 : 1,
                    rel: 0,
                    showinfo: 0,
                    iv_load_policy: 3,
                    cc_load_policy: C.captions.defaultActive ? 1 : 0,
                    cc_lang_pref: "en",
                    wmode: "transparent",
                    modestbranding: 1,
                    disablekb: 1,
                    origin: "*"
                },
                events: {
                    onError: function(e) {
                        j(Ye.container, "error", !0, {
                            code: e.data,
                            embed: e.target
                        })
                    },
                    onReady: function(t) {
                        var n = t.target;
                        Ye.media.play = function() {
                            n.playVideo(), Ye.media.paused = !1
                        }, Ye.media.pause = function() {
                            n.pauseVideo(), Ye.media.paused = !0
                        }, Ye.media.stop = function() {
                            n.stopVideo(), Ye.media.paused = !0
                        }, Ye.media.duration = n.getDuration(), Ye.media.paused = !0, Ye.media.currentTime = 0, Ye.media.muted = n.isMuted(), "function" == typeof n.getVideoData && (C.title = n.getVideoData().title), Ye.supported.full && Ye.media.querySelector("iframe").setAttribute("tabindex", "-1"), se(), j(Ye.media, "timeupdate"), j(Ye.media, "durationchange"), e.clearInterval(Be.buffering), Be.buffering = e.setInterval(function() {
                            Ye.media.buffered = n.getVideoLoadedFraction(), (null === Ye.media.lastBuffered || Ye.media.lastBuffered < Ye.media.buffered) && j(Ye.media, "progress"), Ye.media.lastBuffered = Ye.media.buffered, 1 === Ye.media.buffered && (e.clearInterval(Be.buffering), j(Ye.media, "canplaythrough"))
                        }, 200)
                    },
                    onStateChange: function(t) {
                        var n = t.target;
                        switch (e.clearInterval(Be.playing), t.data) {
                            case 0:
                                Ye.media.paused = !0, j(Ye.media, "ended");
                                break;
                            case 1:
                                Ye.media.paused = !1, Ye.media.seeking && j(Ye.media, "seeked"), Ye.media.seeking = !1, j(Ye.media, "play"), j(Ye.media, "playing"), Be.playing = e.setInterval(function() {
                                    Ye.media.currentTime = n.getCurrentTime(), j(Ye.media, "timeupdate")
                                }, 100), Ye.media.duration !== n.getDuration() && (Ye.media.duration = n.getDuration(), j(Ye.media, "durationchange"));
                                break;
                            case 2:
                                Ye.media.paused = !0, j(Ye.media, "pause")
                        }
                        j(Ye.container, "statechange", !1, {
                            code: t.data
                        })
                    }
                }
            })
        }

        function ie(n, r) {
            var a = function(e) {
                    return Object.keys(e).map(function(t) {
                        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                    }).join("&")
                }({
                    loop: C.loop,
                    autoplay: C.autoplay,
                    byline: !1,
                    portrait: !1,
                    title: !1,
                    speed: !0,
                    transparent: 0
                }),
                s = t.createElement("iframe"),
                o = "https://player.vimeo.com/video/" + n + "?" + a;
            s.setAttribute("src", o), s.setAttribute("allowfullscreen", ""), r.appendChild(s), Ye.embed = new e.Vimeo.Player(s), Ye.media.play = function() {
                Ye.embed.play(), Ye.media.paused = !1
            }, Ye.media.pause = function() {
                Ye.embed.pause(), Ye.media.paused = !0
            }, Ye.media.stop = function() {
                Ye.embed.stop(), Ye.media.paused = !0
            }, Ye.media.paused = !0, Ye.media.currentTime = 0, se(), Ye.embed.getCurrentTime().then(function(e) {
                Ye.media.currentTime = e, j(Ye.media, "timeupdate")
            }), Ye.embed.getDuration().then(function(e) {
                Ye.media.duration = e, j(Ye.media, "durationchange")
            }), Ye.embed.on("loaded", function() {
                O.htmlElement(Ye.embed.element) && Ye.supported.full && Ye.embed.element.setAttribute("tabindex", "-1")
            }), Ye.embed.on("play", function() {
                Ye.media.paused = !1, j(Ye.media, "play"), j(Ye.media, "playing")
            }), Ye.embed.on("pause", function() {
                Ye.media.paused = !0, j(Ye.media, "pause")
            }), Ye.embed.on("timeupdate", function(e) {
                Ye.media.seeking = !1, Ye.media.currentTime = e.seconds, j(Ye.media, "timeupdate")
            }), Ye.embed.on("progress", function(e) {
                Ye.media.buffered = e.percent, j(Ye.media, "progress"), 1 === parseInt(e.percent) && j(Ye.media, "canplaythrough")
            }), Ye.embed.on("seeked", function() {
                Ye.media.seeking = !1, j(Ye.media, "seeked"), j(Ye.media, "play")
            }), Ye.embed.on("ended", function() {
                Ye.media.paused = !0, j(Ye.media, "ended")
            })
        }

        function le() {
            Ye.embed = e.SC.Widget(this), Ye.embed.bind(e.SC.Widget.Events.READY, function() {
                Ye.media.play = function() {
                    Ye.embed.play(), Ye.media.paused = !1
                }, Ye.media.pause = function() {
                    Ye.embed.pause(), Ye.media.paused = !0
                }, Ye.media.stop = function() {
                    Ye.embed.seekTo(0), Ye.embed.pause(), Ye.media.paused = !0
                }, Ye.media.paused = !0, Ye.media.currentTime = 0, Ye.embed.getDuration(function(e) {
                    Ye.media.duration = e / 1e3, se()
                }), Ye.embed.getPosition(function(e) {
                    Ye.media.currentTime = e, j(Ye.media, "timeupdate")
                }), Ye.embed.bind(e.SC.Widget.Events.PLAY, function() {
                    Ye.media.paused = !1, j(Ye.media, "play"), j(Ye.media, "playing")
                }), Ye.embed.bind(e.SC.Widget.Events.PAUSE, function() {
                    Ye.media.paused = !0, j(Ye.media, "pause")
                }), Ye.embed.bind(e.SC.Widget.Events.PLAY_PROGRESS, function(e) {
                    Ye.media.seeking = !1, Ye.media.currentTime = e.currentPosition / 1e3, j(Ye.media, "timeupdate")
                }), Ye.embed.bind(e.SC.Widget.Events.LOAD_PROGRESS, function(e) {
                    Ye.media.buffered = e.loadProgress, j(Ye.media, "progress"), 1 === parseInt(e.loadProgress) && j(Ye.media, "canplaythrough")
                }), Ye.embed.bind(e.SC.Widget.Events.FINISH, function() {
                    Ye.media.paused = !0, j(Ye.media, "ended")
                })
            })
        }

        function ue() {
            "play" in Ye.media && Ye.media.play()
        }

        function ce() {
            "pause" in Ye.media && Ye.media.pause()
        }

        function de(e) {
            return O.boolean(e) || (e = Ye.media.paused), e ? ue() : ce(), e
        }

        function pe(e) {
            O.number(e) || (e = C.seekTime), fe(Ye.media.currentTime - e)
        }

        function me(e) {
            O.number(e) || (e = C.seekTime), fe(Ye.media.currentTime + e)
        }

        function fe(e) {
            var t = 0,
                n = Ye.media.paused,
                r = ye();
            O.number(e) ? t = e : O.object(e) && s(["input", "change"], e.type) && (t = e.target.value / e.target.max * r), t < 0 ? t = 0 : t > r && (t = r), Pe(t);
            try {
                Ye.media.currentTime = t.toFixed(4)
            } catch (e) {}
            if (s(C.types.embed, Ye.type)) {
                switch (Ye.type) {
                    case "youtube":
                        Ye.embed.seekTo(t);
                        break;
                    case "vimeo":
                        Ye.embed.setCurrentTime(t.toFixed(0));
                        break;
                    case "soundcloud":
                        Ye.embed.seekTo(1e3 * t)
                }
                n && ce(), j(Ye.media, "timeupdate"), Ye.media.seeking = !0, j(Ye.media, "seeking")
            }
            $e("Seeking to " + Ye.media.currentTime + " seconds"), W(t)
        }

        function ye() {
            var e = parseInt(C.duration),
                t = 0;
            return null === Ye.media.duration || isNaN(Ye.media.duration) || (t = Ye.media.duration), isNaN(e) ? t : e
        }

        function be() {
            m(Ye.container, C.classes.playing, !Ye.media.paused), m(Ye.container, C.classes.stopped, Ye.media.paused), Oe(Ye.media.paused)
        }

        function ve() {
            P = {
                x: e.pageXOffset || 0,
                y: e.pageYOffset || 0
            }
        }

        function ge() {
            e.scrollTo(P.x, P.y)
        }

        function he(e) {
            var n = N.supportsFullScreen;
            if (n) {
                if (!e || e.type !== N.fullScreenEventName) return N.isFullScreen(Ye.container) ? N.cancelFullScreen() : (ve(), N.requestFullScreen(Ye.container)), void(Ye.isFullscreen = N.isFullScreen(Ye.container));
                Ye.isFullscreen = N.isFullScreen(Ye.container)
            } else Ye.isFullscreen = !Ye.isFullscreen, t.body.style.overflow = Ye.isFullscreen ? "hidden" : "";
            m(Ye.container, C.classes.fullscreen.active, Ye.isFullscreen), J(Ye.isFullscreen), Ye.buttons && Ye.buttons.fullscreen && w(Ye.buttons.fullscreen, Ye.isFullscreen), j(Ye.container, Ye.isFullscreen ? "enterfullscreen" : "exitfullscreen", !0), !Ye.isFullscreen && n && ge()
        }

        function ke(e) {
            if (O.boolean(e) || (e = !Ye.media.muted), w(Ye.buttons.mute, e), Ye.media.muted = e, 0 === Ye.media.volume && we(C.volume), s(C.types.embed, Ye.type)) {
                switch (Ye.type) {
                    case "youtube":
                        Ye.embed[Ye.media.muted ? "mute" : "unMute"]();
                        break;
                    case "vimeo":
                    case "soundcloud":
                        Ye.embed.setVolume(Ye.media.muted ? 0 : parseFloat(C.volume / C.volumeMax))
                }
                j(Ye.media, "volumechange")
            }
        }

        function we(e) {
            var t = C.volumeMax,
                n = C.volumeMin;
            if (O.undefined(e) && (e = Ye.storage.volume), (null === e || isNaN(e)) && (e = C.volume), e > t && (e = t), e < n && (e = n), Ye.media.volume = parseFloat(e / t), Ye.volume.display && (Ye.volume.display.value = e), s(C.types.embed, Ye.type)) {
                switch (Ye.type) {
                    case "youtube":
                        Ye.embed.setVolume(100 * Ye.media.volume);
                        break;
                    case "vimeo":
                    case "soundcloud":
                        Ye.embed.setVolume(Ye.media.volume)
                }
                j(Ye.media, "volumechange")
            }
            0 === e ? Ye.media.muted = !0 : Ye.media.muted && e > 0 && ke()
        }

        function xe(e) {
            var t = Ye.media.muted ? 0 : Ye.media.volume * C.volumeMax;
            O.number(e) || (e = C.volumeStep), we(t + e)
        }

        function Te(e) {
            var t = Ye.media.muted ? 0 : Ye.media.volume * C.volumeMax;
            O.number(e) || (e = C.volumeStep), we(t - e)
        }

        function Se() {
            var e = Ye.media.muted ? 0 : Ye.media.volume * C.volumeMax;
            Ye.supported.full && (Ye.volume.input && (Ye.volume.input.value = e), Ye.volume.display && (Ye.volume.display.value = e)), ne({
                volume: e
            }), m(Ye.container, C.classes.muted, 0 === e), Ye.supported.full && Ye.buttons.mute && w(Ye.buttons.mute, 0 === e)
        }

        function Ee(e) {
            Ye.supported.full && Ye.buttons.captions && (O.boolean(e) || (e = -1 === Ye.container.className.indexOf(C.classes.captions.active)), Ye.captionsEnabled = e, w(Ye.buttons.captions, Ye.captionsEnabled), m(Ye.container, C.classes.captions.active, Ye.captionsEnabled), j(Ye.container, Ye.captionsEnabled ? "captionsenabled" : "captionsdisabled", !0), ne({
                captionsEnabled: Ye.captionsEnabled
            }))
        }

        function _e(e) {
            var t = "waiting" === e.type;
            clearTimeout(Be.loading), Be.loading = setTimeout(function() {
                m(Ye.container, C.classes.loading, t), Oe(t)
            }, t ? 250 : 0)
        }

        function Ce(e) {
            if (Ye.supported.full) {
                var t = Ye.progress.played,
                    n = 0,
                    r = ye();
                if (e) switch (e.type) {
                    case "timeupdate":
                    case "seeking":
                        if (Ye.controls.pressed) return;
                        n = x(Ye.media.currentTime, r), "timeupdate" === e.type && Ye.buttons.seek && (Ye.buttons.seek.value = n);
                        break;
                    case "playing":
                    case "progress":
                        t = Ye.progress.buffer, n = function() {
                            var e = Ye.media.buffered;
                            return e && e.length ? x(e.end(0), r) : O.number(e) ? 100 * e : 0
                        }()
                }
                Fe(t, n)
            }
        }

        function Fe(e, t) {
            if (Ye.supported.full) {
                if (O.undefined(t) && (t = 0), O.undefined(e)) {
                    if (!Ye.progress || !Ye.progress.buffer) return;
                    e = Ye.progress.buffer
                }
                O.htmlElement(e) ? e.value = t : e && (e.bar && (e.bar.value = t), e.text && (e.text.innerHTML = t))
            }
        }

        function Ae(e, t) {
            if (t) {
                isNaN(e) && (e = 0), Ye.secs = parseInt(e % 60), Ye.mins = parseInt(e / 60 % 60), Ye.hours = parseInt(e / 60 / 60 % 60);
                var n = parseInt(ye() / 60 / 60 % 60) > 0;
                Ye.secs = ("0" + Ye.secs).slice(-2), Ye.mins = ("0" + Ye.mins).slice(-2), t.innerHTML = (n ? Ye.hours + ":" : "") + Ye.mins + ":" + Ye.secs
            }
        }

        function Ie() {
            if (Ye.supported.full) {
                var e = ye() || 0;
                !Ye.duration && C.displayDuration && Ye.media.paused && Ae(e, Ye.currentTime), Ye.duration && Ae(e, Ye.duration), Me()
            }
        }

        function Ne(e) {
            Ae(Ye.media.currentTime, Ye.currentTime), e && "timeupdate" === e.type && Ye.media.seeking || Ce(e)
        }

        function Pe(e) {
            O.number(e) || (e = 0);
            var t = x(e, ye());
            Ye.progress && Ye.progress.played && (Ye.progress.played.value = t), Ye.buttons && Ye.buttons.seek && (Ye.buttons.seek.value = t)
        }

        function Me(e) {
            var t = ye();
            if (C.tooltips.seek && Ye.progress.container && 0 !== t) {
                var n = Ye.progress.container.getBoundingClientRect(),
                    r = 0,
                    a = C.classes.tooltip + "--visible";
                if (e) r = 100 / n.width * (e.pageX - n.left);
                else {
                    if (!f(Ye.progress.tooltip, a)) return;
                    r = Ye.progress.tooltip.style.left.replace("%", "")
                }
                r < 0 ? r = 0 : r > 100 && (r = 100), Ae(t / 100 * r, Ye.progress.tooltip), Ye.progress.tooltip.style.left = r + "%", e && s(["mouseenter", "mouseleave"], e.type) && m(Ye.progress.tooltip, a, "mouseenter" === e.type)
            }
        }

        function Oe(t) {
            if (C.hideControls && "audio" !== Ye.type) {
                var n = 0,
                    r = !1,
                    a = t,
                    o = f(Ye.container, C.classes.loading);
                if (O.boolean(t) || (t && t.type ? (r = "enterfullscreen" === t.type, a = s(["mousemove", "touchstart", "mouseenter", "focus"], t.type), s(["mousemove", "touchmove"], t.type) && (n = 2e3), "focus" === t.type && (n = 3e3)) : a = f(Ye.container, C.classes.hideControls)), e.clearTimeout(Be.hover), a || Ye.media.paused || o) {
                    if (m(Ye.container, C.classes.hideControls, !1), Ye.media.paused || o) return;
                    Ye.browser.isTouch && (n = 3e3)
                }
                a && Ye.media.paused || (Be.hover = e.setTimeout(function() {
                    (!Ye.controls.pressed && !Ye.controls.hover || r) && m(Ye.container, C.classes.hideControls, !0)
                }, n))
            }
        }

        function Le(e) {
            O.object(e) && "sources" in e && e.sources.length ? (m(Ye.container, C.classes.ready, !1), ce(), Pe(), Fe(), qe(), De(function() {
                if (Ye.embed = null, l(Ye.media), "video" === Ye.type && Ye.videoContainer && l(Ye.videoContainer), Ye.container && Ye.container.removeAttribute("class"), "type" in e && (Ye.type = e.type, "video" === Ye.type)) {
                    var n = e.sources[0];
                    "type" in n && s(C.types.embed, n.type) && (Ye.type = n.type)
                }
                switch (Ye.supported = A(Ye.type), Ye.type) {
                    case "video":
                        Ye.media = t.createElement("video");
                        break;
                    case "audio":
                        Ye.media = t.createElement("audio");
                        break;
                    case "youtube":
                    case "vimeo":
                    case "soundcloud":
                        Ye.media = t.createElement("div"), Ye.embedId = e.sources[0].src
                }
                u(Ye.container, Ye.media), O.boolean(e.autoplay) && (C.autoplay = e.autoplay), s(C.types.html5, Ye.type) && (C.crossorigin && Ye.media.setAttribute("crossorigin", ""), C.autoplay && Ye.media.setAttribute("autoplay", ""), "poster" in e && Ye.media.setAttribute("poster", e.poster), C.loop && Ye.media.setAttribute("loop", "")), m(Ye.container, C.classes.fullscreen.active, Ye.isFullscreen), m(Ye.container, C.classes.captions.active, Ye.captionsEnabled), Q(), s(C.types.html5, Ye.type) && z("source", e.sources), re(), s(C.types.html5, Ye.type) && ("tracks" in e && z("track", e.tracks), Ye.media.load()), (s(C.types.html5, Ye.type) || s(C.types.embed, Ye.type) && !Ye.supported.full) && (He(), Ue()), C.title = e.title, ee()
            }, !1)) : Je("Invalid source format")
        }

        function je() {
            m(X("." + C.classes.tabFocus), C.classes.tabFocus, !1)
        }

        function Re() {
            function n() {
                var e = de(),
                    t = Ye.buttons[e ? "play" : "pause"],
                    n = Ye.buttons[e ? "pause" : "play"];
                if (n && (n = n.length > 1 ? n[n.length - 1] : n[0]), n) {
                    var r = f(t, C.classes.tabFocus);
                    setTimeout(function() {
                        n.focus(), r && (m(t, C.classes.tabFocus, !1), m(n, C.classes.tabFocus, !0))
                    }, 100)
                }
            }

            function r() {
                var e = t.activeElement;
                return e = e && e !== t.body ? t.querySelector(":focus") : null
            }

            function a(e) {
                return e.keyCode ? e.keyCode : e.which
            }

            function o(e) {
                for (var t in Ye.buttons) {
                    var n = Ye.buttons[t];
                    if (O.nodeList(n))
                        for (var r = 0; r < n.length; r++) m(n[r], C.classes.tabFocus, n[r] === e);
                    else m(n, C.classes.tabFocus, n === e)
                }
            }

            function i(e) {
                var t = a(e),
                    n = "keydown" === e.type,
                    r = n && t === u;
                if (O.number(t))
                    if (n) {
                        switch (s([48, 49, 50, 51, 52, 53, 54, 56, 57, 32, 75, 38, 40, 77, 39, 37, 70, 67], t) && (e.preventDefault(), e.stopPropagation()), t) {
                            case 48:
                            case 49:
                            case 50:
                            case 51:
                            case 52:
                            case 53:
                            case 54:
                            case 55:
                            case 56:
                            case 57:
                                r || function() {
                                    var e = Ye.media.duration;
                                    O.number(e) && fe(e / 10 * (t - 48))
                                }();
                                break;
                            case 32:
                            case 75:
                                r || de();
                                break;
                            case 38:
                                xe();
                                break;
                            case 40:
                                Te();
                                break;
                            case 77:
                                r || ke();
                                break;
                            case 39:
                                me();
                                break;
                            case 37:
                                pe();
                                break;
                            case 70:
                                he();
                                break;
                            case 67:
                                r || Ee()
                        }!N.supportsFullScreen && Ye.isFullscreen && 27 === t && he(), u = t
                    } else u = null
            }
            var l = Ye.browser.isIE ? "change" : "input";
            if (C.keyboardShorcuts.focused) {
                var u = null;
                C.keyboardShorcuts.global && g(e, "keydown keyup", function(e) {
                    var t = a(e),
                        n = r();
                    1 !== I().length || !s([48, 49, 50, 51, 52, 53, 54, 56, 57, 75, 77, 70, 67], t) || O.htmlElement(n) && y(n, C.selectors.editable) || i(e)
                }), g(Ye.container, "keydown keyup", i)
            }
            g(e, "keyup", function(e) {
                var t = a(e),
                    n = r();
                9 === t && o(n)
            }), g(t.body, "click", je);
            for (var c in Ye.buttons) {
                var d = Ye.buttons[c];
                g(d, "blur", function() {
                    m(d, "tab-focus", !1)
                })
            }
            b(Ye.buttons.play, "click", C.listeners.play, n), b(Ye.buttons.pause, "click", C.listeners.pause, n), b(Ye.buttons.restart, "click", C.listeners.restart, fe), b(Ye.buttons.rewind, "click", C.listeners.rewind, pe), b(Ye.buttons.forward, "click", C.listeners.forward, me), b(Ye.buttons.seek, l, C.listeners.seek, fe), b(Ye.volume.input, l, C.listeners.volume, function() {
                we(Ye.volume.input.value)
            }), b(Ye.buttons.mute, "click", C.listeners.mute, ke), b(Ye.buttons.fullscreen, "click", C.listeners.fullscreen, he), N.supportsFullScreen && g(t, N.fullScreenEventName, he), b(Ye.buttons.captions, "click", C.listeners.captions, Ee), g(Ye.progress.container, "mouseenter mouseleave mousemove", Me), C.hideControls && (g(Ye.container, "mouseenter mouseleave mousemove touchstart touchend touchcancel touchmove enterfullscreen", Oe), g(Ye.controls, "mouseenter mouseleave", function(e) {
                Ye.controls.hover = "mouseenter" === e.type
            }), g(Ye.controls, "mousedown mouseup touchstart touchend touchcancel", function(e) {
                Ye.controls.pressed = s(["mousedown", "touchstart"], e.type)
            }), g(Ye.controls, "focus blur", Oe, !0)), g(Ye.volume.input, "wheel", function(e) {
                e.preventDefault();
                var t = e.webkitDirectionInvertedFromDevice,
                    n = C.volumeStep / 5;
                (e.deltaY < 0 || e.deltaX > 0) && (t ? Te(n) : xe(n)), (e.deltaY > 0 || e.deltaX < 0) && (t ? xe(n) : Te(n))
            })
        }

        function Ve() {
            if (g(Ye.media, "timeupdate seeking", Ne), g(Ye.media, "timeupdate", W), g(Ye.media, "durationchange loadedmetadata", Ie), g(Ye.media, "ended", function() {
                    "video" === Ye.type && C.showPosterOnEnd && ("video" === Ye.type && U(), fe(), Ye.media.load())
                }), g(Ye.media, "progress playing", Ce), g(Ye.media, "volumechange", Se), g(Ye.media, "play pause ended", be), g(Ye.media, "waiting canplay seeked", _e), C.clickToPlay && "audio" !== Ye.type) {
                var e = X("." + C.classes.videoWrapper);
                if (!e) return;
                e.style.cursor = "pointer", g(e, "click", function() {
                    C.hideControls && Ye.browser.isTouch && !Ye.media.paused || (Ye.media.paused ? ue() : Ye.media.ended ? (fe(), ue()) : ce())
                })
            }
            C.disableContextMenu && g(Ye.media, "contextmenu", function(e) {
                e.preventDefault()
            }), g(Ye.media, C.events.concat(["keyup", "keydown"]).join(" "), function(e) {
                j(Ye.container, e.type, !0)
            })
        }

        function qe() {
            if (s(C.types.html5, Ye.type)) {
                for (var e = Ye.media.querySelectorAll("source"), t = 0; t < e.length; t++) l(e[t]);
                Ye.media.setAttribute("src", C.blankUrl), Ye.media.load(), $e("Cancelled network requests")
            }
        }

        function De(n, r) {
            function a() {
                clearTimeout(Be.cleanUp), O.boolean(r) || (r = !0), O.function(n) && n.call(Xe), r && (Ye.init = !1, Ye.container.parentNode.replaceChild(Xe, Ye.container), Ye.container = null, t.body.style.overflow = "", h(t.body, "click", je), j(Xe, "destroyed", !0))
            }
            if (!Ye.init) return null;
            switch (Ye.type) {
                case "youtube":
                    e.clearInterval(Be.buffering), e.clearInterval(Be.playing), Ye.embed.destroy(), a();
                    break;
                case "vimeo":
                    Ye.embed.unload().then(a), Be.cleanUp = e.setTimeout(a, 200);
                    break;
                case "video":
                case "audio":
                    Z(!0), a()
            }
        }

        function He() {
            if (!Ye.supported.full) return Je("Basic support only", Ye.type), l(X(C.selectors.controls.wrapper)), l(X(C.selectors.buttons.play)), void Z(!0);
            var e = !B(C.selectors.controls.wrapper).length;
            e && G(), K() && (e && Re(), Ve(), Z(), D(), H(), we(), Se(), Ne(), be(), Ie())
        }

        function Ue() {
            e.setTimeout(function() {
                j(Ye.media, "ready")
            }, 0), m(Ye.media, M.classes.setup, !0), m(Ye.container, C.classes.ready, !0), Ye.media.plyr = We, C.autoplay && ue()
        }
        var We, Ye = this,
            Be = {};
        Ye.media = v;
        var Xe = v.cloneNode(!0),
            $e = function() {
                R("log", arguments)
            },
            Je = function() {
                R("warn", arguments)
            };
        return $e("Config", C), We = {
                getOriginal: function() {
                    return Xe
                },
                getContainer: function() {
                    return Ye.container
                },
                getEmbed: function() {
                    return Ye.embed
                },
                getMedia: function() {
                    return Ye.media
                },
                getType: function() {
                    return Ye.type
                },
                getDuration: ye,
                getCurrentTime: function() {
                    return Ye.media.currentTime
                },
                getVolume: function() {
                    return Ye.media.volume
                },
                isMuted: function() {
                    return Ye.media.muted
                },
                isReady: function() {
                    return f(Ye.container, C.classes.ready)
                },
                isLoading: function() {
                    return f(Ye.container, C.classes.loading)
                },
                isPaused: function() {
                    return Ye.media.paused
                },
                on: function(e, t) {
                    return g(Ye.container, e, t), this
                },
                play: ue,
                pause: ce,
                stop: function() {
                    ce(), fe()
                },
                restart: fe,
                rewind: pe,
                forward: me,
                seek: fe,
                source: function(e) {
                    if (O.undefined(e)) {
                        var t;
                        switch (Ye.type) {
                            case "youtube":
                                t = Ye.embed.getVideoUrl();
                                break;
                            case "vimeo":
                                Ye.embed.getVideoUrl.then(function(e) {
                                    t = e
                                });
                                break;
                            case "soundcloud":
                                Ye.embed.getCurrentSound(function(e) {
                                    t = e.permalink_url
                                });
                                break;
                            default:
                                t = Ye.media.currentSrc
                        }
                        return t || ""
                    }
                    Le(e)
                },
                poster: function(e) {
                    "video" === Ye.type && Ye.media.setAttribute("poster", e)
                },
                setVolume: we,
                togglePlay: de,
                toggleMute: ke,
                toggleCaptions: Ee,
                toggleFullscreen: he,
                toggleControls: Oe,
                isFullscreen: function() {
                    return Ye.isFullscreen || !1
                },
                support: function(e) {
                    return r(Ye, e)
                },
                destroy: De
            },
            function() {
                if (Ye.init) return null;
                if (N = _(), Ye.browser = n(), O.htmlElement(Ye.media)) {
                    te();
                    var e = v.tagName.toLowerCase();
                    "div" === e ? (Ye.type = v.getAttribute("data-type"), Ye.embedId = v.getAttribute("data-video-id"), v.removeAttribute("data-type"), v.removeAttribute("data-video-id")) : (Ye.type = e, C.crossorigin = null !== v.getAttribute("crossorigin"), C.autoplay = C.autoplay || null !== v.getAttribute("autoplay"), C.loop = C.loop || null !== v.getAttribute("loop")), Ye.supported = A(Ye.type), Ye.supported.basic && (Ye.container = i(v, t.createElement("div")), Ye.container.setAttribute("tabindex", 0), Q(), $e(Ye.browser.name + " " + Ye.browser.version), re(), (s(C.types.html5, Ye.type) || s(C.types.embed, Ye.type) && !Ye.supported.full) && (He(), Ue(), ee()), Ye.init = !0)
                }
            }(), Ye.init ? We : null
    }

    function F(e, n) {
        var r = new XMLHttpRequest;
        if (!O.string(n) || !O.htmlElement(t.querySelector("#" + n))) {
            var a = t.createElement("div");
            a.setAttribute("hidden", ""), O.string(n) && a.setAttribute("id", n), t.body.insertBefore(a, t.body.childNodes[0]), "withCredentials" in r && (r.open("GET", e, !0), r.onload = function() {
                a.innerHTML = r.responseText
            }, r.send())
        }
    }

    function A(e) {
        var r = n(),
            a = r.isIE && r.version <= 9,
            s = r.isIos,
            o = r.isIphone,
            i = !!t.createElement("audio").canPlayType,
            l = !!t.createElement("video").canPlayType,
            u = !1,
            c = !1;
        switch (e) {
            case "video":
                c = (u = l) && !a && !o;
                break;
            case "audio":
                c = (u = i) && !a;
                break;
            case "vimeo":
                u = !0, c = !a && !s;
                break;
            case "youtube":
                u = !0, c = !a && !s, s && !o && r.version >= 10 && (c = !0);
                break;
            case "soundcloud":
                u = !0, c = !a && !o;
                break;
            default:
                c = (u = i && l) && !a
        }
        return {
            basic: u,
            full: c
        }
    }

    function I(e) {
        if (O.string(e) ? e = t.querySelector(e) : O.undefined(e) && (e = t.body), O.htmlElement(e)) {
            var n = e.querySelectorAll("." + M.classes.setup),
                r = [];
            return Array.prototype.slice.call(n).forEach(function(e) {
                O.object(e.plyr) && r.push(e.plyr)
            }), r
        }
        return []
    }
    var N, P = {
            x: 0,
            y: 0
        },
        M = {
            enabled: !0,
            debug: !1,
            autoplay: !1,
            loop: !1,
            seekTime: 10,
            volume: 10,
            volumeMin: 0,
            volumeMax: 10,
            volumeStep: 1,
            duration: null,
            displayDuration: !0,
            loadSprite: !0,
            iconPrefix: "plyr",
            iconUrl: "https://cdn.plyr.io/2.0.17/plyr.svg",
            blankUrl: "https://cdn.plyr.io/static/blank.mp4",
            clickToPlay: !0,
            hideControls: !0,
            showPosterOnEnd: !1,
            disableContextMenu: !0,
            keyboardShorcuts: {
                focused: !0,
                global: !1
            },
            tooltips: {
                controls: !1,
                seek: !0
            },
            selectors: {
                html5: "video, audio",
                embed: "[data-type]",
                editable: "input, textarea, select, [contenteditable]",
                container: ".plyr",
                controls: {
                    container: null,
                    wrapper: ".plyr__controls"
                },
                labels: "[data-plyr]",
                buttons: {
                    seek: '[data-plyr="seek"]',
                    play: '[data-plyr="play"]',
                    pause: '[data-plyr="pause"]',
                    restart: '[data-plyr="restart"]',
                    rewind: '[data-plyr="rewind"]',
                    forward: '[data-plyr="fast-forward"]',
                    mute: '[data-plyr="mute"]',
                    captions: '[data-plyr="captions"]',
                    fullscreen: '[data-plyr="fullscreen"]'
                },
                volume: {
                    input: '[data-plyr="volume"]',
                    display: ".plyr__volume--display"
                },
                progress: {
                    container: ".plyr__progress",
                    buffer: ".plyr__progress--buffer",
                    played: ".plyr__progress--played"
                },
                captions: ".plyr__captions",
                currentTime: ".plyr__time--current",
                duration: ".plyr__time--duration"
            },
            classes: {
                setup: "plyr--setup",
                ready: "plyr--ready",
                videoWrapper: "plyr__video-wrapper",
                embedWrapper: "plyr__video-embed",
                type: "plyr--{0}",
                stopped: "plyr--stopped",
                playing: "plyr--playing",
                muted: "plyr--muted",
                loading: "plyr--loading",
                hover: "plyr--hover",
                tooltip: "plyr__tooltip",
                hidden: "plyr__sr-only",
                hideControls: "plyr--hide-controls",
                isIos: "plyr--is-ios",
                isTouch: "plyr--is-touch",
                captions: {
                    enabled: "plyr--captions-enabled",
                    active: "plyr--captions-active"
                },
                fullscreen: {
                    enabled: "plyr--fullscreen-enabled",
                    fallback: "plyr--fullscreen-fallback",
                    active: "plyr--fullscreen-active"
                },
                tabFocus: "tab-focus"
            },
            captions: {
                defaultActive: !1
            },
            fullscreen: {
                enabled: !0,
                fallback: !0,
                allowAudio: !1
            },
            storage: {
                enabled: !0,
                key: "plyr"
            },
            controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "fullscreen"],
            i18n: {
                restart: "Restart",
                rewind: "Rewind {seektime} secs",
                play: "Play",
                pause: "Pause",
                forward: "Forward {seektime} secs",
                played: "played",
                buffered: "buffered",
                currentTime: "Current time",
                duration: "Duration",
                volume: "Volume",
                toggleMute: "Toggle Mute",
                toggleCaptions: "Toggle Captions",
                toggleFullscreen: "Toggle Fullscreen",
                frameTitle: "Player for {title}"
            },
            types: {
                embed: ["youtube", "vimeo", "soundcloud"],
                html5: ["video", "audio"]
            },
            urls: {
                vimeo: {
                    api: "https://player.vimeo.com/api/player.js"
                },
                youtube: {
                    api: "https://www.youtube.com/iframe_api"
                },
                soundcloud: {
                    api: "https://w.soundcloud.com/player/api.js"
                }
            },
            listeners: {
                seek: null,
                play: null,
                pause: null,
                restart: null,
                rewind: null,
                forward: null,
                mute: null,
                volume: null,
                captions: null,
                fullscreen: null
            },
            events: ["ready", "ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied"],
            logPrefix: "[Plyr]"
        },
        O = {
            object: function(e) {
                return null !== e && "object" == typeof e
            },
            array: function(e) {
                return null !== e && "object" == typeof e && e.constructor === Array
            },
            number: function(e) {
                return null !== e && ("number" == typeof e && !isNaN(e - 0) || "object" == typeof e && e.constructor === Number)
            },
            string: function(e) {
                return null !== e && ("string" == typeof e || "object" == typeof e && e.constructor === String)
            },
            boolean: function(e) {
                return null !== e && "boolean" == typeof e
            },
            nodeList: function(e) {
                return null !== e && e instanceof NodeList
            },
            htmlElement: function(e) {
                return null !== e && e instanceof HTMLElement
            },
            function: function(e) {
                return null !== e && "function" == typeof e
            },
            undefined: function(e) {
                return null !== e && void 0 === e
            }
        },
        L = {
            supported: function() {
                try {
                    e.localStorage.setItem("___test", "OK");
                    var t = e.localStorage.getItem("___test");
                    return e.localStorage.removeItem("___test"), "OK" === t
                } catch (e) {
                    return !1
                }
                return !1
            }()
        };
    return {
        setup: function(e, n) {
            function r(e, t) {
                f(t, M.classes.hook) || a.push({
                    target: e,
                    media: t
                })
            }
            var a = [],
                s = [],
                o = [M.selectors.html5, M.selectors.embed].join(",");
            if (O.string(e) ? e = t.querySelectorAll(e) : O.htmlElement(e) ? e = [e] : O.nodeList(e) || O.array(e) || O.string(e) || (O.undefined(n) && O.object(e) && (n = e), e = t.querySelectorAll(o)), O.nodeList(e) && (e = Array.prototype.slice.call(e)), !A().basic || !e.length) return !1;
            for (var i = 0; i < e.length; i++) {
                var l = e[i],
                    u = l.querySelectorAll(o);
                if (u.length)
                    for (var c = 0; c < u.length; c++) r(l, u[c]);
                else y(l, o) && r(l, l)
            }
            return a.forEach(function(e) {
                var t = e.target,
                    r = e.media,
                    a = {};
                try {
                    a = JSON.parse(t.getAttribute("data-plyr"))
                } catch (e) {}
                var o = T({}, M, n, a);
                if (!o.enabled) return null;
                var i = new C(r, o);
                if (O.object(i)) {
                    if (o.debug) {
                        var l = o.events.concat(["setup", "statechange", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled"]);
                        g(i.getContainer(), l.join(" "), function(e) {
                            console.log([o.logPrefix, "event:", e.type].join(" "), e.detail.plyr)
                        })
                    }
                    k(i.getContainer(), "setup", !0, {
                        plyr: i
                    }), s.push(i)
                }
            }), s
        },
        supported: A,
        loadSprite: F,
        get: I
    }
}),
function() {
    function e(e, t) {
        t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n
    }
    "function" != typeof window.CustomEvent && (e.prototype = window.Event.prototype, window.CustomEvent = e)
}();
/*-----------------------------------------------------------------------------------*/
/*	07. WAYPOINTS
/*-----------------------------------------------------------------------------------*/
// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function() {
    var t = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        },
        e = [].slice;
    (function(t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function(n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function(n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {
            horizontal: {},
            vertical: {}
        };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function() {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {
                    x: t.scrollLeft(),
                    y: t.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function() {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function() {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function() {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function() {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }
            t.prototype.doScroll = function() {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function(t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function(t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function(t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll
                }
            };
            t.prototype.refresh = function() {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function(t, e) {
                    return n.each(i.waypoints[t], function(t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function() {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function() {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function() {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }
            t.prototype.trigger = function(t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function() {
                return this.enabled = false
            };
            t.prototype.enable = function() {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function() {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function(t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function(t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function(t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function() {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            },
            disable: function() {
                return d._invoke(this, "disable")
            },
            enable: function() {
                return d._invoke(this, "enable")
            },
            destroy: function() {
                return d._invoke(this, "destroy")
            },
            prev: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            },
            next: function(t, e) {
                return d._traverse.call(this, t, e, function(t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            },
            _traverse: function(t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function() {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            },
            _invoke: function(t, e) {
                t.each(function() {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function(t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function() {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function() {
                return n.each(a, function(t, e) {
                    return e.refresh()
                })
            },
            viewportHeight: function() {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            },
            aggregate: function(t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {
                    horizontal: [],
                    vertical: []
                };
                n.each(r, function(t, i) {
                    n.each(e[t], function(t, e) {
                        return i.push(e)
                    });
                    i.sort(function(t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function(t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            },
            above: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset <= t.oldScroll.y
                })
            },
            below: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function(t, e) {
                    return e.offset > t.oldScroll.y
                })
            },
            left: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset <= t.oldScroll.x
                })
            },
            right: function(t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function(t, e) {
                    return e.offset > t.oldScroll.x
                })
            },
            enable: function() {
                return h._invoke("enable")
            },
            disable: function() {
                return h._invoke("disable")
            },
            destroy: function() {
                return h._invoke("destroy")
            },
            extendFn: function(t, e) {
                return d[t] = e
            },
            _invoke: function(t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function(e, n) {
                    n[t]();
                    return true
                })
            },
            _filter: function(t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function(t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function(t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function(t) {
                    return t.element
                })
            }
        };
        n[m] = function() {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {
            resizeThrottle: 100,
            scrollThrottle: 30
        };
        return i.load(function() {
            return n[m]("refresh")
        })
    })
}).call(this);
/*-----------------------------------------------------------------------------------*/
/*	08. COUNTER UP
/*-----------------------------------------------------------------------------------*/
/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */
(function(e) {
    "use strict";
    e.fn.counterUp = function(t) {
        var n = e.extend({
            time: 400,
            delay: 10
        }, t);
        return this.each(function() {
            var t = e(this),
                r = n,
                i = function() {
                    var e = [],
                        n = r.time / r.delay,
                        i = t.text(),
                        s = /[0-9]+,[0-9]+/.test(i);
                    i = i.replace(/,/g, "");
                    var o = /^[0-9]+$/.test(i),
                        u = /^[0-9]+\.[0-9]+$/.test(i),
                        a = u ? (i.split(".")[1] || []).length : 0;
                    for (var f = n; f >= 1; f--) {
                        var l = parseInt(i / n * f);
                        u && (l = parseFloat(i / n * f).toFixed(a));
                        if (s)
                            while (/(\d+)(\d{3})/.test(l.toString())) l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                        e.unshift(l)
                    }
                    t.data("counterup-nums", e);
                    t.text("0");
                    var c = function() {
                        t.text(t.data("counterup-nums").shift());
                        if (t.data("counterup-nums").length) setTimeout(t.data("counterup-func"), r.delay);
                        else {
                            delete t.data("counterup-nums");
                            t.data("counterup-nums", null);
                            t.data("counterup-func", null)
                        }
                    };
                    t.data("counterup-func", c);
                    setTimeout(t.data("counterup-func"), r.delay)
                };
            t.waypoint(i, {
                offset: "100%",
                triggerOnce: !0
            })
        })
    }
})(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	09. PROGRESSBAR
/*-----------------------------------------------------------------------------------*/
// ProgressBar.js 1.0.1
// https://kimmobrunfeldt.github.io/progressbar.js
// License: MIT

! function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.ProgressBar = a()
    }
}(function() {
    var a;
    return function b(a, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!a[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                a[g][0].call(k.exports, function(b) {
                    var c = a[g][1][b];
                    return e(c ? c : b)
                }, k, k.exports, b, a, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(b, c, d) {
            (function() {
                var b = this || Function("return this")(),
                    e = function() {
                        "use strict";

                        function e() {}

                        function f(a, b) {
                            var c;
                            for (c in a) Object.hasOwnProperty.call(a, c) && b(c)
                        }

                        function g(a, b) {
                            return f(b, function(c) {
                                a[c] = b[c]
                            }), a
                        }

                        function h(a, b) {
                            f(b, function(c) {
                                "undefined" == typeof a[c] && (a[c] = b[c])
                            })
                        }

                        function i(a, b, c, d, e, f, g) {
                            var h, i, k, l = f > a ? 0 : (a - f) / e;
                            for (h in b) b.hasOwnProperty(h) && (i = g[h], k = "function" == typeof i ? i : o[i], b[h] = j(c[h], d[h], k, l));
                            return b
                        }

                        function j(a, b, c, d) {
                            return a + (b - a) * c(d)
                        }

                        function k(a, b) {
                            var c = n.prototype.filter,
                                d = a._filterArgs;
                            f(c, function(e) {
                                "undefined" != typeof c[e][b] && c[e][b].apply(a, d)
                            })
                        }

                        function l(a, b, c, d, e, f, g, h, j, l, m) {
                            v = b + c + d, w = Math.min(m || u(), v), x = w >= v, y = d - (v - w), a.isPlaying() && (x ? (j(g, a._attachment, y), a.stop(!0)) : (a._scheduleId = l(a._timeoutHandler, s), k(a, "beforeTween"), b + c > w ? i(1, e, f, g, 1, 1, h) : i(w, e, f, g, d, b + c, h), k(a, "afterTween"), j(e, a._attachment, y)))
                        }

                        function m(a, b) {
                            var c = {},
                                d = typeof b;
                            return "string" === d || "function" === d ? f(a, function(a) {
                                c[a] = b
                            }) : f(a, function(a) {
                                c[a] || (c[a] = b[a] || q)
                            }), c
                        }

                        function n(a, b) {
                            this._currentState = a || {}, this._configured = !1, this._scheduleFunction = p, "undefined" != typeof b && this.setConfig(b)
                        }
                        var o, p, q = "linear",
                            r = 500,
                            s = 1e3 / 60,
                            t = Date.now ? Date.now : function() {
                                return +new Date
                            },
                            u = "undefined" != typeof SHIFTY_DEBUG_NOW ? SHIFTY_DEBUG_NOW : t;
                        p = "undefined" != typeof window ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.mozCancelRequestAnimationFrame && window.mozRequestAnimationFrame || setTimeout : setTimeout;
                        var v, w, x, y;
                        return n.prototype.tween = function(a) {
                            return this._isTweening ? this : (void 0 === a && this._configured || this.setConfig(a), this._timestamp = u(), this._start(this.get(), this._attachment), this.resume())
                        }, n.prototype.setConfig = function(a) {
                            a = a || {}, this._configured = !0, this._attachment = a.attachment, this._pausedAtTime = null, this._scheduleId = null, this._delay = a.delay || 0, this._start = a.start || e, this._step = a.step || e, this._finish = a.finish || e, this._duration = a.duration || r, this._currentState = g({}, a.from) || this.get(), this._originalState = this.get(), this._targetState = g({}, a.to) || this.get();
                            var b = this;
                            this._timeoutHandler = function() {
                                l(b, b._timestamp, b._delay, b._duration, b._currentState, b._originalState, b._targetState, b._easing, b._step, b._scheduleFunction)
                            };
                            var c = this._currentState,
                                d = this._targetState;
                            return h(d, c), this._easing = m(c, a.easing || q), this._filterArgs = [c, this._originalState, d, this._easing], k(this, "tweenCreated"), this
                        }, n.prototype.get = function() {
                            return g({}, this._currentState)
                        }, n.prototype.set = function(a) {
                            this._currentState = a
                        }, n.prototype.pause = function() {
                            return this._pausedAtTime = u(), this._isPaused = !0, this
                        }, n.prototype.resume = function() {
                            return this._isPaused && (this._timestamp += u() - this._pausedAtTime), this._isPaused = !1, this._isTweening = !0, this._timeoutHandler(), this
                        }, n.prototype.seek = function(a) {
                            a = Math.max(a, 0);
                            var b = u();
                            return this._timestamp + a === 0 ? this : (this._timestamp = b - a, this.isPlaying() || (this._isTweening = !0, this._isPaused = !1, l(this, this._timestamp, this._delay, this._duration, this._currentState, this._originalState, this._targetState, this._easing, this._step, this._scheduleFunction, b), this.pause()), this)
                        }, n.prototype.stop = function(a) {
                            return this._isTweening = !1, this._isPaused = !1, this._timeoutHandler = e, (b.cancelAnimationFrame || b.webkitCancelAnimationFrame || b.oCancelAnimationFrame || b.msCancelAnimationFrame || b.mozCancelRequestAnimationFrame || b.clearTimeout)(this._scheduleId), a && (k(this, "beforeTween"), i(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), k(this, "afterTween"), k(this, "afterTweenEnd"), this._finish.call(this, this._currentState, this._attachment)), this
                        }, n.prototype.isPlaying = function() {
                            return this._isTweening && !this._isPaused
                        }, n.prototype.setScheduleFunction = function(a) {
                            this._scheduleFunction = a
                        }, n.prototype.dispose = function() {
                            var a;
                            for (a in this) this.hasOwnProperty(a) && delete this[a]
                        }, n.prototype.filter = {}, n.prototype.formula = {
                            linear: function(a) {
                                return a
                            }
                        }, o = n.prototype.formula, g(n, {
                            now: u,
                            each: f,
                            tweenProps: i,
                            tweenProp: j,
                            applyFilter: k,
                            shallowCopy: g,
                            defaults: h,
                            composeEasingObject: m
                        }), "function" == typeof SHIFTY_DEBUG_NOW && (b.timeoutHandler = l), "object" == typeof d ? c.exports = n : "function" == typeof a && a.amd ? a(function() {
                            return n
                        }) : "undefined" == typeof b.Tweenable && (b.Tweenable = n), n
                    }();
                ! function() {
                    e.shallowCopy(e.prototype.formula, {
                        easeInQuad: function(a) {
                            return Math.pow(a, 2)
                        },
                        easeOutQuad: function(a) {
                            return -(Math.pow(a - 1, 2) - 1)
                        },
                        easeInOutQuad: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 2) : -.5 * ((a -= 2) * a - 2)
                        },
                        easeInCubic: function(a) {
                            return Math.pow(a, 3)
                        },
                        easeOutCubic: function(a) {
                            return Math.pow(a - 1, 3) + 1
                        },
                        easeInOutCubic: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2)
                        },
                        easeInQuart: function(a) {
                            return Math.pow(a, 4)
                        },
                        easeOutQuart: function(a) {
                            return -(Math.pow(a - 1, 4) - 1)
                        },
                        easeInOutQuart: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2)
                        },
                        easeInQuint: function(a) {
                            return Math.pow(a, 5)
                        },
                        easeOutQuint: function(a) {
                            return Math.pow(a - 1, 5) + 1
                        },
                        easeInOutQuint: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 5) : .5 * (Math.pow(a - 2, 5) + 2)
                        },
                        easeInSine: function(a) {
                            return -Math.cos(a * (Math.PI / 2)) + 1
                        },
                        easeOutSine: function(a) {
                            return Math.sin(a * (Math.PI / 2))
                        },
                        easeInOutSine: function(a) {
                            return -.5 * (Math.cos(Math.PI * a) - 1)
                        },
                        easeInExpo: function(a) {
                            return 0 === a ? 0 : Math.pow(2, 10 * (a - 1))
                        },
                        easeOutExpo: function(a) {
                            return 1 === a ? 1 : -Math.pow(2, -10 * a) + 1
                        },
                        easeInOutExpo: function(a) {
                            return 0 === a ? 0 : 1 === a ? 1 : (a /= .5) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (-Math.pow(2, -10 * --a) + 2)
                        },
                        easeInCirc: function(a) {
                            return -(Math.sqrt(1 - a * a) - 1)
                        },
                        easeOutCirc: function(a) {
                            return Math.sqrt(1 - Math.pow(a - 1, 2))
                        },
                        easeInOutCirc: function(a) {
                            return (a /= .5) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                        },
                        easeOutBounce: function(a) {
                            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                        },
                        easeInBack: function(a) {
                            var b = 1.70158;
                            return a * a * ((b + 1) * a - b)
                        },
                        easeOutBack: function(a) {
                            var b = 1.70158;
                            return (a -= 1) * a * ((b + 1) * a + b) + 1
                        },
                        easeInOutBack: function(a) {
                            var b = 1.70158;
                            return (a /= .5) < 1 ? .5 * (a * a * (((b *= 1.525) + 1) * a - b)) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
                        },
                        elastic: function(a) {
                            return -1 * Math.pow(4, -8 * a) * Math.sin((6 * a - 1) * (2 * Math.PI) / 2) + 1
                        },
                        swingFromTo: function(a) {
                            var b = 1.70158;
                            return (a /= .5) < 1 ? .5 * (a * a * (((b *= 1.525) + 1) * a - b)) : .5 * ((a -= 2) * a * (((b *= 1.525) + 1) * a + b) + 2)
                        },
                        swingFrom: function(a) {
                            var b = 1.70158;
                            return a * a * ((b + 1) * a - b)
                        },
                        swingTo: function(a) {
                            var b = 1.70158;
                            return (a -= 1) * a * ((b + 1) * a + b) + 1
                        },
                        bounce: function(a) {
                            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                        },
                        bouncePast: function(a) {
                            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 2 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 2 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 2 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
                        },
                        easeFromTo: function(a) {
                            return (a /= .5) < 1 ? .5 * Math.pow(a, 4) : -.5 * ((a -= 2) * Math.pow(a, 3) - 2)
                        },
                        easeFrom: function(a) {
                            return Math.pow(a, 4)
                        },
                        easeTo: function(a) {
                            return Math.pow(a, .25)
                        }
                    })
                }(),
                function() {
                    function a(a, b, c, d, e, f) {
                        function g(a) {
                            return ((n * a + o) * a + p) * a
                        }

                        function h(a) {
                            return ((q * a + r) * a + s) * a
                        }

                        function i(a) {
                            return (3 * n * a + 2 * o) * a + p
                        }

                        function j(a) {
                            return 1 / (200 * a)
                        }

                        function k(a, b) {
                            return h(m(a, b))
                        }

                        function l(a) {
                            return a >= 0 ? a : 0 - a
                        }

                        function m(a, b) {
                            var c, d, e, f, h, j;
                            for (e = a, j = 0; 8 > j; j++) {
                                if (f = g(e) - a, l(f) < b) return e;
                                if (h = i(e), l(h) < 1e-6) break;
                                e -= f / h
                            }
                            if (c = 0, d = 1, e = a, c > e) return c;
                            if (e > d) return d;
                            for (; d > c;) {
                                if (f = g(e), l(f - a) < b) return e;
                                a > f ? c = e : d = e, e = .5 * (d - c) + c
                            }
                            return e
                        }
                        var n = 0,
                            o = 0,
                            p = 0,
                            q = 0,
                            r = 0,
                            s = 0;
                        return p = 3 * b, o = 3 * (d - b) - p, n = 1 - p - o, s = 3 * c, r = 3 * (e - c) - s, q = 1 - s - r, k(a, j(f))
                    }

                    function b(b, c, d, e) {
                        return function(f) {
                            return a(f, b, c, d, e, 1)
                        }
                    }
                    e.setBezierFunction = function(a, c, d, f, g) {
                        var h = b(c, d, f, g);
                        return h.displayName = a, h.x1 = c, h.y1 = d, h.x2 = f, h.y2 = g, e.prototype.formula[a] = h
                    }, e.unsetBezierFunction = function(a) {
                        delete e.prototype.formula[a]
                    }
                }(),
                function() {
                    function a(a, b, c, d, f, g) {
                        return e.tweenProps(d, b, a, c, 1, g, f)
                    }
                    var b = new e;
                    b._filterArgs = [], e.interpolate = function(c, d, f, g, h) {
                        var i = e.shallowCopy({}, c),
                            j = h || 0,
                            k = e.composeEasingObject(c, g || "linear");
                        b.set({});
                        var l = b._filterArgs;
                        l.length = 0, l[0] = i, l[1] = c, l[2] = d, l[3] = k, e.applyFilter(b, "tweenCreated"), e.applyFilter(b, "beforeTween");
                        var m = a(c, i, d, f, k, j);
                        return e.applyFilter(b, "afterTween"), m
                    }
                }(),
                function(a) {
                    function b(a, b) {
                        var c, d = [],
                            e = a.length;
                        for (c = 0; e > c; c++) d.push("_" + b + "_" + c);
                        return d
                    }

                    function c(a) {
                        var b = a.match(v);
                        return b ? (1 === b.length || a[0].match(u)) && b.unshift("") : b = ["", ""], b.join(A)
                    }

                    function d(b) {
                        a.each(b, function(a) {
                            var c = b[a];
                            "string" == typeof c && c.match(z) && (b[a] = e(c))
                        })
                    }

                    function e(a) {
                        return i(z, a, f)
                    }

                    function f(a) {
                        var b = g(a);
                        return "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")"
                    }

                    function g(a) {
                        return a = a.replace(/#/, ""), 3 === a.length && (a = a.split(""), a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), B[0] = h(a.substr(0, 2)), B[1] = h(a.substr(2, 2)), B[2] = h(a.substr(4, 2)), B
                    }

                    function h(a) {
                        return parseInt(a, 16)
                    }

                    function i(a, b, c) {
                        var d = b.match(a),
                            e = b.replace(a, A);
                        if (d)
                            for (var f, g = d.length, h = 0; g > h; h++) f = d.shift(), e = e.replace(A, c(f));
                        return e
                    }

                    function j(a) {
                        return i(x, a, k)
                    }

                    function k(a) {
                        for (var b = a.match(w), c = b.length, d = a.match(y)[0], e = 0; c > e; e++) d += parseInt(b[e], 10) + ",";
                        return d = d.slice(0, -1) + ")"
                    }

                    function l(d) {
                        var e = {};
                        return a.each(d, function(a) {
                            var f = d[a];
                            if ("string" == typeof f) {
                                var g = r(f);
                                e[a] = {
                                    formatString: c(f),
                                    chunkNames: b(g, a)
                                }
                            }
                        }), e
                    }

                    function m(b, c) {
                        a.each(c, function(a) {
                            for (var d = b[a], e = r(d), f = e.length, g = 0; f > g; g++) b[c[a].chunkNames[g]] = +e[g];
                            delete b[a]
                        })
                    }

                    function n(b, c) {
                        a.each(c, function(a) {
                            var d = b[a],
                                e = o(b, c[a].chunkNames),
                                f = p(e, c[a].chunkNames);
                            d = q(c[a].formatString, f), b[a] = j(d)
                        })
                    }

                    function o(a, b) {
                        for (var c, d = {}, e = b.length, f = 0; e > f; f++) c = b[f], d[c] = a[c], delete a[c];
                        return d
                    }

                    function p(a, b) {
                        C.length = 0;
                        for (var c = b.length, d = 0; c > d; d++) C.push(a[b[d]]);
                        return C
                    }

                    function q(a, b) {
                        for (var c = a, d = b.length, e = 0; d > e; e++) c = c.replace(A, +b[e].toFixed(4));
                        return c
                    }

                    function r(a) {
                        return a.match(w)
                    }

                    function s(b, c) {
                        a.each(c, function(a) {
                            var d, e = c[a],
                                f = e.chunkNames,
                                g = f.length,
                                h = b[a];
                            if ("string" == typeof h) {
                                var i = h.split(" "),
                                    j = i[i.length - 1];
                                for (d = 0; g > d; d++) b[f[d]] = i[d] || j
                            } else
                                for (d = 0; g > d; d++) b[f[d]] = h;
                            delete b[a]
                        })
                    }

                    function t(b, c) {
                        a.each(c, function(a) {
                            var d = c[a],
                                e = d.chunkNames,
                                f = e.length,
                                g = b[e[0]],
                                h = typeof g;
                            if ("string" === h) {
                                for (var i = "", j = 0; f > j; j++) i += " " + b[e[j]], delete b[e[j]];
                                b[a] = i.substr(1)
                            } else b[a] = g
                        })
                    }
                    var u = /(\d|\-|\.)/,
                        v = /([^\-0-9\.]+)/g,
                        w = /[0-9.\-]+/g,
                        x = new RegExp("rgb\\(" + w.source + /,\s*/.source + w.source + /,\s*/.source + w.source + "\\)", "g"),
                        y = /^.*\(/,
                        z = /#([0-9]|[a-f]){3,6}/gi,
                        A = "VAL",
                        B = [],
                        C = [];
                    a.prototype.filter.token = {
                        tweenCreated: function(a, b, c, e) {
                            d(a), d(b), d(c), this._tokenData = l(a)
                        },
                        beforeTween: function(a, b, c, d) {
                            s(d, this._tokenData), m(a, this._tokenData), m(b, this._tokenData), m(c, this._tokenData)
                        },
                        afterTween: function(a, b, c, d) {
                            n(a, this._tokenData), n(b, this._tokenData), n(c, this._tokenData), t(d, this._tokenData)
                        }
                    }
                }(e)
            }).call(null)
        }, {}],
        2: [function(a, b, c) {
            var d = a("./shape"),
                e = a("./utils"),
                f = function(a, b) {
                    this._pathTemplate = "M 50,50 m 0,-{radius} a {radius},{radius} 0 1 1 0,{2radius} a {radius},{radius} 0 1 1 0,-{2radius}", this.containerAspectRatio = 1, d.apply(this, arguments)
                };
            f.prototype = new d, f.prototype.constructor = f, f.prototype._pathString = function(a) {
                var b = a.strokeWidth;
                a.trailWidth && a.trailWidth > a.strokeWidth && (b = a.trailWidth);
                var c = 50 - b / 2;
                return e.render(this._pathTemplate, {
                    radius: c,
                    "2radius": 2 * c
                })
            }, f.prototype._trailString = function(a) {
                return this._pathString(a)
            }, b.exports = f
        }, {
            "./shape": 7,
            "./utils": 8
        }],
        3: [function(a, b, c) {
            var d = a("./shape"),
                e = a("./utils"),
                f = function(a, b) {
                    this._pathTemplate = "M 0,{center} L 100,{center}", d.apply(this, arguments)
                };
            f.prototype = new d, f.prototype.constructor = f, f.prototype._initializeSvg = function(a, b) {
                a.setAttribute("viewBox", "0 0 100 " + b.strokeWidth), a.setAttribute("preserveAspectRatio", "none")
            }, f.prototype._pathString = function(a) {
                return e.render(this._pathTemplate, {
                    center: a.strokeWidth / 2
                })
            }, f.prototype._trailString = function(a) {
                return this._pathString(a)
            }, b.exports = f
        }, {
            "./shape": 7,
            "./utils": 8
        }],
        4: [function(a, b, c) {
            b.exports = {
                Line: a("./line"),
                Circle: a("./circle"),
                SemiCircle: a("./semicircle"),
                Path: a("./path"),
                Shape: a("./shape"),
                utils: a("./utils")
            }
        }, {
            "./circle": 2,
            "./line": 3,
            "./path": 5,
            "./semicircle": 6,
            "./shape": 7,
            "./utils": 8
        }],
        5: [function(a, b, c) {
            var d = a("shifty"),
                e = a("./utils"),
                f = {
                    easeIn: "easeInCubic",
                    easeOut: "easeOutCubic",
                    easeInOut: "easeInOutCubic"
                },
                g = function h(a, b) {
                    if (!(this instanceof h)) throw new Error("Constructor was called without new keyword");
                    b = e.extend({
                        duration: 800,
                        easing: "linear",
                        from: {},
                        to: {},
                        step: function() {}
                    }, b);
                    var c;
                    c = e.isString(a) ? document.querySelector(a) : a, this.path = c, this._opts = b, this._tweenable = null;
                    var d = this.path.getTotalLength();
                    this.path.style.strokeDasharray = d + " " + d, this.set(0)
                };
            g.prototype.value = function() {
                var a = this._getComputedDashOffset(),
                    b = this.path.getTotalLength(),
                    c = 1 - a / b;
                return parseFloat(c.toFixed(6), 10)
            }, g.prototype.set = function(a) {
                this.stop(), this.path.style.strokeDashoffset = this._progressToOffset(a);
                var b = this._opts.step;
                if (e.isFunction(b)) {
                    var c = this._easing(this._opts.easing),
                        d = this._calculateTo(a, c),
                        f = this._opts.shape || this;
                    b(d, f, this._opts.attachment)
                }
            }, g.prototype.stop = function() {
                this._stopTween(), this.path.style.strokeDashoffset = this._getComputedDashOffset()
            }, g.prototype.animate = function(a, b, c) {
                b = b || {}, e.isFunction(b) && (c = b, b = {});
                var f = e.extend({}, b),
                    g = e.extend({}, this._opts);
                b = e.extend(g, b);
                var h = this._easing(b.easing),
                    i = this._resolveFromAndTo(a, h, f);
                this.stop(), this.path.getBoundingClientRect();
                var j = this._getComputedDashOffset(),
                    k = this._progressToOffset(a),
                    l = this;
                this._tweenable = new d, this._tweenable.tween({
                    from: e.extend({
                        offset: j
                    }, i.from),
                    to: e.extend({
                        offset: k
                    }, i.to),
                    duration: b.duration,
                    easing: h,
                    step: function(a) {
                        l.path.style.strokeDashoffset = a.offset;
                        var c = b.shape || l;
                        b.step(a, c, b.attachment)
                    },
                    finish: function(a) {
                        e.isFunction(c) && c()
                    }
                })
            }, g.prototype._getComputedDashOffset = function() {
                var a = window.getComputedStyle(this.path, null);
                return parseFloat(a.getPropertyValue("stroke-dashoffset"), 10)
            }, g.prototype._progressToOffset = function(a) {
                var b = this.path.getTotalLength();
                return b - a * b
            }, g.prototype._resolveFromAndTo = function(a, b, c) {
                return c.from && c.to ? {
                    from: c.from,
                    to: c.to
                } : {
                    from: this._calculateFrom(b),
                    to: this._calculateTo(a, b)
                }
            }, g.prototype._calculateFrom = function(a) {
                return d.interpolate(this._opts.from, this._opts.to, this.value(), a)
            }, g.prototype._calculateTo = function(a, b) {
                return d.interpolate(this._opts.from, this._opts.to, a, b)
            }, g.prototype._stopTween = function() {
                null !== this._tweenable && (this._tweenable.stop(), this._tweenable = null)
            }, g.prototype._easing = function(a) {
                return f.hasOwnProperty(a) ? f[a] : a
            }, b.exports = g
        }, {
            "./utils": 8,
            shifty: 1
        }],
        6: [function(a, b, c) {
            var d = a("./shape"),
                e = a("./circle"),
                f = a("./utils"),
                g = function(a, b) {
                    this._pathTemplate = "M 50,50 m -{radius},0 a {radius},{radius} 0 1 1 {2radius},0", this.containerAspectRatio = 2, d.apply(this, arguments)
                };
            g.prototype = new d, g.prototype.constructor = g, g.prototype._initializeSvg = function(a, b) {
                a.setAttribute("viewBox", "0 0 100 50")
            }, g.prototype._initializeTextContainer = function(a, b, c) {
                a.text.style && (c.style.top = "auto", c.style.bottom = "0", a.text.alignToBottom ? f.setStyle(c, "transform", "translate(-50%, 0)") : f.setStyle(c, "transform", "translate(-50%, 50%)"))
            }, g.prototype._pathString = e.prototype._pathString, g.prototype._trailString = e.prototype._trailString, b.exports = g
        }, {
            "./circle": 2,
            "./shape": 7,
            "./utils": 8
        }],
        7: [function(a, b, c) {
            var d = a("./path"),
                e = a("./utils"),
                f = "Object is destroyed",
                g = function h(a, b) {
                    if (!(this instanceof h)) throw new Error("Constructor was called without new keyword");
                    if (0 !== arguments.length) {
                        this._opts = e.extend({
                            color: "#555",
                            strokeWidth: 1,
                            trailColor: null,
                            trailWidth: null,
                            fill: null,
                            text: {
                                style: {
                                    color: null,
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    padding: 0,
                                    margin: 0,
                                    transform: {
                                        prefix: !0,
                                        value: "translate(-50%, -50%)"
                                    }
                                },
                                autoStyleContainer: !0,
                                alignToBottom: !0,
                                value: null,
                                className: "progressbar-text"
                            },
                            svgStyle: {
                                display: "block",
                                width: "100%"
                            },
                            warnings: !1
                        }, b, !0), e.isObject(b) && void 0 !== b.svgStyle && (this._opts.svgStyle = b.svgStyle), e.isObject(b) && e.isObject(b.text) && void 0 !== b.text.style && (this._opts.text.style = b.text.style);
                        var c, f = this._createSvgView(this._opts);
                        if (c = e.isString(a) ? document.querySelector(a) : a, !c) throw new Error("Container does not exist: " + a);
                        this._container = c, this._container.appendChild(f.svg), this._opts.warnings && this._warnContainerAspectRatio(this._container), this._opts.svgStyle && e.setStyles(f.svg, this._opts.svgStyle), this.svg = f.svg, this.path = f.path, this.trail = f.trail, this.text = null;
                        var g = e.extend({
                            attachment: void 0,
                            shape: this
                        }, this._opts);
                        this._progressPath = new d(f.path, g), e.isObject(this._opts.text) && null !== this._opts.text.value && this.setText(this._opts.text.value)
                    }
                };
            g.prototype.animate = function(a, b, c) {
                if (null === this._progressPath) throw new Error(f);
                this._progressPath.animate(a, b, c)
            }, g.prototype.stop = function() {
                if (null === this._progressPath) throw new Error(f);
                void 0 !== this._progressPath && this._progressPath.stop()
            }, g.prototype.destroy = function() {
                if (null === this._progressPath) throw new Error(f);
                this.stop(), this.svg.parentNode.removeChild(this.svg), this.svg = null, this.path = null, this.trail = null, this._progressPath = null, null !== this.text && (this.text.parentNode.removeChild(this.text), this.text = null)
            }, g.prototype.set = function(a) {
                if (null === this._progressPath) throw new Error(f);
                this._progressPath.set(a)
            }, g.prototype.value = function() {
                if (null === this._progressPath) throw new Error(f);
                return void 0 === this._progressPath ? 0 : this._progressPath.value()
            }, g.prototype.setText = function(a) {
                if (null === this._progressPath) throw new Error(f);
                null === this.text && (this.text = this._createTextContainer(this._opts, this._container), this._container.appendChild(this.text)), e.isObject(a) ? (e.removeChildren(this.text), this.text.appendChild(a)) : this.text.innerHTML = a
            }, g.prototype._createSvgView = function(a) {
                var b = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                this._initializeSvg(b, a);
                var c = null;
                (a.trailColor || a.trailWidth) && (c = this._createTrail(a), b.appendChild(c));
                var d = this._createPath(a);
                return b.appendChild(d), {
                    svg: b,
                    path: d,
                    trail: c
                }
            }, g.prototype._initializeSvg = function(a, b) {
                a.setAttribute("viewBox", "0 0 100 100")
            }, g.prototype._createPath = function(a) {
                var b = this._pathString(a);
                return this._createPathElement(b, a)
            }, g.prototype._createTrail = function(a) {
                var b = this._trailString(a),
                    c = e.extend({}, a);
                return c.trailColor || (c.trailColor = "#eee"), c.trailWidth || (c.trailWidth = c.strokeWidth), c.color = c.trailColor, c.strokeWidth = c.trailWidth, c.fill = null, this._createPathElement(b, c)
            }, g.prototype._createPathElement = function(a, b) {
                var c = document.createElementNS("http://www.w3.org/2000/svg", "path");
                return c.setAttribute("d", a), c.setAttribute("stroke", b.color), c.setAttribute("stroke-width", b.strokeWidth), b.fill ? c.setAttribute("fill", b.fill) : c.setAttribute("fill-opacity", "0"), c
            }, g.prototype._createTextContainer = function(a, b) {
                var c = document.createElement("div");
                c.className = a.text.className;
                var d = a.text.style;
                return d && (a.text.autoStyleContainer && (b.style.position = "relative"), e.setStyles(c, d), d.color || (c.style.color = a.color)), this._initializeTextContainer(a, b, c), c
            }, g.prototype._initializeTextContainer = function(a, b, c) {}, g.prototype._pathString = function(a) {
                throw new Error("Override this function for each progress bar")
            }, g.prototype._trailString = function(a) {
                throw new Error("Override this function for each progress bar")
            }, g.prototype._warnContainerAspectRatio = function(a) {
                if (this.containerAspectRatio) {
                    var b = window.getComputedStyle(a, null),
                        c = parseFloat(b.getPropertyValue("width"), 10),
                        d = parseFloat(b.getPropertyValue("height"), 10);
                    e.floatEquals(this.containerAspectRatio, c / d) || (console.warn("Incorrect aspect ratio of container", "#" + a.id, "detected:", b.getPropertyValue("width") + "(width)", "/", b.getPropertyValue("height") + "(height)", "=", c / d), console.warn("Aspect ratio of should be", this.containerAspectRatio))
                }
            }, b.exports = g
        }, {
            "./path": 5,
            "./utils": 8
        }],
        8: [function(a, b, c) {
            function d(a, b, c) {
                a = a || {}, b = b || {}, c = c || !1;
                for (var e in b)
                    if (b.hasOwnProperty(e)) {
                        var f = a[e],
                            g = b[e];
                        c && l(f) && l(g) ? a[e] = d(f, g, c) : a[e] = g
                    }
                return a
            }

            function e(a, b) {
                var c = a;
                for (var d in b)
                    if (b.hasOwnProperty(d)) {
                        var e = b[d],
                            f = "\\{" + d + "\\}",
                            g = new RegExp(f, "g");
                        c = c.replace(g, e)
                    }
                return c
            }

            function f(a, b, c) {
                for (var d = a.style, e = 0; e < p.length; ++e) {
                    var f = p[e];
                    d[f + h(b)] = c
                }
                d[b] = c
            }

            function g(a, b) {
                m(b, function(b, c) {
                    null !== b && void 0 !== b && (l(b) && b.prefix === !0 ? f(a, c, b.value) : a.style[c] = b)
                })
            }

            function h(a) {
                return a.charAt(0).toUpperCase() + a.slice(1)
            }

            function i(a) {
                return "string" == typeof a || a instanceof String
            }

            function j(a) {
                return "function" == typeof a
            }

            function k(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            }

            function l(a) {
                if (k(a)) return !1;
                var b = typeof a;
                return "object" === b && !!a
            }

            function m(a, b) {
                for (var c in a)
                    if (a.hasOwnProperty(c)) {
                        var d = a[c];
                        b(d, c)
                    }
            }

            function n(a, b) {
                return Math.abs(a - b) < q
            }

            function o(a) {
                for (; a.firstChild;) a.removeChild(a.firstChild)
            }
            var p = "Webkit Moz O ms".split(" "),
                q = .001;
            b.exports = {
                extend: d,
                render: e,
                setStyle: f,
                setStyles: g,
                capitalize: h,
                isString: i,
                isFunction: j,
                isObject: l,
                forEachObject: m,
                floatEquals: n,
                removeChildren: o
            }
        }, {}]
    }, {}, [4])(4)
});
/*-----------------------------------------------------------------------------------*/
/*	10. COUNTDOWN
/*-----------------------------------------------------------------------------------*/
/*!
 * Countdown v0.1.0
 * https://github.com/fengyuanchen/countdown
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c), this.defaults = a.extend({}, b.defaults, this.$element.data(), a.isPlainObject(d) ? d : {}), this.init()
    };
    b.prototype = {
        constructor: b,
        init: function() {
            var a = this.$element.html(),
                b = new Date(this.defaults.date || a);
            b.getTime() && (this.content = a, this.date = b, this.find(), this.defaults.autoStart && this.start())
        },
        find: function() {
            var a = this.$element;
            this.$days = a.find("[data-days]"), this.$hours = a.find("[data-hours]"), this.$minutes = a.find("[data-minutes]"), this.$seconds = a.find("[data-seconds]"), this.$days.length + this.$hours.length + this.$minutes.length + this.$seconds.length > 0 && (this.found = !0)
        },
        reset: function() {
            this.found ? (this.output("days"), this.output("hours"), this.output("minutes"), this.output("seconds")) : this.output()
        },
        ready: function() {
            var a, b = this.date,
                c = 100,
                d = 1e3,
                e = 6e4,
                f = 36e5,
                g = 864e5,
                h = {};
            return b ? (a = b.getTime() - (new Date).getTime(), 0 >= a ? (this.end(), !1) : (h.days = a, h.hours = h.days % g, h.minutes = h.hours % f, h.seconds = h.minutes % e, h.milliseconds = h.seconds % d, this.days = Math.floor(h.days / g), this.hours = Math.floor(h.hours / f), this.minutes = Math.floor(h.minutes / e), this.seconds = Math.floor(h.seconds / d), this.deciseconds = Math.floor(h.milliseconds / c), !0)) : !1
        },
        start: function() {
            !this.active && this.ready() && (this.active = !0, this.reset(), this.autoUpdate = this.defaults.fast ? setInterval(a.proxy(this.fastUpdate, this), 100) : setInterval(a.proxy(this.update, this), 1e3))
        },
        stop: function() {
            this.active && (this.active = !1, clearInterval(this.autoUpdate))
        },
        end: function() {
            this.date && (this.stop(), this.days = 0, this.hours = 0, this.minutes = 0, this.seconds = 0, this.deciseconds = 0, this.reset(), this.defaults.end())
        },
        destroy: function() {
            this.date && (this.stop(), this.$days = null, this.$hours = null, this.$minutes = null, this.$seconds = null, this.$element.empty().html(this.content), this.$element.removeData("countdown"))
        },
        fastUpdate: function() {
            --this.deciseconds >= 0 ? this.output("deciseconds") : (this.deciseconds = 9, this.update())
        },
        update: function() {
            --this.seconds >= 0 ? this.output("seconds") : (this.seconds = 59, --this.minutes >= 0 ? this.output("minutes") : (this.minutes = 59, --this.hours >= 0 ? this.output("hours") : (this.hours = 23, --this.days >= 0 ? this.output("days") : this.end())))
        },
        output: function(a) {
            if (!this.found) return void this.$element.empty().html(this.template());
            switch (a) {
                case "deciseconds":
                    this.$seconds.text(this.getSecondsText());
                    break;
                case "seconds":
                    this.$seconds.text(this.seconds);
                    break;
                case "minutes":
                    this.$minutes.text(this.minutes);
                    break;
                case "hours":
                    this.$hours.text(this.hours);
                    break;
                case "days":
                    this.$days.text(this.days)
            }
        },
        template: function() {
            return this.defaults.text.replace("%s", this.days).replace("%s", this.hours).replace("%s", this.minutes).replace("%s", this.getSecondsText())
        },
        getSecondsText: function() {
            return this.active && this.defaults.fast ? this.seconds + "." + this.deciseconds : this.seconds
        }
    }, b.defaults = {
        autoStart: !0,
        date: null,
        fast: !1,
        end: a.noop,
        text: "%s days, %s hours, %s minutes, %s seconds"
    }, b.setDefaults = function(c) {
        a.extend(b.defaults, c)
    }, a.fn.countdown = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("countdown");
            e || d.data("countdown", e = new b(this, c)), "string" == typeof c && a.isFunction(e[c]) && e[c]()
        })
    }, a.fn.countdown.constructor = b, a.fn.countdown.setDefaults = b.setDefaults, a(function() {
        a("[countdown]").countdown()
    })
});
/*-----------------------------------------------------------------------------------*/
/*	11. PRETTIFY
/*-----------------------------------------------------------------------------------*/
! function() {
    /*

     Copyright (C) 2006 Google Inc.

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

          http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
    */
    window.PR_SHOULD_USE_CONTINUATION = !0;
    (function() {
        function T(a) {
            function d(e) {
                var b = e.charCodeAt(0);
                if (92 !== b) return b;
                var a = e.charAt(1);
                return (b = w[a]) ? b : "0" <= a && "7" >= a ? parseInt(e.substring(1), 8) : "u" === a || "x" === a ? parseInt(e.substring(2), 16) : e.charCodeAt(1)
            }

            function f(e) {
                if (32 > e) return (16 > e ? "\\x0" : "\\x") + e.toString(16);
                e = String.fromCharCode(e);
                return "\\" === e || "-" === e || "]" === e || "^" === e ? "\\" + e : e
            }

            function b(e) {
                var b = e.substring(1, e.length - 1).match(/\\u[0-9A-Fa-f]{4}|\\x[0-9A-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\s\S]|-|[^-\\]/g);
                e = [];
                var a = "^" === b[0],
                    c = ["["];
                a && c.push("^");
                for (var a = a ? 1 : 0, g = b.length; a < g; ++a) {
                    var h = b[a];
                    if (/\\[bdsw]/i.test(h)) c.push(h);
                    else {
                        var h = d(h),
                            k;
                        a + 2 < g && "-" === b[a + 1] ? (k = d(b[a + 2]), a += 2) : k = h;
                        e.push([h, k]);
                        65 > k || 122 < h || (65 > k || 90 < h || e.push([Math.max(65, h) | 32, Math.min(k, 90) | 32]), 97 > k || 122 < h || e.push([Math.max(97, h) & -33, Math.min(k, 122) & -33]))
                    }
                }
                e.sort(function(e, a) {
                    return e[0] - a[0] || a[1] - e[1]
                });
                b = [];
                g = [];
                for (a = 0; a < e.length; ++a) h = e[a], h[0] <= g[1] + 1 ? g[1] = Math.max(g[1], h[1]) : b.push(g = h);
                for (a = 0; a < b.length; ++a) h = b[a],
                    c.push(f(h[0])), h[1] > h[0] && (h[1] + 1 > h[0] && c.push("-"), c.push(f(h[1])));
                c.push("]");
                return c.join("")
            }

            function v(e) {
                for (var a = e.source.match(/(?:\[(?:[^\x5C\x5D]|\\[\s\S])*\]|\\u[A-Fa-f0-9]{4}|\\x[A-Fa-f0-9]{2}|\\[0-9]+|\\[^ux0-9]|\(\?[:!=]|[\(\)\^]|[^\x5B\x5C\(\)\^]+)/g), c = a.length, d = [], g = 0, h = 0; g < c; ++g) {
                    var k = a[g];
                    "(" === k ? ++h : "\\" === k.charAt(0) && (k = +k.substring(1)) && (k <= h ? d[k] = -1 : a[g] = f(k))
                }
                for (g = 1; g < d.length; ++g) - 1 === d[g] && (d[g] = ++A);
                for (h = g = 0; g < c; ++g) k = a[g], "(" === k ? (++h, d[h] || (a[g] = "(?:")) : "\\" ===
                    k.charAt(0) && (k = +k.substring(1)) && k <= h && (a[g] = "\\" + d[k]);
                for (g = 0; g < c; ++g) "^" === a[g] && "^" !== a[g + 1] && (a[g] = "");
                if (e.ignoreCase && n)
                    for (g = 0; g < c; ++g) k = a[g], e = k.charAt(0), 2 <= k.length && "[" === e ? a[g] = b(k) : "\\" !== e && (a[g] = k.replace(/[a-zA-Z]/g, function(a) {
                        a = a.charCodeAt(0);
                        return "[" + String.fromCharCode(a & -33, a | 32) + "]"
                    }));
                return a.join("")
            }
            for (var A = 0, n = !1, l = !1, m = 0, c = a.length; m < c; ++m) {
                var p = a[m];
                if (p.ignoreCase) l = !0;
                else if (/[a-z]/i.test(p.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
                    n = !0;
                    l = !1;
                    break
                }
            }
            for (var w = {
                    b: 8,
                    t: 9,
                    n: 10,
                    v: 11,
                    f: 12,
                    r: 13
                }, r = [], m = 0, c = a.length; m < c; ++m) {
                p = a[m];
                if (p.global || p.multiline) throw Error("" + p);
                r.push("(?:" + v(p) + ")")
            }
            return new RegExp(r.join("|"), l ? "gi" : "g")
        }

        function U(a, d) {
            function f(a) {
                var c = a.nodeType;
                if (1 == c) {
                    if (!b.test(a.className)) {
                        for (c = a.firstChild; c; c = c.nextSibling) f(c);
                        c = a.nodeName.toLowerCase();
                        if ("br" === c || "li" === c) v[l] = "\n", n[l << 1] = A++, n[l++ << 1 | 1] = a
                    }
                } else if (3 == c || 4 == c) c = a.nodeValue, c.length && (c = d ? c.replace(/\r\n?/g, "\n") : c.replace(/[ \t\r\n]+/g,
                    " "), v[l] = c, n[l << 1] = A, A += c.length, n[l++ << 1 | 1] = a)
            }
            var b = /(?:^|\s)nocode(?:\s|$)/,
                v = [],
                A = 0,
                n = [],
                l = 0;
            f(a);
            return {
                a: v.join("").replace(/\n$/, ""),
                c: n
            }
        }

        function J(a, d, f, b, v) {
            f && (a = {
                h: a,
                l: 1,
                j: null,
                m: null,
                a: f,
                c: null,
                i: d,
                g: null
            }, b(a), v.push.apply(v, a.g))
        }

        function V(a) {
            for (var d = void 0, f = a.firstChild; f; f = f.nextSibling) var b = f.nodeType,
                d = 1 === b ? d ? a : f : 3 === b ? W.test(f.nodeValue) ? a : d : d;
            return d === a ? void 0 : d
        }

        function G(a, d) {
            function f(a) {
                for (var l = a.i, m = a.h, c = [l, "pln"], p = 0, w = a.a.match(v) || [], r = {}, e = 0, t = w.length; e <
                    t; ++e) {
                    var z = w[e],
                        q = r[z],
                        g = void 0,
                        h;
                    if ("string" === typeof q) h = !1;
                    else {
                        var k = b[z.charAt(0)];
                        if (k) g = z.match(k[1]), q = k[0];
                        else {
                            for (h = 0; h < A; ++h)
                                if (k = d[h], g = z.match(k[1])) {
                                    q = k[0];
                                    break
                                }
                            g || (q = "pln")
                        }!(h = 5 <= q.length && "lang-" === q.substring(0, 5)) || g && "string" === typeof g[1] || (h = !1, q = "src");
                        h || (r[z] = q)
                    }
                    k = p;
                    p += z.length;
                    if (h) {
                        h = g[1];
                        var B = z.indexOf(h),
                            D = B + h.length;
                        g[2] && (D = z.length - g[2].length, B = D - h.length);
                        q = q.substring(5);
                        J(m, l + k, z.substring(0, B), f, c);
                        J(m, l + k + B, h, K(q, h), c);
                        J(m, l + k + D, z.substring(D), f, c)
                    } else c.push(l +
                        k, q)
                }
                a.g = c
            }
            var b = {},
                v;
            (function() {
                for (var f = a.concat(d), l = [], m = {}, c = 0, p = f.length; c < p; ++c) {
                    var w = f[c],
                        r = w[3];
                    if (r)
                        for (var e = r.length; 0 <= --e;) b[r.charAt(e)] = w;
                    w = w[1];
                    r = "" + w;
                    m.hasOwnProperty(r) || (l.push(w), m[r] = null)
                }
                l.push(/[\0-\uffff]/);
                v = T(l)
            })();
            var A = d.length;
            return f
        }

        function y(a) {
            var d = [],
                f = [];
            a.tripleQuotedStrings ? d.push(["str", /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
                null, "'\""
            ]) : a.multiLineStrings ? d.push(["str", /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]) : d.push(["str", /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]);
            a.verbatimStrings && f.push(["str", /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
            var b = a.hashComments;
            b && (a.cStyleComments ? (1 < b ? d.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#"]) : d.push(["com", /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/,
                null, "#"
            ]), f.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null])) : d.push(["com", /^#[^\r\n]*/, null, "#"]));
            a.cStyleComments && (f.push(["com", /^\/\/[^\r\n]*/, null]), f.push(["com", /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
            if (b = a.regexLiterals) {
                var v = (b = 1 < b ? "" : "\n\r") ? "." : "[\\S\\s]";
                f.push(["lang-regex", RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*(" +
                    ("/(?=[^/*" + b + "])(?:[^/\\x5B\\x5C" + b + "]|\\x5C" + v + "|\\x5B(?:[^\\x5C\\x5D" + b + "]|\\x5C" + v + ")*(?:\\x5D|$))+/") + ")")])
            }(b = a.types) && f.push(["typ", b]);
            b = ("" + a.keywords).replace(/^ | $/g, "");
            b.length && f.push(["kwd", new RegExp("^(?:" + b.replace(/[\s,]+/g, "|") + ")\\b"), null]);
            d.push(["pln", /^\s+/, null, " \r\n\t\u00a0"]);
            b = "^.[^\\s\\w.$@'\"`/\\\\]*";
            a.regexLiterals && (b += "(?!s*/)");
            f.push(["lit", /^@[a-z_$][a-z_$@0-9]*/i, null], ["typ", /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null], ["pln", /^[a-z_$][a-z_$@0-9]*/i,
                null
            ], ["lit", /^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i, null, "0123456789"], ["pln", /^\\[\s\S]?/, null], ["pun", new RegExp(b), null]);
            return G(d, f)
        }

        function L(a, d, f) {
            function b(a) {
                var c = a.nodeType;
                if (1 == c && !A.test(a.className))
                    if ("br" === a.nodeName) v(a), a.parentNode && a.parentNode.removeChild(a);
                    else
                        for (a = a.firstChild; a; a = a.nextSibling) b(a);
                else if ((3 == c || 4 == c) && f) {
                    var d = a.nodeValue,
                        q = d.match(n);
                    q && (c = d.substring(0, q.index), a.nodeValue = c, (d = d.substring(q.index + q[0].length)) &&
                        a.parentNode.insertBefore(l.createTextNode(d), a.nextSibling), v(a), c || a.parentNode.removeChild(a))
                }
            }

            function v(a) {
                function b(a, c) {
                    var d = c ? a.cloneNode(!1) : a,
                        k = a.parentNode;
                    if (k) {
                        var k = b(k, 1),
                            e = a.nextSibling;
                        k.appendChild(d);
                        for (var f = e; f; f = e) e = f.nextSibling, k.appendChild(f)
                    }
                    return d
                }
                for (; !a.nextSibling;)
                    if (a = a.parentNode, !a) return;
                a = b(a.nextSibling, 0);
                for (var d;
                    (d = a.parentNode) && 1 === d.nodeType;) a = d;
                c.push(a)
            }
            for (var A = /(?:^|\s)nocode(?:\s|$)/, n = /\r\n?|\n/, l = a.ownerDocument, m = l.createElement("li"); a.firstChild;) m.appendChild(a.firstChild);
            for (var c = [m], p = 0; p < c.length; ++p) b(c[p]);
            d === (d | 0) && c[0].setAttribute("value", d);
            var w = l.createElement("ol");
            w.className = "linenums";
            d = Math.max(0, d - 1 | 0) || 0;
            for (var p = 0, r = c.length; p < r; ++p) m = c[p], m.className = "L" + (p + d) % 10, m.firstChild || m.appendChild(l.createTextNode("\u00a0")), w.appendChild(m);
            a.appendChild(w)
        }

        function t(a, d) {
            for (var f = d.length; 0 <= --f;) {
                var b = d[f];
                I.hasOwnProperty(b) ? E.console && console.warn("cannot override language handler %s", b) : I[b] = a
            }
        }

        function K(a, d) {
            a && I.hasOwnProperty(a) || (a = /^\s*</.test(d) ?
                "default-markup" : "default-code");
            return I[a]
        }

        function M(a) {
            var d = a.j;
            try {
                var f = U(a.h, a.l),
                    b = f.a;
                a.a = b;
                a.c = f.c;
                a.i = 0;
                K(d, b)(a);
                var v = /\bMSIE\s(\d+)/.exec(navigator.userAgent),
                    v = v && 8 >= +v[1],
                    d = /\n/g,
                    A = a.a,
                    n = A.length,
                    f = 0,
                    l = a.c,
                    m = l.length,
                    b = 0,
                    c = a.g,
                    p = c.length,
                    w = 0;
                c[p] = n;
                var r, e;
                for (e = r = 0; e < p;) c[e] !== c[e + 2] ? (c[r++] = c[e++], c[r++] = c[e++]) : e += 2;
                p = r;
                for (e = r = 0; e < p;) {
                    for (var t = c[e], z = c[e + 1], q = e + 2; q + 2 <= p && c[q + 1] === z;) q += 2;
                    c[r++] = t;
                    c[r++] = z;
                    e = q
                }
                c.length = r;
                var g = a.h;
                a = "";
                g && (a = g.style.display, g.style.display = "none");
                try {
                    for (; b < m;) {
                        var h = l[b + 2] || n,
                            k = c[w + 2] || n,
                            q = Math.min(h, k),
                            B = l[b + 1],
                            D;
                        if (1 !== B.nodeType && (D = A.substring(f, q))) {
                            v && (D = D.replace(d, "\r"));
                            B.nodeValue = D;
                            var N = B.ownerDocument,
                                u = N.createElement("span");
                            u.className = c[w + 1];
                            var y = B.parentNode;
                            y.replaceChild(u, B);
                            u.appendChild(B);
                            f < h && (l[b + 1] = B = N.createTextNode(A.substring(q, h)), y.insertBefore(B, u.nextSibling))
                        }
                        f = q;
                        f >= h && (b += 2);
                        f >= k && (w += 2)
                    }
                } finally {
                    g && (g.style.display = a)
                }
            } catch (x) {
                E.console && console.log(x && x.stack || x)
            }
        }
        var E = window,
            C = ["break,continue,do,else,for,if,return,while"],
            F = [
                [C, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,restrict,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
            ],
            H = [F, "alignas,alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,noexcept,noreturn,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
            O = [F, "abstract,assert,boolean,byte,extends,finally,final,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
            P = [F, "abstract,add,alias,as,ascending,async,await,base,bool,by,byte,checked,decimal,delegate,descending,dynamic,event,finally,fixed,foreach,from,get,global,group,implicit,in,interface,internal,into,is,join,let,lock,null,object,out,override,orderby,params,partial,readonly,ref,remove,sbyte,sealed,select,set,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,value,var,virtual,where,yield"],
            F = [F, "abstract,async,await,constructor,debugger,enum,eval,export,function,get,implements,instanceof,interface,let,null,set,undefined,var,with,yield,Infinity,NaN"],
            Q = [C, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
            R = [C, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
            C = [C, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
            S = /^(DIR|FILE|array|vector|(de|priority_)?queue|(forward_)?list|stack|(const_)?(reverse_)?iterator|(unordered_)?(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
            W = /\S/,
            X = y({
                keywords: [H, P, O, F, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", Q, R, C],
                hashComments: !0,
                cStyleComments: !0,
                multiLineStrings: !0,
                regexLiterals: !0
            }),
            I = {};
        t(X, ["default-code"]);
        t(G([], [
            ["pln", /^[^<?]+/],
            ["dec",
                /^<!\w[^>]*(?:>|$)/
            ],
            ["com", /^<\!--[\s\S]*?(?:-\->|$)/],
            ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/],
            ["lang-", /^<%([\s\S]+?)(?:%>|$)/],
            ["pun", /^(?:<[%?]|[%?]>)/],
            ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
            ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
            ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
            ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
        ]), "default-markup htm html mxml xhtml xml xsl".split(" "));
        t(G([
            ["pln", /^[\s]+/, null, " \t\r\n"],
            ["atv", /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null,
                "\"'"
            ]
        ], [
            ["tag", /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
            ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
            ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
            ["pun", /^[=<>\/]+/],
            ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i],
            ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i],
            ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i],
            ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i],
            ["lang-css", /^style\s*=\s*\'([^\']+)\'/i],
            ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]
        ]), ["in.tag"]);
        t(G([], [
            ["atv", /^[\s\S]+/]
        ]), ["uq.val"]);
        t(y({
            keywords: H,
            hashComments: !0,
            cStyleComments: !0,
            types: S
        }), "c cc cpp cxx cyc m".split(" "));
        t(y({
            keywords: "null,true,false"
        }), ["json"]);
        t(y({
            keywords: P,
            hashComments: !0,
            cStyleComments: !0,
            verbatimStrings: !0,
            types: S
        }), ["cs"]);
        t(y({
            keywords: O,
            cStyleComments: !0
        }), ["java"]);
        t(y({
            keywords: C,
            hashComments: !0,
            multiLineStrings: !0
        }), ["bash", "bsh", "csh", "sh"]);
        t(y({
            keywords: Q,
            hashComments: !0,
            multiLineStrings: !0,
            tripleQuotedStrings: !0
        }), ["cv", "py", "python"]);
        t(y({
            keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: 2
        }), ["perl", "pl", "pm"]);
        t(y({
            keywords: R,
            hashComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }), ["rb", "ruby"]);
        t(y({
            keywords: F,
            cStyleComments: !0,
            regexLiterals: !0
        }), ["javascript", "js", "ts", "typescript"]);
        t(y({
            keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",
            hashComments: 3,
            cStyleComments: !0,
            multilineStrings: !0,
            tripleQuotedStrings: !0,
            regexLiterals: !0
        }), ["coffee"]);
        t(G([], [
            ["str", /^[\s\S]+/]
        ]), ["regex"]);
        var Y = E.PR = {
                createSimpleLexer: G,
                registerLangHandler: t,
                sourceDecorator: y,
                PR_ATTRIB_NAME: "atn",
                PR_ATTRIB_VALUE: "atv",
                PR_COMMENT: "com",
                PR_DECLARATION: "dec",
                PR_KEYWORD: "kwd",
                PR_LITERAL: "lit",
                PR_NOCODE: "nocode",
                PR_PLAIN: "pln",
                PR_PUNCTUATION: "pun",
                PR_SOURCE: "src",
                PR_STRING: "str",
                PR_TAG: "tag",
                PR_TYPE: "typ",
                prettyPrintOne: E.prettyPrintOne = function(a, d, f) {
                    f = f || !1;
                    d = d || null;
                    var b = document.createElement("div");
                    b.innerHTML = "<pre>" + a + "</pre>";
                    b = b.firstChild;
                    f && L(b, f, !0);
                    M({
                        j: d,
                        m: f,
                        h: b,
                        l: 1,
                        a: null,
                        i: null,
                        c: null,
                        g: null
                    });
                    return b.innerHTML
                },
                prettyPrint: E.prettyPrint = function(a, d) {
                    function f() {
                        for (var b = E.PR_SHOULD_USE_CONTINUATION ? c.now() + 250 : Infinity; p < t.length && c.now() < b; p++) {
                            for (var d = t[p], l = g, m = d; m = m.previousSibling;) {
                                var n = m.nodeType,
                                    u = (7 === n || 8 === n) && m.nodeValue;
                                if (u ? !/^\??prettify\b/.test(u) : 3 !== n || /\S/.test(m.nodeValue)) break;
                                if (u) {
                                    l = {};
                                    u.replace(/\b(\w+)=([\w:.%+-]+)/g, function(a, b, c) {
                                        l[b] = c
                                    });
                                    break
                                }
                            }
                            m = d.className;
                            if ((l !== g || r.test(m)) &&
                                !e.test(m)) {
                                n = !1;
                                for (u = d.parentNode; u; u = u.parentNode)
                                    if (q.test(u.tagName) && u.className && r.test(u.className)) {
                                        n = !0;
                                        break
                                    }
                                if (!n) {
                                    d.className += " prettyprinted";
                                    n = l.lang;
                                    if (!n) {
                                        var n = m.match(w),
                                            C;
                                        !n && (C = V(d)) && z.test(C.tagName) && (n = C.className.match(w));
                                        n && (n = n[1])
                                    }
                                    if (y.test(d.tagName)) u = 1;
                                    else var u = d.currentStyle,
                                        x = v.defaultView,
                                        u = (u = u ? u.whiteSpace : x && x.getComputedStyle ? x.getComputedStyle(d, null).getPropertyValue("white-space") : 0) && "pre" === u.substring(0, 3);
                                    x = l.linenums;
                                    (x = "true" === x || +x) || (x = (x = m.match(/\blinenums\b(?::(\d+))?/)) ?
                                        x[1] && x[1].length ? +x[1] : !0 : !1);
                                    x && L(d, x, u);
                                    M({
                                        j: n,
                                        h: d,
                                        m: x,
                                        l: u,
                                        a: null,
                                        i: null,
                                        c: null,
                                        g: null
                                    })
                                }
                            }
                        }
                        p < t.length ? E.setTimeout(f, 250) : "function" === typeof a && a()
                    }
                    for (var b = d || document.body, v = b.ownerDocument || document, b = [b.getElementsByTagName("pre"), b.getElementsByTagName("code"), b.getElementsByTagName("xmp")], t = [], n = 0; n < b.length; ++n)
                        for (var l = 0, m = b[n].length; l < m; ++l) t.push(b[n][l]);
                    var b = null,
                        c = Date;
                    c.now || (c = {
                        now: function() {
                            return +new Date
                        }
                    });
                    var p = 0,
                        w = /\blang(?:uage)?-([\w.]+)(?!\S)/,
                        r = /\bprettyprint\b/,
                        e = /\bprettyprinted\b/,
                        y = /pre|xmp/i,
                        z = /^code$/i,
                        q = /^(?:pre|code|xmp)$/i,
                        g = {};
                    f()
                }
            },
            H = E.define;
        "function" === typeof H && H.amd && H("google-code-prettify", [], function() {
            return Y
        })
    })();
}()
/*-----------------------------------------------------------------------------------*/
/*	12. VIDEO WRAPPER
/*-----------------------------------------------------------------------------------*/
! function(a, b, c, d) {
    "use strict";

    function e(b, c) {
        function d() {
            e.options.originalVideoW = e.options.$video[0].videoWidth, e.options.originalVideoH = e.options.$video[0].videoHeight, e.initialised || e.init()
        }
        var e = this;
        this.element = b, this.options = a.extend({}, g, c), this._defaults = g, this._name = f, this.options.$video = a(b), this.detectBrowser(), this.shimRequestAnimationFrame(), this.options.has3d = this.detect3d(), this.options.$videoWrap.css({
            position: "relative",
            overflow: "hidden",
            "z-index": "10"
        }), this.options.$video.css({
            position: "absolute",
            "z-index": "1"
        }), this.options.$video.on("canplay canplaythrough", d), this.options.$video[0].readyState > 3 && d()
    }
    var f = "backgroundVideo",
        g = {
            $videoWrap: a(".video-wrapper-inner"),
            $outerWrap: a(b),
            $window: a(b),
            minimumVideoWidth: 400,
            preventContextMenu: !1,
            parallax: !0,
            parallaxOptions: {
                effect: 1.5
            },
            pauseVideoOnViewLoss: !1
        };
    e.prototype = {
        init: function() {
            var a = this;
            this.initialised = !0, this.lastPosition = -1, this.ticking = !1, this.options.$window.resize(function() {
                a.positionObject()
            }), this.options.parallax && this.options.$window.on("scroll", function() {
                a.update()
            }), this.options.pauseVideoOnViewLoss && this.playPauseVideo(), this.options.preventContextMenu && this.options.$video.on("contextmenu", function() {
                return !1
            }), this.options.$window.trigger("resize")
        },
        requestTick: function() {
            var a = this;
            this.ticking || (b.requestAnimationFrame(a.positionObject.bind(a)), this.ticking = !0)
        },
        update: function() {
            this.lastPosition = b.pageYOffset, this.requestTick()
        },
        detect3d: function() {
            var a, e, f = c.createElement("p"),
                g = {
                    WebkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    MSTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            c.body.insertBefore(f, c.body.lastChild);
            for (a in g) f.style[a] !== d && (f.style[a] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", e = b.getComputedStyle(f).getPropertyValue(g[a]));
            return f.parentNode.removeChild(f), e !== d && "none" !== e
        },
        detectBrowser: function() {
            var a = navigator.userAgent.toLowerCase();
            a.indexOf("chrome") > -1 || a.indexOf("safari") > -1 ? (this.options.browser = "webkit", this.options.browserPrexix = "-webkit-") : a.indexOf("firefox") > -1 ? (this.options.browser = "firefox", this.options.browserPrexix = "-moz-") : -1 !== a.indexOf("MSIE") || a.indexOf("Trident/") > 0 ? (this.options.browser = "ie", this.options.browserPrexix = "-ms-") : a.indexOf("Opera") > -1 && (this.options.browser = "opera", this.options.browserPrexix = "-o-")
        },
        scaleObject: function() {
            var a, b, c;
            return this.options.$videoWrap.width(this.options.$outerWrap.width()), this.options.$videoWrap.height(this.options.$outerWrap.height()), a = this.options.$window.width() / this.options.originalVideoW, b = this.options.$window.height() / this.options.originalVideoH, c = a > b ? a : b, c * this.options.originalVideoW < this.options.minimumVideoWidth && (c = this.options.minimumVideoWidth / this.options.originalVideoW), this.options.$video.width(c * this.options.originalVideoW), this.options.$video.height(c * this.options.originalVideoH), {
                xPos: -parseInt(this.options.$video.width() - this.options.$window.width()) / 2,
                yPos: parseInt(this.options.$video.height() - this.options.$window.height()) / 2
            }
        },
        positionObject: function() {
            var a = this,
                c = b.pageYOffset,
                d = this.scaleObject(this.options.$video, a.options.$videoWrap),
                e = d.xPos,
                f = d.yPos;
            f = this.options.parallax ? c >= 0 ? this.calculateYPos(f, c) : this.calculateYPos(f, 0) : -f, a.options.has3d ? (this.options.$video.css(a.options.browserPrexix + "transform3d", "translate3d(-" + e + "px, " + f + "px, 0)"), this.options.$video.css("transform", "translate3d(" + e + "px, " + f + "px, 0)")) : (this.options.$video.css(a.options.browserPrexix + "transform", "translate(-" + e + "px, " + f + "px)"), this.options.$video.css("transform", "translate(" + e + "px, " + f + "px)")), this.ticking = !1
        },
        calculateYPos: function(a, b) {
            var c, d;
            return c = parseInt(this.options.$videoWrap.offset().top), d = c - b, a = -(d / this.options.parallaxOptions.effect + a)
        },
        disableParallax: function() {
            this.options.$window.unbind(".backgroundVideoParallax")
        },
        playPauseVideo: function() {
            var a = this;
            this.options.$window.on("scroll.backgroundVideoPlayPause", function() {
                a.options.$window.scrollTop() < a.options.$videoWrap.height() ? a.options.$video.get(0).play() : a.options.$video.get(0).pause()
            })
        },
        shimRequestAnimationFrame: function() {
            for (var a = 0, c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !b.requestAnimationFrame; ++d) b.requestAnimationFrame = b[c[d] + "RequestAnimationFrame"], b.cancelAnimationFrame = b[c[d] + "CancelAnimationFrame"] || b[c[d] + "CancelRequestAnimationFrame"];
            b.requestAnimationFrame || (b.requestAnimationFrame = function(c) {
                var d = (new Date).getTime(),
                    e = Math.max(0, 16 - (d - a)),
                    f = b.setTimeout(function() {
                        c(d + e)
                    }, e);
                return a = d + e, f
            }), b.cancelAnimationFrame || (b.cancelAnimationFrame = function(a) {
                clearTimeout(a)
            })
        }
    }, a.fn[f] = function(b) {
        return this.each(function() {
            a.data(this, "plugin_" + f) || a.data(this, "plugin_" + f, new e(this, b))
        })
    }
}(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	13. GO TO TOP
/*-----------------------------------------------------------------------------------*/
! function(a, b, c) {
    a.fn.scrollUp = function(b) {
        a.data(c.body, "scrollUp") || (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b))
    }, a.fn.scrollUp.init = function(d) {
        var e = a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, d),
            f = e.scrollTitle ? e.scrollTitle : e.scrollText,
            g = a("<a/>", {
                id: e.scrollName,
                href: "#top",
                title: f
            }).appendTo("body");
        e.scrollImg || g.html(e.scrollText), g.css({
            display: "none",
            position: "fixed",
            zIndex: e.zIndex
        }), e.activeOverlay && a("<div/>", {
            id: e.scrollName + "-active"
        }).css({
            position: "absolute",
            top: e.scrollDistance + "px",
            width: "100%",
            borderTop: "1px dotted" + e.activeOverlay,
            zIndex: e.zIndex
        }).appendTo("body"), scrollEvent = a(b).scroll(function() {
            switch (scrollDis = "top" === e.scrollFrom ? e.scrollDistance : a(c).height() - a(b).height() - e.scrollDistance, e.animation) {
                case "fade":
                    a(a(b).scrollTop() > scrollDis ? g.fadeIn(e.animationInSpeed) : g.fadeOut(e.animationOutSpeed));
                    break;
                case "slide":
                    a(a(b).scrollTop() > scrollDis ? g.slideDown(e.animationInSpeed) : g.slideUp(e.animationOutSpeed));
                    break;
                default:
                    a(a(b).scrollTop() > scrollDis ? g.show(0) : g.hide(0))
            }
        }), g.click(function(b) {
            b.preventDefault(), a("html, body").animate({
                scrollTop: 0
            }, e.topSpeed, e.easingType)
        })
    }, a.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationInSpeed: 200,
        animationOutSpeed: 200,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    }, a.fn.scrollUp.destroy = function(d) {
        a.removeData(c.body, "scrollUp"), a("#" + a.fn.scrollUp.settings.scrollName).remove(), a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(), a.fn.jquery.split(".")[1] >= 7 ? a(b).off("scroll", d) : a(b).unbind("scroll", d)
    }, a.scrollUp = a.fn.scrollUp
}(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	14. LIGHTGALLERY
/*-----------------------------------------------------------------------------------*/
/*! lightgallery - v1.6.12 - 2019-02-19
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2019 Sachin N; Licensed GPLv3 */
! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b(b, d) {
            if (this.el = b, this.$el = a(b), this.s = a.extend({}, c, d), this.s.dynamic && "undefined" !== this.s.dynamicEl && this.s.dynamicEl.constructor === Array && !this.s.dynamicEl.length) throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return this.modules = {}, this.lGalleryOn = !1, this.lgBusy = !1, this.hideBartimeout = !1, this.isTouch = "ontouchstart" in document.documentElement, this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1), this.s.dynamic ? this.$items = this.s.dynamicEl : "this" === this.s.selector ? this.$items = this.$el : "" !== this.s.selector ? this.s.selectWithin ? this.$items = a(this.s.selectWithin).find(this.s.selector) : this.$items = this.$el.find(a(this.s.selector)) : this.$items = this.$el.children(), this.$slide = "", this.$outer = "", this.init(), this
        }
        var c = {
            mode: "lg-slide",
            cssEasing: "ease",
            easing: "linear",
            speed: 600,
            height: "100%",
            width: "100%",
            addClass: "",
            startClass: "lg-start-zoom",
            backdropDuration: 150,
            hideBarsDelay: 6e3,
            useLeft: !1,
            closable: !0,
            loop: !0,
            escKey: !0,
            keyPress: !0,
            controls: !0,
            slideEndAnimatoin: !0,
            hideControlOnEnd: !1,
            mousewheel: !0,
            getCaptionFromTitleOrAlt: !0,
            appendSubHtmlTo: ".lg-sub-html",
            subHtmlSelectorRelative: !1,
            preload: 1,
            showAfterLoad: !0,
            selector: "",
            selectWithin: "",
            nextHtml: "",
            prevHtml: "",
            index: !1,
            iframeMaxWidth: "100%",
            download: !0,
            counter: !0,
            appendCounterTo: ".lg-toolbar",
            swipeThreshold: 50,
            enableSwipe: !0,
            enableDrag: !0,
            dynamic: !1,
            dynamicEl: [],
            galleryId: 1
        };
        b.prototype.init = function() {
            var b = this;
            b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
            var c = window.location.hash;
            c.indexOf("lg=" + this.s.galleryId) > 0 && (b.index = parseInt(c.split("&slide=")[1], 10), a("body").addClass("lg-from-hash"), a("body").hasClass("lg-on") || (setTimeout(function() {
                b.build(b.index)
            }), a("body").addClass("lg-on"))), b.s.dynamic ? (b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || 0, a("body").hasClass("lg-on") || setTimeout(function() {
                b.build(b.index), a("body").addClass("lg-on")
            })) : b.$items.on("click.lgcustom", function(c) {
                try {
                    c.preventDefault(), c.preventDefault()
                } catch (a) {
                    c.returnValue = !1
                }
                b.$el.trigger("onBeforeOpen.lg"), b.index = b.s.index || b.$items.index(this), a("body").hasClass("lg-on") || (b.build(b.index), a("body").addClass("lg-on"))
            })
        }, b.prototype.build = function(b) {
            var c = this;
            c.structure(), a.each(a.fn.lightGallery.modules, function(b) {
                c.modules[b] = new a.fn.lightGallery.modules[b](c.el)
            }), c.slide(b, !1, !1, !1), c.s.keyPress && c.keyPress(), c.$items.length > 1 ? (c.arrow(), setTimeout(function() {
                c.enableDrag(), c.enableSwipe()
            }, 50), c.s.mousewheel && c.mousewheel()) : c.$slide.on("click.lg", function() {
                c.$el.trigger("onSlideClick.lg")
            }), c.counter(), c.closeGallery(), c.$el.trigger("onAfterOpen.lg"), c.$outer.on("mousemove.lg click.lg touchstart.lg", function() {
                c.$outer.removeClass("lg-hide-items"), clearTimeout(c.hideBartimeout), c.hideBartimeout = setTimeout(function() {
                    c.$outer.addClass("lg-hide-items")
                }, c.s.hideBarsDelay)
            }), c.$outer.trigger("mousemove.lg")
        }, b.prototype.structure = function() {
            var b, c = "",
                d = "",
                e = 0,
                f = "",
                g = this;
            for (a("body").append('<div class="lg-backdrop"></div>'), a(".lg-backdrop").css("transition-duration", this.s.backdropDuration + "ms"), e = 0; e < this.$items.length; e++) c += '<div class="lg-item"></div>';
            if (this.s.controls && this.$items.length > 1 && (d = '<div class="lg-actions"><button class="lg-prev lg-icon">' + this.s.prevHtml + '</button><button class="lg-next lg-icon">' + this.s.nextHtml + "</button></div>"), ".lg-sub-html" === this.s.appendSubHtmlTo && (f = '<div class="lg-sub-html"></div>'), b = '<div class="lg-outer ' + this.s.addClass + " " + this.s.startClass + '"><div class="lg" style="width:' + this.s.width + "; height:" + this.s.height + '"><div class="lg-inner">' + c + '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' + d + f + "</div></div>", a("body").append(b), this.$outer = a(".lg-outer"), this.$slide = this.$outer.find(".lg-item"), this.s.useLeft ? (this.$outer.addClass("lg-use-left"), this.s.mode = "lg-slide") : this.$outer.addClass("lg-use-css3"), g.setTop(), a(window).on("resize.lg orientationchange.lg", function() {
                    setTimeout(function() {
                        g.setTop()
                    }, 100)
                }), this.$slide.eq(this.index).addClass("lg-current"), this.doCss() ? this.$outer.addClass("lg-css3") : (this.$outer.addClass("lg-css"), this.s.speed = 0), this.$outer.addClass(this.s.mode), this.s.enableDrag && this.$items.length > 1 && this.$outer.addClass("lg-grab"), this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"), this.doCss()) {
                var h = this.$outer.find(".lg-inner");
                h.css("transition-timing-function", this.s.cssEasing), h.css("transition-duration", this.s.speed + "ms")
            }
            setTimeout(function() {
                a(".lg-backdrop").addClass("in")
            }), setTimeout(function() {
                g.$outer.addClass("lg-visible")
            }, this.s.backdropDuration), this.s.download && this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'), this.prevScrollTop = a(window).scrollTop()
        }, b.prototype.setTop = function() {
            if ("100%" !== this.s.height) {
                var b = a(window).height(),
                    c = (b - parseInt(this.s.height, 10)) / 2,
                    d = this.$outer.find(".lg");
                b >= parseInt(this.s.height, 10) ? d.css("top", c + "px") : d.css("top", "0px")
            }
        }, b.prototype.doCss = function() {
            return !! function() {
                var a = ["transition", "MozTransition", "WebkitTransition", "OTransition", "msTransition", "KhtmlTransition"],
                    b = document.documentElement,
                    c = 0;
                for (c = 0; c < a.length; c++)
                    if (a[c] in b.style) return !0
            }()
        }, b.prototype.isVideo = function(a, b) {
            var c;
            if (c = this.s.dynamic ? this.s.dynamicEl[b].html : this.$items.eq(b).attr("data-html"), !a) return c ? {
                html5: !0
            } : (console.error("lightGallery :- data-src is not pvovided on slide item " + (b + 1) + ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"), !1);
            var d = a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),
                e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
                f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
                g = a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);
            return d ? {
                youtube: d
            } : e ? {
                vimeo: e
            } : f ? {
                dailymotion: f
            } : g ? {
                vk: g
            } : void 0
        }, b.prototype.counter = function() {
            this.s.counter && a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">' + (parseInt(this.index, 10) + 1) + '</span> / <span id="lg-counter-all">' + this.$items.length + "</span></div>")
        }, b.prototype.addHtml = function(b) {
            var c, d, e = null;
            if (this.s.dynamic ? this.s.dynamicEl[b].subHtmlUrl ? c = this.s.dynamicEl[b].subHtmlUrl : e = this.s.dynamicEl[b].subHtml : (d = this.$items.eq(b), d.attr("data-sub-html-url") ? c = d.attr("data-sub-html-url") : (e = d.attr("data-sub-html"), this.s.getCaptionFromTitleOrAlt && !e && (e = d.attr("title") || d.find("img").first().attr("alt")))), !c)
                if (void 0 !== e && null !== e) {
                    var f = e.substring(0, 1);
                    "." !== f && "#" !== f || (e = this.s.subHtmlSelectorRelative && !this.s.dynamic ? d.find(e).html() : a(e).html())
                } else e = "";
            ".lg-sub-html" === this.s.appendSubHtmlTo ? c ? this.$outer.find(this.s.appendSubHtmlTo).load(c) : this.$outer.find(this.s.appendSubHtmlTo).html(e) : c ? this.$slide.eq(b).load(c) : this.$slide.eq(b).append(e), void 0 !== e && null !== e && ("" === e ? this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html") : this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")), this.$el.trigger("onAfterAppendSubHtml.lg", [b])
        }, b.prototype.preload = function(a) {
            var b = 1,
                c = 1;
            for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++) this.loadContent(a + b, !1, 0);
            for (c = 1; c <= this.s.preload && !(a - c < 0); c++) this.loadContent(a - c, !1, 0)
        }, b.prototype.loadContent = function(b, c, d) {
            var e, f, g, h, i, j, k = this,
                l = !1,
                m = function(b) {
                    for (var c = [], d = [], e = 0; e < b.length; e++) {
                        var g = b[e].split(" ");
                        "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1])
                    }
                    for (var h = a(window).width(), i = 0; i < c.length; i++)
                        if (parseInt(c[i], 10) > h) {
                            f = d[i];
                            break
                        }
                };
            if (k.s.dynamic) {
                if (k.s.dynamicEl[b].poster && (l = !0, g = k.s.dynamicEl[b].poster), j = k.s.dynamicEl[b].html, f = k.s.dynamicEl[b].src, k.s.dynamicEl[b].responsive) {
                    m(k.s.dynamicEl[b].responsive.split(","))
                }
                h = k.s.dynamicEl[b].srcset, i = k.s.dynamicEl[b].sizes
            } else {
                if (k.$items.eq(b).attr("data-poster") && (l = !0, g = k.$items.eq(b).attr("data-poster")), j = k.$items.eq(b).attr("data-html"), f = k.$items.eq(b).attr("href") || k.$items.eq(b).attr("data-src"), k.$items.eq(b).attr("data-responsive")) {
                    m(k.$items.eq(b).attr("data-responsive").split(","))
                }
                h = k.$items.eq(b).attr("data-srcset"), i = k.$items.eq(b).attr("data-sizes")
            }
            var n = !1;
            k.s.dynamic ? k.s.dynamicEl[b].iframe && (n = !0) : "true" === k.$items.eq(b).attr("data-iframe") && (n = !0);
            var o = k.isVideo(f, b);
            if (!k.$slide.eq(b).hasClass("lg-loaded")) {
                if (n) k.$slide.eq(b).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:' + k.s.iframeMaxWidth + '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' + f + '"  allowfullscreen="true"></iframe></div></div>');
                else if (l) {
                    var p = "";
                    p = o && o.youtube ? "lg-has-youtube" : o && o.vimeo ? "lg-has-vimeo" : "lg-has-html5", k.$slide.eq(b).prepend('<div class="lg-video-cont ' + p + ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' + g + '" /></div></div>')
                } else o ? (k.$slide.eq(b).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'), k.$el.trigger("hasVideo.lg", [b, f, j])) : k.$slide.eq(b).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="' + f + '" /></div>');
                if (k.$el.trigger("onAferAppendSlide.lg", [b]), e = k.$slide.eq(b).find(".lg-object"), i && e.attr("sizes", i), h) {
                    e.attr("srcset", h);
                    try {
                        picturefill({
                            elements: [e[0]]
                        })
                    } catch (a) {
                        console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")
                    }
                }
                ".lg-sub-html" !== this.s.appendSubHtmlTo && k.addHtml(b), k.$slide.eq(b).addClass("lg-loaded")
            }
            k.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                var c = 0;
                d && !a("body").hasClass("lg-from-hash") && (c = d), setTimeout(function() {
                    k.$slide.eq(b).addClass("lg-complete"), k.$el.trigger("onSlideItemLoad.lg", [b, d || 0])
                }, c)
            }), o && o.html5 && !l && k.$slide.eq(b).addClass("lg-complete"), !0 === c && (k.$slide.eq(b).hasClass("lg-complete") ? k.preload(b) : k.$slide.eq(b).find(".lg-object").on("load.lg error.lg", function() {
                k.preload(b)
            }))
        }, b.prototype.slide = function(b, c, d, e) {
            var f = this.$outer.find(".lg-current").index(),
                g = this;
            if (!g.lGalleryOn || f !== b) {
                var h = this.$slide.length,
                    i = g.lGalleryOn ? this.s.speed : 0;
                if (!g.lgBusy) {
                    if (this.s.download) {
                        var j;
                        j = g.s.dynamic ? !1 !== g.s.dynamicEl[b].downloadUrl && (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src) : "false" !== g.$items.eq(b).attr("data-download-url") && (g.$items.eq(b).attr("data-download-url") || g.$items.eq(b).attr("href") || g.$items.eq(b).attr("data-src")), j ? (a("#lg-download").attr("href", j), g.$outer.removeClass("lg-hide-download")) : g.$outer.addClass("lg-hide-download")
                    }
                    if (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]), g.lgBusy = !0, clearTimeout(g.hideBartimeout), ".lg-sub-html" === this.s.appendSubHtmlTo && setTimeout(function() {
                            g.addHtml(b)
                        }, i), this.arrowDisable(b), e || (b < f ? e = "prev" : b > f && (e = "next")), c) {
                        this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
                        var k, l;
                        h > 2 ? (k = b - 1, l = b + 1, 0 === b && f === h - 1 ? (l = 0, k = h - 1) : b === h - 1 && 0 === f && (l = 0, k = h - 1)) : (k = 0, l = 1), "prev" === e ? g.$slide.eq(l).addClass("lg-next-slide") : g.$slide.eq(k).addClass("lg-prev-slide"), g.$slide.eq(b).addClass("lg-current")
                    } else g.$outer.addClass("lg-no-trans"), this.$slide.removeClass("lg-prev-slide lg-next-slide"), "prev" === e ? (this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(f).addClass("lg-next-slide")) : (this.$slide.eq(b).addClass("lg-next-slide"), this.$slide.eq(f).addClass("lg-prev-slide")), setTimeout(function() {
                        g.$slide.removeClass("lg-current"), g.$slide.eq(b).addClass("lg-current"), g.$outer.removeClass("lg-no-trans")
                    }, 50);
                    g.lGalleryOn ? (setTimeout(function() {
                        g.loadContent(b, !0, 0)
                    }, this.s.speed + 50), setTimeout(function() {
                        g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])
                    }, this.s.speed)) : (g.loadContent(b, !0, g.s.backdropDuration), g.lgBusy = !1, g.$el.trigger("onAfterSlide.lg", [f, b, c, d])), g.lGalleryOn = !0, this.s.counter && a("#lg-counter-current").text(b + 1)
                }
                g.index = b
            }
        }, b.prototype.goToNextSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index + 1 < b.$slide.length ? (b.index++, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : c ? (b.index = 0, b.$el.trigger("onBeforeNextSlide.lg", [b.index]), b.slide(b.index, a, !1, "next")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-right-end"), setTimeout(function() {
                b.$outer.removeClass("lg-right-end")
            }, 400)))
        }, b.prototype.goToPrevSlide = function(a) {
            var b = this,
                c = b.s.loop;
            a && b.$slide.length < 3 && (c = !1), b.lgBusy || (b.index > 0 ? (b.index--, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : c ? (b.index = b.$items.length - 1, b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]), b.slide(b.index, a, !1, "prev")) : b.s.slideEndAnimatoin && !a && (b.$outer.addClass("lg-left-end"), setTimeout(function() {
                b.$outer.removeClass("lg-left-end")
            }, 400)))
        }, b.prototype.keyPress = function() {
            var b = this;
            this.$items.length > 1 && a(window).on("keyup.lg", function(a) {
                b.$items.length > 1 && (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()), 39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()))
            }), a(window).on("keydown.lg", function(a) {
                !0 === b.s.escKey && 27 === a.keyCode && (a.preventDefault(), b.$outer.hasClass("lg-thumb-open") ? b.$outer.removeClass("lg-thumb-open") : b.destroy())
            })
        }, b.prototype.arrow = function() {
            var a = this;
            this.$outer.find(".lg-prev").on("click.lg", function() {
                a.goToPrevSlide()
            }), this.$outer.find(".lg-next").on("click.lg", function() {
                a.goToNextSlide()
            })
        }, b.prototype.arrowDisable = function(a) {
            !this.s.loop && this.s.hideControlOnEnd && (a + 1 < this.$slide.length ? this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-next").attr("disabled", "disabled").addClass("disabled"), a > 0 ? this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled") : this.$outer.find(".lg-prev").attr("disabled", "disabled").addClass("disabled"))
        }, b.prototype.setTranslate = function(a, b, c) {
            this.s.useLeft ? a.css("left", b) : a.css({
                transform: "translate3d(" + b + "px, " + c + "px, 0px)"
            })
        }, b.prototype.touchMove = function(b, c) {
            var d = c - b;
            Math.abs(d) > 15 && (this.$outer.addClass("lg-dragging"), this.setTranslate(this.$slide.eq(this.index), d, 0), this.setTranslate(a(".lg-prev-slide"), -this.$slide.eq(this.index).width() + d, 0), this.setTranslate(a(".lg-next-slide"), this.$slide.eq(this.index).width() + d, 0))
        }, b.prototype.touchEnd = function(a) {
            var b = this;
            "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"), this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity", "0"), setTimeout(function() {
                b.$outer.removeClass("lg-dragging"), a < 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToNextSlide(!0) : a > 0 && Math.abs(a) > b.s.swipeThreshold ? b.goToPrevSlide(!0) : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"), b.$slide.removeAttr("style")
            }), setTimeout(function() {
                b.$outer.hasClass("lg-dragging") || "lg-slide" === b.s.mode || b.$outer.removeClass("lg-slide")
            }, b.s.speed + 100)
        }, b.prototype.enableSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1;
            a.s.enableSwipe && a.doCss() && (a.$slide.on("touchstart.lg", function(c) {
                a.$outer.hasClass("lg-zoomed") || a.lgBusy || (c.preventDefault(), a.manageSwipeClass(), b = c.originalEvent.targetTouches[0].pageX)
            }), a.$slide.on("touchmove.lg", function(e) {
                a.$outer.hasClass("lg-zoomed") || (e.preventDefault(), c = e.originalEvent.targetTouches[0].pageX, a.touchMove(b, c), d = !0)
            }), a.$slide.on("touchend.lg", function() {
                a.$outer.hasClass("lg-zoomed") || (d ? (d = !1, a.touchEnd(c - b)) : a.$el.trigger("onSlideClick.lg"))
            }))
        }, b.prototype.enableDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1;
            b.s.enableDrag && b.doCss() && (b.$slide.on("mousedown.lg", function(d) {
                b.$outer.hasClass("lg-zoomed") || b.lgBusy || a(d.target).text().trim() || (d.preventDefault(), b.manageSwipeClass(), c = d.pageX, e = !0, b.$outer.scrollLeft += 1, b.$outer.scrollLeft -= 1, b.$outer.removeClass("lg-grab").addClass("lg-grabbing"), b.$el.trigger("onDragstart.lg"))
            }), a(window).on("mousemove.lg", function(a) {
                e && (f = !0, d = a.pageX, b.touchMove(c, d), b.$el.trigger("onDragmove.lg"))
            }), a(window).on("mouseup.lg", function(g) {
                f ? (f = !1, b.touchEnd(d - c), b.$el.trigger("onDragend.lg")) : (a(g.target).hasClass("lg-object") || a(g.target).hasClass("lg-video-play")) && b.$el.trigger("onSlideClick.lg"), e && (e = !1, b.$outer.removeClass("lg-grabbing").addClass("lg-grab"))
            }))
        }, b.prototype.manageSwipeClass = function() {
            var a = this.index + 1,
                b = this.index - 1;
            this.s.loop && this.$slide.length > 2 && (0 === this.index ? b = this.$slide.length - 1 : this.index === this.$slide.length - 1 && (a = 0)), this.$slide.removeClass("lg-next-slide lg-prev-slide"), b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"), this.$slide.eq(a).addClass("lg-next-slide")
        }, b.prototype.mousewheel = function() {
            var a = this;
            a.$outer.on("mousewheel.lg", function(b) {
                b.deltaY && (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(), b.preventDefault())
            })
        }, b.prototype.closeGallery = function() {
            var b = this,
                c = !1;
            this.$outer.find(".lg-close").on("click.lg", function() {
                b.destroy()
            }), b.s.closable && (b.$outer.on("mousedown.lg", function(b) {
                c = !!(a(b.target).is(".lg-outer") || a(b.target).is(".lg-item ") || a(b.target).is(".lg-img-wrap"))
            }), b.$outer.on("mousemove.lg", function() {
                c = !1
            }), b.$outer.on("mouseup.lg", function(d) {
                (a(d.target).is(".lg-outer") || a(d.target).is(".lg-item ") || a(d.target).is(".lg-img-wrap") && c) && (b.$outer.hasClass("lg-dragging") || b.destroy())
            }))
        }, b.prototype.destroy = function(b) {
            var c = this;
            b || (c.$el.trigger("onBeforeClose.lg"), a(window).scrollTop(c.prevScrollTop)), b && (c.s.dynamic || this.$items.off("click.lg click.lgcustom"), a.removeData(c.el, "lightGallery")), this.$el.off(".lg.tm"), a.each(a.fn.lightGallery.modules, function(a) {
                c.modules[a] && c.modules[a].destroy()
            }), this.lGalleryOn = !1, clearTimeout(c.hideBartimeout), this.hideBartimeout = !1, a(window).off(".lg"), a("body").removeClass("lg-on lg-from-hash"), c.$outer && c.$outer.removeClass("lg-visible"), a(".lg-backdrop").removeClass("in"), setTimeout(function() {
                c.$outer && c.$outer.remove(), a(".lg-backdrop").remove(), b || c.$el.trigger("onCloseAfter.lg")
            }, c.s.backdropDuration + 50)
        }, a.fn.lightGallery = function(c) {
            return this.each(function() {
                if (a.data(this, "lightGallery")) try {
                    a(this).data("lightGallery").init()
                } catch (a) {
                    console.error("lightGallery has not initiated properly")
                } else a.data(this, "lightGallery", new b(this, c))
            })
        }, a.fn.lightGallery.modules = {}
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                autoplay: !1,
                pause: 5e3,
                progressBar: !0,
                fourceAutoplay: !1,
                autoplayControls: !0,
                appendAutoplayControlsTo: ".lg-toolbar"
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), !(this.core.$items.length < 2) && (this.core.s = a.extend({}, b, this.core.s), this.interval = !1, this.fromAuto = !0, this.canceledOnTouch = !1, this.fourceAutoplayTemp = this.core.s.fourceAutoplay, this.core.doCss() || (this.core.s.progressBar = !1), this.init(), this)
            };
        c.prototype.init = function() {
            var a = this;
            a.core.s.autoplayControls && a.controls(), a.core.s.progressBar && a.core.$outer.find(".lg").append('<div class="lg-progress-bar"><div class="lg-progress"></div></div>'), a.progress(), a.core.s.autoplay && a.$el.one("onSlideItemLoad.lg.tm", function() {
                a.startlAuto()
            }), a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function() {
                a.interval && (a.cancelAuto(), a.canceledOnTouch = !0)
            }), a.$el.on("onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm", function() {
                !a.interval && a.canceledOnTouch && (a.startlAuto(), a.canceledOnTouch = !1)
            })
        }, c.prototype.progress = function() {
            var a, b, c = this;
            c.$el.on("onBeforeSlide.lg.tm", function() {
                c.core.s.progressBar && c.fromAuto && (a = c.core.$outer.find(".lg-progress-bar"), b = c.core.$outer.find(".lg-progress"), c.interval && (b.removeAttr("style"), a.removeClass("lg-start"), setTimeout(function() {
                    b.css("transition", "width " + (c.core.s.speed + c.core.s.pause) + "ms ease 0s"), a.addClass("lg-start")
                }, 20))), c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(), c.fromAuto = !1
            })
        }, c.prototype.controls = function() {
            var b = this;
            a(this.core.s.appendAutoplayControlsTo).append('<span class="lg-autoplay-button lg-icon"></span>'), b.core.$outer.find(".lg-autoplay-button").on("click.lg", function() {
                a(b.core.$outer).hasClass("lg-show-autoplay") ? (b.cancelAuto(), b.core.s.fourceAutoplay = !1) : b.interval || (b.startlAuto(), b.core.s.fourceAutoplay = b.fourceAutoplayTemp)
            })
        }, c.prototype.startlAuto = function() {
            var a = this;
            a.core.$outer.find(".lg-progress").css("transition", "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"), a.core.$outer.addClass("lg-show-autoplay"), a.core.$outer.find(".lg-progress-bar").addClass("lg-start"), a.interval = setInterval(function() {
                a.core.index + 1 < a.core.$items.length ? a.core.index++ : a.core.index = 0, a.fromAuto = !0, a.core.slide(a.core.index, !1, !1, "next")
            }, a.core.s.speed + a.core.s.pause)
        }, c.prototype.cancelAuto = function() {
            clearInterval(this.interval), this.interval = !1, this.core.$outer.find(".lg-progress").removeAttr("style"), this.core.$outer.removeClass("lg-show-autoplay"), this.core.$outer.find(".lg-progress-bar").removeClass("lg-start")
        }, c.prototype.destroy = function() {
            this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove()
        }, a.fn.lightGallery.modules.autoplay = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
        }
        var c = {
                fullScreen: !0
            },
            d = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, c, this.core.s), this.init(), this
            };
        d.prototype.init = function() {
            var a = "";
            if (this.core.s.fullScreen) {
                if (!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)) return;
                a = '<span class="lg-fullscreen lg-icon"></span>', this.core.$outer.find(".lg-toolbar").append(a), this.fullScreen()
            }
        }, d.prototype.requestFullscreen = function() {
            var a = document.documentElement;
            a.requestFullscreen ? a.requestFullscreen() : a.msRequestFullscreen ? a.msRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.webkitRequestFullscreen && a.webkitRequestFullscreen()
        }, d.prototype.exitFullscreen = function() {
            document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
        }, d.prototype.fullScreen = function() {
            var c = this;
            a(document).on("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg", function() {
                c.core.$outer.toggleClass("lg-fullscreen-on")
            }), this.core.$outer.find(".lg-fullscreen").on("click.lg", function() {
                b() ? c.exitFullscreen() : c.requestFullscreen()
            })
        }, d.prototype.destroy = function() {
            b() && this.exitFullscreen(), a(document).off("fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg")
        }, a.fn.lightGallery.modules.fullscreen = d
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                pager: !1
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.$el = a(c), this.core.s = a.extend({}, b, this.core.s), this.core.s.pager && this.core.$items.length > 1 && this.init(), this
            };
        c.prototype.init = function() {
            var b, c, d, e = this,
                f = "";
            if (e.core.$outer.find(".lg").append('<div class="lg-pager-outer"></div>'), e.core.s.dynamic)
                for (var g = 0; g < e.core.s.dynamicEl.length; g++) f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + e.core.s.dynamicEl[g].thumb + '" /></div></span>';
            else e.core.$items.each(function() {
                e.core.s.exThumbImage ? f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).attr(e.core.s.exThumbImage) + '" /></div></span>' : f += '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' + a(this).find("img").attr("src") + '" /></div></span>'
            });
            c = e.core.$outer.find(".lg-pager-outer"), c.html(f), b = e.core.$outer.find(".lg-pager-cont"), b.on("click.lg touchend.lg", function() {
                var b = a(this);
                e.core.index = b.index(), e.core.slide(e.core.index, !1, !0, !1)
            }), c.on("mouseover.lg", function() {
                clearTimeout(d), c.addClass("lg-pager-hover")
            }), c.on("mouseout.lg", function() {
                d = setTimeout(function() {
                    c.removeClass("lg-pager-hover")
                })
            }), e.core.$el.on("onBeforeSlide.lg.tm", function(a, c, d) {
                b.removeClass("lg-pager-active"), b.eq(d).addClass("lg-pager-active")
            })
        }, c.prototype.destroy = function() {}, a.fn.lightGallery.modules.pager = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                thumbnail: !0,
                animateThumb: !0,
                currentPagerPosition: "middle",
                thumbWidth: 100,
                thumbHeight: "80px",
                thumbContHeight: 100,
                thumbMargin: 5,
                exThumbImage: !1,
                showThumbByDefault: !0,
                toogleThumb: !0,
                pullCaptionUp: !0,
                enableThumbDrag: !0,
                enableThumbSwipe: !0,
                swipeThreshold: 50,
                loadYoutubeThumbnail: !0,
                youtubeThumbSize: 1,
                loadVimeoThumbnail: !0,
                vimeoThumbSize: "thumbnail_small",
                loadDailymotionThumbnail: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.$el = a(c), this.$thumbOuter = null, this.thumbOuterWidth = 0, this.thumbTotalWidth = this.core.$items.length * (this.core.s.thumbWidth + this.core.s.thumbMargin), this.thumbIndex = this.core.index, this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"), this.left = 0, this.init(), this
            };
        c.prototype.init = function() {
            var a = this;
            this.core.s.thumbnail && this.core.$items.length > 1 && (this.core.s.showThumbByDefault && setTimeout(function() {
                a.core.$outer.addClass("lg-thumb-open")
            }, 700), this.core.s.pullCaptionUp && this.core.$outer.addClass("lg-pull-caption-up"), this.build(), this.core.s.animateThumb && this.core.doCss() ? (this.core.s.enableThumbDrag && this.enableThumbDrag(), this.core.s.enableThumbSwipe && this.enableThumbSwipe(), this.thumbClickable = !1) : this.thumbClickable = !0, this.toogle(), this.thumbkeyPress())
        }, c.prototype.build = function() {
            function b(a, b, c) {
                var g, h = d.core.isVideo(a, c) || {},
                    i = "";
                h.youtube || h.vimeo || h.dailymotion ? h.youtube ? g = d.core.s.loadYoutubeThumbnail ? "//img.youtube.com/vi/" + h.youtube[1] + "/" + d.core.s.youtubeThumbSize + ".jpg" : b : h.vimeo ? d.core.s.loadVimeoThumbnail ? (g = "//i.vimeocdn.com/video/error_" + f + ".jpg", i = h.vimeo[1]) : g = b : h.dailymotion && (g = d.core.s.loadDailymotionThumbnail ? "//www.dailymotion.com/thumbnail/video/" + h.dailymotion[1] : b) : g = b, e += '<div data-vimeo-id="' + i + '" class="lg-thumb-item" style="width:' + d.core.s.thumbWidth + "px; height: " + d.core.s.thumbHeight + "; margin-right: " + d.core.s.thumbMargin + 'px"><img src="' + g + '" /></div>', i = ""
            }
            var c, d = this,
                e = "",
                f = "",
                g = '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
            switch (this.core.s.vimeoThumbSize) {
                case "thumbnail_large":
                    f = "640";
                    break;
                case "thumbnail_medium":
                    f = "200x150";
                    break;
                case "thumbnail_small":
                    f = "100x75"
            }
            if (d.core.$outer.addClass("lg-has-thumb"), d.core.$outer.find(".lg").append(g), d.$thumbOuter = d.core.$outer.find(".lg-thumb-outer"), d.thumbOuterWidth = d.$thumbOuter.width(), d.core.s.animateThumb && d.core.$outer.find(".lg-thumb").css({
                    width: d.thumbTotalWidth + "px",
                    position: "relative"
                }), this.core.s.animateThumb && d.$thumbOuter.css("height", d.core.s.thumbContHeight + "px"), d.core.s.dynamic)
                for (var h = 0; h < d.core.s.dynamicEl.length; h++) b(d.core.s.dynamicEl[h].src, d.core.s.dynamicEl[h].thumb, h);
            else d.core.$items.each(function(c) {
                d.core.s.exThumbImage ? b(a(this).attr("href") || a(this).attr("data-src"), a(this).attr(d.core.s.exThumbImage), c) : b(a(this).attr("href") || a(this).attr("data-src"), a(this).find("img").attr("src"), c)
            });
            d.core.$outer.find(".lg-thumb").html(e), c = d.core.$outer.find(".lg-thumb-item"), c.each(function() {
                var b = a(this),
                    c = b.attr("data-vimeo-id");
                c && a.getJSON("//www.vimeo.com/api/v2/video/" + c + ".json?callback=?", {
                    format: "json"
                }, function(a) {
                    b.find("img").attr("src", a[0][d.core.s.vimeoThumbSize])
                })
            }), c.eq(d.core.index).addClass("active"), d.core.$el.on("onBeforeSlide.lg.tm", function() {
                c.removeClass("active"), c.eq(d.core.index).addClass("active")
            }), c.on("click.lg touchend.lg", function() {
                var b = a(this);
                setTimeout(function() {
                    (d.thumbClickable && !d.core.lgBusy || !d.core.doCss()) && (d.core.index = b.index(), d.core.slide(d.core.index, !1, !0, !1))
                }, 50)
            }), d.core.$el.on("onBeforeSlide.lg.tm", function() {
                d.animateThumb(d.core.index)
            }), a(window).on("resize.lg.thumb orientationchange.lg.thumb", function() {
                setTimeout(function() {
                    d.animateThumb(d.core.index), d.thumbOuterWidth = d.$thumbOuter.width()
                }, 200)
            })
        }, c.prototype.setTranslate = function(a) {
            this.core.$outer.find(".lg-thumb").css({
                transform: "translate3d(-" + a + "px, 0px, 0px)"
            })
        }, c.prototype.animateThumb = function(a) {
            var b = this.core.$outer.find(".lg-thumb");
            if (this.core.s.animateThumb) {
                var c;
                switch (this.core.s.currentPagerPosition) {
                    case "left":
                        c = 0;
                        break;
                    case "middle":
                        c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                        break;
                    case "right":
                        c = this.thumbOuterWidth - this.core.s.thumbWidth
                }
                this.left = (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c, this.left > this.thumbTotalWidth - this.thumbOuterWidth && (this.left = this.thumbTotalWidth - this.thumbOuterWidth), this.left < 0 && (this.left = 0), this.core.lGalleryOn ? (b.hasClass("on") || this.core.$outer.find(".lg-thumb").css("transition-duration", this.core.s.speed + "ms"), this.core.doCss() || b.animate({
                    left: -this.left + "px"
                }, this.core.s.speed)) : this.core.doCss() || b.css("left", -this.left + "px"), this.setTranslate(this.left)
            }
        }, c.prototype.enableThumbDrag = function() {
            var b = this,
                c = 0,
                d = 0,
                e = !1,
                f = !1,
                g = 0;
            b.$thumbOuter.addClass("lg-grab"), b.core.$outer.find(".lg-thumb").on("mousedown.lg.thumb", function(a) {
                b.thumbTotalWidth > b.thumbOuterWidth && (a.preventDefault(), c = a.pageX, e = !0, b.core.$outer.scrollLeft += 1, b.core.$outer.scrollLeft -= 1, b.thumbClickable = !1, b.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.thumb", function(a) {
                e && (g = b.left, f = !0, d = a.pageX, b.$thumbOuter.addClass("lg-dragging"), g -= d - c, g > b.thumbTotalWidth - b.thumbOuterWidth && (g = b.thumbTotalWidth - b.thumbOuterWidth), g < 0 && (g = 0), b.setTranslate(g))
            }), a(window).on("mouseup.lg.thumb", function() {
                f ? (f = !1, b.$thumbOuter.removeClass("lg-dragging"), b.left = g, Math.abs(d - c) < b.core.s.swipeThreshold && (b.thumbClickable = !0)) : b.thumbClickable = !0, e && (e = !1, b.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"))
            })
        }, c.prototype.enableThumbSwipe = function() {
            var a = this,
                b = 0,
                c = 0,
                d = !1,
                e = 0;
            a.core.$outer.find(".lg-thumb").on("touchstart.lg", function(c) {
                a.thumbTotalWidth > a.thumbOuterWidth && (c.preventDefault(), b = c.originalEvent.targetTouches[0].pageX, a.thumbClickable = !1)
            }), a.core.$outer.find(".lg-thumb").on("touchmove.lg", function(f) {
                a.thumbTotalWidth > a.thumbOuterWidth && (f.preventDefault(), c = f.originalEvent.targetTouches[0].pageX, d = !0, a.$thumbOuter.addClass("lg-dragging"), e = a.left, e -= c - b, e > a.thumbTotalWidth - a.thumbOuterWidth && (e = a.thumbTotalWidth - a.thumbOuterWidth), e < 0 && (e = 0), a.setTranslate(e))
            }), a.core.$outer.find(".lg-thumb").on("touchend.lg", function() {
                a.thumbTotalWidth > a.thumbOuterWidth && d ? (d = !1, a.$thumbOuter.removeClass("lg-dragging"), Math.abs(c - b) < a.core.s.swipeThreshold && (a.thumbClickable = !0), a.left = e) : a.thumbClickable = !0
            })
        }, c.prototype.toogle = function() {
            var a = this;
            a.core.s.toogleThumb && (a.core.$outer.addClass("lg-can-toggle"), a.$thumbOuter.append('<span class="lg-toogle-thumb lg-icon"></span>'), a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function() {
                a.core.$outer.toggleClass("lg-thumb-open")
            }))
        }, c.prototype.thumbkeyPress = function() {
            var b = this;
            a(window).on("keydown.lg.thumb", function(a) {
                38 === a.keyCode ? (a.preventDefault(), b.core.$outer.addClass("lg-thumb-open")) : 40 === a.keyCode && (a.preventDefault(), b.core.$outer.removeClass("lg-thumb-open"))
            })
        }, c.prototype.destroy = function() {
            this.core.s.thumbnail && this.core.$items.length > 1 && (a(window).off("resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"), this.$thumbOuter.remove(), this.core.$outer.removeClass("lg-has-thumb"))
        }, a.fn.lightGallery.modules.Thumbnail = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
}(this, function(a) {
    ! function() {
        "use strict";

        function b(a, b, c, d) {
            var e = this;
            if (e.core.$slide.eq(b).find(".lg-video").append(e.loadVideo(c, "lg-object", !0, b, d)), d)
                if (e.core.s.videojs) try {
                    videojs(e.core.$slide.eq(b).find(".lg-html5").get(0), e.core.s.videojsOptions, function() {
                        !e.videoLoaded && e.core.s.autoplayFirstVideo && this.play()
                    })
                } catch (a) {
                    console.error("Make sure you have included videojs")
                } else !e.videoLoaded && e.core.s.autoplayFirstVideo && e.core.$slide.eq(b).find(".lg-html5").get(0).play()
        }

        function c(a, b) {
            var c = this.core.$slide.eq(b).find(".lg-video-cont");
            c.hasClass("lg-has-iframe") || (c.css("max-width", this.core.s.videoMaxWidth), this.videoLoaded = !0)
        }

        function d(b, c, d) {
            var e = this,
                f = e.core.$slide.eq(c),
                g = f.find(".lg-youtube").get(0),
                h = f.find(".lg-vimeo").get(0),
                i = f.find(".lg-dailymotion").get(0),
                j = f.find(".lg-vk").get(0),
                k = f.find(".lg-html5").get(0);
            if (g) g.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
            else if (h) try {
                    $f(h).api("pause")
                } catch (a) {
                    console.error("Make sure you have included froogaloop2 js")
                } else if (i) i.contentWindow.postMessage("pause", "*");
                else if (k)
                if (e.core.s.videojs) try {
                    videojs(k).pause()
                } catch (a) {
                    console.error("Make sure you have included videojs")
                } else k.pause();
            j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
            var l;
            l = e.core.s.dynamic ? e.core.s.dynamicEl[d].src : e.core.$items.eq(d).attr("href") || e.core.$items.eq(d).attr("data-src");
            var m = e.core.isVideo(l, d) || {};
            (m.youtube || m.vimeo || m.dailymotion || m.vk) && e.core.$outer.addClass("lg-hide-download")
        }
        var e = {
                videoMaxWidth: "855px",
                autoplayFirstVideo: !0,
                youtubePlayerParams: !1,
                vimeoPlayerParams: !1,
                dailymotionPlayerParams: !1,
                vkPlayerParams: !1,
                videojs: !1,
                videojsOptions: {}
            },
            f = function(b) {
                return this.core = a(b).data("lightGallery"), this.$el = a(b), this.core.s = a.extend({}, e, this.core.s), this.videoLoaded = !1, this.init(), this
            };
        f.prototype.init = function() {
            var e = this;
            e.core.$el.on("hasVideo.lg.tm", b.bind(this)), e.core.$el.on("onAferAppendSlide.lg.tm", c.bind(this)), e.core.doCss() && e.core.$items.length > 1 && (e.core.s.enableSwipe || e.core.s.enableDrag) ? e.core.$el.on("onSlideClick.lg.tm", function() {
                var a = e.core.$slide.eq(e.core.index);
                e.loadVideoOnclick(a)
            }) : e.core.$slide.on("click.lg", function() {
                e.loadVideoOnclick(a(this))
            }), e.core.$el.on("onBeforeSlide.lg.tm", d.bind(this)), e.core.$el.on("onAfterSlide.lg.tm", function(a, b) {
                e.core.$slide.eq(b).removeClass("lg-video-playing")
            }), e.core.s.autoplayFirstVideo && e.core.$el.on("onAferAppendSlide.lg.tm", function(a, b) {
                if (!e.core.lGalleryOn) {
                    var c = e.core.$slide.eq(b);
                    setTimeout(function() {
                        e.loadVideoOnclick(c)
                    }, 100)
                }
            })
        }, f.prototype.loadVideo = function(b, c, d, e, f) {
            var g = "",
                h = 1,
                i = "",
                j = this.core.isVideo(b, e) || {};
            if (d && (h = this.videoLoaded ? 0 : this.core.s.autoplayFirstVideo ? 1 : 0), j.youtube) i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1", this.core.s.youtubePlayerParams && (i = i + "&" + a.param(this.core.s.youtubePlayerParams)), g = '<iframe class="lg-video-object lg-youtube ' + c + '" width="560" height="315" src="//www.youtube.com/embed/' + j.youtube[1] + i + '" frameborder="0" allowfullscreen></iframe>';
            else if (j.vimeo) i = "?autoplay=" + h + "&api=1", this.core.s.vimeoPlayerParams && (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)), g = '<iframe class="lg-video-object lg-vimeo ' + c + '" width="560" height="315"  src="//player.vimeo.com/video/' + j.vimeo[1] + i + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
            else if (j.dailymotion) i = "?wmode=opaque&autoplay=" + h + "&api=postMessage", this.core.s.dailymotionPlayerParams && (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)), g = '<iframe class="lg-video-object lg-dailymotion ' + c + '" width="560" height="315" src="//www.dailymotion.com/embed/video/' + j.dailymotion[1] + i + '" frameborder="0" allowfullscreen></iframe>';
            else if (j.html5) {
                var k = f.substring(0, 1);
                "." !== k && "#" !== k || (f = a(f).html()), g = f
            } else j.vk && (i = "&autoplay=" + h, this.core.s.vkPlayerParams && (i = i + "&" + a.param(this.core.s.vkPlayerParams)), g = '<iframe class="lg-video-object lg-vk ' + c + '" width="560" height="315" src="//vk.com/video_ext.php?' + j.vk[1] + i + '" frameborder="0" allowfullscreen></iframe>');
            return g
        }, f.prototype.loadVideoOnclick = function(a) {
            var b = this;
            if (a.find(".lg-object").hasClass("lg-has-poster") && a.find(".lg-object").is(":visible"))
                if (a.hasClass("lg-has-video")) {
                    var c = a.find(".lg-youtube").get(0),
                        d = a.find(".lg-vimeo").get(0),
                        e = a.find(".lg-dailymotion").get(0),
                        f = a.find(".lg-html5").get(0);
                    if (c) c.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                    else if (d) try {
                            $f(d).api("play")
                        } catch (a) {
                            console.error("Make sure you have included froogaloop2 js")
                        } else if (e) e.contentWindow.postMessage("play", "*");
                        else if (f)
                        if (b.core.s.videojs) try {
                            videojs(f).play()
                        } catch (a) {
                            console.error("Make sure you have included videojs")
                        } else f.play();
                    a.addClass("lg-video-playing")
                } else {
                    a.addClass("lg-video-playing lg-has-video");
                    var g, h, i = function(c, d) {
                        if (a.find(".lg-video").append(b.loadVideo(c, "", !1, b.core.index, d)), d)
                            if (b.core.s.videojs) try {
                                videojs(b.core.$slide.eq(b.core.index).find(".lg-html5").get(0), b.core.s.videojsOptions, function() {
                                    this.play()
                                })
                            } catch (a) {
                                console.error("Make sure you have included videojs")
                            } else b.core.$slide.eq(b.core.index).find(".lg-html5").get(0).play()
                    };
                    b.core.s.dynamic ? (g = b.core.s.dynamicEl[b.core.index].src, h = b.core.s.dynamicEl[b.core.index].html, i(g, h)) : (g = b.core.$items.eq(b.core.index).attr("href") || b.core.$items.eq(b.core.index).attr("data-src"), h = b.core.$items.eq(b.core.index).attr("data-html"), i(g, h));
                    var j = a.find(".lg-object");
                    a.find(".lg-video").append(j), a.find(".lg-video-object").hasClass("lg-html5") || (a.removeClass("lg-complete"), a.find(".lg-video-object").on("load.lg error.lg", function() {
                        a.addClass("lg-complete")
                    }))
                }
        }, f.prototype.destroy = function() {
            this.videoLoaded = !1
        }, a.fn.lightGallery.modules.video = f
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = function() {
                var a = !1,
                    b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
                return b && parseInt(b[2], 10) < 54 && (a = !0), a
            },
            c = {
                scale: 1,
                zoom: !0,
                actualSize: !0,
                enableZoomAfter: 300,
                useLeftForZoom: b()
            },
            d = function(b) {
                return this.core = a(b).data("lightGallery"), this.core.s = a.extend({}, c, this.core.s), this.core.s.zoom && this.core.doCss() && (this.init(), this.zoomabletimeout = !1, this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()), this
            };
        d.prototype.init = function() {
            var b = this,
                c = '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
            b.core.s.actualSize && (c += '<span id="lg-actual-size" class="lg-icon"></span>'), b.core.s.useLeftForZoom ? b.core.$outer.addClass("lg-use-left-for-zoom") : b.core.$outer.addClass("lg-use-transition-for-zoom"), this.core.$outer.find(".lg-toolbar").append(c), b.core.$el.on("onSlideItemLoad.lg.tm.zoom", function(c, d, e) {
                var f = b.core.s.enableZoomAfter + e;
                a("body").hasClass("lg-from-hash") && e ? f = 0 : a("body").removeClass("lg-from-hash"), b.zoomabletimeout = setTimeout(function() {
                    b.core.$slide.eq(d).addClass("lg-zoomable")
                }, f + 30)
            });
            var d = 1,
                e = function(c) {
                    var d, e, f = b.core.$outer.find(".lg-current .lg-image"),
                        g = (a(window).width() - f.prop("offsetWidth")) / 2,
                        h = (a(window).height() - f.prop("offsetHeight")) / 2 + a(window).scrollTop();
                    d = b.pageX - g, e = b.pageY - h;
                    var i = (c - 1) * d,
                        j = (c - 1) * e;
                    f.css("transform", "scale3d(" + c + ", " + c + ", 1)").attr("data-scale", c), b.core.s.useLeftForZoom ? f.parent().css({
                        left: -i + "px",
                        top: -j + "px"
                    }).attr("data-x", i).attr("data-y", j) : f.parent().css("transform", "translate3d(-" + i + "px, -" + j + "px, 0)").attr("data-x", i).attr("data-y", j)
                },
                f = function() {
                    d > 1 ? b.core.$outer.addClass("lg-zoomed") : b.resetZoom(), d < 1 && (d = 1), e(d)
                },
                g = function(c, e, g, h) {
                    var i, j = e.prop("offsetWidth");
                    i = b.core.s.dynamic ? b.core.s.dynamicEl[g].width || e[0].naturalWidth || j : b.core.$items.eq(g).attr("data-width") || e[0].naturalWidth || j;
                    var k;
                    b.core.$outer.hasClass("lg-zoomed") ? d = 1 : i > j && (k = i / j, d = k || 2), h ? (b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop()) : (b.pageX = c.pageX || c.originalEvent.targetTouches[0].pageX, b.pageY = c.pageY || c.originalEvent.targetTouches[0].pageY), f(), setTimeout(function() {
                        b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
                    }, 10)
                },
                h = !1;
            b.core.$el.on("onAferAppendSlide.lg.tm.zoom", function(a, c) {
                var d = b.core.$slide.eq(c).find(".lg-image");
                d.on("dblclick", function(a) {
                    g(a, d, c)
                }), d.on("touchstart", function(a) {
                    h ? (clearTimeout(h), h = null, g(a, d, c)) : h = setTimeout(function() {
                        h = null
                    }, 300), a.preventDefault()
                })
            }), a(window).on("resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom", function() {
                b.pageX = a(window).width() / 2, b.pageY = a(window).height() / 2 + a(window).scrollTop(), e(d)
            }), a("#lg-zoom-out").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d -= b.core.s.scale, f())
            }), a("#lg-zoom-in").on("click.lg", function() {
                b.core.$outer.find(".lg-current .lg-image").length && (d += b.core.s.scale, f())
            }), a("#lg-actual-size").on("click.lg", function(a) {
                g(a, b.core.$slide.eq(b.core.index).find(".lg-image"), b.core.index, !0)
            }), b.core.$el.on("onBeforeSlide.lg.tm", function() {
                d = 1, b.resetZoom()
            }), b.zoomDrag(), b.zoomSwipe()
        }, d.prototype.resetZoom = function() {
            this.core.$outer.removeClass("lg-zoomed"), this.core.$slide.find(".lg-img-wrap").removeAttr("style data-x data-y"), this.core.$slide.find(".lg-image").removeAttr("style data-scale"), this.pageX = a(window).width() / 2, this.pageY = a(window).height() / 2 + a(window).scrollTop()
        }, d.prototype.zoomSwipe = function() {
            var a = this,
                b = {},
                c = {},
                d = !1,
                e = !1,
                f = !1;
            a.core.$slide.on("touchstart.lg", function(c) {
                if (a.core.$outer.hasClass("lg-zoomed")) {
                    var d = a.core.$slide.eq(a.core.index).find(".lg-object");
                    f = d.prop("offsetHeight") * d.attr("data-scale") > a.core.$outer.find(".lg").height(), e = d.prop("offsetWidth") * d.attr("data-scale") > a.core.$outer.find(".lg").width(), (e || f) && (c.preventDefault(), b = {
                        x: c.originalEvent.targetTouches[0].pageX,
                        y: c.originalEvent.targetTouches[0].pageY
                    })
                }
            }), a.core.$slide.on("touchmove.lg", function(g) {
                if (a.core.$outer.hasClass("lg-zoomed")) {
                    var h, i, j = a.core.$slide.eq(a.core.index).find(".lg-img-wrap");
                    g.preventDefault(), d = !0, c = {
                        x: g.originalEvent.targetTouches[0].pageX,
                        y: g.originalEvent.targetTouches[0].pageY
                    }, a.core.$outer.addClass("lg-zoom-dragging"), i = f ? -Math.abs(j.attr("data-y")) + (c.y - b.y) : -Math.abs(j.attr("data-y")), h = e ? -Math.abs(j.attr("data-x")) + (c.x - b.x) : -Math.abs(j.attr("data-x")), (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) && (a.core.s.useLeftForZoom ? j.css({
                        left: h + "px",
                        top: i + "px"
                    }) : j.css("transform", "translate3d(" + h + "px, " + i + "px, 0)"))
                }
            }), a.core.$slide.on("touchend.lg", function() {
                a.core.$outer.hasClass("lg-zoomed") && d && (d = !1, a.core.$outer.removeClass("lg-zoom-dragging"), a.touchendZoom(b, c, e, f))
            })
        }, d.prototype.zoomDrag = function() {
            var b = this,
                c = {},
                d = {},
                e = !1,
                f = !1,
                g = !1,
                h = !1;
            b.core.$slide.on("mousedown.lg.zoom", function(d) {
                var f = b.core.$slide.eq(b.core.index).find(".lg-object");
                h = f.prop("offsetHeight") * f.attr("data-scale") > b.core.$outer.find(".lg").height(), g = f.prop("offsetWidth") * f.attr("data-scale") > b.core.$outer.find(".lg").width(), b.core.$outer.hasClass("lg-zoomed") && a(d.target).hasClass("lg-object") && (g || h) && (d.preventDefault(), c = {
                    x: d.pageX,
                    y: d.pageY
                }, e = !0, b.core.$outer.scrollLeft += 1, b.core.$outer.scrollLeft -= 1, b.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"))
            }), a(window).on("mousemove.lg.zoom", function(a) {
                if (e) {
                    var i, j, k = b.core.$slide.eq(b.core.index).find(".lg-img-wrap");
                    f = !0, d = {
                        x: a.pageX,
                        y: a.pageY
                    }, b.core.$outer.addClass("lg-zoom-dragging"), j = h ? -Math.abs(k.attr("data-y")) + (d.y - c.y) : -Math.abs(k.attr("data-y")), i = g ? -Math.abs(k.attr("data-x")) + (d.x - c.x) : -Math.abs(k.attr("data-x")), b.core.s.useLeftForZoom ? k.css({
                        left: i + "px",
                        top: j + "px"
                    }) : k.css("transform", "translate3d(" + i + "px, " + j + "px, 0)")
                }
            }), a(window).on("mouseup.lg.zoom", function(a) {
                e && (e = !1, b.core.$outer.removeClass("lg-zoom-dragging"), !f || c.x === d.x && c.y === d.y || (d = {
                    x: a.pageX,
                    y: a.pageY
                }, b.touchendZoom(c, d, g, h)), f = !1), b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab")
            })
        }, d.prototype.touchendZoom = function(a, b, c, d) {
            var e = this,
                f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
                g = e.core.$slide.eq(e.core.index).find(".lg-object"),
                h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
                i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
                j = (e.core.$outer.find(".lg").height() - g.prop("offsetHeight")) / 2,
                k = Math.abs(g.prop("offsetHeight") * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").height() + j),
                l = (e.core.$outer.find(".lg").width() - g.prop("offsetWidth")) / 2,
                m = Math.abs(g.prop("offsetWidth") * Math.abs(g.attr("data-scale")) - e.core.$outer.find(".lg").width() + l);
            (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) && (d && (i <= -k ? i = -k : i >= -j && (i = -j)), c && (h <= -m ? h = -m : h >= -l && (h = -l)), d ? f.attr("data-y", Math.abs(i)) : i = -Math.abs(f.attr("data-y")), c ? f.attr("data-x", Math.abs(h)) : h = -Math.abs(f.attr("data-x")), e.core.s.useLeftForZoom ? f.css({
                left: h + "px",
                top: i + "px"
            }) : f.css("transform", "translate3d(" + h + "px, " + i + "px, 0)"))
        }, d.prototype.destroy = function() {
            var b = this;
            b.core.$el.off(".lg.zoom"), a(window).off(".lg.zoom"), b.core.$slide.off(".lg.zoom"), b.core.$el.off(".lg.tm.zoom"), b.resetZoom(), clearTimeout(b.zoomabletimeout), b.zoomabletimeout = !1
        }, a.fn.lightGallery.modules.zoom = d
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                hash: !0
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.core.s.hash && (this.oldHash = window.location.hash, this.init()), this
            };
        c.prototype.init = function() {
            var b, c = this;
            c.core.$el.on("onAfterSlide.lg.tm", function(a, b, d) {
                history.replaceState ? history.replaceState(null, null, window.location.pathname + window.location.search + "#lg=" + c.core.s.galleryId + "&slide=" + d) : window.location.hash = "lg=" + c.core.s.galleryId + "&slide=" + d
            }), a(window).on("hashchange.lg.hash", function() {
                b = window.location.hash;
                var a = parseInt(b.split("&slide=")[1], 10);
                b.indexOf("lg=" + c.core.s.galleryId) > -1 ? c.core.slide(a, !1, !1) : c.core.lGalleryOn && c.core.destroy()
            })
        }, c.prototype.destroy = function() {
            this.core.s.hash && (this.oldHash && this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0 ? history.replaceState ? history.replaceState(null, null, this.oldHash) : window.location.hash = this.oldHash : history.replaceState ? history.replaceState(null, document.title, window.location.pathname + window.location.search) : window.location.hash = "", this.core.$el.off(".lg.hash"))
        }, a.fn.lightGallery.modules.hash = c
    }()
}),
function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("jquery")) : b(jQuery)
}(0, function(a) {
    ! function() {
        "use strict";
        var b = {
                share: !0,
                facebook: !0,
                facebookDropdownText: "Facebook",
                twitter: !0,
                twitterDropdownText: "Twitter",
                googlePlus: !0,
                googlePlusDropdownText: "GooglePlus",
                pinterest: !0,
                pinterestDropdownText: "Pinterest"
            },
            c = function(c) {
                return this.core = a(c).data("lightGallery"), this.core.s = a.extend({}, b, this.core.s), this.core.s.share && this.init(), this
            };
        c.prototype.init = function() {
            var b = this,
                c = '<span id="lg-share" class="lg-icon"><ul class="lg-dropdown" style="position: absolute;">';
            c += b.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + "</span></a></li>" : "", c += b.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + "</span></a></li>" : "", c += b.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + "</span></a></li>" : "", c += b.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + "</span></a></li>" : "", c += "</ul></span>", this.core.$outer.find(".lg-toolbar").append(c), this.core.$outer.find(".lg").append('<div id="lg-dropdown-overlay"></div>'), a("#lg-share").on("click.lg", function() {
                b.core.$outer.toggleClass("lg-dropdown-active")
            }), a("#lg-dropdown-overlay").on("click.lg", function() {
                b.core.$outer.removeClass("lg-dropdown-active")
            }), b.core.$el.on("onAfterSlide.lg.tm", function(c, d, e) {
                setTimeout(function() {
                    a("#lg-share-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(b.getSahreProps(e, "facebookShareUrl") || window.location.href)), a("#lg-share-twitter").attr("href", "https://twitter.com/intent/tweet?text=" + b.getSahreProps(e, "tweetText") + "&url=" + encodeURIComponent(b.getSahreProps(e, "twitterShareUrl") || window.location.href)), a("#lg-share-googleplus").attr("href", "https://plus.google.com/share?url=" + encodeURIComponent(b.getSahreProps(e, "googleplusShareUrl") || window.location.href)), a("#lg-share-pinterest").attr("href", "http://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(b.getSahreProps(e, "pinterestShareUrl") || window.location.href) + "&media=" + encodeURIComponent(b.getSahreProps(e, "src")) + "&description=" + b.getSahreProps(e, "pinterestText"))
                }, 100)
            })
        }, c.prototype.getSahreProps = function(a, b) {
            var c = "";
            if (this.core.s.dynamic) c = this.core.s.dynamicEl[a][b];
            else {
                var d = this.core.$items.eq(a).attr("href"),
                    e = this.core.$items.eq(a).data(b);
                c = "src" === b ? d || e : e
            }
            return c
        }, c.prototype.destroy = function() {}, a.fn.lightGallery.modules.share = c
    }()
});
/*-----------------------------------------------------------------------------------*/
/*	15. MOUSEWHEEL
/*-----------------------------------------------------------------------------------*/
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright 2015 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
/*-----------------------------------------------------------------------------------*/
/*	17. VANILLA
/*-----------------------------------------------------------------------------------*/
/*
 * Vanilla Form v. 2.1.0
 * Author: Michal Szepielak
 *
 * Product info and license terms:
 * http://codecanyon.net/item/vanilla-form-modern-responsive-contact-form/10447733
 */
var VanillaForm = function(a) {
    "use strict";

    function b() {
        function a() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    }

    function c(a) {
        var b = [];
        return a.each(function(a, c) {
            b[a] = new h(c)
        }), b.length <= 1 ? b[0] : b
    }

    function d() {
        var a = "9320087105434084715";
        return a = a.split(""), a = a.reverse().join("")
    }

    function e(a) {
        a.formFocused = !0
    }

    function f(a, b) {
        var c, d = document.querySelectorAll("[name=" + b.name + "]");
        for (c = 0; c < d.length; c++) d[c].classList.remove("error"), d[c].removeEventListener("focus", k[b.name], !1);
        delete k[b.name], k.length--, k.length <= 0 && (k.length = 0, a.setSubmitState("initial"))
    }

    function g(b) {
        var c = b.getBoundingClientRect(),
            d = Math.round(c.top) - 5,
            e = a.innerHeight;
        return 0 >= d ? void a.scrollBy(0, d) : void(d >= e && a.scrollBy(0, d - e + 30))
    }

    function h(d) {
        var e, f = this;
        return a.jQuery && d instanceof a.jQuery ? c(d) : d ? h.getInstanceByElement(d) instanceof h ? (console.warn("Duplicate initiation of form %s was prevented", d.getAttribute(i)), h.getInstanceByElement(d)) : (e = b(), d.setAttribute(i, e), l[e] = f, f.dict = {
            markedAsSpamError: "Your message was marked as spam and was not sent! Fix your message!",
            markedAsSpamServerError: "Your message was marked as SPAM and was not send.",
            sendSuccess: "We have received your inquiry. Stay tuned, we’ll get back to you very soon.",
            sendError: "Mail server has experienced an error. Please try again.",
            httpRequestError: "[%s] There was a problem with receiving response from mailing server",
            timeoutError: "Your request was timeout. Please try again.",
            parseResponseError: "Response from mailing server was unclear. Please contact administrator.",
            httpRequestConnectionError: "We couldn't connect to the server because of connection error. Please try again."
        }, f.responseTimeout = 5e3, f.httpRequest = null, f.url = d.action || location.href, f.form = d, f.processing = !1, f.submitButton = d.querySelector('[type="submit"]'), f.submitButton ? (f.notificationBox = d.querySelector(".notification-box"), f.notificationBox ? (f.notificationBox.addEventListener("click", function() {
            this.classList.remove("show-error"), this.classList.remove("show-success")
        }, !1), f.formFocused = !1, f.focusBound = null, f.init(), f) : (console.warn("Couldn't bind to submit button"), null)) : (console.warn("Couldn't bind to submit button"), null)) : (console.warn("Couldn't bind to form element"), null)
    }
    var i = "data-vf-id",
        j = "vanillaSendSuccess",
        k = {
            length: 0
        },
        l = {};
    return h.prototype.logError = function(a) {
        this.notify(a, "error")
    }, h.prototype.notify = function(a, b) {
        var c = this.notificationBox;
        return c ? (c.innerHTML = a, c.classList.add("show-" + (b || "error")), void g(c)) : void console.warn("Notification box not found")
    }, h.prototype.setSubmitState = function(a) {
        var b = this,
            c = b.submitButton,
            d = c.getAttribute("data-" + a),
            e = c.className.replace(/state-[a-z]+/gi, "");
        b.processing = "processing" === a, c.className = e + " state-" + a, c.value = d
    }, h.prototype.validateForm = function() {
        var b, c, e, g = this,
            h = g.form,
            i = h.elements,
            j = !1,
            l = !1,
            m = /^([\w\-]+(?:\.[\w\-]+)*)@((?:[\w\-]+\.)*\w[\w\-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        for (c = i.length - 1; c >= 0; --c) e = i[c], k[e.name] && f(g, e);
        for (c = i.length - 1; c >= 0; --c) e = i[c], j = !1, "" === e.value && e.required ? j = !0 : ("checkbox" === e.type && e.required && !e.checked && (j = !0), "email" !== e.type || "" === e.value || m.test(e.value) || (j = !0), "radio" === e.type && e.required && (document.querySelector("[name=" + e.name + "]:checked") || (j = !0))), j ? (e.classList.add("error"), k[e.name] || (k[e.name] = f.bind(null, g, e), k.length++), e.addEventListener("focus", k[e.name], !1), l = !0) : e.classList.remove("error"), l && g.setSubmitState("error");
        if (!l) {
            if (g.formFocused !== !0) return g.logError(g.dict.markedAsSpamError), !1;
            b = h.querySelector('[name="contact_secret"]'), b || (b = document.createElement("input"), b.type = "hidden", b.name = "contact_secret", h.appendChild(b)), b.value = d()
        }
        return setTimeout(function() {
            a.scrollBy(0, -1)
        }, 1), !l
    }, h.prototype.resetForm = function() {
        var a, b, c = this,
            d = c.form,
            e = c.submitButton;
        for (b = d.length - 1; b >= 0; --b) a = d[b], a !== e && (a.classList.remove("success"), a.value = "");
        c.setSubmitState("initial")
    }, h.prototype.successForm = function() {
        var a, b = this,
            c = {
                bubbles: !1,
                cancelable: !0,
                detail: b
            };
        a = new CustomEvent(j, c), b.form.dispatchEvent(a), a.defaultPrevented || (b.setSubmitState("success"), b.notify(b.dict.sendSuccess, "success"))
    }, h.prototype.processResponse = function(a) {
        var b, c = this,
            d = c.dict;
        try {
            b = JSON.parse(a)
        } catch (e) {
            console.error(e), b = {
                result: "ParseError"
            }
        }
        switch (b.result) {
            case "OK":
                c.successForm(d.sendSuccess), setTimeout(c.resetForm.bind(c), 4e3);
                break;
            case "NO_SPAM":
                c.logError(d.markedAsSpamServerError);
                break;
            case "SEND_ERROR":
                c.logError(d.sendError), c.setSubmitState("initial");
                break;
            case "ParseError":
                c.logError(d.parseResponseError)
        }
    }, h.prototype.requestStateChange = function() {
        var a = this,
            b = a.httpRequest;
        4 === b.readyState && (200 === b.status ? a.processResponse(b.responseText) : (a.setSubmitState("initial"), 0 === b.status ? a.logError(a.dict.httpRequestConnectionError) : a.logError(a.dict.httpRequestError.replace("%s", b.status))))
    }, h.prototype.init = function() {
        var b, c, d = this,
            f = d.form,
            g = d.submitButton,
            h = f.elements;
        if (f.addEventListener("submit", d.submitForm.bind(d), !0), a.XMLHttpRequest ? d.httpRequest = new XMLHttpRequest : a.ActiveXObject("Microsoft.XMLHTTP") && (d.httpRequest = new ActiveXObject("Microsoft.XMLHTTP")), d.focusBound = e.bind(null, d), !d.httpRequest) return console.error("Couldn't init XMLHttpRequest"), null;
        for (d.formFocused = !1, c = h.length - 1; c >= 0; --c) b = h[c], "submit" !== b.type && b.addEventListener("focus", d.focusBound, !1);
        g.value !== g.getAttribute("data-initial") && (g.setAttribute("data-initial", g.value), d.setSubmitState("initial"))
    }, h.prototype.send = function(a) {
        var b = this,
            c = b.httpRequest;
        c.open("POST", b.url, !0), c.timeout = b.responseTimeout, c.ontimeout = function() {
            b.logError(b.dict.timeoutError), b.setSubmitState("initial")
        }, c.send(a), c.onreadystatechange = b.requestStateChange.bind(b)
    }, h.prototype.submitForm = function(a) {
        var b = this,
            c = "";
        return a && (a.preventDefault(), a.stopPropagation()), b.processing ? void 0 : (b.validateForm() && (b.setSubmitState("processing"), c = new FormData(b.form), b.send(c)), !1)
    }, h.getInstanceByElement = function(a) {
        var b = a.getAttribute(i) || "";
        return l.hasOwnProperty(b) ? l[b] : null
    }, h
}(window);
/*-----------------------------------------------------------------------------------*/
/*	18. CUBE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
/*
 * Cube Portfolio - Responsive jQuery Grid Plugin
 *
 * version: 4.3.1 (15 January, 2018)
 * require: jQuery v1.8+
 *
 * Copyright 2013-2018, Mihai Buricea (http://scriptpie.com/cubeportfolio/live-preview/)
 * Licensed under CodeCanyon License (http://codecanyon.net/licenses)
 *
 */

! function(e, t, n, o) {
    "use strict";

    function i(t, n, a) {
        var r = this;
        if (e.data(t, "cubeportfolio")) throw new Error("cubeportfolio is already initialized. Destroy it before initialize again!");
        r.obj = t, r.$obj = e(t), e.data(r.obj, "cubeportfolio", r), n.sortToPreventGaps !== o && (n.sortByDimension = n.sortToPreventGaps, delete n.sortToPreventGaps), r.options = e.extend({}, e.fn.cubeportfolio.options, n, r.$obj.data("cbp-options")), r.isAnimating = !0, r.defaultFilter = r.options.defaultFilter, r.registeredEvents = [], r.queue = [], r.addedWrapp = !1, e.isFunction(a) && r.registerEvent("initFinish", a, !0);
        var s = r.$obj.children();
        r.$obj.addClass("cbp"), (0 === s.length || s.first().hasClass("cbp-item")) && (r.wrapInner(r.obj, "cbp-wrapper"), r.addedWrapp = !0), r.$ul = r.$obj.children().addClass("cbp-wrapper"), r.wrapInner(r.obj, "cbp-wrapper-outer"), r.wrapper = r.$obj.children(".cbp-wrapper-outer"), r.blocks = r.$ul.children(".cbp-item"), r.blocksOn = r.blocks, r.wrapInner(r.blocks, "cbp-item-wrapper"), r.plugins = {}, e.each(i.plugins, function(e, t) {
            var n = t(r);
            n && (r.plugins[e] = n)
        }), r.triggerEvent("afterPlugins"), r.removeAttrAfterStoreData = e.Deferred(), r.loadImages(r.$obj, r.display)
    }
    e.extend(i.prototype, {
        storeData: function(t, n) {
            var o = this;
            n = n || 0, t.each(function(t, i) {
                var a = e(i),
                    r = a.width(),
                    s = a.height();
                a.data("cbp", {
                    index: n + t,
                    indexInitial: n + t,
                    wrapper: a.children(".cbp-item-wrapper"),
                    widthInitial: r,
                    heightInitial: s,
                    width: r,
                    height: s,
                    widthAndGap: r + o.options.gapVertical,
                    heightAndGap: s + o.options.gapHorizontal,
                    left: null,
                    leftNew: null,
                    top: null,
                    topNew: null,
                    pack: !1
                })
            }), this.removeAttrAfterStoreData.resolve()
        },
        wrapInner: function(e, t) {
            var i, a, r;
            if (t = t || "", !(e.length && e.length < 1))
                for (e.length === o && (e = [e]), a = e.length - 1; a >= 0; a--) {
                    for (i = e[a], (r = n.createElement("div")).setAttribute("class", t); i.childNodes.length;) r.appendChild(i.childNodes[0]);
                    i.appendChild(r)
                }
        },
        removeAttrImage: function(e) {
            this.removeAttrAfterStoreData.then(function() {
                e.removeAttribute("width"), e.removeAttribute("height"), e.removeAttribute("style")
            })
        },
        loadImages: function(t, n) {
            var o = this;
            requestAnimationFrame(function() {
                var i = t.find("img").map(function(t, n) {
                        if (n.hasAttribute("width") && n.hasAttribute("height")) {
                            if (n.style.width = n.getAttribute("width") + "px", n.style.height = n.getAttribute("height") + "px", n.hasAttribute("data-cbp-src")) return null;
                            if (null === o.checkSrc(n)) o.removeAttrImage(n);
                            else {
                                var i = e("<img>");
                                i.on("load.cbp error.cbp", function() {
                                    e(this).off("load.cbp error.cbp"), o.removeAttrImage(n)
                                }), n.srcset ? (i.attr("sizes", n.sizes || "100vw"), i.attr("srcset", n.srcset)) : i.attr("src", n.src)
                            }
                            return null
                        }
                        return o.checkSrc(n)
                    }),
                    a = i.length;
                0 !== a ? e.each(i, function(t, i) {
                    var r = e("<img>");
                    r.on("load.cbp error.cbp", function() {
                        e(this).off("load.cbp error.cbp"), 0 === --a && n.call(o)
                    }), i.srcset ? (r.attr("sizes", i.sizes), r.attr("srcset", i.srcset)) : r.attr("src", i.src)
                }) : n.call(o)
            })
        },
        checkSrc: function(t) {
            var n = t.srcset,
                i = t.src;
            if ("" === i) return null;
            var a = e("<img>");
            n ? (a.attr("sizes", t.sizes || "100vw"), a.attr("srcset", n)) : a.attr("src", i);
            var r = a[0];
            return r.complete && r.naturalWidth !== o && 0 !== r.naturalWidth ? null : r
        },
        display: function() {
            var e = this;
            e.width = e.$obj.outerWidth(), e.triggerEvent("initStartRead"), e.triggerEvent("initStartWrite"), e.width > 0 && (e.storeData(e.blocks), e.layoutAndAdjustment()), e.triggerEvent("initEndRead"), e.triggerEvent("initEndWrite"), e.$obj.addClass("cbp-ready"), e.runQueue("delayFrame", e.delayFrame)
        },
        delayFrame: function() {
            var e = this;
            requestAnimationFrame(function() {
                e.resizeEvent(), e.triggerEvent("initFinish"), e.isAnimating = !1, e.$obj.trigger("initComplete.cbp")
            })
        },
        resizeEvent: function() {
            var e = this;
            i["private"].resize.initEvent({
                instance: e,
                fn: function() {
                    e.triggerEvent("beforeResizeGrid");
                    var t = e.$obj.outerWidth();
                    t && e.width !== t && (e.width = t, "alignCenter" === e.options.gridAdjustment && (e.wrapper[0].style.maxWidth = ""), e.layoutAndAdjustment(), e.triggerEvent("resizeGrid")), e.triggerEvent("resizeWindow")
                }
            })
        },
        gridAdjust: function() {
            var t = this;
            "responsive" === t.options.gridAdjustment ? t.responsiveLayout() : (t.blocks.removeAttr("style"), t.blocks.each(function(n, o) {
                var i = e(o).data("cbp"),
                    a = o.getBoundingClientRect(),
                    r = t.columnWidthTruncate(a.right - a.left),
                    s = Math.round(a.bottom - a.top);
                i.height = s, i.heightAndGap = s + t.options.gapHorizontal, i.width = r, i.widthAndGap = r + t.options.gapVertical
            }), t.widthAvailable = t.width + t.options.gapVertical), t.triggerEvent("gridAdjust")
        },
        layoutAndAdjustment: function(e) {
            var t = this;
            e && (t.width = t.$obj.outerWidth()), t.gridAdjust(), t.layout()
        },
        layout: function() {
            var t = this;
            t.computeBlocks(t.filterConcat(t.defaultFilter)), "slider" === t.options.layoutMode ? (t.sliderLayoutReset(), t.sliderLayout()) : (t.mosaicLayoutReset(), t.mosaicLayout()), t.blocksOff.addClass("cbp-item-off"), t.blocksOn.removeClass("cbp-item-off").each(function(t, n) {
                var o = e(n).data("cbp");
                o.left = o.leftNew, o.top = o.topNew, n.style.left = o.left + "px", n.style.top = o.top + "px"
            }), t.resizeMainContainer()
        },
        computeFilter: function(e) {
            var t = this;
            t.computeBlocks(e), t.mosaicLayoutReset(), t.mosaicLayout(), t.filterLayout()
        },
        filterLayout: function() {
            var t = this;
            t.blocksOff.addClass("cbp-item-off"), t.blocksOn.removeClass("cbp-item-off").each(function(t, n) {
                var o = e(n).data("cbp");
                o.left = o.leftNew, o.top = o.topNew, n.style.left = o.left + "px", n.style.top = o.top + "px"
            }), t.resizeMainContainer(), t.filterFinish()
        },
        filterFinish: function() {
            var e = this;
            e.isAnimating = !1, e.$obj.trigger("filterComplete.cbp"), e.triggerEvent("filterFinish")
        },
        computeBlocks: function(e) {
            var t = this;
            t.blocksOnInitial = t.blocksOn, t.blocksOn = t.blocks.filter(e), t.blocksOff = t.blocks.not(e), t.triggerEvent("computeBlocksFinish", e)
        },
        responsiveLayout: function() {
            var t = this;
            t.cols = t[e.isArray(t.options.mediaQueries) ? "getColumnsBreakpoints" : "getColumnsAuto"](), t.columnWidth = t.columnWidthTruncate((t.width + t.options.gapVertical) / t.cols), t.widthAvailable = t.columnWidth * t.cols, "mosaic" === t.options.layoutMode && t.getMosaicWidthReference(), t.blocks.each(function(n, o) {
                var i, a = e(o).data("cbp"),
                    r = 1;
                "mosaic" === t.options.layoutMode && (r = t.getColsMosaic(a.widthInitial)), i = t.columnWidth * r - t.options.gapVertical, o.style.width = i + "px", a.width = i, a.widthAndGap = i + t.options.gapVertical, o.style.height = ""
            });
            var n = [];
            t.blocks.each(function(t, o) {
                e.each(e(o).find("img").filter("[width][height]"), function(t, o) {
                    var i = 0;
                    e(o).parentsUntil(".cbp-item").each(function(t, n) {
                        var o = e(n).width();
                        if (o > 0) return i = o, !1
                    });
                    var a = parseInt(o.getAttribute("width"), 10),
                        r = parseInt(o.getAttribute("height"), 10),
                        s = parseFloat((a / r).toFixed(10));
                    n.push({
                        el: o,
                        width: i,
                        height: Math.round(i / s)
                    })
                })
            }), e.each(n, function(e, t) {
                t.el.width = t.width, t.el.height = t.height, t.el.style.width = t.width + "px", t.el.style.height = t.height + "px"
            }), t.blocks.each(function(n, o) {
                var i = e(o).data("cbp"),
                    a = o.getBoundingClientRect(),
                    r = Math.round(a.bottom - a.top);
                i.height = r, i.heightAndGap = r + t.options.gapHorizontal
            })
        },
        getMosaicWidthReference: function() {
            var t = this,
                n = [];
            t.blocks.each(function(t, o) {
                var i = e(o).data("cbp");
                n.push(i.widthInitial)
            }), n.sort(function(e, t) {
                return e - t
            }), n[0] ? t.mosaicWidthReference = n[0] : t.mosaicWidthReference = t.columnWidth
        },
        getColsMosaic: function(e) {
            var t = this;
            if (e === t.width) return t.cols;
            var n = e / t.mosaicWidthReference;
            return n = n % 1 >= .79 ? Math.ceil(n) : Math.floor(n), Math.min(Math.max(n, 1), t.cols)
        },
        getColumnsAuto: function() {
            var e = this;
            if (0 === e.blocks.length) return 1;
            var t = e.blocks.first().data("cbp").widthInitial + e.options.gapVertical;
            return Math.max(Math.round(e.width / t), 1)
        },
        getColumnsBreakpoints: function() {
            var t, n = this,
                o = n.width;
            return e.each(n.options.mediaQueries, function(e, n) {
                if (o >= n.width) return t = n, !1
            }), t || (t = n.options.mediaQueries[n.options.mediaQueries.length - 1]), n.triggerEvent("onMediaQueries", t.options), t.cols
        },
        columnWidthTruncate: function(e) {
            return Math.floor(e)
        },
        resizeMainContainer: function() {
            var t, n = this,
                a = Math.max(n.freeSpaces.slice(-1)[0].topStart - n.options.gapHorizontal, 0);
            "alignCenter" === n.options.gridAdjustment && (t = 0, n.blocksOn.each(function(n, o) {
                var i = e(o).data("cbp"),
                    a = i.left + i.width;
                a > t && (t = a)
            }), n.wrapper[0].style.maxWidth = t + "px"), a !== n.height ? (n.obj.style.height = a + "px", n.height !== o && (i["private"].modernBrowser ? n.$obj.one(i["private"].transitionend, function() {
                n.$obj.trigger("pluginResize.cbp")
            }) : n.$obj.trigger("pluginResize.cbp")), n.height = a, n.triggerEvent("resizeMainContainer")) : n.triggerEvent("resizeMainContainer")
        },
        filterConcat: function(e) {
            return e.replace(/\|/gi, "")
        },
        pushQueue: function(e, t) {
            var n = this;
            n.queue[e] = n.queue[e] || [], n.queue[e].push(t)
        },
        runQueue: function(t, n) {
            var o = this,
                i = o.queue[t] || [];
            e.when.apply(e, i).then(e.proxy(n, o))
        },
        clearQueue: function(e) {
            this.queue[e] = []
        },
        registerEvent: function(e, t, n) {
            var o = this;
            o.registeredEvents[e] || (o.registeredEvents[e] = []), o.registeredEvents[e].push({
                func: t,
                oneTime: n || !1
            })
        },
        triggerEvent: function(e, t) {
            var n, o, i = this;
            if (i.registeredEvents[e])
                for (n = 0, o = i.registeredEvents[e].length; n < o; n++) i.registeredEvents[e][n].func.call(i, t), i.registeredEvents[e][n].oneTime && (i.registeredEvents[e].splice(n, 1), n--, o--)
        },
        addItems: function(t, n, o) {
            var a = this;
            a.wrapInner(t, "cbp-item-wrapper"), a.$ul[o](t.addClass("cbp-item-loading").css({
                top: "100%",
                left: 0
            })), i["private"].modernBrowser ? t.last().one(i["private"].animationend, function() {
                a.addItemsFinish(t, n)
            }) : a.addItemsFinish(t, n), a.loadImages(t, function() {
                if (a.$obj.addClass("cbp-updateItems"), "append" === o) a.storeData(t, a.blocks.length), e.merge(a.blocks, t);
                else {
                    a.storeData(t);
                    var n = t.length;
                    a.blocks.each(function(t, o) {
                        e(o).data("cbp").index = n + t
                    }), a.blocks = e.merge(t, a.blocks)
                }
                a.triggerEvent("addItemsToDOM", t), a.triggerEvent("triggerSort"), a.layoutAndAdjustment(!0), a.elems && i["public"].showCounter.call(a.obj, a.elems)
            })
        },
        addItemsFinish: function(t, n) {
            var o = this;
            o.isAnimating = !1, o.$obj.removeClass("cbp-updateItems"), t.removeClass("cbp-item-loading"), e.isFunction(n) && n.call(o, t), o.$obj.trigger("onAfterLoadMore.cbp", [t])
        },
        removeItems: function(t, n) {
            var o = this;
            o.$obj.addClass("cbp-updateItems"), i["private"].modernBrowser ? t.last().one(i["private"].animationend, function() {
                o.removeItemsFinish(t, n)
            }) : o.removeItemsFinish(t, n), t.each(function(t, n) {
                o.blocks.each(function(t, a) {
                    if (n === a) {
                        var r = e(a);
                        o.blocks.splice(t, 1), i["private"].modernBrowser ? (r.one(i["private"].animationend, function() {
                            r.remove()
                        }), r.addClass("cbp-removeItem")) : r.remove()
                    }
                })
            }), o.blocks.each(function(t, n) {
                e(n).data("cbp").index = t
            }), o.triggerEvent("triggerSort"), o.layoutAndAdjustment(!0), o.elems && i["public"].showCounter.call(o.obj, o.elems)
        },
        removeItemsFinish: function(t, n) {
            var o = this;
            o.isAnimating = !1, o.$obj.removeClass("cbp-updateItems"), e.isFunction(n) && n.call(o, t)
        }
    }), e.fn.cubeportfolio = function(e, t, n) {
        return this.each(function() {
            if ("object" == typeof e || !e) return i["public"].init.call(this, e, t);
            if (i["public"][e]) return i["public"][e].call(this, t, n);
            throw new Error("Method " + e + " does not exist on jquery.cubeportfolio.js")
        })
    }, i.plugins = {}, e.fn.cubeportfolio.constructor = i
}(jQuery, window, document),
function(e, t, n, o) {
    "use strict";
    var i = e.fn.cubeportfolio.constructor;
    e.extend(i.prototype, {
        mosaicLayoutReset: function() {
            var t = this;
            t.blocksAreSorted = !1, t.blocksOn.each(function(n, o) {
                e(o).data("cbp").pack = !1, t.options.sortByDimension && (o.style.height = "")
            }), t.freeSpaces = [{
                leftStart: 0,
                leftEnd: t.widthAvailable,
                topStart: 0,
                topEnd: Math.pow(2, 18)
            }]
        },
        mosaicLayout: function() {
            for (var e = this, t = 0, n = e.blocksOn.length; t < n; t++) {
                var o = e.getSpaceIndexAndBlock();
                if (null === o) return e.mosaicLayoutReset(), e.blocksAreSorted = !0, e.sortBlocks(e.blocksOn, "widthAndGap", "heightAndGap", !0), void e.mosaicLayout();
                e.generateF1F2(o.spaceIndex, o.dataBlock), e.generateG1G2G3G4(o.dataBlock), e.cleanFreeSpaces(), e.addHeightToBlocks()
            }
            e.blocksAreSorted && e.sortBlocks(e.blocksOn, "topNew", "leftNew")
        },
        getSpaceIndexAndBlock: function() {
            var t = this,
                n = null;
            return e.each(t.freeSpaces, function(o, i) {
                var a = i.leftEnd - i.leftStart,
                    r = i.topEnd - i.topStart;
                return t.blocksOn.each(function(t, s) {
                    var l = e(s).data("cbp");
                    if (!0 !== l.pack) return l.widthAndGap <= a && l.heightAndGap <= r ? (l.pack = !0, n = {
                        spaceIndex: o,
                        dataBlock: l
                    }, l.leftNew = i.leftStart, l.topNew = i.topStart, !1) : void 0
                }), !t.blocksAreSorted && t.options.sortByDimension && o > 0 ? (n = null, !1) : null === n && void 0
            }), n
        },
        generateF1F2: function(e, t) {
            var n = this,
                o = n.freeSpaces[e],
                i = {
                    leftStart: o.leftStart + t.widthAndGap,
                    leftEnd: o.leftEnd,
                    topStart: o.topStart,
                    topEnd: o.topEnd
                },
                a = {
                    leftStart: o.leftStart,
                    leftEnd: o.leftEnd,
                    topStart: o.topStart + t.heightAndGap,
                    topEnd: o.topEnd
                };
            n.freeSpaces.splice(e, 1), i.leftEnd > i.leftStart && i.topEnd > i.topStart && (n.freeSpaces.splice(e, 0, i), e++), a.leftEnd > a.leftStart && a.topEnd > a.topStart && n.freeSpaces.splice(e, 0, a)
        },
        generateG1G2G3G4: function(t) {
            var n = this,
                o = [];
            e.each(n.freeSpaces, function(e, i) {
                var a = n.intersectSpaces(i, t);
                null !== a ? (n.generateG1(i, a, o), n.generateG2(i, a, o), n.generateG3(i, a, o), n.generateG4(i, a, o)) : o.push(i)
            }), n.freeSpaces = o
        },
        intersectSpaces: function(e, t) {
            var n = {
                leftStart: t.leftNew,
                leftEnd: t.leftNew + t.widthAndGap,
                topStart: t.topNew,
                topEnd: t.topNew + t.heightAndGap
            };
            if (e.leftStart === n.leftStart && e.leftEnd === n.leftEnd && e.topStart === n.topStart && e.topEnd === n.topEnd) return null;
            var o = Math.max(e.leftStart, n.leftStart),
                i = Math.min(e.leftEnd, n.leftEnd),
                a = Math.max(e.topStart, n.topStart),
                r = Math.min(e.topEnd, n.topEnd);
            return i <= o || r <= a ? null : {
                leftStart: o,
                leftEnd: i,
                topStart: a,
                topEnd: r
            }
        },
        generateG1: function(e, t, n) {
            e.topStart !== t.topStart && n.push({
                leftStart: e.leftStart,
                leftEnd: e.leftEnd,
                topStart: e.topStart,
                topEnd: t.topStart
            })
        },
        generateG2: function(e, t, n) {
            e.leftEnd !== t.leftEnd && n.push({
                leftStart: t.leftEnd,
                leftEnd: e.leftEnd,
                topStart: e.topStart,
                topEnd: e.topEnd
            })
        },
        generateG3: function(e, t, n) {
            e.topEnd !== t.topEnd && n.push({
                leftStart: e.leftStart,
                leftEnd: e.leftEnd,
                topStart: t.topEnd,
                topEnd: e.topEnd
            })
        },
        generateG4: function(e, t, n) {
            e.leftStart !== t.leftStart && n.push({
                leftStart: e.leftStart,
                leftEnd: t.leftStart,
                topStart: e.topStart,
                topEnd: e.topEnd
            })
        },
        cleanFreeSpaces: function() {
            var e = this;
            e.freeSpaces.sort(function(e, t) {
                return e.topStart > t.topStart ? 1 : e.topStart < t.topStart ? -1 : e.leftStart > t.leftStart ? 1 : e.leftStart < t.leftStart ? -1 : 0
            }), e.correctSubPixelValues(), e.removeNonMaximalFreeSpaces()
        },
        correctSubPixelValues: function() {
            var e, t, n, o, i = this;
            for (e = 0, t = i.freeSpaces.length - 1; e < t; e++) n = i.freeSpaces[e], (o = i.freeSpaces[e + 1]).topStart - n.topStart <= 1 && (o.topStart = n.topStart)
        },
        removeNonMaximalFreeSpaces: function() {
            var t = this;
            t.uniqueFreeSpaces(), t.freeSpaces = e.map(t.freeSpaces, function(n, o) {
                return e.each(t.freeSpaces, function(e, t) {
                    if (o !== e) return t.leftStart <= n.leftStart && t.leftEnd >= n.leftEnd && t.topStart <= n.topStart && t.topEnd >= n.topEnd ? (n = null, !1) : void 0
                }), n
            })
        },
        uniqueFreeSpaces: function() {
            var t = this,
                n = [];
            e.each(t.freeSpaces, function(t, o) {
                e.each(n, function(e, t) {
                    if (t.leftStart === o.leftStart && t.leftEnd === o.leftEnd && t.topStart === o.topStart && t.topEnd === o.topEnd) return o = null, !1
                }), null !== o && n.push(o)
            }), t.freeSpaces = n
        },
        addHeightToBlocks: function() {
            var t = this;
            e.each(t.freeSpaces, function(n, o) {
                t.blocksOn.each(function(n, i) {
                    var a = e(i).data("cbp");
                    !0 === a.pack && t.intersectSpaces(o, a) && -1 === o.topStart - a.topNew - a.heightAndGap && (i.style.height = a.height - 1 + "px")
                })
            })
        },
        sortBlocks: function(t, n, o, i) {
            o = void 0 === o ? "leftNew" : o, i = void 0 === i ? 1 : -1, t.sort(function(t, a) {
                var r = e(t).data("cbp"),
                    s = e(a).data("cbp");
                return r[n] > s[n] ? i : r[n] < s[n] ? -i : r[o] > s[o] ? i : r[o] < s[o] ? -i : r.index > s.index ? i : r.index < s.index ? -i : void 0
            })
        }
    })
}(jQuery, window, document), jQuery.fn.cubeportfolio.options = {
        filters: "",
        search: "",
        layoutMode: "grid",
        sortByDimension: !1,
        drag: !0,
        auto: !1,
        autoTimeout: 5e3,
        autoPauseOnHover: !0,
        showNavigation: !0,
        showPagination: !0,
        rewindNav: !0,
        scrollByPage: !1,
        defaultFilter: "*",
        filterDeeplinking: !1,
        animationType: "fadeOut",
        gridAdjustment: "responsive",
        mediaQueries: !1,
        gapHorizontal: 10,
        gapVertical: 10,
        caption: "pushTop",
        displayType: "fadeIn",
        displayTypeSpeed: 400,
        lightboxDelegate: ".cbp-lightbox",
        lightboxGallery: !0,
        lightboxTitleSrc: "data-title",
        lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        singlePageDelegate: ".cbp-singlePage",
        singlePageDeeplinking: !0,
        singlePageStickyNavigation: !0,
        singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
        singlePageAnimation: "left",
        singlePageCallback: null,
        singlePageInlineDelegate: ".cbp-singlePageInline",
        singlePageInlineDeeplinking: !1,
        singlePageInlinePosition: "top",
        singlePageInlineInFocus: !0,
        singlePageInlineCallback: null,
        plugins: {}
    },
    function(e, t, n, o) {
        "use strict";
        var i = e.fn.cubeportfolio.constructor,
            a = e(t);
        i["private"] = {
            publicEvents: function(t, n, o) {
                var i = this;
                i.events = [], i.initEvent = function(e) {
                    0 === i.events.length && i.scrollEvent(), i.events.push(e)
                }, i.destroyEvent = function(n) {
                    i.events = e.map(i.events, function(e, t) {
                        if (e.instance !== n) return e
                    }), 0 === i.events.length && a.off(t)
                }, i.scrollEvent = function() {
                    var r;
                    a.on(t, function() {
                        clearTimeout(r), r = setTimeout(function() {
                            e.isFunction(o) && o.call(i) || e.each(i.events, function(e, t) {
                                t.fn.call(t.instance)
                            })
                        }, n)
                    })
                }
            },
            checkInstance: function(t) {
                var n = e.data(this, "cubeportfolio");
                if (!n) throw new Error("cubeportfolio is not initialized. Initialize it before calling " + t + " method!");
                return n.triggerEvent("publicMethod"), n
            },
            browserInfo: function() {
                var e, n, o = i["private"],
                    a = navigator.appVersion; - 1 !== a.indexOf("MSIE 8.") ? o.browser = "ie8" : -1 !== a.indexOf("MSIE 9.") ? o.browser = "ie9" : -1 !== a.indexOf("MSIE 10.") ? o.browser = "ie10" : t.ActiveXObject || "ActiveXObject" in t ? o.browser = "ie11" : /android/gi.test(a) ? o.browser = "android" : /iphone|ipad|ipod/gi.test(a) ? o.browser = "ios" : /chrome/gi.test(a) ? o.browser = "chrome" : o.browser = "", void 0 !== typeof o.styleSupport("perspective") && (e = o.styleSupport("transition"), o.transitionend = {
                    WebkitTransition: "webkitTransitionEnd",
                    transition: "transitionend"
                }[e], n = o.styleSupport("animation"), o.animationend = {
                    WebkitAnimation: "webkitAnimationEnd",
                    animation: "animationend"
                }[n], o.animationDuration = {
                    WebkitAnimation: "webkitAnimationDuration",
                    animation: "animationDuration"
                }[n], o.animationDelay = {
                    WebkitAnimation: "webkitAnimationDelay",
                    animation: "animationDelay"
                }[n], o.transform = o.styleSupport("transform"), e && n && o.transform && (o.modernBrowser = !0))
            },
            styleSupport: function(e) {
                var t, o = "Webkit" + e.charAt(0).toUpperCase() + e.slice(1),
                    i = n.createElement("div");
                return e in i.style ? t = e : o in i.style && (t = o), i = null, t
            }
        }, i["private"].browserInfo(), i["private"].resize = new i["private"].publicEvents("resize.cbp", 50, function() {
            if (t.innerHeight == screen.height) return !0
        })
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";
        var i = e.fn.cubeportfolio.constructor;
        i["public"] = {
            init: function(e, t) {
                new i(this, e, t)
            },
            destroy: function(t) {
                var n = i["private"].checkInstance.call(this, "destroy");
                n.triggerEvent("beforeDestroy"), e.removeData(this, "cubeportfolio"), n.blocks.removeData("cbp"), n.$obj.removeClass("cbp-ready").removeAttr("style"), n.$ul.removeClass("cbp-wrapper"), i["private"].resize.destroyEvent(n), n.$obj.off(".cbp"), n.blocks.removeClass("cbp-item-off").removeAttr("style"), n.blocks.find(".cbp-item-wrapper").each(function(t, n) {
                    var o = e(n),
                        i = o.children();
                    i.length ? i.unwrap() : o.remove()
                }), n.destroySlider && n.destroySlider(), n.$ul.unwrap(), n.addedWrapp && n.blocks.unwrap(), 0 === n.blocks.length && n.$ul.remove(), e.each(n.plugins, function(e, t) {
                    "function" == typeof t.destroy && t.destroy()
                }), e.isFunction(t) && t.call(n), n.triggerEvent("afterDestroy")
            },
            filter: function(t, n) {
                var o, a = i["private"].checkInstance.call(this, "filter");
                if (!a.isAnimating) {
                    if (a.isAnimating = !0, e.isFunction(n) && a.registerEvent("filterFinish", n, !0), e.isFunction(t)) {
                        if (void 0 === (o = t.call(a, a.blocks))) throw new Error("When you call cubeportfolio API `filter` method with a param of type function you must return the blocks that will be visible.")
                    } else {
                        if (a.options.filterDeeplinking) {
                            var r = location.href.replace(/#cbpf=(.*?)([#\?&]|$)/gi, "");
                            location.href = r + "#cbpf=" + encodeURIComponent(t), a.singlePage && a.singlePage.url && (a.singlePage.url = location.href)
                        }
                        a.defaultFilter = t, o = a.filterConcat(a.defaultFilter)
                    }
                    a.triggerEvent("filterStart", o), a.singlePageInline && a.singlePageInline.isOpen ? a.singlePageInline.close("promise", {
                        callback: function() {
                            a.computeFilter(o)
                        }
                    }) : a.computeFilter(o)
                }
            },
            showCounter: function(t, n) {
                var o = i["private"].checkInstance.call(this, "showCounter");
                e.isFunction(n) && o.registerEvent("showCounterFinish", n, !0), o.elems = t, t.each(function() {
                    var t = e(this),
                        n = o.blocks.filter(t.data("filter")).length;
                    t.find(".cbp-filter-counter").text(n)
                }), o.triggerEvent("showCounterFinish", t)
            },
            appendItems: function(e, t) {
                i["public"].append.call(this, e, t)
            },
            append: function(t, n) {
                var o = i["private"].checkInstance.call(this, "append"),
                    a = e(t).filter(".cbp-item");
                o.isAnimating || a.length < 1 ? e.isFunction(n) && n.call(o, a) : (o.isAnimating = !0, o.singlePageInline && o.singlePageInline.isOpen ? o.singlePageInline.close("promise", {
                    callback: function() {
                        o.addItems(a, n, "append")
                    }
                }) : o.addItems(a, n, "append"))
            },
            prepend: function(t, n) {
                var o = i["private"].checkInstance.call(this, "prepend"),
                    a = e(t).filter(".cbp-item");
                o.isAnimating || a.length < 1 ? e.isFunction(n) && n.call(o, a) : (o.isAnimating = !0, o.singlePageInline && o.singlePageInline.isOpen ? o.singlePageInline.close("promise", {
                    callback: function() {
                        o.addItems(a, n, "prepend")
                    }
                }) : o.addItems(a, n, "prepend"))
            },
            remove: function(t, n) {
                var o = i["private"].checkInstance.call(this, "remove"),
                    a = e(t).filter(".cbp-item");
                o.isAnimating || a.length < 1 ? e.isFunction(n) && n.call(o, a) : (o.isAnimating = !0, o.singlePageInline && o.singlePageInline.isOpen ? o.singlePageInline.close("promise", {
                    callback: function() {
                        o.removeItems(a, n)
                    }
                }) : o.removeItems(a, n))
            },
            layout: function(t) {
                var n = i["private"].checkInstance.call(this, "layout");
                n.width = n.$obj.outerWidth(), n.isAnimating || n.width <= 0 ? e.isFunction(t) && t.call(n) : ("alignCenter" === n.options.gridAdjustment && (n.wrapper[0].style.maxWidth = ""), n.storeData(n.blocks), n.layoutAndAdjustment(), e.isFunction(t) && t.call(n))
            }
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";
        var i = e.fn.cubeportfolio.constructor;
        e.extend(i.prototype, {
            updateSliderPagination: function() {
                var t, n, o = this;
                if (o.options.showPagination) {
                    for (t = Math.ceil(o.blocksOn.length / o.cols), o.navPagination.empty(), n = t - 1; n >= 0; n--) e("<div/>", {
                        "class": "cbp-nav-pagination-item",
                        "data-slider-action": "jumpTo"
                    }).appendTo(o.navPagination);
                    o.navPaginationItems = o.navPagination.children()
                }
                o.enableDisableNavSlider()
            },
            destroySlider: function() {
                var t = this;
                "slider" === t.options.layoutMode && (t.$obj.removeClass("cbp-mode-slider"), t.$ul.removeAttr("style"), t.$ul.off(".cbp"), e(n).off(".cbp"), t.options.auto && t.stopSliderAuto())
            },
            nextSlider: function(e) {
                var t = this;
                if (t.isEndSlider()) {
                    if (!t.isRewindNav()) return;
                    t.sliderActive = 0
                } else t.options.scrollByPage ? t.sliderActive = Math.min(t.sliderActive + t.cols, t.blocksOn.length - t.cols) : t.sliderActive += 1;
                t.goToSlider()
            },
            prevSlider: function(e) {
                var t = this;
                if (t.isStartSlider()) {
                    if (!t.isRewindNav()) return;
                    t.sliderActive = t.blocksOn.length - t.cols
                } else t.options.scrollByPage ? t.sliderActive = Math.max(0, t.sliderActive - t.cols) : t.sliderActive -= 1;
                t.goToSlider()
            },
            jumpToSlider: function(e) {
                var t = this,
                    n = Math.min(e.index() * t.cols, t.blocksOn.length - t.cols);
                n !== t.sliderActive && (t.sliderActive = n, t.goToSlider())
            },
            jumpDragToSlider: function(e) {
                var t, n, o, i = this,
                    a = e > 0;
                i.options.scrollByPage ? (t = i.cols * i.columnWidth, n = i.cols) : (t = i.columnWidth, n = 1), e = Math.abs(e), o = Math.floor(e / t) * n, e % t > 20 && (o += n), i.sliderActive = a ? Math.min(i.sliderActive + o, i.blocksOn.length - i.cols) : Math.max(0, i.sliderActive - o), i.goToSlider()
            },
            isStartSlider: function() {
                return 0 === this.sliderActive
            },
            isEndSlider: function() {
                var e = this;
                return e.sliderActive + e.cols > e.blocksOn.length - 1
            },
            goToSlider: function() {
                var e = this;
                e.enableDisableNavSlider(), e.updateSliderPosition()
            },
            startSliderAuto: function() {
                var e = this;
                e.isDrag ? e.stopSliderAuto() : e.timeout = setTimeout(function() {
                    e.nextSlider(), e.startSliderAuto()
                }, e.options.autoTimeout)
            },
            stopSliderAuto: function() {
                clearTimeout(this.timeout)
            },
            enableDisableNavSlider: function() {
                var e, t, n = this;
                n.isRewindNav() || (t = n.isStartSlider() ? "addClass" : "removeClass", n.navPrev[t]("cbp-nav-stop"), t = n.isEndSlider() ? "addClass" : "removeClass", n.navNext[t]("cbp-nav-stop")), n.options.showPagination && (e = n.options.scrollByPage ? Math.ceil(n.sliderActive / n.cols) : n.isEndSlider() ? n.navPaginationItems.length - 1 : Math.floor(n.sliderActive / n.cols), n.navPaginationItems.removeClass("cbp-nav-pagination-active").eq(e).addClass("cbp-nav-pagination-active")), n.customPagination && (e = n.options.scrollByPage ? Math.ceil(n.sliderActive / n.cols) : n.isEndSlider() ? n.customPaginationItems.length - 1 : Math.floor(n.sliderActive / n.cols), n.customPaginationItems.removeClass(n.customPaginationClass).eq(e).addClass(n.customPaginationClass))
            },
            isRewindNav: function() {
                var e = this;
                return !e.options.showNavigation || !(e.blocksOn.length <= e.cols) && !!e.options.rewindNav
            },
            sliderItemsLength: function() {
                return this.blocksOn.length <= this.cols
            },
            sliderLayout: function() {
                var t = this;
                t.blocksOn.each(function(n, o) {
                    var i = e(o).data("cbp");
                    i.leftNew = t.columnWidth * n, i.topNew = 0, t.sliderFreeSpaces.push({
                        topStart: i.heightAndGap
                    })
                }), t.getFreeSpacesForSlider(), t.$ul.width(t.columnWidth * t.blocksOn.length - t.options.gapVertical)
            },
            getFreeSpacesForSlider: function() {
                var e = this;
                e.freeSpaces = e.sliderFreeSpaces.slice(e.sliderActive, e.sliderActive + e.cols), e.freeSpaces.sort(function(e, t) {
                    return e.topStart > t.topStart ? 1 : e.topStart < t.topStart ? -1 : void 0
                })
            },
            updateSliderPosition: function() {
                var e = this,
                    t = -e.sliderActive * e.columnWidth;
                i["private"].modernBrowser ? e.$ul[0].style[i["private"].transform] = "translate3d(" + t + "px, 0px, 0)" : e.$ul[0].style.left = t + "px", e.getFreeSpacesForSlider(), e.resizeMainContainer()
            },
            dragSlider: function() {
                function a(t) {
                    b.sliderItemsLength() || (w ? h = t : t.preventDefault(), b.options.auto && b.stopSliderAuto(), m ? e(d).one("click.cbp", function() {
                        return !1
                    }) : (d = e(t.target), c = p(t).x, u = 0, f = -b.sliderActive * b.columnWidth, g = b.columnWidth * (b.blocksOn.length - b.cols), v.on(y.move, s), v.on(y.end, r), b.$obj.addClass("cbp-mode-slider-dragStart")))
                }

                function r(e) {
                    b.$obj.removeClass("cbp-mode-slider-dragStart"), m = !0, 0 !== u ? (d.one("click.cbp", function(e) {
                        return !1
                    }), requestAnimationFrame(function() {
                        b.jumpDragToSlider(u), b.$ul.one(i["private"].transitionend, l)
                    })) : l.call(b), v.off(y.move), v.off(y.end)
                }

                function s(e) {
                    ((u = c - p(e).x) > 8 || u < -8) && e.preventDefault(), b.isDrag = !0;
                    var t = f - u;
                    u < 0 && u < f ? t = (f - u) / 5 : u > 0 && f - u < -g && (t = (g + f - u) / 5 - g), i["private"].modernBrowser ? b.$ul[0].style[i["private"].transform] = "translate3d(" + t + "px, 0px, 0)" : b.$ul[0].style.left = t + "px"
                }

                function l() {
                    if (m = !1, b.isDrag = !1, b.options.auto) {
                        if (b.mouseIsEntered) return;
                        b.startSliderAuto()
                    }
                }

                function p(e) {
                    return e.originalEvent !== o && e.originalEvent.touches !== o && (e = e.originalEvent.touches[0]), {
                        x: e.pageX,
                        y: e.pageY
                    }
                }
                var c, u, d, f, g, h, b = this,
                    v = e(n),
                    m = !1,
                    y = {},
                    w = !1;
                b.isDrag = !1, "ontouchstart" in t || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? (y = {
                    start: "touchstart.cbp",
                    move: "touchmove.cbp",
                    end: "touchend.cbp"
                }, w = !0) : y = {
                    start: "mousedown.cbp",
                    move: "mousemove.cbp",
                    end: "mouseup.cbp"
                }, b.$ul.on(y.start, a)
            },
            sliderLayoutReset: function() {
                var e = this;
                e.freeSpaces = [], e.sliderFreeSpaces = []
            }
        })
    }(jQuery, window, document), "function" != typeof Object.create && (Object.create = function(e) {
        function t() {}
        return t.prototype = e, new t
    }),
    function() {
        for (var e = 0, t = ["moz", "webkit"], n = 0; n < t.length && !window.requestAnimationFrame; n++) window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(t, n) {
            var o = (new Date).getTime(),
                i = Math.max(0, 16 - (o - e)),
                a = window.setTimeout(function() {
                    t(o + i)
                }, i);
            return e = o + i, a
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
            clearTimeout(e)
        })
    }(),
    function(e, t, n, o) {
        "use strict";

        function i(e) {
            var t = this;
            t.parent = e, e.filterLayout = t.filterLayout, e.registerEvent("computeBlocksFinish", function(t) {
                e.blocksOn2On = e.blocksOnInitial.filter(t), e.blocksOn2Off = e.blocksOnInitial.not(t)
            })
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.filterLayout = function() {
            function t() {
                n.blocks.removeClass("cbp-item-on2off cbp-item-off2on cbp-item-on2on").each(function(t, n) {
                    var o = e(n).data("cbp");
                    o.left = o.leftNew, o.top = o.topNew, n.style.left = o.left + "px", n.style.top = o.top + "px", n.style[a["private"].transform] = ""
                }), n.blocksOff.addClass("cbp-item-off"), n.$obj.removeClass("cbp-animation-" + n.options.animationType), n.filterFinish()
            }
            var n = this;
            n.$obj.addClass("cbp-animation-" + n.options.animationType), n.blocksOn2On.addClass("cbp-item-on2on").each(function(t, n) {
                var o = e(n).data("cbp");
                n.style[a["private"].transform] = "translate3d(" + (o.leftNew - o.left) + "px, " + (o.topNew - o.top) + "px, 0)"
            }), n.blocksOn2Off.addClass("cbp-item-on2off"), n.blocksOff2On = n.blocksOn.filter(".cbp-item-off").removeClass("cbp-item-off").addClass("cbp-item-off2on").each(function(t, n) {
                var o = e(n).data("cbp");
                n.style.left = o.leftNew + "px", n.style.top = o.topNew + "px"
            }), n.blocksOn2Off.length ? n.blocksOn2Off.last().data("cbp").wrapper.one(a["private"].animationend, t) : n.blocksOff2On.length ? n.blocksOff2On.last().data("cbp").wrapper.one(a["private"].animationend, t) : n.blocksOn2On.length ? n.blocksOn2On.last().one(a["private"].transitionend, t) : t(), n.resizeMainContainer()
        }, i.prototype.destroy = function() {
            var e = this.parent;
            e.$obj.removeClass("cbp-animation-" + e.options.animationType)
        }, a.plugins.animationClassic = function(t) {
            return !a["private"].modernBrowser || e.inArray(t.options.animationType, ["boxShadow", "fadeOut", "flipBottom", "flipOut", "quicksand", "scaleSides", "skew"]) < 0 ? null : new i(t)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(e) {
            var t = this;
            t.parent = e, e.filterLayout = t.filterLayout
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.filterLayout = function() {
            function t() {
                n.wrapper[0].removeChild(o), "sequentially" === n.options.animationType && n.blocksOn.each(function(t, n) {
                    e(n).data("cbp").wrapper[0].style[a["private"].animationDelay] = ""
                }), n.$obj.removeClass("cbp-animation-" + n.options.animationType), n.filterFinish()
            }
            var n = this,
                o = n.$ul[0].cloneNode(!0);
            o.setAttribute("class", "cbp-wrapper-helper"), n.wrapper[0].insertBefore(o, n.$ul[0]), requestAnimationFrame(function() {
                n.$obj.addClass("cbp-animation-" + n.options.animationType), n.blocksOff.addClass("cbp-item-off"), n.blocksOn.removeClass("cbp-item-off").each(function(t, o) {
                    var i = e(o).data("cbp");
                    i.left = i.leftNew, i.top = i.topNew, o.style.left = i.left + "px", o.style.top = i.top + "px", "sequentially" === n.options.animationType && (i.wrapper[0].style[a["private"].animationDelay] = 60 * t + "ms")
                }), n.blocksOn.length ? n.blocksOn.last().data("cbp").wrapper.one(a["private"].animationend, t) : n.blocksOnInitial.length ? n.blocksOnInitial.last().data("cbp").wrapper.one(a["private"].animationend, t) : t(), n.resizeMainContainer()
            })
        }, i.prototype.destroy = function() {
            var e = this.parent;
            e.$obj.removeClass("cbp-animation-" + e.options.animationType)
        }, a.plugins.animationClone = function(t) {
            return !a["private"].modernBrowser || e.inArray(t.options.animationType, ["fadeOutTop", "slideLeft", "sequentially"]) < 0 ? null : new i(t)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(e) {
            var t = this;
            t.parent = e, e.filterLayout = t.filterLayout
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.filterLayout = function() {
            function t() {
                n.wrapper[0].removeChild(o[0]), n.$obj.removeClass("cbp-animation-" + n.options.animationType), n.blocks.each(function(t, n) {
                    e(n).data("cbp").wrapper[0].style[a["private"].animationDelay] = ""
                }), n.filterFinish()
            }
            var n = this,
                o = n.$ul.clone(!0, !0);
            o[0].setAttribute("class", "cbp-wrapper-helper"), n.wrapper[0].insertBefore(o[0], n.$ul[0]);
            var i = o.find(".cbp-item").not(".cbp-item-off");
            n.blocksAreSorted && n.sortBlocks(i, "top", "left"), i.children(".cbp-item-wrapper").each(function(e, t) {
                t.style[a["private"].animationDelay] = 50 * e + "ms"
            }), requestAnimationFrame(function() {
                n.$obj.addClass("cbp-animation-" + n.options.animationType), n.blocksOff.addClass("cbp-item-off"), n.blocksOn.removeClass("cbp-item-off").each(function(t, n) {
                    var o = e(n).data("cbp");
                    o.left = o.leftNew, o.top = o.topNew, n.style.left = o.left + "px", n.style.top = o.top + "px", o.wrapper[0].style[a["private"].animationDelay] = 50 * t + "ms"
                });
                var o = n.blocksOn.length,
                    r = i.length;
                0 === o && 0 === r ? t() : o < r ? i.last().children(".cbp-item-wrapper").one(a["private"].animationend, t) : n.blocksOn.last().data("cbp").wrapper.one(a["private"].animationend, t), n.resizeMainContainer()
            })
        }, i.prototype.destroy = function() {
            var e = this.parent;
            e.$obj.removeClass("cbp-animation-" + e.options.animationType)
        }, a.plugins.animationCloneDelay = function(t) {
            return !a["private"].modernBrowser || e.inArray(t.options.animationType, ["3dflip", "flipOutDelay", "foldLeft", "frontRow", "rotateRoom", "rotateSides", "scaleDown", "slideDelay", "unfold"]) < 0 ? null : new i(t)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(e) {
            var t = this;
            t.parent = e, e.filterLayout = t.filterLayout
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.filterLayout = function() {
            function t() {
                n.wrapper[0].removeChild(o), n.$obj.removeClass("cbp-animation-" + n.options.animationType), n.filterFinish()
            }
            var n = this,
                o = n.$ul[0].cloneNode(!0);
            o.setAttribute("class", "cbp-wrapper-helper"), n.wrapper[0].insertBefore(o, n.$ul[0]), requestAnimationFrame(function() {
                n.$obj.addClass("cbp-animation-" + n.options.animationType), n.blocksOff.addClass("cbp-item-off"), n.blocksOn.removeClass("cbp-item-off").each(function(t, n) {
                    var o = e(n).data("cbp");
                    o.left = o.leftNew, o.top = o.topNew, n.style.left = o.left + "px", n.style.top = o.top + "px"
                }), n.blocksOn.length ? n.$ul.one(a["private"].animationend, t) : n.blocksOnInitial.length ? e(o).one(a["private"].animationend, t) : t(), n.resizeMainContainer()
            })
        }, i.prototype.destroy = function() {
            var e = this.parent;
            e.$obj.removeClass("cbp-animation-" + e.options.animationType)
        }, a.plugins.animationWrapper = function(t) {
            return !a["private"].modernBrowser || e.inArray(t.options.animationType, ["bounceBottom", "bounceLeft", "bounceTop", "moveLeft"]) < 0 ? null : new i(t)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(e) {
            var t = this,
                n = e.options;
            t.parent = e, t.captionOn = n.caption, e.registerEvent("onMediaQueries", function(e) {
                e && e.hasOwnProperty("caption") ? t.captionOn !== e.caption && (t.destroy(), t.captionOn = e.caption, t.init()) : t.captionOn !== n.caption && (t.destroy(), t.captionOn = n.caption, t.init())
            }), t.init()
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.init = function() {
            var e = this;
            "" != e.captionOn && ("expand" === e.captionOn || a["private"].modernBrowser || (e.parent.options.caption = e.captionOn = "minimal"), e.parent.$obj.addClass("cbp-caption-active cbp-caption-" + e.captionOn))
        }, i.prototype.destroy = function() {
            this.parent.$obj.removeClass("cbp-caption-active cbp-caption-" + this.captionOn)
        }, a.plugins.caption = function(e) {
            return new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            this.parent = t, t.registerEvent("initFinish", function() {
                t.$obj.on("click.cbp", ".cbp-caption-defaultWrap", function(n) {
                    if (n.preventDefault(), !t.isAnimating) {
                        t.isAnimating = !0;
                        var o = e(this),
                            i = o.next(),
                            a = o.parent(),
                            r = {
                                position: "relative",
                                height: i.outerHeight(!0)
                            },
                            s = {
                                position: "relative",
                                height: 0
                            };
                        if (t.$obj.addClass("cbp-caption-expand-active"), a.hasClass("cbp-caption-expand-open")) {
                            var l = s;
                            s = r, r = l, a.removeClass("cbp-caption-expand-open")
                        }
                        i.css(r), t.$obj.one("pluginResize.cbp", function() {
                            t.isAnimating = !1, t.$obj.removeClass("cbp-caption-expand-active"), 0 === r.height && (a.removeClass("cbp-caption-expand-open"), i.attr("style", ""))
                        }), t.layoutAndAdjustment(!0), i.css(s), requestAnimationFrame(function() {
                            a.addClass("cbp-caption-expand-open"), i.css(r), t.triggerEvent("gridAdjust"), t.triggerEvent("resizeGrid")
                        })
                    }
                })
            }, !0)
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.destroy = function() {
            this.parent.$obj.find(".cbp-caption-defaultWrap").off("click.cbp").parent().removeClass("cbp-caption-expand-active")
        }, a.plugins.captionExpand = function(e) {
            return "expand" !== e.options.caption ? null : new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            t.registerEvent("initEndWrite", function() {
                if (!(t.width <= 0)) {
                    var n = e.Deferred();
                    t.pushQueue("delayFrame", n), t.blocksOn.each(function(e, n) {
                        n.style[a["private"].animationDelay] = e * t.options.displayTypeSpeed + "ms"
                    }), t.$obj.addClass("cbp-displayType-bottomToTop"), t.blocksOn.last().one(a["private"].animationend, function() {
                        t.$obj.removeClass("cbp-displayType-bottomToTop"), t.blocksOn.each(function(e, t) {
                            t.style[a["private"].animationDelay] = ""
                        }), n.resolve()
                    })
                }
            }, !0)
        }
        var a = e.fn.cubeportfolio.constructor;
        a.plugins.displayBottomToTop = function(e) {
            return a["private"].modernBrowser && "bottomToTop" === e.options.displayType && 0 !== e.blocksOn.length ? new i(e) : null
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            t.registerEvent("initEndWrite", function() {
                if (!(t.width <= 0)) {
                    var n = e.Deferred();
                    t.pushQueue("delayFrame", n), t.obj.style[a["private"].animationDuration] = t.options.displayTypeSpeed + "ms", t.$obj.addClass("cbp-displayType-fadeIn"), t.$obj.one(a["private"].animationend, function() {
                        t.$obj.removeClass("cbp-displayType-fadeIn"), t.obj.style[a["private"].animationDuration] = "", n.resolve()
                    })
                }
            }, !0)
        }
        var a = e.fn.cubeportfolio.constructor;
        a.plugins.displayFadeIn = function(e) {
            return !a["private"].modernBrowser || "lazyLoading" !== e.options.displayType && "fadeIn" !== e.options.displayType || 0 === e.blocksOn.length ? null : new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            t.registerEvent("initEndWrite", function() {
                if (!(t.width <= 0)) {
                    var n = e.Deferred();
                    t.pushQueue("delayFrame", n), t.obj.style[a["private"].animationDuration] = t.options.displayTypeSpeed + "ms", t.$obj.addClass("cbp-displayType-fadeInToTop"), t.$obj.one(a["private"].animationend, function() {
                        t.$obj.removeClass("cbp-displayType-fadeInToTop"), t.obj.style[a["private"].animationDuration] = "", n.resolve()
                    })
                }
            }, !0)
        }
        var a = e.fn.cubeportfolio.constructor;
        a.plugins.displayFadeInToTop = function(e) {
            return a["private"].modernBrowser && "fadeInToTop" === e.options.displayType && 0 !== e.blocksOn.length ? new i(e) : null
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            t.registerEvent("initEndWrite", function() {
                if (!(t.width <= 0)) {
                    var n = e.Deferred();
                    t.pushQueue("delayFrame", n), t.blocksOn.each(function(e, n) {
                        n.style[a["private"].animationDelay] = e * t.options.displayTypeSpeed + "ms"
                    }), t.$obj.addClass("cbp-displayType-sequentially"), t.blocksOn.last().one(a["private"].animationend, function() {
                        t.$obj.removeClass("cbp-displayType-sequentially"), t.blocksOn.each(function(e, t) {
                            t.style[a["private"].animationDelay] = ""
                        }), n.resolve()
                    })
                }
            }, !0)
        }
        var a = e.fn.cubeportfolio.constructor;
        a.plugins.displaySequentially = function(e) {
            return a["private"].modernBrowser && "sequentially" === e.options.displayType && 0 !== e.blocksOn.length ? new i(e) : null
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = this;
            n.parent = t, n.filters = e(t.options.filters), n.filterData = [], t.registerEvent("afterPlugins", function(e) {
                n.filterFromUrl(), n.registerFilter()
            }), t.registerEvent("resetFiltersVisual", function() {
                var o = t.options.defaultFilter.split("|");
                n.filters.each(function(t, n) {
                    var i = e(n).find(".cbp-filter-item");
                    e.each(o, function(e, t) {
                        var n = i.filter('[data-filter="' + t + '"]');
                        if (n.length) return n.addClass("cbp-filter-item-active").siblings().removeClass("cbp-filter-item-active"), o.splice(e, 1), !1
                    })
                }), t.defaultFilter = t.options.defaultFilter
            })
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.registerFilter = function() {
            var t = this,
                n = t.parent,
                o = n.defaultFilter.split("|");
            t.wrap = t.filters.find(".cbp-l-filters-dropdownWrap").on({
                "mouseover.cbp": function() {
                    e(this).addClass("cbp-l-filters-dropdownWrap-open")
                },
                "mouseleave.cbp": function() {
                    e(this).removeClass("cbp-l-filters-dropdownWrap-open")
                }
            }), t.filters.each(function(i, a) {
                var r = e(a),
                    s = "*",
                    l = r.find(".cbp-filter-item"),
                    p = {};
                r.hasClass("cbp-l-filters-dropdown") && (p.wrap = r.find(".cbp-l-filters-dropdownWrap"), p.header = r.find(".cbp-l-filters-dropdownHeader"), p.headerText = p.header.text()), n.$obj.cubeportfolio("showCounter", l), e.each(o, function(e, t) {
                    if (l.filter('[data-filter="' + t + '"]').length) return s = t, o.splice(e, 1), !1
                }), e.data(a, "filterName", s), t.filterData.push(a), t.filtersCallback(p, l.filter('[data-filter="' + s + '"]')), l.on("click.cbp", function() {
                    var o = e(this);
                    if (!o.hasClass("cbp-filter-item-active") && !n.isAnimating) {
                        t.filtersCallback(p, o), e.data(a, "filterName", o.data("filter"));
                        var i = e.map(t.filterData, function(t, n) {
                            var o = e.data(t, "filterName");
                            return "" !== o && "*" !== o ? o : null
                        });
                        i.length < 1 && (i = ["*"]);
                        var r = i.join("|");
                        n.defaultFilter !== r && n.$obj.cubeportfolio("filter", r)
                    }
                })
            })
        }, i.prototype.filtersCallback = function(t, n) {
            e.isEmptyObject(t) || (t.wrap.trigger("mouseleave.cbp"), t.headerText ? t.headerText = "" : t.header.html(n.html())), n.addClass("cbp-filter-item-active").siblings().removeClass("cbp-filter-item-active")
        }, i.prototype.filterFromUrl = function() {
            var e = /#cbpf=(.*?)([#\?&]|$)/gi.exec(location.href);
            null !== e && (this.parent.defaultFilter = decodeURIComponent(e[1]))
        }, i.prototype.destroy = function() {
            var e = this;
            e.filters.find(".cbp-filter-item").off(".cbp"), e.wrap.off(".cbp")
        }, a.plugins.filters = function(e) {
            return "" === e.options.filters ? null : new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = t.options.gapVertical,
                o = t.options.gapHorizontal;
            t.registerEvent("onMediaQueries", function(i) {
                t.options.gapVertical = i && i.hasOwnProperty("gapVertical") ? i.gapVertical : n, t.options.gapHorizontal = i && i.hasOwnProperty("gapHorizontal") ? i.gapHorizontal : o, t.blocks.each(function(n, o) {
                    var i = e(o).data("cbp");
                    i.widthAndGap = i.width + t.options.gapVertical, i.heightAndGap = i.height + t.options.gapHorizontal
                })
            })
        }
        e.fn.cubeportfolio.constructor.plugins.changeGapOnMediaQueries = function(e) {
            return new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = this;
            n.parent = t, n.options = e.extend({}, r, n.parent.options.plugins.inlineSlider), n.runInit(), t.registerEvent("addItemsToDOM", function() {
                n.runInit()
            })
        }

        function a(e) {
            var t = this;
            e.hasClass("cbp-slider-inline-ready") || (e.addClass("cbp-slider-inline-ready"), t.items = e.find(".cbp-slider-wrapper").children(".cbp-slider-item"), t.active = t.items.filter(".cbp-slider-item--active").index(), t.total = t.items.length - 1, t.updateLeft(), e.find(".cbp-slider-next").on("click.cbp", function(e) {
                e.preventDefault(), t.active < t.total ? (t.active++, t.updateLeft()) : t.active === t.total && (t.active = 0, t.updateLeft())
            }), e.find(".cbp-slider-prev").on("click.cbp", function(e) {
                e.preventDefault(), t.active > 0 ? (t.active--, t.updateLeft()) : 0 === t.active && (t.active = t.total, t.updateLeft())
            }))
        }
        var r = {},
            s = e.fn.cubeportfolio.constructor;
        a.prototype.updateLeft = function() {
            var e = this;
            e.items.removeClass("cbp-slider-item--active"), e.items.eq(e.active).addClass("cbp-slider-item--active"), e.items.each(function(t, n) {
                n.style.left = t - e.active + "00%"
            })
        }, i.prototype.runInit = function() {
            var t = this;
            t.parent.$obj.find(".cbp-slider-inline").not(".cbp-slider-inline-ready").each(function(n, o) {
                var i = e(o),
                    r = i.find(".cbp-slider-item--active").find("img")[0];
                r.hasAttribute("data-cbp-src") ? t.parent.$obj.on("lazyLoad.cbp", function(e, t) {
                    t.src === r.src && new a(i)
                }) : new a(i)
            })
        }, i.prototype.destroy = function() {
            var t = this;
            t.parent.$obj.find(".cbp-slider-next").off("click.cbp"), t.parent.$obj.find(".cbp-slider-prev").off("click.cbp"), t.parent.$obj.off("lazyLoad.cbp"), t.parent.$obj.find(".cbp-slider-inline").each(function(t, n) {
                var o = e(n);
                o.removeClass("cbp-slider-inline-ready");
                var i = o.find(".cbp-slider-item");
                i.removeClass("cbp-slider-item--active"), i.removeAttr("style"), i.eq(0).addClass("cbp-slider-item--active")
            })
        }, s.plugins.inlineSlider = function(e) {
            return new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = this;
            n.parent = t, n.options = e.extend({}, a, n.parent.options.plugins.lazyLoad), t.registerEvent("initFinish", function() {
                n.loadImages(), t.registerEvent("resizeMainContainer", function() {
                    n.loadImages()
                }), t.registerEvent("filterFinish", function() {
                    n.loadImages()
                }), r["private"].lazyLoadScroll.initEvent({
                    instance: n,
                    fn: n.loadImages
                })
            }, !0)
        }
        var a = {
                loadingClass: "cbp-lazyload",
                threshold: 400
            },
            r = e.fn.cubeportfolio.constructor,
            s = e(t);
        r["private"].lazyLoadScroll = new r["private"].publicEvents("scroll.cbplazyLoad", 50), i.prototype.loadImages = function() {
            var t = this,
                n = t.parent.$obj.find("img").filter("[data-cbp-src]");
            0 !== n.length && (t.screenHeight = s.height(), n.each(function(n, o) {
                var i = e(o.parentNode);
                if (t.isElementInScreen(o)) {
                    var a = o.getAttribute("data-cbp-src");
                    null === t.parent.checkSrc(e("<img>").attr("src", a)) ? (t.removeLazyLoad(o, a), i.removeClass(t.options.loadingClass)) : (i.addClass(t.options.loadingClass), e("<img>").on("load.cbp error.cbp", function() {
                        t.removeLazyLoad(o, a, i)
                    }).attr("src", a))
                } else i.addClass(t.options.loadingClass)
            }))
        }, i.prototype.removeLazyLoad = function(t, n, o) {
            var i = this;
            t.src = n, t.removeAttribute("data-cbp-src"), i.parent.removeAttrImage(t), i.parent.$obj.trigger("lazyLoad.cbp", t), o && (r["private"].modernBrowser ? e(t).one(r["private"].transitionend, function() {
                o.removeClass(i.options.loadingClass)
            }) : o.removeClass(i.options.loadingClass))
        }, i.prototype.isElementInScreen = function(e) {
            var t = this,
                n = e.getBoundingClientRect(),
                o = n.bottom + t.options.threshold,
                i = t.screenHeight + o - (n.top - t.options.threshold);
            return o >= 0 && o <= i
        }, i.prototype.destroy = function() {
            r["private"].lazyLoadScroll.destroyEvent(this)
        }, r.plugins.lazyLoad = function(e) {
            return new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = this;
            n.parent = t, n.options = e.extend({}, a, n.parent.options.plugins.loadMore), n.loadMore = e(n.options.element).find(".cbp-l-loadMore-link"), 0 !== n.loadMore.length && (n.loadItems = n.loadMore.find(".cbp-l-loadMore-loadItems"), "0" === n.loadItems.text() && n.loadMore.addClass("cbp-l-loadMore-stop"), t.registerEvent("filterStart", function(e) {
                n.populateItems().then(function() {
                    var t = n.items.filter(e).length;
                    t > 0 ? (n.loadMore.removeClass("cbp-l-loadMore-stop"), n.loadItems.html(t)) : n.loadMore.addClass("cbp-l-loadMore-stop")
                })
            }), n[n.options.action]())
        }
        var a = {
                element: "",
                action: "click",
                loadItems: 3
            },
            r = e.fn.cubeportfolio.constructor;
        i.prototype.populateItems = function() {
            var t = this;
            return t.items ? e.Deferred().resolve() : (t.items = e(), e.ajax({
                url: t.loadMore.attr("href"),
                type: "GET",
                dataType: "HTML"
            }).done(function(n) {
                var o = e.map(n.split(/\r?\n/), function(t, n) {
                    return e.trim(t)
                }).join("");
                0 !== o.length && e.each(e.parseHTML(o), function(n, o) {
                    e(o).hasClass("cbp-item") ? t.items = t.items.add(o) : e.each(o.children, function(n, o) {
                        e(o).hasClass("cbp-item") && (t.items = t.items.add(o))
                    })
                })
            }).fail(function() {
                t.items = null, t.loadMore.removeClass("cbp-l-loadMore-loading")
            }))
        }, i.prototype.populateInsertItems = function(t) {
            var n = this,
                o = [],
                i = n.parent.defaultFilter,
                a = 0;
            n.items.each(function(t, r) {
                if (a === n.options.loadItems) return !1;
                i && "*" !== i ? e(r).filter(i).length && (o.push(r), n.items[t] = null, a++) : (o.push(r), n.items[t] = null, a++)
            }), n.items = n.items.map(function(e, t) {
                return t
            }), 0 !== o.length ? n.parent.$obj.cubeportfolio("append", o, t) : n.loadMore.removeClass("cbp-l-loadMore-loading").addClass("cbp-l-loadMore-stop")
        }, i.prototype.click = function() {
            function e() {
                t.loadMore.removeClass("cbp-l-loadMore-loading");
                var e, n = t.parent.defaultFilter;
                0 === (e = n && "*" !== n ? t.items.filter(n).length : t.items.length) ? t.loadMore.addClass("cbp-l-loadMore-stop") : t.loadItems.html(e)
            }
            var t = this;
            t.loadMore.on("click.cbp", function(n) {
                n.preventDefault(), t.parent.isAnimating || t.loadMore.hasClass("cbp-l-loadMore-stop") || (t.loadMore.addClass("cbp-l-loadMore-loading"), t.populateItems().then(function() {
                    t.populateInsertItems(e)
                }))
            })
        }, i.prototype.auto = function() {
            function n() {
                s || i.loadMore.hasClass("cbp-l-loadMore-stop") || i.loadMore.offset().top - 200 > a.scrollTop() + a.height() || (s = !0, i.populateItems().then(function() {
                    i.populateInsertItems(o)
                }).fail(function() {
                    s = !1
                }))
            }

            function o() {
                var e, t = i.parent.defaultFilter;
                0 === (e = t && "*" !== t ? i.items.filter(t).length : i.items.length) ? i.loadMore.removeClass("cbp-l-loadMore-loading").addClass("cbp-l-loadMore-stop") : (i.loadItems.html(e), a.trigger("scroll.loadMore")), s = !1, 0 === i.items.length && (r["private"].loadMoreScroll.destroyEvent(i), i.parent.$obj.off("filterComplete.cbp"))
            }
            var i = this,
                a = e(t),
                s = !1;
            r["private"].loadMoreScroll = new r["private"].publicEvents("scroll.loadMore", 100), i.parent.$obj.one("initComplete.cbp", function() {
                i.loadMore.addClass("cbp-l-loadMore-loading").on("click.cbp", function(e) {
                    e.preventDefault()
                }), r["private"].loadMoreScroll.initEvent({
                    instance: i,
                    fn: function() {
                        i.parent.isAnimating || n()
                    }
                }), i.parent.$obj.on("filterComplete.cbp", function() {
                    n()
                }), n()
            })
        }, i.prototype.destroy = function() {
            this.loadMore.off(".cbp"), r["private"].loadMoreScroll && r["private"].loadMoreScroll.destroyEvent(this)
        }, r.plugins.loadMore = function(e) {
            var t = e.options.plugins;
            return e.options.loadMore && (t.loadMore || (t.loadMore = {}), t.loadMore.element = e.options.loadMore), e.options.loadMoreAction && (t.loadMore || (t.loadMore = {}), t.loadMore.action = e.options.loadMoreAction), t.loadMore && void 0 !== t.loadMore.selector && (t.loadMore.element = t.loadMore.selector, delete t.loadMore.selector), t.loadMore && t.loadMore.element ? new i(e) : null
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(e) {
            var t = this;
            t.parent = e, !1 === e.options.lightboxShowCounter && (e.options.lightboxCounter = ""), !1 === e.options.singlePageShowCounter && (e.options.singlePageCounter = ""), e.registerEvent("initStartRead", function() {
                t.run()
            }, !0)
        }
        var a = e.fn.cubeportfolio.constructor,
            r = {
                delay: 0
            },
            s = {
                init: function(t, o) {
                    var i, a = this;
                    if (a.cubeportfolio = t, a.type = o, a.isOpen = !1, a.options = a.cubeportfolio.options, "lightbox" === o && (a.cubeportfolio.registerEvent("resizeWindow", function() {
                            a.resizeImage()
                        }), a.localOptions = e.extend({}, r, a.cubeportfolio.options.plugins.lightbox)), "singlePageInline" !== o) {
                        if (a.createMarkup(), "singlePage" === o) {
                            if (a.cubeportfolio.registerEvent("resizeWindow", function() {
                                    if (a.options.singlePageStickyNavigation) {
                                        var e = a.contentWrap[0].clientWidth;
                                        e > 0 && (a.navigationWrap.width(e), a.navigation.width(e))
                                    }
                                }), a.options.singlePageDeeplinking) {
                                a.url = location.href, "#" === a.url.slice(-1) && (a.url = a.url.slice(0, -1));
                                var s = a.url.split("#cbp="),
                                    l = s.shift();
                                if (e.each(s, function(t, n) {
                                        if (a.cubeportfolio.blocksOn.each(function(t, o) {
                                                var r = e(o).find(a.options.singlePageDelegate + '[href="' + n + '"]');
                                                if (r.length) return i = r, !1
                                            }), i) return !1
                                    }), i) {
                                    a.url = l;
                                    var p = i,
                                        c = p.attr("data-cbp-singlePage"),
                                        u = [];
                                    c ? u = p.closest(e(".cbp-item")).find('[data-cbp-singlePage="' + c + '"]') : a.cubeportfolio.blocksOn.each(function(t, n) {
                                        var o = e(n);
                                        o.not(".cbp-item-off") && o.find(a.options.singlePageDelegate).each(function(t, n) {
                                            e(n).attr("data-cbp-singlePage") || u.push(n)
                                        })
                                    }), a.openSinglePage(u, i[0])
                                } else if (s.length) {
                                    var d = n.createElement("a");
                                    d.setAttribute("href", s[0]), a.openSinglePage([d], d)
                                }
                            }
                            a.localOptions = e.extend({}, r, a.cubeportfolio.options.plugins.singlePage)
                        }
                    } else {
                        if (a.height = 0, a.createMarkupSinglePageInline(), a.cubeportfolio.registerEvent("resizeGrid", function() {
                                a.isOpen && a.close()
                            }), a.options.singlePageInlineDeeplinking) {
                            a.url = location.href, "#" === a.url.slice(-1) && (a.url = a.url.slice(0, -1));
                            l = (s = a.url.split("#cbpi=")).shift();
                            e.each(s, function(t, n) {
                                if (a.cubeportfolio.blocksOn.each(function(t, o) {
                                        var r = e(o).find(a.options.singlePageInlineDelegate + '[href="' + n + '"]');
                                        if (r.length) return i = r, !1
                                    }), i) return !1
                            }), i && a.cubeportfolio.registerEvent("initFinish", function() {
                                a.openSinglePageInline(a.cubeportfolio.blocksOn, i[0])
                            }, !0)
                        }
                        a.localOptions = e.extend({}, r, a.cubeportfolio.options.plugins.singlePageInline)
                    }
                },
                createMarkup: function() {
                    var o = this,
                        i = "";
                    if ("singlePage" === o.type && "left" !== o.options.singlePageAnimation && (i = " cbp-popup-singlePage-" + o.options.singlePageAnimation), o.wrap = e("<div/>", {
                            "class": "cbp-popup-wrap cbp-popup-" + o.type + i,
                            "data-action": "lightbox" === o.type ? "close" : ""
                        }).on("click.cbp", function(t) {
                            if (!o.stopEvents) {
                                var n = e(t.target).attr("data-action");
                                o[n] && (o[n](), t.preventDefault())
                            }
                        }), "singlePage" === o.type ? (o.contentWrap = e("<div/>", {
                            "class": "cbp-popup-content-wrap"
                        }).appendTo(o.wrap), "ios" === a["private"].browser && o.contentWrap.css("overflow", "auto"), o.content = e("<div/>", {
                            "class": "cbp-popup-content"
                        }).appendTo(o.contentWrap)) : o.content = e("<div/>", {
                            "class": "cbp-popup-content"
                        }).appendTo(o.wrap), e("<div/>", {
                            "class": "cbp-popup-loadingBox"
                        }).appendTo(o.wrap), "ie8" === a["private"].browser && (o.bg = e("<div/>", {
                            "class": "cbp-popup-ie8bg",
                            "data-action": "lightbox" === o.type ? "close" : ""
                        }).appendTo(o.wrap)), "singlePage" === o.type && !1 === o.options.singlePageStickyNavigation ? o.navigationWrap = e("<div/>", {
                            "class": "cbp-popup-navigation-wrap"
                        }).appendTo(o.contentWrap) : o.navigationWrap = e("<div/>", {
                            "class": "cbp-popup-navigation-wrap"
                        }).appendTo(o.wrap), o.navigation = e("<div/>", {
                            "class": "cbp-popup-navigation"
                        }).appendTo(o.navigationWrap), o.closeButton = e("<div/>", {
                            "class": "cbp-popup-close",
                            title: "Close (Esc arrow key)",
                            "data-action": "close"
                        }).appendTo(o.navigation), o.nextButton = e("<div/>", {
                            "class": "cbp-popup-next",
                            title: "Next (Right arrow key)",
                            "data-action": "next"
                        }).appendTo(o.navigation), o.prevButton = e("<div/>", {
                            "class": "cbp-popup-prev",
                            title: "Previous (Left arrow key)",
                            "data-action": "prev"
                        }).appendTo(o.navigation), "singlePage" === o.type) {
                        o.options.singlePageCounter && (o.counter = e(o.options.singlePageCounter).appendTo(o.navigation), o.counter.text("")), o.content.on("click.cbp", o.options.singlePageDelegate, function(e) {
                            e.preventDefault();
                            var t, i, a = o.dataArray.length,
                                r = this.getAttribute("href");
                            for (t = 0; t < a; t++)
                                if (o.dataArray[t].url === r) {
                                    i = t;
                                    break
                                }
                            if (void 0 === i) {
                                var s = n.createElement("a");
                                s.setAttribute("href", r), o.dataArray = [{
                                    url: r,
                                    element: s
                                }], o.counterTotal = 1, o.nextButton.hide(), o.prevButton.hide(), o.singlePageJumpTo(0)
                            } else o.singlePageJumpTo(i - o.current)
                        });
                        var r = !1;
                        try {
                            var s = Object.defineProperty({}, "passive", {
                                get: function() {
                                    r = {
                                        passive: !0
                                    }
                                }
                            });
                            t.addEventListener("testPassive", null, s), t.removeEventListener("testPassive", null, s)
                        } catch (c) {}
                        var p = "onwheel" in n.createElement("div") ? "wheel" : "mousewheel";
                        o.contentWrap[0].addEventListener(p, function(e) {
                            e.stopImmediatePropagation()
                        }, r)
                    }
                    e(n).on("keydown.cbp", function(e) {
                        o.isOpen && (o.stopEvents || (l && e.stopImmediatePropagation(), 37 === e.keyCode ? o.prev() : 39 === e.keyCode ? o.next() : 27 === e.keyCode && o.close()))
                    })
                },
                createMarkupSinglePageInline: function() {
                    var t = this;
                    t.wrap = e("<div/>", {
                        "class": "cbp-popup-singlePageInline"
                    }).on("click.cbp", function(n) {
                        if (!t.stopEvents) {
                            var o = e(n.target).attr("data-action");
                            o && t[o] && (t[o](), n.preventDefault())
                        }
                    }), t.content = e("<div/>", {
                        "class": "cbp-popup-content"
                    }).appendTo(t.wrap), t.navigation = e("<div/>", {
                        "class": "cbp-popup-navigation"
                    }).appendTo(t.wrap), t.closeButton = e("<div/>", {
                        "class": "cbp-popup-close",
                        title: "Close (Esc arrow key)",
                        "data-action": "close"
                    }).appendTo(t.navigation)
                },
                destroy: function() {
                    var t = this,
                        o = e("body");
                    e(n).off("keydown.cbp"), o.off("click.cbp", t.options.lightboxDelegate), o.off("click.cbp", t.options.singlePageDelegate), t.content.off("click.cbp", t.options.singlePageDelegate), t.cubeportfolio.$obj.off("click.cbp", t.options.singlePageInlineDelegate), t.cubeportfolio.$obj.off("click.cbp", t.options.lightboxDelegate), t.cubeportfolio.$obj.off("click.cbp", t.options.singlePageDelegate), t.cubeportfolio.$obj.removeClass("cbp-popup-isOpening"), t.cubeportfolio.$obj.find(".cbp-item").removeClass("cbp-singlePageInline-active"), t.wrap.remove()
                },
                openLightbox: function(o, i) {
                    var a, r, s = this,
                        p = 0,
                        c = [];
                    if (!s.isOpen) {
                        if (l = !0, s.isOpen = !0, s.stopEvents = !1, s.dataArray = [], s.current = null, null === (a = i.getAttribute("href"))) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                        e.each(o, function(t, n) {
                            var o, i = n.getAttribute("href"),
                                r = i,
                                l = "isImage";
                            if (-1 === e.inArray(i, c)) {
                                if (a === i) s.current = p;
                                else if (!s.options.lightboxGallery) return;
                                if (/youtu\.?be/i.test(i)) {
                                    var u = i.lastIndexOf("v=") + 2;
                                    1 === u && (u = i.lastIndexOf("/") + 1), o = i.substring(u), /autoplay=/i.test(o) || (o += "&autoplay=1"), r = "//www.youtube.com/embed/" + (o = o.replace(/\?|&/, "?")), l = "isYoutube"
                                } else /vimeo\.com/i.test(i) ? (o = i.substring(i.lastIndexOf("/") + 1), /autoplay=/i.test(o) || (o += "&autoplay=1"), r = "//player.vimeo.com/video/" + (o = o.replace(/\?|&/, "?")), l = "isVimeo") : /www\.ted\.com/i.test(i) ? (r = "http://embed.ted.com/talks/" + i.substring(i.lastIndexOf("/") + 1) + ".html", l = "isTed") : /soundcloud\.com/i.test(i) ? (r = i, l = "isSoundCloud") : /(\.mp4)|(\.ogg)|(\.ogv)|(\.webm)/i.test(i) ? (r = -1 !== i.indexOf("|") ? i.split("|") : i.split("%7C"), l = "isSelfHostedVideo") : /\.mp3$/i.test(i) && (r = i, l = "isSelfHostedAudio");
                                s.dataArray.push({
                                    src: r,
                                    title: n.getAttribute(s.options.lightboxTitleSrc),
                                    type: l
                                }), p++
                            }
                            c.push(i)
                        }), s.counterTotal = s.dataArray.length, 1 === s.counterTotal ? (s.nextButton.hide(), s.prevButton.hide(), s.dataActionImg = "") : (s.nextButton.show(), s.prevButton.show(), s.dataActionImg = 'data-action="next"'), s.wrap.appendTo(n.body), s.scrollTop = e(t).scrollTop(), s.originalStyle = e("html").attr("style"), e("html").css({
                            overflow: "hidden",
                            marginRight: t.innerWidth - e(n).width()
                        }), s.wrap.addClass("cbp-popup-transitionend"), s.wrap.show(), r = s.dataArray[s.current], s[r.type](r)
                    }
                },
                openSinglePage: function(o, i) {
                    var r, s = this,
                        l = 0,
                        p = [];
                    if (!s.isOpen) {
                        if (s.cubeportfolio.singlePageInline && s.cubeportfolio.singlePageInline.isOpen && s.cubeportfolio.singlePageInline.close(), s.isOpen = !0, s.stopEvents = !1, s.dataArray = [], s.current = null, null === (r = i.getAttribute("href"))) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                        if (e.each(o, function(t, n) {
                                var o = n.getAttribute("href"); - 1 === e.inArray(o, p) && (r === o && (s.current = l), s.dataArray.push({
                                    url: o,
                                    element: n
                                }), l++), p.push(o)
                            }), s.counterTotal = s.dataArray.length, 1 === s.counterTotal ? (s.nextButton.hide(), s.prevButton.hide()) : (s.nextButton.show(), s.prevButton.show()), s.wrap.appendTo(n.body), s.scrollTop = e(t).scrollTop(), s.contentWrap.scrollTop(0), s.wrap.show(), s.finishOpen = 2, s.navigationMobile = e(), s.wrap.one(a["private"].transitionend, function() {
                                e("html").css({
                                    overflow: "hidden",
                                    marginRight: t.innerWidth - e(n).width()
                                }), s.wrap.addClass("cbp-popup-transitionend"), s.options.singlePageStickyNavigation && (s.wrap.addClass("cbp-popup-singlePage-sticky"), s.navigationWrap.width(s.contentWrap[0].clientWidth)), --s.finishOpen <= 0 && s.updateSinglePageIsOpen.call(s)
                            }), "ie8" !== a["private"].browser && "ie9" !== a["private"].browser || (e("html").css({
                                overflow: "hidden",
                                marginRight: t.innerWidth - e(n).width()
                            }), s.wrap.addClass("cbp-popup-transitionend"), s.options.singlePageStickyNavigation && (s.navigationWrap.width(s.contentWrap[0].clientWidth), setTimeout(function() {
                                s.wrap.addClass("cbp-popup-singlePage-sticky")
                            }, 1e3)), s.finishOpen--), s.wrap.addClass("cbp-popup-loading"), s.wrap.offset(), s.wrap.addClass("cbp-popup-singlePage-open"), s.options.singlePageDeeplinking && (s.url = s.url.split("#cbp=")[0], location.href = s.url + "#cbp=" + s.dataArray[s.current].url), e.isFunction(s.options.singlePageCallback) && s.options.singlePageCallback.call(s, s.dataArray[s.current].url, s.dataArray[s.current].element), "ios" === a["private"].browser) {
                            var c = s.contentWrap[0];
                            c.addEventListener("touchstart", function() {
                                var e = c.scrollTop,
                                    t = c.scrollHeight,
                                    n = e + c.offsetHeight;
                                0 === e ? c.scrollTop = 1 : n === t && (c.scrollTop = e - 1)
                            })
                        }
                    }
                },
                openSinglePageInline: function(n, o, i) {
                    var a, r, s, l = this;
                    if (i = i || !1, l.fromOpen = i, l.storeBlocks = n, l.storeCurrentBlock = o, l.isOpen) return r = l.cubeportfolio.blocksOn.index(e(o).closest(".cbp-item")), void(l.dataArray[l.current].url !== o.getAttribute("href") || l.current !== r ? l.cubeportfolio.singlePageInline.close("open", {
                        blocks: n,
                        currentBlock: o,
                        fromOpen: !0
                    }) : l.close());
                    if (l.isOpen = !0, l.stopEvents = !1, l.dataArray = [], l.current = null, null === (a = o.getAttribute("href"))) throw new Error("HEI! Your clicked element doesn't have a href attribute.");
                    if (s = e(o).closest(".cbp-item")[0], n.each(function(e, t) {
                            s === t && (l.current = e)
                        }), l.dataArray[l.current] = {
                            url: a,
                            element: o
                        }, e(l.dataArray[l.current].element).parents(".cbp-item").addClass("cbp-singlePageInline-active"), l.counterTotal = n.length, l.wrap.insertBefore(l.cubeportfolio.wrapper), l.topDifference = 0, "top" === l.options.singlePageInlinePosition) l.blocksToMove = n, l.top = 0;
                    else if ("bottom" === l.options.singlePageInlinePosition) l.blocksToMove = e(), l.top = l.cubeportfolio.height;
                    else if ("above" === l.options.singlePageInlinePosition) {
                        var p = e(n[l.current]),
                            c = (u = p.data("cbp").top) + p.height();
                        l.top = u, l.blocksToMove = e(), n.each(function(t, n) {
                            var o = e(n),
                                i = o.data("cbp").top,
                                a = i + o.height();
                            a <= u || (i >= u && (l.blocksToMove = l.blocksToMove.add(n)), i < u && a > u && (l.top = a + l.options.gapHorizontal, a - u > l.topDifference && (l.topDifference = a - u + l.options.gapHorizontal)))
                        }), l.top = Math.max(l.top - l.options.gapHorizontal, 0)
                    } else {
                        var u = (p = e(n[l.current])).data("cbp").top,
                            c = u + p.height();
                        l.top = c, l.blocksToMove = e(), n.each(function(t, n) {
                            var o = e(n),
                                i = o.height(),
                                a = o.data("cbp").top,
                                r = a + i;
                            r <= c || (a >= c - i / 2 ? l.blocksToMove = l.blocksToMove.add(n) : r > c && a < c && (r > l.top && (l.top = r), r - c > l.topDifference && (l.topDifference = r - c)))
                        })
                    }
                    if (l.wrap[0].style.height = l.wrap.outerHeight(!0) + "px", l.deferredInline = e.Deferred(), l.options.singlePageInlineInFocus) {
                        l.scrollTop = e(t).scrollTop();
                        var d = l.cubeportfolio.$obj.offset().top + l.top - 100;
                        l.scrollTop !== d ? e("html,body").animate({
                            scrollTop: d
                        }, 350).promise().then(function() {
                            l.resizeSinglePageInline(), l.deferredInline.resolve()
                        }) : (l.resizeSinglePageInline(), l.deferredInline.resolve())
                    } else l.resizeSinglePageInline(), l.deferredInline.resolve();
                    l.cubeportfolio.$obj.addClass("cbp-popup-singlePageInline-open"), l.wrap.css({
                        top: l.top
                    }), l.options.singlePageInlineDeeplinking && (l.url = l.url.split("#cbpi=")[0], location.href = l.url + "#cbpi=" + l.dataArray[l.current].url), e.isFunction(l.options.singlePageInlineCallback) && l.options.singlePageInlineCallback.call(l, l.dataArray[l.current].url, l.dataArray[l.current].element)
                },
                resizeSinglePageInline: function() {
                    var e = this;
                    e.height = 0 === e.top || e.top === e.cubeportfolio.height ? e.wrap.outerHeight(!0) : e.wrap.outerHeight(!0) - e.options.gapHorizontal, e.height += e.topDifference, e.storeBlocks.each(function(e, t) {
                        a["private"].modernBrowser ? t.style[a["private"].transform] = "" : t.style.marginTop = ""
                    }), e.blocksToMove.each(function(t, n) {
                        a["private"].modernBrowser ? n.style[a["private"].transform] = "translate3d(0px, " + e.height + "px, 0)" : n.style.marginTop = e.height + "px"
                    }), e.cubeportfolio.obj.style.height = e.cubeportfolio.height + e.height + "px"
                },
                revertResizeSinglePageInline: function() {
                    var t = this;
                    t.deferredInline = e.Deferred(), t.storeBlocks.each(function(e, t) {
                        a["private"].modernBrowser ? t.style[a["private"].transform] = "" : t.style.marginTop = ""
                    }), t.cubeportfolio.obj.style.height = t.cubeportfolio.height + "px"
                },
                appendScriptsToWrap: function(e) {
                    var t = this,
                        o = 0,
                        i = function(a) {
                            var r = n.createElement("script"),
                                s = a.src;
                            r.type = "text/javascript", r.readyState ? r.onreadystatechange = function() {
                                "loaded" != r.readyState && "complete" != r.readyState || (r.onreadystatechange = null, e[++o] && i(e[o]))
                            } : r.onload = function() {
                                e[++o] && i(e[o])
                            }, s ? r.src = s : r.text = a.text, t.content[0].appendChild(r)
                        };
                    i(e[0])
                },
                updateSinglePage: function(t, n, o) {
                    var i, a = this;
                    a.content.addClass("cbp-popup-content").removeClass("cbp-popup-content-basic"), !1 === o && a.content.removeClass("cbp-popup-content").addClass("cbp-popup-content-basic"), a.counter && (i = e(a.getCounterMarkup(a.options.singlePageCounter, a.current + 1, a.counterTotal)), a.counter.text(i.text())), a.fromAJAX = {
                        html: t,
                        scripts: n
                    }, --a.finishOpen <= 0 && a.updateSinglePageIsOpen.call(a)
                },
                updateSinglePageIsOpen: function() {
                    var e, t = this;
                    t.wrap.addClass("cbp-popup-ready"), t.wrap.removeClass("cbp-popup-loading"), t.content.html(t.fromAJAX.html), t.fromAJAX.scripts && t.appendScriptsToWrap(t.fromAJAX.scripts), t.fromAJAX = {}, t.cubeportfolio.$obj.trigger("updateSinglePageStart.cbp"), (e = t.content.find(".cbp-slider")).length ? (e.find(".cbp-slider-item").addClass("cbp-item"), t.slider = e.cubeportfolio({
                        layoutMode: "slider",
                        mediaQueries: [{
                            width: 1,
                            cols: 1
                        }],
                        gapHorizontal: 0,
                        gapVertical: 0,
                        caption: "",
                        coverRatio: ""
                    })) : t.slider = null, t.checkForSocialLinks(t.content), t.cubeportfolio.$obj.trigger("updateSinglePageComplete.cbp")
                },
                checkForSocialLinks: function(e) {
                    var t = this;
                    t.createFacebookShare(e.find(".cbp-social-fb")), t.createTwitterShare(e.find(".cbp-social-twitter")), t.createGooglePlusShare(e.find(".cbp-social-googleplus")), t.createPinterestShare(e.find(".cbp-social-pinterest"))
                },
                createFacebookShare: function(e) {
                    e.length && !e.attr("onclick") && e.attr("onclick", "window.open('http://www.facebook.com/sharer.php?u=" + encodeURIComponent(t.location.href) + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=400'); return false;")
                },
                createTwitterShare: function(e) {
                    e.length && !e.attr("onclick") && e.attr("onclick", "window.open('https://twitter.com/intent/tweet?source=" + encodeURIComponent(t.location.href) + "&text=" + encodeURIComponent(n.title) + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=300'); return false;")
                },
                createGooglePlusShare: function(e) {
                    e.length && !e.attr("onclick") && e.attr("onclick", "window.open('https://plus.google.com/share?url=" + encodeURIComponent(t.location.href) + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=450'); return false;")
                },
                createPinterestShare: function(e) {
                    if (e.length && !e.attr("onclick")) {
                        var n = "",
                            o = this.content.find("img")[0];
                        o && (n = o.src), e.attr("onclick", "window.open('http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(t.location.href) + "&media=" + n + "', '_blank', 'top=100,left=100,toolbar=0,status=0,width=620,height=400'); return false;")
                    }
                },
                updateSinglePageInline: function(e, t) {
                    var n = this;
                    n.content.html(e), t && n.appendScriptsToWrap(t), n.cubeportfolio.$obj.trigger("updateSinglePageInlineStart.cbp"), 0 !== n.localOptions.delay ? setTimeout(function() {
                        n.singlePageInlineIsOpen.call(n)
                    }, n.localOptions.delay) : n.singlePageInlineIsOpen.call(n)
                },
                singlePageInlineIsOpen: function() {
                    function e() {
                        t.wrap.addClass("cbp-popup-singlePageInline-ready"), t.wrap[0].style.height = "", t.resizeSinglePageInline(), t.cubeportfolio.$obj.trigger("updateSinglePageInlineComplete.cbp")
                    }
                    var t = this;
                    t.cubeportfolio.loadImages(t.wrap, function() {
                        var n = t.content.find(".cbp-slider");
                        n.length ? (n.find(".cbp-slider-item").addClass("cbp-item"), n.one("initComplete.cbp", function() {
                            t.deferredInline.done(e)
                        }), n.on("pluginResize.cbp", function() {
                            t.deferredInline.done(e)
                        }), t.slider = n.cubeportfolio({
                            layoutMode: "slider",
                            displayType: "default",
                            mediaQueries: [{
                                width: 1,
                                cols: 1
                            }],
                            gapHorizontal: 0,
                            gapVertical: 0,
                            caption: "",
                            coverRatio: ""
                        })) : (t.slider = null, t.deferredInline.done(e)), t.checkForSocialLinks(t.content)
                    })
                },
                isImage: function(t) {
                    var n = this;
                    new Image;
                    n.tooggleLoading(!0), n.cubeportfolio.loadImages(e('<div><img src="' + t.src + '"></div>'), function() {
                        n.updateImagesMarkup(t.src, t.title, n.getCounterMarkup(n.options.lightboxCounter, n.current + 1, n.counterTotal)), n.tooggleLoading(!1)
                    })
                },
                isVimeo: function(e) {
                    var t = this;
                    t.updateVideoMarkup(e.src, e.title, t.getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal))
                },
                isYoutube: function(e) {
                    var t = this;
                    t.updateVideoMarkup(e.src, e.title, t.getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal))
                },
                isTed: function(e) {
                    var t = this;
                    t.updateVideoMarkup(e.src, e.title, t.getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal))
                },
                isSoundCloud: function(e) {
                    var t = this;
                    t.updateVideoMarkup(e.src, e.title, t.getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal))
                },
                isSelfHostedVideo: function(e) {
                    var t = this;
                    t.updateSelfHostedVideo(e.src, e.title, t.getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal))
                },
                isSelfHostedAudio: function(e) {
                    var t = this;
                    t.updateSelfHostedAudio(e.src, e.title, t.getCounterMarkup(t.options.lightboxCounter, t.current + 1, t.counterTotal))
                },
                getCounterMarkup: function(e, t, n) {
                    if (!e.length) return "";
                    var o = {
                        current: t,
                        total: n
                    };
                    return e.replace(/\{\{current}}|\{\{total}}/gi, function(e) {
                        return o[e.slice(2, -2)]
                    })
                },
                updateSelfHostedVideo: function(e, t, n) {
                    var o, i = this;
                    i.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var a = '<div class="cbp-popup-lightbox-iframe"><video controls="controls" height="auto" style="width: 100%">';
                    for (o = 0; o < e.length; o++) /(\.mp4)/i.test(e[o]) ? a += '<source src="' + e[o] + '" type="video/mp4">' : /(\.ogg)|(\.ogv)/i.test(e[o]) ? a += '<source src="' + e[o] + '" type="video/ogg">' : /(\.webm)/i.test(e[o]) && (a += '<source src="' + e[o] + '" type="video/webm">');
                    a += 'Your browser does not support the video tag.</video><div class="cbp-popup-lightbox-bottom">' + (t ? '<div class="cbp-popup-lightbox-title">' + t + "</div>" : "") + n + "</div></div>", i.content.html(a), i.wrap.addClass("cbp-popup-ready"), i.preloadNearbyImages()
                },
                updateSelfHostedAudio: function(e, t, n) {
                    var o = this;
                    o.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var i = '<div class="cbp-popup-lightbox-iframe"><div class="cbp-misc-video"><audio controls="controls" height="auto" style="width: 75%"><source src="' + e + '" type="audio/mpeg">Your browser does not support the audio tag.</audio></div><div class="cbp-popup-lightbox-bottom">' + (t ? '<div class="cbp-popup-lightbox-title">' + t + "</div>" : "") + n + "</div></div>";
                    o.content.html(i), o.wrap.addClass("cbp-popup-ready"), o.preloadNearbyImages()
                },
                updateVideoMarkup: function(e, t, n) {
                    var o = this;
                    o.wrap.addClass("cbp-popup-lightbox-isIframe");
                    var i = '<div class="cbp-popup-lightbox-iframe"><iframe src="' + e + '" frameborder="0" allowfullscreen scrolling="no"></iframe><div class="cbp-popup-lightbox-bottom">' + (t ? '<div class="cbp-popup-lightbox-title">' + t + "</div>" : "") + n + "</div></div>";
                    o.content.html(i), o.wrap.addClass("cbp-popup-ready"), o.preloadNearbyImages()
                },
                updateImagesMarkup: function(e, t, n) {
                    var o = this;
                    o.wrap.removeClass("cbp-popup-lightbox-isIframe");
                    var i = '<div class="cbp-popup-lightbox-figure"><img src="' + e + '" class="cbp-popup-lightbox-img" ' + o.dataActionImg + ' /><div class="cbp-popup-lightbox-bottom">' + (t ? '<div class="cbp-popup-lightbox-title">' + t + "</div>" : "") + n + "</div></div>";
                    o.content.html(i), o.wrap.addClass("cbp-popup-ready"), o.resizeImage(), o.preloadNearbyImages()
                },
                next: function() {
                    var e = this;
                    e[e.type + "JumpTo"](1)
                },
                prev: function() {
                    var e = this;
                    e[e.type + "JumpTo"](-1)
                },
                lightboxJumpTo: function(e) {
                    var t, n = this;
                    n.current = n.getIndex(n.current + e), n[(t = n.dataArray[n.current]).type](t)
                },
                singlePageJumpTo: function(t) {
                    var n = this;
                    n.current = n.getIndex(n.current + t), e.isFunction(n.options.singlePageCallback) && (n.resetWrap(), n.contentWrap.scrollTop(0), n.wrap.addClass("cbp-popup-loading"), n.slider && a["private"].resize.destroyEvent(e.data(n.slider[0], "cubeportfolio")), n.options.singlePageCallback.call(n, n.dataArray[n.current].url, n.dataArray[n.current].element), n.options.singlePageDeeplinking && (location.href = n.url + "#cbp=" + n.dataArray[n.current].url))
                },
                resetWrap: function() {
                    var e = this;
                    "singlePage" === e.type && e.options.singlePageDeeplinking && (location.href = e.url + "#"), "singlePageInline" === e.type && e.options.singlePageInlineDeeplinking && (location.href = e.url + "#")
                },
                getIndex: function(e) {
                    var t = this;
                    return (e %= t.counterTotal) < 0 && (e = t.counterTotal + e), e
                },
                close: function(n, o) {
                    function i() {
                        s.slider && a["private"].resize.destroyEvent(e.data(s.slider[0], "cubeportfolio")), s.content.html(""), s.wrap.detach(), s.cubeportfolio.$obj.removeClass("cbp-popup-singlePageInline-open cbp-popup-singlePageInline-close"), s.isOpen = !1, "promise" === n && e.isFunction(o.callback) && o.callback.call(s.cubeportfolio)
                    }

                    function r() {
                        var o = e(t).scrollTop();
                        s.resetWrap(), e(t).scrollTop(o), s.options.singlePageInlineInFocus && "promise" !== n ? e("html,body").animate({
                            scrollTop: s.scrollTop
                        }, 350).promise().then(function() {
                            i()
                        }) : i()
                    }
                    var s = this;
                    "singlePageInline" === s.type ? "open" === n ? (s.wrap.removeClass("cbp-popup-singlePageInline-ready"), e(s.dataArray[s.current].element).closest(".cbp-item").removeClass("cbp-singlePageInline-active"), s.isOpen = !1, s.openSinglePageInline(o.blocks, o.currentBlock, o.fromOpen)) : (s.height = 0, s.revertResizeSinglePageInline(), s.wrap.removeClass("cbp-popup-singlePageInline-ready"), s.cubeportfolio.$obj.addClass("cbp-popup-singlePageInline-close"), s.cubeportfolio.$obj.find(".cbp-item").removeClass("cbp-singlePageInline-active"), a["private"].modernBrowser ? s.wrap.one(a["private"].transitionend, function() {
                        r()
                    }) : r()) : "singlePage" === s.type ? (s.resetWrap(), e(t).scrollTop(s.scrollTop), s.stopScroll = !0, s.wrap.removeClass("cbp-popup-ready cbp-popup-transitionend cbp-popup-singlePage-open cbp-popup-singlePage-sticky"), e("html").css({
                        overflow: "",
                        marginRight: "",
                        position: ""
                    }), "ie8" !== a["private"].browser && "ie9" !== a["private"].browser || (s.slider && a["private"].resize.destroyEvent(e.data(s.slider[0], "cubeportfolio")), s.content.html(""), s.wrap.detach(), s.isOpen = !1), s.wrap.one(a["private"].transitionend, function() {
                        s.slider && a["private"].resize.destroyEvent(e.data(s.slider[0], "cubeportfolio")), s.content.html(""), s.wrap.detach(), s.isOpen = !1
                    })) : (l = !1, s.originalStyle ? e("html").attr("style", s.originalStyle) : e("html").css({
                        overflow: "",
                        marginRight: ""
                    }), e(t).scrollTop(s.scrollTop), s.slider && a["private"].resize.destroyEvent(e.data(s.slider[0], "cubeportfolio")), s.content.html(""), s.wrap.detach(), s.isOpen = !1)
                },
                tooggleLoading: function(e) {
                    var t = this;
                    t.stopEvents = e, t.wrap[e ? "addClass" : "removeClass"]("cbp-popup-loading")
                },
                resizeImage: function() {
                    if (this.isOpen) {
                        var n = this.content.find("img"),
                            o = n.parent(),
                            i = e(t).height() - (o.outerHeight(!0) - o.height()) - this.content.find(".cbp-popup-lightbox-bottom").outerHeight(!0);
                        n.css("max-height", i + "px")
                    }
                },
                preloadNearbyImages: function() {
                    for (var e = this, t = [e.getIndex(e.current + 1), e.getIndex(e.current + 2), e.getIndex(e.current + 3), e.getIndex(e.current - 1), e.getIndex(e.current - 2), e.getIndex(e.current - 3)], n = t.length - 1; n >= 0; n--) "isImage" === e.dataArray[t[n]].type && e.cubeportfolio.checkSrc(e.dataArray[t[n]])
                }
            },
            l = !1,
            p = !1,
            c = !1;
        i.prototype.run = function() {
            var t = this,
                o = t.parent,
                i = e(n.body);
            o.lightbox = null, o.options.lightboxDelegate && !p && (p = !0, o.lightbox = Object.create(s), o.lightbox.init(o, "lightbox"), i.on("click.cbp", o.options.lightboxDelegate, function(n) {
                n.preventDefault();
                var i = e(this),
                    a = i.attr("data-cbp-lightbox"),
                    r = t.detectScope(i),
                    s = r.data("cubeportfolio"),
                    l = [];
                s ? s.blocksOn.each(function(t, n) {
                    var i = e(n);
                    i.not(".cbp-item-off") && i.find(o.options.lightboxDelegate).each(function(t, n) {
                        a ? e(n).attr("data-cbp-lightbox") === a && l.push(n) : l.push(n)
                    })
                }) : l = a ? r.find(o.options.lightboxDelegate + "[data-cbp-lightbox=" + a + "]") : r.find(o.options.lightboxDelegate), o.lightbox.openLightbox(l, i[0])
            })), o.singlePage = null, o.options.singlePageDelegate && !c && (c = !0, o.singlePage = Object.create(s), o.singlePage.init(o, "singlePage"), i.on("click.cbp", o.options.singlePageDelegate, function(n) {
                n.preventDefault();
                var i = e(this),
                    a = i.attr("data-cbp-singlePage"),
                    r = t.detectScope(i),
                    s = r.data("cubeportfolio"),
                    l = [];
                s ? s.blocksOn.each(function(t, n) {
                    var i = e(n);
                    i.not(".cbp-item-off") && i.find(o.options.singlePageDelegate).each(function(t, n) {
                        a ? e(n).attr("data-cbp-singlePage") === a && l.push(n) : l.push(n)
                    })
                }) : l = a ? r.find(o.options.singlePageDelegate + "[data-cbp-singlePage=" + a + "]") : r.find(o.options.singlePageDelegate), o.singlePage.openSinglePage(l, i[0])
            })), o.singlePageInline = null, o.options.singlePageInlineDelegate && (o.singlePageInline = Object.create(s), o.singlePageInline.init(o, "singlePageInline"), o.$obj.on("click.cbp", o.options.singlePageInlineDelegate, function(t) {
                t.preventDefault();
                var n = e.data(this, "cbp-locked"),
                    i = e.data(this, "cbp-locked", +new Date);
                (!n || i - n > 300) && o.singlePageInline.openSinglePageInline(o.blocksOn, this)
            }))
        }, i.prototype.detectScope = function(t) {
            var o, i, a;
            return (o = t.closest(".cbp-popup-singlePageInline")).length ? (a = t.closest(".cbp", o[0]), a.length ? a : o) : (i = t.closest(".cbp-popup-singlePage")).length ? (a = t.closest(".cbp", i[0]), a.length ? a : i) : (a = t.closest(".cbp"), a.length ? a : e(n.body))
        }, i.prototype.destroy = function() {
            var t = this.parent;
            e(n.body).off("click.cbp"), p = !1, c = !1, t.lightbox && t.lightbox.destroy(), t.singlePage && t.singlePage.destroy(), t.singlePageInline && t.singlePageInline.destroy()
        }, a.plugins.popUp = function(e) {
            return new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = this;
            n.parent = t, n.searchInput = e(t.options.search), n.searchInput.each(function(t, n) {
                var o = n.getAttribute("data-search");
                o || (o = "*"), e.data(n, "searchData", {
                    value: n.value,
                    el: o
                })
            });
            var o = null;
            n.searchInput.on("keyup.cbp paste.cbp", function(t) {
                t.preventDefault();
                var i = e(this);
                clearTimeout(o), o = setTimeout(function() {
                    n.runEvent.call(n, i)
                }, 350)
            }), n.searchNothing = n.searchInput.siblings(".cbp-search-nothing").detach(), n.searchNothingHeight = null, n.searchNothingHTML = n.searchNothing.html(), n.searchInput.siblings(".cbp-search-icon").on("click.cbp", function(t) {
                t.preventDefault(), n.runEvent.call(n, e(this).prev().val(""))
            })
        }
        var a = e.fn.cubeportfolio.constructor;
        i.prototype.runEvent = function(t) {
            var n = this,
                o = t.val(),
                i = t.data("searchData"),
                a = new RegExp(o, "i");
            i.value === o || n.parent.isAnimating || (i.value = o, o.length > 0 ? t.attr("value", o) : t.removeAttr("value"), n.parent.$obj.cubeportfolio("filter", function(t) {
                var r = t.filter(function(t, n) {
                    if (e(n).find(i.el).text().search(a) > -1) return !0
                });
                if (0 === r.length && n.searchNothing.length) {
                    var s = n.searchNothingHTML.replace("{{query}}", o);
                    n.searchNothing.html(s), n.searchNothing.appendTo(n.parent.$obj), null === n.searchNothingHeight && (n.searchNothingHeight = n.searchNothing.outerHeight(!0)), n.parent.registerEvent("resizeMainContainer", function() {
                        n.parent.height = n.parent.height + n.searchNothingHeight, n.parent.obj.style.height = n.parent.height + "px"
                    }, !0)
                } else n.searchNothing.detach();
                return n.parent.triggerEvent("resetFiltersVisual"), r
            }, function() {
                t.trigger("keyup.cbp")
            }))
        }, i.prototype.destroy = function() {
            var t = this;
            t.searchInput.off(".cbp"), t.searchInput.next(".cbp-search-icon").off(".cbp"), t.searchInput.each(function(t, n) {
                e.removeData(n)
            })
        }, a.plugins.search = function(e) {
            return "" === e.options.search ? null : new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = this;
            n.parent = t, n.options = e.extend({}, a, n.parent.options.plugins.slider);
            var o = e(n.options.pagination);
            o.length > 0 && (n.parent.customPagination = o, n.parent.customPaginationItems = o.children(), n.parent.customPaginationClass = n.options.paginationClass, n.parent.customPaginationItems.on("click.cbp", function(t) {
                t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation(), n.parent.sliderStopEvents || n.parent.jumpToSlider(e(this))
            })), n.parent.registerEvent("gridAdjust", function() {
                n.sliderMarkup.call(n.parent), n.parent.registerEvent("gridAdjust", function() {
                    n.updateSlider.call(n.parent)
                })
            }, !0)
        }
        var a = {
                pagination: "",
                paginationClass: "cbp-pagination-active"
            },
            r = e.fn.cubeportfolio.constructor;
        i.prototype.sliderMarkup = function() {
            var t = this;
            t.sliderStopEvents = !1, t.sliderActive = 0, t.$obj.one("initComplete.cbp", function() {
                t.$obj.addClass("cbp-mode-slider")
            }), t.nav = e("<div/>", {
                "class": "cbp-nav"
            }), t.nav.on("click.cbp", "[data-slider-action]", function(n) {
                if (n.preventDefault(), n.stopImmediatePropagation(), n.stopPropagation(), !t.sliderStopEvents) {
                    var o = e(this),
                        i = o.attr("data-slider-action");
                    t[i + "Slider"] && t[i + "Slider"](o)
                }
            }), t.options.showNavigation && (t.controls = e("<div/>", {
                "class": "cbp-nav-controls"
            }), t.navPrev = e("<div/>", {
                "class": "cbp-nav-prev",
                "data-slider-action": "prev"
            }).appendTo(t.controls), t.navNext = e("<div/>", {
                "class": "cbp-nav-next",
                "data-slider-action": "next"
            }).appendTo(t.controls), t.controls.appendTo(t.nav)), t.options.showPagination && (t.navPagination = e("<div/>", {
                "class": "cbp-nav-pagination"
            }).appendTo(t.nav)), (t.controls || t.navPagination) && t.nav.appendTo(t.$obj), t.updateSliderPagination(), t.options.auto && (t.options.autoPauseOnHover && (t.mouseIsEntered = !1, t.$obj.on("mouseenter.cbp", function(e) {
                t.mouseIsEntered = !0, t.stopSliderAuto()
            }).on("mouseleave.cbp", function(e) {
                t.mouseIsEntered = !1, t.startSliderAuto()
            })), t.startSliderAuto()), t.options.drag && r["private"].modernBrowser && t.dragSlider()
        }, i.prototype.updateSlider = function() {
            var e = this;
            e.updateSliderPosition(), e.updateSliderPagination()
        }, i.prototype.destroy = function() {
            var e = this;
            e.parent.customPaginationItems && e.parent.customPaginationItems.off(".cbp"), (e.parent.controls || e.parent.navPagination) && (e.parent.nav.off(".cbp"), e.parent.nav.remove())
        }, r.plugins.slider = function(e) {
            return "slider" !== e.options.layoutMode ? null : new i(e)
        }
    }(jQuery, window, document),
    function(e, t, n, o) {
        "use strict";

        function i(t) {
            var n = this;
            n.parent = t, n.options = e.extend({}, a, n.parent.options.plugins.sort), n.element = e(n.options.element), 0 !== n.element.length && (n.sort = "", n.sortBy = "string:asc", n.element.on("click.cbp", ".cbp-sort-item", function(o) {
                o.preventDefault(), n.target = o.target, e(n.target).hasClass("cbp-l-dropdown-item--active") || t.isAnimating || (n.processSort(), t.$obj.cubeportfolio("filter", t.defaultFilter))
            }), t.registerEvent("triggerSort", function() {
                n.target && (n.processSort(), t.$obj.cubeportfolio("filter", t.defaultFilter))
            }), n.dropdownWrap = n.element.find(".cbp-l-dropdown-wrap").on({
                "mouseover.cbp": function() {
                    e(this).addClass("cbp-l-dropdown-wrap--open")
                },
                "mouseleave.cbp": function() {
                    e(this).removeClass("cbp-l-dropdown-wrap--open")
                }
            }), n.dropdownHeader = n.element.find(".cbp-l-dropdown-header"))
        }
        var a = {
                element: ""
            },
            r = e.fn.cubeportfolio.constructor;
        i.prototype.processSort = function() {
            var t = this,
                n = t.parent,
                o = (c = t.target).hasAttribute("data-sort"),
                i = c.hasAttribute("data-sortBy");
            if (o && i) t.sort = c.getAttribute("data-sort"), t.sortBy = c.getAttribute("data-sortBy");
            else if (o) t.sort = c.getAttribute("data-sort");
            else {
                if (!i) return;
                t.sortBy = c.getAttribute("data-sortBy")
            }
            var a = t.sortBy.split(":"),
                r = "string",
                s = 1;
            if ("int" === a[0] ? r = "int" : "float" === a[0] && (r = "float"), "desc" === a[1] && (s = -1), t.sort) {
                var l = [];
                n.blocks.each(function(n, o) {
                    var i = e(o),
                        a = i.find(t.sort).text();
                    "int" === r && (a = parseInt(a, 10)), "float" === r && (a = parseFloat(a, 10)), l.push({
                        sortText: a,
                        data: i.data("cbp")
                    })
                }), l.sort(function(e, t) {
                    var n = e.sortText,
                        o = t.sortText;
                    return "string" === r && (n = n.toUpperCase(), o = o.toUpperCase()), n < o ? -s : n > o ? s : 0
                }), e.each(l, function(e, t) {
                    t.data.index = e
                })
            } else {
                var p = []; - 1 === s && (n.blocks.each(function(t, n) {
                    p.push(e(n).data("cbp").indexInitial)
                }), p.sort(function(e, t) {
                    return t - e
                })), n.blocks.each(function(t, n) {
                    var o = e(n).data("cbp");
                    o.index = -1 === s ? p[o.indexInitial] : o.indexInitial
                })
            }
            n.sortBlocks(n.blocks, "index"), t.dropdownWrap.trigger("mouseleave.cbp");
            var c = e(t.target),
                u = e(t.target).parent();
            u.hasClass("cbp-l-dropdown-list") ? (t.dropdownHeader.html(c.html()), c.addClass("cbp-l-dropdown-item--active").siblings(".cbp-l-dropdown-item").removeClass("cbp-l-dropdown-item--active")) : u.hasClass("cbp-l-direction") && (0 === c.index() ? u.addClass("cbp-l-direction--second").removeClass("cbp-l-direction--first") : u.addClass("cbp-l-direction--first").removeClass("cbp-l-direction--second"))
        }, i.prototype.destroy = function() {
            this.element.off("click.cbp")
        }, r.plugins.sort = function(e) {
            return new i(e)
        }
    }(jQuery, window, document);
/*-----------------------------------------------------------------------------------*/
/*	19. ISOTOPE
/*-----------------------------------------------------------------------------------*/
/*!
 * Isotope PACKAGED v3.0.4
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2017 Metafizzy
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
    "use strict";

    function i(i, s, a) {
        function u(t, e, o) {
            var n, s = "$()." + i + '("' + e + '")';
            return t.each(function(t, u) {
                var h = a.data(u, i);
                if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                var d = h[e];
                if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
                var l = d.apply(h, o);
                n = void 0 === n ? l : n
            }), void 0 !== n ? n : t
        }

        function h(t, e) {
            t.each(function(t, o) {
                var n = a.data(o, i);
                n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
            })
        }
        a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function(t) {
            if ("string" == typeof t) {
                var e = n.call(arguments, 1);
                return u(this, t, e)
            }
            return h(this, t), this
        }, o(a))
    }

    function o(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var n = Array.prototype.slice,
        s = t.console,
        r = "undefined" == typeof s ? function() {} : function(t) {
            s.error(t)
        };
    return o(e || t.jQuery), i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                o = i[t] = i[t] || [];
            return o.indexOf(e) == -1 && o.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                o = i[t] = i[t] || {};
            return o[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = i.indexOf(e);
            return o != -1 && i.splice(o, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var o = 0,
                n = i[o];
            e = e || [];
            for (var s = this._onceEvents && this._onceEvents[t]; n;) {
                var r = s && s[n];
                r && (this.off(t, n), delete s[n]), n.apply(this, e), o += r ? 0 : 1, n = i[o]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = t.indexOf("%") == -1 && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; e < h; e++) {
            var i = u[e];
            t[i] = 0
        }
        return t
    }

    function o(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function n() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var n = o(e);
            s.isBoxSizeOuter = r = 200 == t(n.width), i.removeChild(e)
        }
    }

    function s(e) {
        if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var s = o(e);
            if ("none" == s.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
                var f = u[l],
                    c = s[f],
                    m = parseFloat(c);
                a[f] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                y = a.paddingTop + a.paddingBottom,
                g = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                I = a.borderTopWidth + a.borderBottomWidth,
                z = d && r,
                x = t(s.width);
            x !== !1 && (a.width = x + (z ? 0 : p + _));
            var S = t(s.height);
            return S !== !1 && (a.height = S + (z ? 0 : y + I)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + I), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
        }
    }
    var r, a = "undefined" == typeof console ? e : function(t) {
            console.error(t)
        },
        u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        h = u.length,
        d = !1;
    return s
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
    "use strict";
    var t = function() {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var o = e[i],
                n = o + "MatchesSelector";
            if (t[n]) return n
        }
    }();
    return function(e, i) {
        return e[t](i)
    }
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function(t, e) {
        return (t % e + e) % e
    }, i.makeArray = function(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "object" == typeof t && "number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }, i.removeFrom = function(t, e) {
        var i = t.indexOf(e);
        i != -1 && t.splice(i, 1)
    }, i.getParent = function(t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function(t, o) {
        t = i.makeArray(t);
        var n = [];
        return t.forEach(function(t) {
            if (t instanceof HTMLElement) {
                if (!o) return void n.push(t);
                e(t, o) && n.push(t);
                for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
            }
        }), n
    }, i.debounceMethod = function(t, e, i) {
        var o = t.prototype[e],
            n = e + "Timeout";
        t.prototype[e] = function() {
            var t = this[n];
            t && clearTimeout(t);
            var e = arguments,
                s = this;
            this[n] = setTimeout(function() {
                o.apply(s, e), delete s[n]
            }, i || 100)
        }
    }, i.docReady = function(t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
        return t.replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function(e, n) {
        i.docReady(function() {
            var s = i.toDashed(n),
                r = "data-" + s,
                a = document.querySelectorAll("[" + r + "]"),
                u = document.querySelectorAll(".js-" + s),
                h = i.makeArray(a).concat(i.makeArray(u)),
                d = r + "-options",
                l = t.jQuery;
            h.forEach(function(t) {
                var i, s = t.getAttribute(r) || t.getAttribute(d);
                try {
                    i = s && JSON.parse(s)
                } catch (a) {
                    return void(o && o.error("Error parsing " + r + " on " + t.className + ": " + a))
                }
                var u = new e(t, i);
                l && l.data(t, n, u)
            })
        })
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function o(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function n(t) {
        return t.replace(/([A-Z])/g, function(t) {
            return "-" + t.toLowerCase()
        })
    }
    var s = document.documentElement.style,
        r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
        u = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[r],
        h = {
            transform: a,
            transition: r,
            transitionDuration: r + "Duration",
            transitionProperty: r + "Property",
            transitionDelay: r + "Delay"
        },
        d = o.prototype = Object.create(t.prototype);
    d.constructor = o, d._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function() {
        this.size = e(this.element)
    }, d.css = function(t) {
        var e = this.element.style;
        for (var i in t) {
            var o = h[i] || i;
            e[o] = t[i]
        }
    }, d.getPosition = function() {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            o = t[e ? "left" : "right"],
            n = t[i ? "top" : "bottom"],
            s = this.layout.size,
            r = o.indexOf("%") != -1 ? parseFloat(o) / 100 * s.width : parseInt(o, 10),
            a = n.indexOf("%") != -1 ? parseFloat(n) / 100 * s.height : parseInt(n, 10);
        r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
    }, d.layoutPosition = function() {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop"),
            n = i ? "paddingLeft" : "paddingRight",
            s = i ? "left" : "right",
            r = i ? "right" : "left",
            a = this.position.x + t[n];
        e[s] = this.getXValue(a), e[r] = "";
        var u = o ? "paddingTop" : "paddingBottom",
            h = o ? "top" : "bottom",
            d = o ? "bottom" : "top",
            l = this.position.y + t[u];
        e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
            o = this.position.y,
            n = parseInt(t, 10),
            s = parseInt(e, 10),
            r = n === this.position.x && s === this.position.y;
        if (this.setPosition(t, e), r && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i,
            u = e - o,
            h = {};
        h.transform = this.getTranslate(a, u), this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function(t, e) {
        var i = this.layout._getOption("originLeft"),
            o = this.layout._getOption("originTop");
        return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, d._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var o = this.element.offsetHeight;
            o = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + n(a);
    d.enableTransition = function() {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(u, this, !1)
        }
    }, d.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
        this.ontransitionend(t)
    };
    var f = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
        if (t.target === this.element) {
            var e = this._transn,
                o = f[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
                var n = e.onEnd[o];
                n.call(this), delete e.onEnd[o]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var c = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
        this.css(c)
    }, d.stagger = function(t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function() {
        return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, o
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
        return e(t, i, o, n, s)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
    "use strict";

    function s(t, e) {
        var i = o.getQueryElement(t);
        if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
        var n = ++l;
        this.element.outlayerGUID = n, f[n] = this, this._create();
        var s = this._getOption("initLayout");
        s && this.layout()
    }

    function r(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            o = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var n = m[o] || 1;
        return i * n
    }
    var u = t.console,
        h = t.jQuery,
        d = function() {},
        l = 0,
        f = {};
    s.namespace = "outlayer", s.Item = n, s.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var c = s.prototype;
    o.extend(c, e.prototype), c.option = function(t) {
        o.extend(this.options, t)
    }, c._getOption = function(t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, s.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, c._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, c.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }, c._itemize = function(t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
            var s = e[n],
                r = new i(s, this);
            o.push(r)
        }
        return o
    }, c._filterFindItemElements = function(t) {
        return o.filterFindElements(t, this.options.itemSelector)
    }, c.getItemElements = function() {
        return this.items.map(function(t) {
            return t.element
        })
    }, c.layout = function() {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, c._init = c.layout, c._resetLayout = function() {
        this.getSize()
    }, c.getSize = function() {
        this.size = i(this.element)
    }, c._getMeasurement = function(t, e) {
        var o, n = this.options[t];
        n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
    }, c.layoutItems = function(t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, c._getItemsForLayout = function(t) {
        return t.filter(function(t) {
            return !t.isIgnored
        })
    }, c._layoutItems = function(t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function(t) {
                var o = this._getItemLayoutPosition(t);
                o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
            }, this), this._processLayoutQueue(i)
        }
    }, c._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }, c._processLayoutQueue = function(t) {
        this.updateStagger(), t.forEach(function(t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, c.updateStagger = function() {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, c._positionItem = function(t, e, i, o, n) {
        o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
    }, c._postLayout = function() {
        this.resizeContainer()
    }, c.resizeContainer = function() {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, c._emitCompleteOnItems = function(t, e) {
        function i() {
            n.dispatchEvent(t + "Complete", null, [e])
        }

        function o() {
            r++, r == s && i()
        }
        var n = this,
            s = e.length;
        if (!e || !s) return void i();
        var r = 0;
        e.forEach(function(e) {
            e.once(t, o)
        })
    }, c.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if (this.emitEvent(t, o), h)
            if (this.$element = this.$element || h(this.element), e) {
                var n = h.Event(e);
                n.type = t, this.$element.trigger(n, i)
            } else this.$element.trigger(t, i)
    }, c.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, c.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, c.stamp = function(t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, c.unstamp = function(t) {
        t = this._find(t), t && t.forEach(function(t) {
            o.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, c._find = function(t) {
        if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
    }, c._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, c._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, c._manageStamp = d, c._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
            o = this._boundingRect,
            n = i(t),
            s = {
                left: e.left - o.left - n.marginLeft,
                top: e.top - o.top - n.marginTop,
                right: o.right - e.right - n.marginRight,
                bottom: o.bottom - e.bottom - n.marginBottom
            };
        return s
    }, c.handleEvent = o.handleEvent, c.bindResize = function() {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, c.unbindResize = function() {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, c.onresize = function() {
        this.resize()
    }, o.debounceMethod(s, "onresize", 100), c.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, c.needsResizeLayout = function() {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, c.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, c.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, c.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, c.reveal = function(t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, c.hide = function(t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function(t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, c.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, c.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e)
    }, c.getItem = function(t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, c.getItems = function(t) {
        t = o.makeArray(t);
        var e = [];
        return t.forEach(function(t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, c.remove = function(t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
            t.remove(), o.removeFrom(this.items, t)
        }, this)
    }, c.destroy = function() {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
    }, s.data = function(t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && f[e]
    }, s.create = function(t, e) {
        var i = r(s);
        return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return s.Item = n, s
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }
    var i = e.prototype = Object.create(t.Item.prototype),
        o = i._create;
    i._create = function() {
        this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
    }, i.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData,
                e = this.layout._sorters;
            for (var i in t) {
                var o = e[i];
                this.sortData[i] = o(this.element, this)
            }
        }
    };
    var n = i.destroy;
    return i.destroy = function() {
        n.apply(this, arguments), this.css({
            display: ""
        })
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }
    var o = i.prototype,
        n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return n.forEach(function(t) {
        o[t] = function() {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), o.needsVerticalResizeLayout = function() {
        var e = t(this.isotope.element),
            i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, o._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments)
    }, o.getColumnWidth = function() {
        this.getSegmentSize("column", "Width")
    }, o.getRowHeight = function() {
        this.getSegmentSize("row", "Height")
    }, o.getSegmentSize = function(t, e) {
        var i = t + e,
            o = "outer" + e;
        if (this._getMeasurement(i, o), !this[i]) {
            var n = this.getFirstItemSize();
            this[i] = n && n[o] || this.isotope.size["inner" + e]
        }
    }, o.getFirstItemSize = function() {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, o.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments)
    }, o.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function(t, e) {
        function n() {
            i.apply(this, arguments)
        }
        return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var o = i.prototype;
    return o._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, o.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var o = this.columnWidth += this.gutter,
            n = this.containerWidth + this.gutter,
            s = n / o,
            r = o - n % o,
            a = r && r < 1 ? "round" : "floor";
        s = Math[a](s), this.cols = Math.max(s, 1)
    }, o.getContainerWidth = function() {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            o = e(i);
        this.containerWidth = o && o.innerWidth
    }, o._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && e < 1 ? "round" : "ceil",
            o = Math[i](t.size.outerWidth / this.columnWidth);
        o = Math.min(o, this.cols);
        for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
                x: this.columnWidth * s.col,
                y: s.y
            }, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
        return r
    }, o._getTopColPosition = function(t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, o._getTopColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
        return e
    }, o._getColGroupY = function(t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, o._getHorizontalColPosition = function(t, e) {
        var i = this.horizontalColIndex % this.cols,
            o = t > 1 && i + t > this.cols;
        i = o ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, o._manageStamp = function(t) {
        var i = e(t),
            o = this._getElementOffset(t),
            n = this._getOption("originLeft"),
            s = n ? o.left : o.right,
            r = s + i.outerWidth,
            a = Math.floor(s / this.columnWidth);
        a = Math.max(0, a);
        var u = Math.floor(r / this.columnWidth);
        u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
        for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, o._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, o._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, o.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
    "use strict";
    var i = t.create("masonry"),
        o = i.prototype,
        n = {
            _getElementOffset: !0,
            layout: !0,
            _getMeasurement: !0
        };
    for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
    var r = o.measureColumns;
    o.measureColumns = function() {
        this.items = this.isotope.filteredItems, r.call(this)
    };
    var a = o._getOption;
    return o._getOption = function(t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("fitRows"),
        i = e.prototype;
    return i._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
            i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var o = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
    }, i._getContainerSize = function() {
        return {
            height: this.maxY
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
    "use strict";
    var e = t.create("vertical", {
            horizontalAlignment: 0
        }),
        i = e.prototype;
    return i._resetLayout = function() {
        this.y = 0
    }, i._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
            i = this.y;
        return this.y += t.size.outerHeight, {
            x: e,
            y: i
        }
    }, i._getContainerSize = function() {
        return {
            height: this.y
        }
    }, e
}),
function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
        return e(t, i, o, n, s, r, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
    function a(t, e) {
        return function(i, o) {
            for (var n = 0; n < t.length; n++) {
                var s = t[n],
                    r = i.sortData[s],
                    a = o.sortData[s];
                if (r > a || r < a) {
                    var u = void 0 !== e[s] ? e[s] : e,
                        h = u ? 1 : -1;
                    return (r > a ? 1 : -1) * h
                }
            }
            return 0
        }
    }
    var u = t.jQuery,
        h = String.prototype.trim ? function(t) {
            return t.trim()
        } : function(t) {
            return t.replace(/^\s+|\s+$/g, "")
        },
        d = e.create("isotope", {
            layoutMode: "masonry",
            isJQueryFiltering: !0,
            sortAscending: !0
        });
    d.Item = s, d.LayoutMode = r;
    var l = d.prototype;
    l._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in r.modes) this._initLayoutMode(t)
    }, l.reloadItems = function() {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, l._itemize = function() {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var o = t[i];
            o.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, l._initLayoutMode = function(t) {
        var e = r.modes[t],
            i = this.options[t] || {};
        this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, l.layout = function() {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, l._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, l.arrange = function(t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, l._init = l.arrange, l._hideReveal = function(t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, l._getIsInstant = function() {
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, l._bindArrangeComplete = function() {
        function t() {
            e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
        }
        var e, i, o, n = this;
        this.once("layoutComplete", function() {
            e = !0, t()
        }), this.once("hideComplete", function() {
            i = !0, t()
        }), this.once("revealComplete", function() {
            o = !0, t()
        })
    }, l._filter = function(t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
            var a = t[r];
            if (!a.isIgnored) {
                var u = s(a);
                u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
            }
        }
        return {
            matches: i,
            needReveal: o,
            needHide: n
        }
    }, l._getFilterTest = function(t) {
        return u && this.options.isJQueryFiltering ? function(e) {
            return u(e.element).is(t)
        } : "function" == typeof t ? function(e) {
            return t(e.element)
        } : function(e) {
            return o(e.element, t)
        }
    }, l.updateSortData = function(t) {
        var e;
        t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, l._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = f(i)
        }
    }, l._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++) {
            var o = t[i];
            o.updateSortData()
        }
    };
    var f = function() {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = h(t).split(" "),
                o = i[0],
                n = o.match(/^\[(.+)\]$/),
                s = n && n[1],
                r = e(s, o),
                a = d.sortDataParsers[i[1]];
            return t = a ? function(t) {
                return t && a(r(t))
            } : function(t) {
                return t && r(t)
            }
        }

        function e(t, e) {
            return t ? function(e) {
                return e.getAttribute(t)
            } : function(t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }
        return t
    }();
    d.sortDataParsers = {
        parseInt: function(t) {
            return parseInt(t, 10)
        },
        parseFloat: function(t) {
            return parseFloat(t)
        }
    }, l._sort = function() {
        if (this.options.sortBy) {
            var t = n.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, l._getIsSameSortBy = function(t) {
        for (var e = 0; e < t.length; e++)
            if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, l._mode = function() {
        var t = this.options.layoutMode,
            e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, l._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, l._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t)
    }, l._manageStamp = function(t) {
        this._mode()._manageStamp(t)
    }, l._getContainerSize = function() {
        return this._mode()._getContainerSize()
    }, l.needsResizeLayout = function() {
        return this._mode().needsResizeLayout()
    }, l.appended = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, l.prepended = function(t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, l._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, l.insert = function(t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, o, n = e.length;
            for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
            var s = this._filter(e).matches;
            for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
            this.reveal(s)
        }
    };
    var c = l.remove;
    return l.remove = function(t) {
        t = n.makeArray(t);
        var e = this.getItems(t);
        c.call(this, t);
        for (var i = e && e.length, o = 0; i && o < i; o++) {
            var s = e[o];
            n.removeFrom(this.filteredItems, s)
        }
    }, l.shuffle = function() {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, l._noTransition = function(t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var o = t.apply(this, e);
        return this.options.transitionDuration = i, o
    }, l.getFilteredItemElements = function() {
        return this.filteredItems.map(function(t) {
            return t.element
        })
    }, d
});
/*-----------------------------------------------------------------------------------*/
/*	20. IMAGESLOADED
/*-----------------------------------------------------------------------------------*/
/*!
 * imagesLoaded PACKAGED v4.1.2
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function(t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function(t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0,
                o = i[n];
            e = e || [];
            for (var r = this._onceEvents && this._onceEvents[t]; o;) {
                var s = r && r[o];
                s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
            }
            return this
        }
    }, t
}),
function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
}("undefined" != typeof window ? window : this, function(t, e) {
    function i(t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }

    function n(t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if ("number" == typeof t.length)
            for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e
    }

    function o(t, e, r) {
        return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
            this.check()
        }.bind(this))) : new o(t, e, r)
    }

    function r(t) {
        this.img = t
    }

    function s(t, e) {
        this.url = t, this.element = e, this.img = new Image
    }
    var h = t.jQuery,
        a = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(t) {
        "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && d[e]) {
            for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = t.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var d = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
        var e = getComputedStyle(t);
        if (e)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
            }
    }, o.prototype.addImage = function(t) {
        var e = new r(t);
        this.images.push(e)
    }, o.prototype.addBackground = function(t, e) {
        var i = new s(t, e);
        this.images.push(i)
    }, o.prototype.check = function() {
        function t(t, i, n) {
            setTimeout(function() {
                e.progress(t, i, n)
            })
        }
        var e = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
            e.once("progress", t), e.check()
        }) : void this.complete()
    }, o.prototype.progress = function(t, e, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
    }, o.prototype.complete = function() {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var e = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[e](this)
        }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
        var t = this.getIsImageComplete();
        return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
        return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, r.prototype.handleEvent = function(t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, r.prototype.onload = function() {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var t = this.getIsImageComplete();
        t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(t, e) {
        this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function(e) {
        e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
            var i = new o(this, t, e);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
});
/*-----------------------------------------------------------------------------------*/
/*	21. SWIPER
/*-----------------------------------------------------------------------------------*/
/**
 * Swiper 5.3.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 29, 2020
 */

! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, (function() {
    "use strict";
    var e = "undefined" == typeof document ? {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: {
                blur: function() {},
                nodeName: ""
            },
            querySelector: function() {
                return null
            },
            querySelectorAll: function() {
                return []
            },
            getElementById: function() {
                return null
            },
            createEvent: function() {
                return {
                    initEvent: function() {}
                }
            },
            createElement: function() {
                return {
                    children: [],
                    childNodes: [],
                    style: {},
                    setAttribute: function() {},
                    getElementsByTagName: function() {
                        return []
                    }
                }
            },
            location: {
                hash: ""
            }
        } : document,
        t = "undefined" == typeof window ? {
            document: e,
            navigator: {
                userAgent: ""
            },
            location: {},
            history: {},
            CustomEvent: function() {
                return this
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
                return {
                    getPropertyValue: function() {
                        return ""
                    }
                }
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {}
        } : window,
        i = function(e) {
            for (var t = 0; t < e.length; t += 1) this[t] = e[t];
            return this.length = e.length, this
        };

    function s(s, a) {
        var r = [],
            n = 0;
        if (s && !a && s instanceof i) return s;
        if (s)
            if ("string" == typeof s) {
                var o, l, d = s.trim();
                if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
                    var h = "div";
                    for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1) r.push(l.childNodes[n])
                } else
                    for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) o[n] && r.push(o[n])
            } else if (s.nodeType || s === t || s === e) r.push(s);
        else if (s.length > 0 && s[0].nodeType)
            for (n = 0; n < s.length; n += 1) r.push(s[n]);
        return new i(r)
    }

    function a(e) {
        for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]);
        return t
    }
    s.fn = i.prototype, s.Class = i, s.Dom7 = i;
    var r = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) {
            return !!this[0] && this[0].classList.contains(e)
        },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1)
                if (2 === i.length) this[s].setAttribute(e, t);
                else
                    for (var a in e) this[s][a] = e[a], this[s].setAttribute(a, e[a]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this
        },
        data: function(e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1)(i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t;
                return this
            }
            if (i = this[0]) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
                var a = i.getAttribute("data-" + e);
                return a || void 0
            }
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var a = t[0],
                r = t[1],
                n = t[2],
                o = t[3];

            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), s(t).is(r)) n.apply(t, i);
                    else
                        for (var a = s(t).parents(), o = 0; o < a.length; o += 1) s(a[o]).is(r) && n.apply(a[o], i)
                }
            }

            function d(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
            }
            "function" == typeof t[1] && (a = (e = t)[0], n = e[1], o = e[2], r = void 0), o || (o = !1);
            for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (h = 0; h < p.length; h += 1) {
                        var v = p[h];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []), u.dom7LiveListeners[v].push({
                            listener: n,
                            proxyListener: l
                        }), u.addEventListener(v, l, o)
                    } else
                        for (h = 0; h < p.length; h += 1) {
                            var f = p[h];
                            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({
                                listener: n,
                                proxyListener: d
                            }), u.addEventListener(f, d, o)
                        }
            }
            return this
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var s = t[0],
                a = t[1],
                r = t[2],
                n = t[3];
            "function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1);
            for (var o = s.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], h = 0; h < this.length; h += 1) {
                    var p = this[h],
                        c = void 0;
                    if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]), c && c.length)
                        for (var u = c.length - 1; u >= 0; u -= 1) {
                            var v = c[u];
                            r && v.listener === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var i = [], s = arguments.length; s--;) i[s] = arguments[s];
            for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
                for (var o = a[n], l = 0; l < this.length; l += 1) {
                    var d = this[l],
                        h = void 0;
                    try {
                        h = new t.CustomEvent(o, {
                            detail: r,
                            bubbles: !0,
                            cancelable: !0
                        })
                    } catch (t) {
                        (h = e.createEvent("Event")).initEvent(o, !0, !0), h.detail = r
                    }
                    d.dom7EventData = i.filter((function(e, t) {
                        return t > 0
                    })), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData
                }
            return this
        },
        transitionEnd: function(e) {
            var t, i = ["webkitTransitionEnd", "transitionend"],
                s = this;

            function a(r) {
                if (r.target === this)
                    for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a)
            }
            if (e)
                for (t = 0; t < i.length; t += 1) s.on(i[t], a);
            return this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        offset: function() {
            if (this.length > 0) {
                var i = this[0],
                    s = i.getBoundingClientRect(),
                    a = e.body,
                    r = i.clientTop || a.clientTop || 0,
                    n = i.clientLeft || a.clientLeft || 0,
                    o = i === t ? t.scrollY : i.scrollTop,
                    l = i === t ? t.scrollX : i.scrollLeft;
                return {
                    top: s.top + o - r,
                    left: s.left + l - n
                }
            }
            return null
        },
        css: function(e, i) {
            var s;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1)
                        for (var a in e) this[s].style[a] = e[a];
                    return this
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (s = 0; s < this.length; s += 1) this[s].style[e] = i;
                return this
            }
            return this
        },
        each: function(e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        },
        html: function(e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this
        },
        is: function(a) {
            var r, n, o = this[0];
            if (!o || void 0 === a) return !1;
            if ("string" == typeof a) {
                if (o.matches) return o.matches(a);
                if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
                if (o.msMatchesSelector) return o.msMatchesSelector(a);
                for (r = s(a), n = 0; n < r.length; n += 1)
                    if (r[n] === o) return !0;
                return !1
            }
            if (a === e) return o === e;
            if (a === t) return o === t;
            if (a.nodeType || a instanceof i) {
                for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1)
                    if (r[n] === o) return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e) return this;
            var t, s = this.length;
            return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]])
        },
        append: function() {
            for (var t, s = [], a = arguments.length; a--;) s[a] = arguments[a];
            for (var r = 0; r < s.length; r += 1) {
                t = s[r];
                for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof t) {
                        var o = e.createElement("div");
                        for (o.innerHTML = t; o.firstChild;) this[n].appendChild(o.firstChild)
                    } else if (t instanceof i)
                    for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]);
                else this[n].appendChild(t)
            }
            return this
        },
        prepend: function(t) {
            var s, a;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof t) {
                    var r = e.createElement("div");
                    for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) this[s].insertBefore(r.childNodes[a], this[s].childNodes[0])
                } else if (t instanceof i)
                for (a = 0; a < t.length; a += 1) this[s].insertBefore(t[a], this[s].childNodes[0]);
            else this[s].insertBefore(t, this[s].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([])
        },
        nextAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.nextElementSibling;) {
                var r = a.nextElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), a = r
            }
            return new i(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([])
            }
            return new i([])
        },
        prevAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.previousElementSibling;) {
                var r = a.previousElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), a = r
            }
            return new i(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return s(a(t))
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var r = this[i].parentNode; r;) e ? s(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
            return s(a(t))
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
        },
        find: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1)
                for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) t.push(a[r]);
            return new i(t)
        },
        children: function(e) {
            for (var t = [], r = 0; r < this.length; r += 1)
                for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
            return new i(a(t))
        },
        filter: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1) e.call(this[s], s, this[s]) && t.push(this[s]);
            return new i(t)
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        add: function() {
            for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
            var i, a;
            for (i = 0; i < e.length; i += 1) {
                var r = s(e[i]);
                for (a = 0; a < r.length; a += 1) this[this.length] = r[a], this.length += 1
            }
            return this
        },
        styles: function() {
            return this[0] ? t.getComputedStyle(this[0], null) : {}
        }
    };
    Object.keys(r).forEach((function(e) {
        s.fn[e] = s.fn[e] || r[e]
    }));
    var n = {
            deleteProps: function(e) {
                var t = e;
                Object.keys(t).forEach((function(e) {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                }))
            },
            nextTick: function(e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t)
            },
            now: function() {
                return Date.now()
            },
            getTranslate: function(e, i) {
                var s, a, r;
                void 0 === i && (i = "x");
                var n = t.getComputedStyle(e, null);
                return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map((function(e) {
                    return e.replace(",", ".")
                })).join(", ")), r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), a || 0
            },
            parseUrlQuery: function(e) {
                var i, s, a, r, n = {},
                    o = e || t.location.href;
                if ("string" == typeof o && o.length)
                    for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter((function(e) {
                            return "" !== e
                        }))).length, i = 0; i < r; i += 1) a = s[i].replace(/#\S+/g, "").split("="), n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
                return n
            },
            isObject: function(e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
            },
            extend: function() {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                    var a = e[s];
                    if (null != a)
                        for (var r = Object.keys(Object(a)), o = 0, l = r.length; o < l; o += 1) {
                            var d = r[o],
                                h = Object.getOwnPropertyDescriptor(a, d);
                            void 0 !== h && h.enumerable && (n.isObject(i[d]) && n.isObject(a[d]) ? n.extend(i[d], a[d]) : !n.isObject(i[d]) && n.isObject(a[d]) ? (i[d] = {}, n.extend(i[d], a[d])) : i[d] = a[d])
                        }
                }
                return i
            }
        },
        o = {
            touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
            pointerEvents: !!t.PointerEvent && "maxTouchPoints" in t.navigator && t.navigator.maxTouchPoints > 0,
            observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
            passiveListener: function() {
                var e = !1;
                try {
                    var i = Object.defineProperty({}, "passive", {
                        get: function() {
                            e = !0
                        }
                    });
                    t.addEventListener("testPassiveListener", null, i)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in t
        },
        l = function(e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach((function(e) {
                t.on(e, t.params.on[e])
            }))
        },
        d = {
            components: {
                configurable: !0
            }
        };
    l.prototype.on = function(e, t, i) {
        var s = this;
        if ("function" != typeof t) return s;
        var a = i ? "unshift" : "push";
        return e.split(" ").forEach((function(e) {
            s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t)
        })), s
    }, l.prototype.once = function(e, t, i) {
        var s = this;
        if ("function" != typeof t) return s;

        function a() {
            for (var i = [], r = arguments.length; r--;) i[r] = arguments[r];
            s.off(e, a), a.f7proxy && delete a.f7proxy, t.apply(s, i)
        }
        return a.f7proxy = t, s.on(e, a, i)
    }, l.prototype.off = function(e, t) {
        var i = this;
        return i.eventsListeners ? (e.split(" ").forEach((function(e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach((function(s, a) {
                (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1)
            }))
        })), i) : i
    }, l.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, s, a, r = this;
        if (!r.eventsListeners) return r;
        "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r);
        var n = Array.isArray(i) ? i : i.split(" ");
        return n.forEach((function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach((function(e) {
                    t.push(e)
                })), t.forEach((function(e) {
                    e.apply(a, s)
                }))
            }
        })), r
    }, l.prototype.useModulesParams = function(e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function(i) {
            var s = t.modules[i];
            s.params && n.extend(e, s.params)
        }))
    }, l.prototype.useModules = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach((function(i) {
            var s = t.modules[i],
                a = e[i] || {};
            s.instance && Object.keys(s.instance).forEach((function(e) {
                var i = s.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            })), s.on && t.on && Object.keys(s.on).forEach((function(e) {
                t.on(e, s.on[e])
            })), s.create && s.create.bind(t)(a)
        }))
    }, d.components.set = function(e) {
        this.use && this.use(e)
    }, l.installModule = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var a = e.name || Object.keys(s.prototype.modules).length + "_" + n.now();
        return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach((function(t) {
            s.prototype[t] = e.proto[t]
        })), e.static && Object.keys(e.static).forEach((function(t) {
            s[t] = e.static[t]
        })), e.install && e.install.apply(s, t), s
    }, l.use = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var s = this;
        return Array.isArray(e) ? (e.forEach((function(e) {
            return s.installModule(e)
        })), s) : s.installModule.apply(s, [e].concat(t))
    }, Object.defineProperties(l, d);
    var h = {
        updateSize: function() {
            var e, t, i = this.$el;
            e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), n.extend(this, {
                width: e,
                height: t,
                size: this.isHorizontal() ? e : t
            }))
        },
        updateSlides: function() {
            var e = this.params,
                i = this.$wrapperEl,
                s = this.size,
                a = this.rtlTranslate,
                r = this.wrongRTL,
                o = this.virtual && e.virtual.enabled,
                l = o ? this.virtual.slides.length : this.slides.length,
                d = i.children("." + this.params.slideClass),
                h = o ? this.virtual.slides.length : d.length,
                p = [],
                c = [],
                u = [];

            function v(t) {
                return !e.cssMode || t !== d.length - 1
            }
            var f = e.slidesOffsetBefore;
            "function" == typeof f && (f = e.slidesOffsetBefore.call(this));
            var m = e.slidesOffsetAfter;
            "function" == typeof m && (m = e.slidesOffsetAfter.call(this));
            var g = this.snapGrid.length,
                b = this.snapGrid.length,
                w = e.spaceBetween,
                y = -f,
                x = 0,
                T = 0;
            if (void 0 !== s) {
                var E, S;
                "string" == typeof w && w.indexOf("%") >= 0 && (w = parseFloat(w.replace("%", "")) / 100 * s), this.virtualSize = -w, a ? d.css({
                    marginLeft: "",
                    marginTop: ""
                }) : d.css({
                    marginRight: "",
                    marginBottom: ""
                }), e.slidesPerColumn > 1 && (E = Math.floor(h / e.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
                for (var C, M = e.slidesPerColumn, P = E / M, z = Math.floor(h / e.slidesPerColumn), k = 0; k < h; k += 1) {
                    S = 0;
                    var $ = d.eq(k);
                    if (e.slidesPerColumn > 1) {
                        var L = void 0,
                            I = void 0,
                            D = void 0;
                        if ("row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                            var O = Math.floor(k / (e.slidesPerGroup * e.slidesPerColumn)),
                                A = k - e.slidesPerColumn * e.slidesPerGroup * O,
                                G = 0 === O ? e.slidesPerGroup : Math.min(Math.ceil((h - O * M * e.slidesPerGroup) / M), e.slidesPerGroup);
                            L = (I = A - (D = Math.floor(A / G)) * G + O * e.slidesPerGroup) + D * E / M, $.css({
                                "-webkit-box-ordinal-group": L,
                                "-moz-box-ordinal-group": L,
                                "-ms-flex-order": L,
                                "-webkit-order": L,
                                order: L
                            })
                        } else "column" === e.slidesPerColumnFill ? (D = k - (I = Math.floor(k / M)) * M, (I > z || I === z && D === M - 1) && (D += 1) >= M && (D = 0, I += 1)) : I = k - (D = Math.floor(k / P)) * P;
                        $.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== D && e.spaceBetween && e.spaceBetween + "px")
                    }
                    if ("none" !== $.css("display")) {
                        if ("auto" === e.slidesPerView) {
                            var H = t.getComputedStyle($[0], null),
                                B = $[0].style.transform,
                                N = $[0].style.webkitTransform;
                            if (B && ($[0].style.transform = "none"), N && ($[0].style.webkitTransform = "none"), e.roundLengths) S = this.isHorizontal() ? $.outerWidth(!0) : $.outerHeight(!0);
                            else if (this.isHorizontal()) {
                                var X = parseFloat(H.getPropertyValue("width")),
                                    V = parseFloat(H.getPropertyValue("padding-left")),
                                    Y = parseFloat(H.getPropertyValue("padding-right")),
                                    F = parseFloat(H.getPropertyValue("margin-left")),
                                    W = parseFloat(H.getPropertyValue("margin-right")),
                                    R = H.getPropertyValue("box-sizing");
                                S = R && "border-box" === R ? X + F + W : X + V + Y + F + W
                            } else {
                                var q = parseFloat(H.getPropertyValue("height")),
                                    j = parseFloat(H.getPropertyValue("padding-top")),
                                    K = parseFloat(H.getPropertyValue("padding-bottom")),
                                    U = parseFloat(H.getPropertyValue("margin-top")),
                                    _ = parseFloat(H.getPropertyValue("margin-bottom")),
                                    Z = H.getPropertyValue("box-sizing");
                                S = Z && "border-box" === Z ? q + U + _ : q + j + K + U + _
                            }
                            B && ($[0].style.transform = B), N && ($[0].style.webkitTransform = N), e.roundLengths && (S = Math.floor(S))
                        } else S = (s - (e.slidesPerView - 1) * w) / e.slidesPerView, e.roundLengths && (S = Math.floor(S)), d[k] && (this.isHorizontal() ? d[k].style.width = S + "px" : d[k].style.height = S + "px");
                        d[k] && (d[k].swiperSlideSize = S), u.push(S), e.centeredSlides ? (y = y + S / 2 + x / 2 + w, 0 === x && 0 !== k && (y = y - s / 2 - w), 0 === k && (y = y - s / 2 - w), Math.abs(y) < .001 && (y = 0), e.roundLengths && (y = Math.floor(y)), T % e.slidesPerGroup == 0 && p.push(y), c.push(y)) : (e.roundLengths && (y = Math.floor(y)), (T - Math.min(this.params.slidesPerGroupSkip, T)) % this.params.slidesPerGroup == 0 && p.push(y), c.push(y), y = y + S + w), this.virtualSize += S + w, x = S, T += 1
                    }
                }
                if (this.virtualSize = Math.max(this.virtualSize, s) + m, a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({
                        width: this.virtualSize + e.spaceBetween + "px"
                    }), e.setWrapperSize && (this.isHorizontal() ? i.css({
                        width: this.virtualSize + e.spaceBetween + "px"
                    }) : i.css({
                        height: this.virtualSize + e.spaceBetween + "px"
                    })), e.slidesPerColumn > 1 && (this.virtualSize = (S + e.spaceBetween) * E, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({
                        width: this.virtualSize + e.spaceBetween + "px"
                    }) : i.css({
                        height: this.virtualSize + e.spaceBetween + "px"
                    }), e.centeredSlides)) {
                    C = [];
                    for (var Q = 0; Q < p.length; Q += 1) {
                        var J = p[Q];
                        e.roundLengths && (J = Math.floor(J)), p[Q] < this.virtualSize + p[0] && C.push(J)
                    }
                    p = C
                }
                if (!e.centeredSlides) {
                    C = [];
                    for (var ee = 0; ee < p.length; ee += 1) {
                        var te = p[ee];
                        e.roundLengths && (te = Math.floor(te)), p[ee] <= this.virtualSize - s && C.push(te)
                    }
                    p = C, Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - s)
                }
                if (0 === p.length && (p = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? a ? d.filter(v).css({
                        marginLeft: w + "px"
                    }) : d.filter(v).css({
                        marginRight: w + "px"
                    }) : d.filter(v).css({
                        marginBottom: w + "px"
                    })), e.centeredSlides && e.centeredSlidesBounds) {
                    var ie = 0;
                    u.forEach((function(t) {
                        ie += t + (e.spaceBetween ? e.spaceBetween : 0)
                    }));
                    var se = (ie -= e.spaceBetween) - s;
                    p = p.map((function(e) {
                        return e < 0 ? -f : e > se ? se + m : e
                    }))
                }
                if (e.centerInsufficientSlides) {
                    var ae = 0;
                    if (u.forEach((function(t) {
                            ae += t + (e.spaceBetween ? e.spaceBetween : 0)
                        })), (ae -= e.spaceBetween) < s) {
                        var re = (s - ae) / 2;
                        p.forEach((function(e, t) {
                            p[t] = e - re
                        })), c.forEach((function(e, t) {
                            c[t] = e + re
                        }))
                    }
                }
                n.extend(this, {
                    slides: d,
                    snapGrid: p,
                    slidesGrid: c,
                    slidesSizesGrid: u
                }), h !== l && this.emit("slidesLengthChange"), p.length !== g && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), c.length !== b && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, i = [],
                s = 0;
            if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
                if (this.params.centeredSlides) i.push.apply(i, this.visibleSlides);
                else
                    for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                        var a = this.activeIndex + t;
                        if (a > this.slides.length) break;
                        i.push(this.slides.eq(a)[0])
                    } else i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var r = i[t].offsetHeight;
                    s = r > s ? r : s
                }
            s && this.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
        },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this.params,
                i = this.slides,
                a = this.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var r = -e;
                a && (r = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n],
                        l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility || t.centeredSlides && t.autoHeight) {
                        var d = -(r - o.swiperSlideOffset),
                            h = d + this.slidesSizesGrid[n];
                        (d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(n), i.eq(n).addClass(t.slideVisibleClass))
                    }
                    o.progress = a ? -l : l
                }
                this.visibleSlides = s(this.visibleSlides)
            }
        },
        updateProgress: function(e) {
            if (void 0 === e) {
                var t = this.rtlTranslate ? -1 : 1;
                e = this && this.translate && this.translate * t || 0
            }
            var i = this.params,
                s = this.maxTranslate() - this.minTranslate(),
                a = this.progress,
                r = this.isBeginning,
                o = this.isEnd,
                l = r,
                d = o;
            0 === s ? (a = 0, r = !0, o = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0, o = a >= 1), n.extend(this, {
                progress: a,
                isBeginning: r,
                isEnd: o
            }), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && this.updateSlidesProgress(e), r && !l && this.emit("reachBeginning toEdge"), o && !d && this.emit("reachEnd toEdge"), (l && !r || d && !o) && this.emit("fromEdge"), this.emit("progress", a)
        },
        updateSlidesClasses: function() {
            var e, t = this.slides,
                i = this.params,
                s = this.$wrapperEl,
                a = this.activeIndex,
                r = this.realIndex,
                n = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, i = this.rtlTranslate ? this.translate : -this.translate,
                s = this.slidesGrid,
                a = this.snapGrid,
                r = this.params,
                o = this.activeIndex,
                l = this.realIndex,
                d = this.snapIndex,
                h = e;
            if (void 0 === h) {
                for (var p = 0; p < s.length; p += 1) void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
                r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
            }
            if (a.indexOf(i) >= 0) t = a.indexOf(i);
            else {
                var c = Math.min(r.slidesPerGroupSkip, h);
                t = c + Math.floor((h - c) / r.slidesPerGroup)
            }
            if (t >= a.length && (t = a.length - 1), h !== o) {
                var u = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                n.extend(this, {
                    snapIndex: t,
                    realIndex: u,
                    previousIndex: o,
                    activeIndex: h
                }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), l !== u && this.emit("realIndexChange"), (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange")
            } else t !== d && (this.snapIndex = t, this.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this.params,
                i = s(e.target).closest("." + t.slideClass)[0],
                a = !1;
            if (i)
                for (var r = 0; r < this.slides.length; r += 1) this.slides[r] === i && (a = !0);
            if (!i || !a) return this.clickedSlide = void 0, void(this.clickedIndex = void 0);
            this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
        }
    };
    var p = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
                i = this.rtlTranslate,
                s = this.translate,
                a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -s : s;
            if (t.cssMode) return s;
            var r = n.getTranslate(a[0], e);
            return i && (r = -r), r || 0
        },
        setTranslate: function(e, t) {
            var i = this.rtlTranslate,
                s = this.params,
                a = this.$wrapperEl,
                r = this.wrapperEl,
                n = this.progress,
                o = 0,
                l = 0;
            this.isHorizontal() ? o = i ? -e : e : l = e, s.roundLengths && (o = Math.floor(o), l = Math.floor(l)), s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -o : -l : s.virtualTranslate || a.transform("translate3d(" + o + "px, " + l + "px, 0px)"), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? o : l;
            var d = this.maxTranslate() - this.minTranslate();
            (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e, t, i, s, a) {
            var r;
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0), void 0 === s && (s = !0);
            var n = this,
                o = n.params,
                l = n.wrapperEl;
            if (n.animating && o.preventInteractionOnTransition) return !1;
            var d, h = n.minTranslate(),
                p = n.maxTranslate();
            if (d = s && e > h ? h : s && e < p ? p : e, n.updateProgress(d), o.cssMode) {
                var c = n.isHorizontal();
                return 0 === t ? l[c ? "scrollLeft" : "scrollTop"] = -d : l.scrollTo ? l.scrollTo(((r = {})[c ? "left" : "top"] = -d, r.behavior = "smooth", r)) : l[c ? "scrollLeft" : "scrollTop"] = -d, !0
            }
            return 0 === t ? (n.setTransition(0), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionEnd"))) : (n.setTransition(t), n.setTranslate(d), i && (n.emit("beforeTransitionStart", t, a), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(e) {
                n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, i && n.emit("transitionEnd"))
            }), n.$wrapperEl[0].addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onTranslateToWrapperTransitionEnd))), !0
        }
    };
    var c = {
        setTransition: function(e, t) {
            this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t)
        },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.params,
                a = this.previousIndex;
            if (!s.cssMode) {
                s.autoHeight && this.updateAutoHeight();
                var r = t;
                if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) {
                    if ("reset" === r) return void this.emit("slideResetTransitionStart");
                    this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
                }
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.previousIndex,
                a = this.params;
            if (this.animating = !1, !a.cssMode) {
                this.setTransition(0);
                var r = t;
                if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
                    if ("reset" === r) return void this.emit("slideResetTransitionEnd");
                    this.emit("slideChangeTransitionEnd"), "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
                }
            }
        }
    };
    var u = {
        slideTo: function(e, t, i, s) {
            var a;
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var r = this,
                n = e;
            n < 0 && (n = 0);
            var o = r.params,
                l = r.snapGrid,
                d = r.slidesGrid,
                h = r.previousIndex,
                p = r.activeIndex,
                c = r.rtlTranslate,
                u = r.wrapperEl;
            if (r.animating && o.preventInteractionOnTransition) return !1;
            var v = Math.min(r.params.slidesPerGroupSkip, n),
                f = v + Math.floor((n - v) / r.params.slidesPerGroup);
            f >= l.length && (f = l.length - 1), (p || o.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
            var m, g = -l[f];
            if (r.updateProgress(g), o.normalizeSlideIndex)
                for (var b = 0; b < d.length; b += 1) - Math.floor(100 * g) >= Math.floor(100 * d[b]) && (n = b);
            if (r.initialized && n !== p) {
                if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
                if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (p || 0) !== n) return !1
            }
            if (m = n > p ? "next" : n < p ? "prev" : "reset", c && -g === r.translate || !c && g === r.translate) return r.updateActiveIndex(n), o.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== o.effect && r.setTranslate(g), "reset" !== m && (r.transitionStart(i, m), r.transitionEnd(i, m)), !1;
            if (o.cssMode) {
                var w = r.isHorizontal();
                return 0 === t ? u[w ? "scrollLeft" : "scrollTop"] = -g : u.scrollTo ? u.scrollTo(((a = {})[w ? "left" : "top"] = -g, a.behavior = "smooth", a)) : u[w ? "scrollLeft" : "scrollTop"] = -g, !0
            }
            return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, m), r.transitionEnd(i, m)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, s), r.transitionStart(i, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(i, m))
            }), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
        },
        slideToLoop: function(e, t, i, s) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s)
        },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating,
                r = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
            if (s.loop) {
                if (a) return !1;
                this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
            }
            return this.slideTo(this.activeIndex + r, e, t, i)
        },
        slidePrev: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating,
                r = this.snapGrid,
                n = this.slidesGrid,
                o = this.rtlTranslate;
            if (s.loop) {
                if (a) return !1;
                this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
            }

            function l(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            var d, h = l(o ? this.translate : -this.translate),
                p = r.map((function(e) {
                    return l(e)
                })),
                c = (n.map((function(e) {
                    return l(e)
                })), r[p.indexOf(h)], r[p.indexOf(h) - 1]);
            return void 0 === c && s.cssMode && r.forEach((function(e) {
                !c && h >= e && (c = e)
            })), void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i)
        },
        slideReset: function(e, t, i) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i)
        },
        slideToClosest: function(e, t, i, s) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === s && (s = .5);
            var a = this.activeIndex,
                r = Math.min(this.params.slidesPerGroupSkip, a),
                n = r + Math.floor((a - r) / this.params.slidesPerGroup),
                o = this.rtlTranslate ? this.translate : -this.translate;
            if (o >= this.snapGrid[n]) {
                var l = this.snapGrid[n];
                o - l > (this.snapGrid[n + 1] - l) * s && (a += this.params.slidesPerGroup)
            } else {
                var d = this.snapGrid[n - 1];
                o - d <= (this.snapGrid[n] - d) * s && (a -= this.params.slidesPerGroup)
            }
            return a = Math.max(a, 0), a = Math.min(a, this.slidesGrid.length - 1), this.slideTo(a, e, t, i)
        },
        slideToClickedSlide: function() {
            var e, t = this,
                i = t.params,
                a = t.$wrapperEl,
                r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                o = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? o < t.loopedSlides - r / 2 || o > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function() {
                    t.slideTo(o)
                }))) : t.slideTo(o) : o > t.slides.length - r ? (t.loopFix(), o = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), n.nextTick((function() {
                    t.slideTo(o)
                }))) : t.slideTo(o)
            } else t.slideTo(o)
        }
    };
    var v = {
        loopCreate: function() {
            var t = this,
                i = t.params,
                a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var r = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var n = i.slidesPerGroup - r.length % i.slidesPerGroup;
                if (n !== i.slidesPerGroup) {
                    for (var o = 0; o < n; o += 1) {
                        var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l)
                    }
                    r = a.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > r.length && (t.loopedSlides = r.length);
            var d = [],
                h = [];
            r.each((function(e, i) {
                var a = s(i);
                e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e)
            }));
            for (var p = 0; p < h.length; p += 1) a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var c = d.length - 1; c >= 0; c -= 1) a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))
        },
        loopFix: function() {
            this.emit("beforeLoopFix");
            var e, t = this.activeIndex,
                i = this.slides,
                s = this.loopedSlides,
                a = this.allowSlidePrev,
                r = this.allowSlideNext,
                n = this.snapGrid,
                o = this.rtlTranslate;
            this.allowSlidePrev = !0, this.allowSlideNext = !0;
            var l = -n[t] - this.getTranslate();
            if (t < s) e = i.length - 3 * s + t, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l);
            else if (t >= i.length - s) {
                e = -i.length + t + s, e += s, this.slideTo(e, 0, !1, !0) && 0 !== l && this.setTranslate((o ? -this.translate : this.translate) - l)
            }
            this.allowSlidePrev = a, this.allowSlideNext = r, this.emit("loopFix")
        },
        loopDestroy: function() {
            var e = this.$wrapperEl,
                t = this.params,
                i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
        }
    };
    var f = {
        setGrabCursor: function(e) {
            if (!(o.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() {
            o.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
        }
    };
    var m, g, b, w, y, x, T, E, S, C, M, P, z, k, $, L = {
            appendSlide: function(e) {
                var t = this.$wrapperEl,
                    i = this.params;
                if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
                else t.append(e);
                i.loop && this.loopCreate(), i.observer && o.observer || this.update()
            },
            prependSlide: function(e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && this.loopDestroy();
                var a = s + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
                    a = s + e.length
                } else i.prepend(e);
                t.loop && this.loopCreate(), t.observer && o.observer || this.update(), this.slideTo(a, 0, !1)
            },
            addSlide: function(e, t) {
                var i = this.$wrapperEl,
                    s = this.params,
                    a = this.activeIndex;
                s.loop && (a -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
                var r = this.slides.length;
                if (e <= 0) this.prependSlide(t);
                else if (e >= r) this.appendSlide(t);
                else {
                    for (var n = a > e ? a + 1 : a, l = [], d = r - 1; d >= e; d -= 1) {
                        var h = this.slides.eq(d);
                        h.remove(), l.unshift(h)
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var p = 0; p < t.length; p += 1) t[p] && i.append(t[p]);
                        n = a > e ? a + t.length : a
                    } else i.append(t);
                    for (var c = 0; c < l.length; c += 1) i.append(l[c]);
                    s.loop && this.loopCreate(), s.observer && o.observer || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
                var a, r = s;
                if ("object" == typeof e && "length" in e) {
                    for (var n = 0; n < e.length; n += 1) a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
                    r = Math.max(r, 0)
                } else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);
                t.loop && this.loopCreate(), t.observer && o.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e)
            }
        },
        I = (m = t.navigator.platform, g = t.navigator.userAgent, b = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            edge: !1,
            ie: !1,
            firefox: !1,
            macos: !1,
            windows: !1,
            cordova: !(!t.cordova && !t.phonegap),
            phonegap: !(!t.cordova && !t.phonegap),
            electron: !1
        }, w = t.screen.width, y = t.screen.height, x = g.match(/(Android);?[\s\/]+([\d.]+)?/), T = g.match(/(iPad).*OS\s([\d_]+)/), E = g.match(/(iPod)(.*OS\s([\d_]+))?/), S = !T && g.match(/(iPhone\sOS|iOS)\s([\d_]+)/), C = g.indexOf("MSIE ") >= 0 || g.indexOf("Trident/") >= 0, M = g.indexOf("Edge/") >= 0, P = g.indexOf("Gecko/") >= 0 && g.indexOf("Firefox/") >= 0, z = "Win32" === m, k = g.toLowerCase().indexOf("electron") >= 0, $ = "MacIntel" === m, !T && $ && o.touch && (1024 === w && 1366 === y || 834 === w && 1194 === y || 834 === w && 1112 === y || 768 === w && 1024 === y) && (T = g.match(/(Version)\/([\d.]+)/), $ = !1), b.ie = C, b.edge = M, b.firefox = P, x && !z && (b.os = "android", b.osVersion = x[2], b.android = !0, b.androidChrome = g.toLowerCase().indexOf("chrome") >= 0), (T || S || E) && (b.os = "ios", b.ios = !0), S && !E && (b.osVersion = S[2].replace(/_/g, "."), b.iphone = !0), T && (b.osVersion = T[2].replace(/_/g, "."), b.ipad = !0), E && (b.osVersion = E[3] ? E[3].replace(/_/g, ".") : null, b.ipod = !0), b.ios && b.osVersion && g.indexOf("Version/") >= 0 && "10" === b.osVersion.split(".")[0] && (b.osVersion = g.toLowerCase().split("version/")[1].split(" ")[0]), b.webView = !(!(S || T || E) || !g.match(/.*AppleWebKit(?!.*Safari)/i) && !t.navigator.standalone) || t.matchMedia && t.matchMedia("(display-mode: standalone)").matches, b.webview = b.webView, b.standalone = b.webView, b.desktop = !(b.ios || b.android) || k, b.desktop && (b.electron = k, b.macos = $, b.windows = z, b.macos && (b.os = "macos"), b.windows && (b.os = "windows")), b.pixelRatio = t.devicePixelRatio || 1, b);

    function D(i) {
        var a = this.touchEventsData,
            r = this.params,
            o = this.touches;
        if (!this.animating || !r.preventInteractionOnTransition) {
            var l = i;
            l.originalEvent && (l = l.originalEvent);
            var d = s(l.target);
            if (("wrapper" !== r.touchEventsTarget || d.closest(this.wrapperEl).length) && (a.isTouchEvent = "touchstart" === l.type, (a.isTouchEvent || !("which" in l) || 3 !== l.which) && !(!a.isTouchEvent && "button" in l && l.button > 0 || a.isTouched && a.isMoved)))
                if (r.noSwiping && d.closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0;
                else if (!r.swipeHandler || d.closest(r.swipeHandler)[0]) {
                o.currentX = "touchstart" === l.type ? l.targetTouches[0].pageX : l.pageX, o.currentY = "touchstart" === l.type ? l.targetTouches[0].pageY : l.pageY;
                var h = o.currentX,
                    p = o.currentY,
                    c = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
                    u = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
                if (!c || !(h <= u || h >= t.screen.width - u)) {
                    if (n.extend(a, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }), o.startX = h, o.startY = p, a.touchStartTime = n.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, r.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== l.type) {
                        var v = !0;
                        d.is(a.formElements) && (v = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== d[0] && e.activeElement.blur();
                        var f = v && this.allowTouchMove && r.touchStartPreventDefault;
                        (r.touchStartForcePreventDefault || f) && l.preventDefault()
                    }
                    this.emit("touchStart", l)
                }
            }
        }
    }

    function O(t) {
        var i = this.touchEventsData,
            a = this.params,
            r = this.touches,
            o = this.rtlTranslate,
            l = t;
        if (l.originalEvent && (l = l.originalEvent), i.isTouched) {
            if (!i.isTouchEvent || "mousemove" !== l.type) {
                var d = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0]),
                    h = "touchmove" === l.type ? d.pageX : l.pageX,
                    p = "touchmove" === l.type ? d.pageY : l.pageY;
                if (l.preventedByNestedSwiper) return r.startX = h, void(r.startY = p);
                if (!this.allowTouchMove) return this.allowClick = !1, void(i.isTouched && (n.extend(r, {
                    startX: h,
                    startY: p,
                    currentX: h,
                    currentY: p
                }), i.touchStartTime = n.now()));
                if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                    if (this.isVertical()) {
                        if (p < r.startY && this.translate <= this.maxTranslate() || p > r.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
                    } else if (h < r.startX && this.translate <= this.maxTranslate() || h > r.startX && this.translate >= this.minTranslate()) return;
                if (i.isTouchEvent && e.activeElement && l.target === e.activeElement && s(l.target).is(i.formElements)) return i.isMoved = !0, void(this.allowClick = !1);
                if (i.allowTouchCallbacks && this.emit("touchMove", l), !(l.targetTouches && l.targetTouches.length > 1)) {
                    r.currentX = h, r.currentY = p;
                    var c = r.currentX - r.startX,
                        u = r.currentY - r.startY;
                    if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold)) {
                        var v;
                        if (void 0 === i.isScrolling) this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (v = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, i.isScrolling = this.isHorizontal() ? v > a.touchAngle : 90 - v > a.touchAngle);
                        if (i.isScrolling && this.emit("touchMoveOpposite", l), void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;
                        else if (i.startMoving) {
                            this.allowClick = !1, a.cssMode || l.preventDefault(), a.touchMoveStopPropagation && !a.nested && l.stopPropagation(), i.isMoved || (a.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", l)), this.emit("sliderMove", l), i.isMoved = !0;
                            var f = this.isHorizontal() ? c : u;
                            r.diff = f, f *= a.touchRatio, o && (f = -f), this.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate;
                            var m = !0,
                                g = a.resistanceRatio;
                            if (a.touchReleaseOnEdges && (g = 0), f > 0 && i.currentTranslate > this.minTranslate() ? (m = !1, a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + f, g))) : f < 0 && i.currentTranslate < this.maxTranslate() && (m = !1, a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - f, g))), m && (l.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.threshold > 0) {
                                if (!(Math.abs(f) > a.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
                                if (!i.allowThresholdMove) return i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, void(r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
                            }
                            a.followFinger && !a.cssMode && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({
                                position: r[this.isHorizontal() ? "startX" : "startY"],
                                time: i.touchStartTime
                            }), i.velocities.push({
                                position: r[this.isHorizontal() ? "currentX" : "currentY"],
                                time: n.now()
                            })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
                        }
                    }
                }
            }
        } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l)
    }

    function A(e) {
        var t = this,
            i = t.touchEventsData,
            s = t.params,
            a = t.touches,
            r = t.rtlTranslate,
            o = t.$wrapperEl,
            l = t.slidesGrid,
            d = t.snapGrid,
            h = e;
        if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p, c = n.now(),
            u = c - i.touchStartTime;
        if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap click", h), u < 300 && c - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", h)), i.lastClickTime = n.now(), n.nextTick((function() {
                t.destroyed || (t.allowClick = !0)
            })), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, !s.cssMode)
            if (s.freeMode) {
                if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                if (p > -t.maxTranslate()) return void(t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
                if (s.freeModeMomentum) {
                    if (i.velocities.length > 1) {
                        var v = i.velocities.pop(),
                            f = i.velocities.pop(),
                            m = v.position - f.position,
                            g = v.time - f.time;
                        t.velocity = m / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || n.now() - v.time > 300) && (t.velocity = 0)
                    } else t.velocity = 0;
                    t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                    var b = 1e3 * s.freeModeMomentumRatio,
                        w = t.velocity * b,
                        y = t.translate + w;
                    r && (y = -y);
                    var x, T, E = !1,
                        S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                    if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S), x = t.maxTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.maxTranslate(), s.loop && s.centeredSlides && (T = !0);
                    else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S), x = t.minTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.minTranslate(), s.loop && s.centeredSlides && (T = !0);
                    else if (s.freeModeSticky) {
                        for (var C, M = 0; M < d.length; M += 1)
                            if (d[M] > -y) {
                                C = M;
                                break
                            }
                        y = -(y = Math.abs(d[C] - y) < Math.abs(d[C - 1] - y) || "next" === t.swipeDirection ? d[C] : d[C - 1])
                    }
                    if (T && t.once("transitionEnd", (function() {
                            t.loopFix()
                        })), 0 !== t.velocity) {
                        if (b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity), s.freeModeSticky) {
                            var P = Math.abs((r ? -y : y) - t.translate),
                                z = t.slidesSizesGrid[t.activeIndex];
                            b = P < z ? s.speed : P < 2 * z ? 1.5 * s.speed : 2.5 * s.speed
                        }
                    } else if (s.freeModeSticky) return void t.slideToClosest();
                    s.freeModeMomentumBounce && E ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, o.transitionEnd((function() {
                        t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(x), o.transitionEnd((function() {
                            t && !t.destroyed && t.transitionEnd()
                        })))
                    }))) : t.velocity ? (t.updateProgress(y), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, o.transitionEnd((function() {
                        t && !t.destroyed && t.transitionEnd()
                    })))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses()
                } else if (s.freeModeSticky) return void t.slideToClosest();
                (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
            } else {
                for (var k = 0, $ = t.slidesSizesGrid[0], L = 0; L < l.length; L += L < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
                    var I = L < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                    void 0 !== l[L + I] ? p >= l[L] && p < l[L + I] && (k = L, $ = l[L + I] - l[L]) : p >= l[L] && (k = L, $ = l[l.length - 1] - l[l.length - 2])
                }
                var D = (p - l[k]) / $,
                    O = k < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                if (u > s.longSwipesMs) {
                    if (!s.longSwipes) return void t.slideTo(t.activeIndex);
                    "next" === t.swipeDirection && (D >= s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k)), "prev" === t.swipeDirection && (D > 1 - s.longSwipesRatio ? t.slideTo(k + O) : t.slideTo(k))
                } else {
                    if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
                    t.navigation && (h.target === t.navigation.nextEl || h.target === t.navigation.prevEl) ? h.target === t.navigation.nextEl ? t.slideTo(k + O) : t.slideTo(k) : ("next" === t.swipeDirection && t.slideTo(k + O), "prev" === t.swipeDirection && t.slideTo(k))
                }
            }
    }

    function G() {
        var e = this.params,
            t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext,
                s = this.allowSlidePrev,
                a = this.snapGrid;
            this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0), this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow()
        }
    }

    function H(e) {
        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
    }

    function B() {
        var e = this.wrapperEl;
        this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? -e.scrollLeft : -e.scrollTop, -0 === this.translate && (this.translate = 0), this.updateActiveIndex(), this.updateSlidesClasses();
        var t = this.maxTranslate() - this.minTranslate();
        (0 === t ? 0 : (this.translate - this.minTranslate()) / t) !== this.progress && this.updateProgress(this.translate), this.emit("setTranslate", this.translate, !1)
    }
    var N = !1;

    function X() {}
    var V = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            cssMode: !1,
            updateOnWindowResize: !0,
            preventInteractionOnTransition: !1,
            edgeSwipeDetection: !1,
            edgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            slidesPerGroupSkip: 0,
            centeredSlides: !1,
            centeredSlidesBounds: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            centerInsufficientSlides: !1,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !1,
            touchStartPreventDefault: !0,
            touchStartForcePreventDefault: !1,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: .85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0
        },
        Y = {
            update: h,
            translate: p,
            transition: c,
            slide: u,
            loop: v,
            grabCursor: f,
            manipulation: L,
            events: {
                attachEvents: function() {
                    var t = this.params,
                        i = this.touchEvents,
                        s = this.el,
                        a = this.wrapperEl;
                    this.onTouchStart = D.bind(this), this.onTouchMove = O.bind(this), this.onTouchEnd = A.bind(this), t.cssMode && (this.onScroll = B.bind(this)), this.onClick = H.bind(this);
                    var r = !!t.nested;
                    if (!o.touch && o.pointerEvents) s.addEventListener(i.start, this.onTouchStart, !1), e.addEventListener(i.move, this.onTouchMove, r), e.addEventListener(i.end, this.onTouchEnd, !1);
                    else {
                        if (o.touch) {
                            var n = !("touchstart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.addEventListener(i.start, this.onTouchStart, n), s.addEventListener(i.move, this.onTouchMove, o.passiveListener ? {
                                passive: !1,
                                capture: r
                            } : r), s.addEventListener(i.end, this.onTouchEnd, n), i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, n), N || (e.addEventListener("touchstart", X), N = !0)
                        }(t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, r), e.addEventListener("mouseup", this.onTouchEnd, !1))
                    }(t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0), t.cssMode && a.addEventListener("scroll", this.onScroll), t.updateOnWindowResize ? this.on(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : this.on("observerUpdate", G, !0)
                },
                detachEvents: function() {
                    var t = this.params,
                        i = this.touchEvents,
                        s = this.el,
                        a = this.wrapperEl,
                        r = !!t.nested;
                    if (!o.touch && o.pointerEvents) s.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, r), e.removeEventListener(i.end, this.onTouchEnd, !1);
                    else {
                        if (o.touch) {
                            var n = !("onTouchStart" !== i.start || !o.passiveListener || !t.passiveListeners) && {
                                passive: !0,
                                capture: !1
                            };
                            s.removeEventListener(i.start, this.onTouchStart, n), s.removeEventListener(i.move, this.onTouchMove, r), s.removeEventListener(i.end, this.onTouchEnd, n), i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, n)
                        }(t.simulateTouch && !I.ios && !I.android || t.simulateTouch && !o.touch && I.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, r), e.removeEventListener("mouseup", this.onTouchEnd, !1))
                    }(t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0), t.cssMode && a.removeEventListener("scroll", this.onScroll), this.off(I.ios || I.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    var e = this.activeIndex,
                        t = this.initialized,
                        i = this.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = this.params,
                        a = this.$el,
                        r = s.breakpoints;
                    if (r && (!r || 0 !== Object.keys(r).length)) {
                        var o = this.getBreakpoint(r);
                        if (o && this.currentBreakpoint !== o) {
                            var l = o in r ? r[o] : void 0;
                            l && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function(e) {
                                var t = l[e];
                                void 0 !== t && (l[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            }));
                            var d = l || this.originalParams,
                                h = s.slidesPerColumn > 1,
                                p = d.slidesPerColumn > 1;
                            h && !p ? a.removeClass(s.containerModifierClass + "multirow " + s.containerModifierClass + "multirow-column") : !h && p && (a.addClass(s.containerModifierClass + "multirow"), "column" === d.slidesPerColumnFill && a.addClass(s.containerModifierClass + "multirow-column"));
                            var c = d.direction && d.direction !== s.direction,
                                u = s.loop && (d.slidesPerView !== s.slidesPerView || c);
                            c && t && this.changeDirection(), n.extend(this.params, d), n.extend(this, {
                                allowTouchMove: this.params.allowTouchMove,
                                allowSlideNext: this.params.allowSlideNext,
                                allowSlidePrev: this.params.allowSlidePrev
                            }), this.currentBreakpoint = o, u && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", d)
                        }
                    }
                },
                getBreakpoint: function(e) {
                    if (e) {
                        var i = !1,
                            s = Object.keys(e).map((function(e) {
                                if ("string" == typeof e && 0 === e.indexOf("@")) {
                                    var i = parseFloat(e.substr(1));
                                    return {
                                        value: t.innerHeight * i,
                                        point: e
                                    }
                                }
                                return {
                                    value: e,
                                    point: e
                                }
                            }));
                        s.sort((function(e, t) {
                            return parseInt(e.value, 10) - parseInt(t.value, 10)
                        }));
                        for (var a = 0; a < s.length; a += 1) {
                            var r = s[a],
                                n = r.point;
                            r.value <= t.innerWidth && (i = n)
                        }
                        return i || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    var e = this.params,
                        t = this.isLocked,
                        i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
                    e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), t && t !== this.isLocked && (this.isEnd = !1, this.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var e = this.classNames,
                        t = this.params,
                        i = this.rtl,
                        s = this.$el,
                        a = [];
                    a.push("initialized"), a.push(t.direction), t.freeMode && a.push("free-mode"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && (a.push("multirow"), "column" === t.slidesPerColumnFill && a.push("multirow-column")), I.android && a.push("android"), I.ios && a.push("ios"), t.cssMode && a.push("css-mode"), a.forEach((function(i) {
                        e.push(t.containerModifierClass + i)
                    })), s.addClass(e.join(" "))
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, i, s, a, r, n) {
                    var o;

                    function l() {
                        n && n()
                    }
                    e.complete && r ? l() : i ? ((o = new t.Image).onload = l, o.onerror = l, a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l()
                },
                preloadImages: function() {
                    var e = this;

                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        F = {},
        W = function(e) {
            function t() {
                for (var i, a, r, l = [], d = arguments.length; d--;) l[d] = arguments[d];
                1 === l.length && l[0].constructor && l[0].constructor === Object ? r = l[0] : (a = (i = l)[0], r = i[1]), r || (r = {}), r = n.extend({}, r), a && !r.el && (r.el = a), e.call(this, r), Object.keys(Y).forEach((function(e) {
                    Object.keys(Y[e]).forEach((function(i) {
                        t.prototype[i] || (t.prototype[i] = Y[e][i])
                    }))
                }));
                var h = this;
                void 0 === h.modules && (h.modules = {}), Object.keys(h.modules).forEach((function(e) {
                    var t = h.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0],
                            s = t.params[i];
                        if ("object" != typeof s || null === s) return;
                        if (!(i in r && "enabled" in s)) return;
                        !0 === r[i] && (r[i] = {
                            enabled: !0
                        }), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = {
                            enabled: !1
                        })
                    }
                }));
                var p = n.extend({}, V);
                h.useModulesParams(p), h.params = n.extend({}, p, F, r), h.originalParams = n.extend({}, h.params), h.passedParams = n.extend({}, r), h.$ = s;
                var c = s(h.params.el);
                if (a = c[0]) {
                    if (c.length > 1) {
                        var u = [];
                        return c.each((function(e, i) {
                            var s = n.extend({}, r, {
                                el: i
                            });
                            u.push(new t(s))
                        })), u
                    }
                    var v, f, m;
                    return a.swiper = h, c.data("swiper", h), a && a.shadowRoot && a.shadowRoot.querySelector ? (v = s(a.shadowRoot.querySelector("." + h.params.wrapperClass))).children = function(e) {
                        return c.children(e)
                    } : v = c.children("." + h.params.wrapperClass), n.extend(h, {
                        $el: c,
                        el: a,
                        $wrapperEl: v,
                        wrapperEl: v[0],
                        classNames: [],
                        slides: s(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === h.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === h.params.direction
                        },
                        rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
                        rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
                        wrongRTL: "-webkit-box" === v.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: h.params.allowSlideNext,
                        allowSlidePrev: h.params.allowSlidePrev,
                        touchEvents: (f = ["touchstart", "touchmove", "touchend", "touchcancel"], m = ["mousedown", "mousemove", "mouseup"], o.pointerEvents && (m = ["pointerdown", "pointermove", "pointerup"]), h.touchEventsTouch = {
                            start: f[0],
                            move: f[1],
                            end: f[2],
                            cancel: f[3]
                        }, h.touchEventsDesktop = {
                            start: m[0],
                            move: m[1],
                            end: m[2]
                        }, o.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video, label",
                            lastClickTime: n.now(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: h.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }), h.useModules(), h.params.init && h.init(), h
                }
            }
            e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
            var i = {
                extendedDefaults: {
                    configurable: !0
                },
                defaults: {
                    configurable: !0
                },
                Class: {
                    configurable: !0
                },
                $: {
                    configurable: !0
                }
            };
            return t.prototype.slidesPerViewDynamic = function() {
                var e = this.params,
                    t = this.slides,
                    i = this.slidesGrid,
                    s = this.size,
                    a = this.activeIndex,
                    r = 1;
                if (e.centeredSlides) {
                    for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0));
                    for (var d = a - 1; d >= 0; d -= 1) t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0))
                } else
                    for (var h = a + 1; h < t.length; h += 1) i[h] - i[a] < s && (r += 1);
                return r
            }, t.prototype.update = function() {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid,
                        i = e.params;
                    i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }

                function s() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, t.prototype.changeDirection = function(e, t) {
                void 0 === t && (t = !0);
                var i = this.params.direction;
                return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e ? this : (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e), this.params.direction = e, this.slides.each((function(t, i) {
                    "vertical" === e ? i.style.width = "" : i.style.height = ""
                })), this.emit("changeDirection"), t && this.update(), this)
            }, t.prototype.init = function() {
                this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init"))
            }, t.prototype.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this,
                    s = i.params,
                    a = i.$el,
                    r = i.$wrapperEl,
                    o = i.slides;
                return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), o && o.length && o.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function(e) {
                    i.off(e)
                })), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), n.deleteProps(i)), i.destroyed = !0, null)
            }, t.extendDefaults = function(e) {
                n.extend(F, e)
            }, i.extendedDefaults.get = function() {
                return F
            }, i.defaults.get = function() {
                return V
            }, i.Class.get = function() {
                return e
            }, i.$.get = function() {
                return s
            }, Object.defineProperties(t, i), t
        }(l),
        R = {
            name: "device",
            proto: {
                device: I
            },
            static: {
                device: I
            }
        },
        q = {
            name: "support",
            proto: {
                support: o
            },
            static: {
                support: o
            }
        },
        j = {
            isEdge: !!t.navigator.userAgent.match(/Edge/g),
            isSafari: function() {
                var e = t.navigator.userAgent.toLowerCase();
                return e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0
            }(),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
        },
        K = {
            name: "browser",
            proto: {
                browser: j
            },
            static: {
                browser: j
            }
        },
        U = {
            name: "resize",
            create: function() {
                var e = this;
                n.extend(e, {
                    resize: {
                        resizeHandler: function() {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
                        },
                        orientationChangeHandler: function() {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange")
                        }
                    }
                })
            },
            on: {
                init: function() {
                    t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler)
                },
                destroy: function() {
                    t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler)
                }
            }
        },
        _ = {
            func: t.MutationObserver || t.WebkitMutationObserver,
            attach: function(e, i) {
                void 0 === i && (i = {});
                var s = this,
                    a = new(0, _.func)((function(e) {
                        if (1 !== e.length) {
                            var i = function() {
                                s.emit("observerUpdate", e[0])
                            };
                            t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
                        } else s.emit("observerUpdate", e[0])
                    }));
                a.observe(e, {
                    attributes: void 0 === i.attributes || i.attributes,
                    childList: void 0 === i.childList || i.childList,
                    characterData: void 0 === i.characterData || i.characterData
                }), s.observer.observers.push(a)
            },
            init: function() {
                if (o.observer && this.params.observer) {
                    if (this.params.observeParents)
                        for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], {
                        childList: this.params.observeSlideChildren
                    }), this.observer.attach(this.$wrapperEl[0], {
                        attributes: !1
                    })
                }
            },
            destroy: function() {
                this.observer.observers.forEach((function(e) {
                    e.disconnect()
                })), this.observer.observers = []
            }
        },
        Z = {
            name: "observer",
            params: {
                observer: !1,
                observeParents: !1,
                observeSlideChildren: !1
            },
            create: function() {
                n.extend(this, {
                    observer: {
                        init: _.init.bind(this),
                        attach: _.attach.bind(this),
                        destroy: _.destroy.bind(this),
                        observers: []
                    }
                })
            },
            on: {
                init: function() {
                    this.observer.init()
                },
                destroy: function() {
                    this.observer.destroy()
                }
            }
        },
        Q = {
            update: function(e) {
                var t = this,
                    i = t.params,
                    s = i.slidesPerView,
                    a = i.slidesPerGroup,
                    r = i.centeredSlides,
                    o = t.params.virtual,
                    l = o.addSlidesBefore,
                    d = o.addSlidesAfter,
                    h = t.virtual,
                    p = h.from,
                    c = h.to,
                    u = h.slides,
                    v = h.slidesGrid,
                    f = h.renderSlide,
                    m = h.offset;
                t.updateActiveIndex();
                var g, b, w, y = t.activeIndex || 0;
                g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (b = Math.floor(s / 2) + a + l, w = Math.floor(s / 2) + a + d) : (b = s + (a - 1) + l, w = a + d);
                var x = Math.max((y || 0) - w, 0),
                    T = Math.min((y || 0) + b, u.length - 1),
                    E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

                function S() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
                }
                if (n.extend(t.virtual, {
                        from: x,
                        to: T,
                        offset: E,
                        slidesGrid: t.slidesGrid
                    }), p === x && c === T && !e) return t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
                    offset: E,
                    from: x,
                    to: T,
                    slides: function() {
                        for (var e = [], t = x; t <= T; t += 1) e.push(u[t]);
                        return e
                    }()
                }), void S();
                var C = [],
                    M = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var P = p; P <= c; P += 1)(P < x || P > T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
                for (var z = 0; z < u.length; z += 1) z >= x && z <= T && (void 0 === c || e ? M.push(z) : (z > c && M.push(z), z < p && C.push(z)));
                M.forEach((function(e) {
                    t.$wrapperEl.append(f(u[e], e))
                })), C.sort((function(e, t) {
                    return t - e
                })).forEach((function(e) {
                    t.$wrapperEl.prepend(f(u[e], e))
                })), t.$wrapperEl.children(".swiper-slide").css(g, E + "px"), S()
            },
            renderSlide: function(e, t) {
                var i = this.params.virtual;
                if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
                var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a
            },
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]);
                else this.virtual.slides.push(e);
                this.virtual.update(!0)
            },
            prependSlide: function(e) {
                var t = this.activeIndex,
                    i = t + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var a = 0; a < e.length; a += 1) e[a] && this.virtual.slides.unshift(e[a]);
                    i = t + e.length, s = e.length
                } else this.virtual.slides.unshift(e);
                if (this.params.virtual.cache) {
                    var r = this.virtual.cache,
                        n = {};
                    Object.keys(r).forEach((function(e) {
                        var t = r[e],
                            i = t.attr("data-swiper-slide-index");
                        i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1), n[parseInt(e, 10) + s] = t
                    })), this.virtual.cache = n
                }
                this.virtual.update(!0), this.slideTo(i, 0)
            },
            removeSlide: function(e) {
                if (null != e) {
                    var t = this.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0);
                    else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
                    this.virtual.update(!0), this.slideTo(t, 0)
                }
            },
            removeAllSlides: function() {
                this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0)
            }
        },
        J = {
            name: "virtual",
            params: {
                virtual: {
                    enabled: !1,
                    slides: [],
                    cache: !0,
                    renderSlide: null,
                    renderExternal: null,
                    addSlidesBefore: 0,
                    addSlidesAfter: 0
                }
            },
            create: function() {
                n.extend(this, {
                    virtual: {
                        update: Q.update.bind(this),
                        appendSlide: Q.appendSlide.bind(this),
                        prependSlide: Q.prependSlide.bind(this),
                        removeSlide: Q.removeSlide.bind(this),
                        removeAllSlides: Q.removeAllSlides.bind(this),
                        renderSlide: Q.renderSlide.bind(this),
                        slides: this.params.virtual.slides,
                        cache: {}
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var e = {
                            watchSlidesProgress: !0
                        };
                        n.extend(this.params, e), n.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update()
                    }
                },
                setTranslate: function() {
                    this.params.virtual.enabled && this.virtual.update()
                }
            }
        },
        ee = {
            handle: function(i) {
                var s = this.rtlTranslate,
                    a = i;
                a.originalEvent && (a = a.originalEvent);
                var r = a.keyCode || a.charCode;
                if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r)) return !1;
                if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r)) return !1;
                if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                    if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
                        var n = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var o = t.innerWidth,
                            l = t.innerHeight,
                            d = this.$el.offset();
                        s && (d.left -= this.$el[0].scrollLeft);
                        for (var h = [
                                [d.left, d.top],
                                [d.left + this.width, d.top],
                                [d.left, d.top + this.height],
                                [d.left + this.width, d.top + this.height]
                            ], p = 0; p < h.length; p += 1) {
                            var c = h[p];
                            c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0)
                        }
                        if (!n) return
                    }
                    this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (34 !== r && 39 !== r || s) && (33 !== r && 37 !== r || !s) || this.slideNext(), (33 !== r && 37 !== r || s) && (34 !== r && 39 !== r || !s) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 34 !== r && 40 !== r || this.slideNext(), 33 !== r && 38 !== r || this.slidePrev()), this.emit("keyPress", r)
                }
            },
            enable: function() {
                this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0)
            },
            disable: function() {
                this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1)
            }
        },
        te = {
            name: "keyboard",
            params: {
                keyboard: {
                    enabled: !1,
                    onlyInViewport: !0
                }
            },
            create: function() {
                n.extend(this, {
                    keyboard: {
                        enabled: !1,
                        enable: ee.enable.bind(this),
                        disable: ee.disable.bind(this),
                        handle: ee.handle.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.keyboard.enabled && this.keyboard.enable()
                },
                destroy: function() {
                    this.keyboard.enabled && this.keyboard.disable()
                }
            }
        };
    var ie = {
            lastScrollTime: n.now(),
            lastEventBeforeSnap: void 0,
            recentWheelEvents: [],
            event: function() {
                return t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                    var t = "onwheel" in e;
                    if (!t) {
                        var i = e.createElement("div");
                        i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel
                    }
                    return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t
                }() ? "wheel" : "mousewheel"
            },
            normalize: function(e) {
                var t = 0,
                    i = 0,
                    s = 0,
                    a = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), e.shiftKey && !s && (s = a, a = 0), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), {
                    spinX: t,
                    spinY: i,
                    pixelX: s,
                    pixelY: a
                }
            },
            handleMouseEnter: function() {
                this.mouseEntered = !0
            },
            handleMouseLeave: function() {
                this.mouseEntered = !1
            },
            handle: function(e) {
                var t = e,
                    i = this,
                    a = i.params.mousewheel;
                i.params.cssMode && t.preventDefault();
                var r = i.$el;
                if ("container" !== i.params.mousewheel.eventsTarged && (r = s(i.params.mousewheel.eventsTarged)), !i.mouseEntered && !r[0].contains(t.target) && !a.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent);
                var o = 0,
                    l = i.rtlTranslate ? -1 : 1,
                    d = ie.normalize(t);
                if (a.forceToAxis)
                    if (i.isHorizontal()) {
                        if (!(Math.abs(d.pixelX) > Math.abs(d.pixelY))) return !0;
                        o = d.pixelX * l
                    } else {
                        if (!(Math.abs(d.pixelY) > Math.abs(d.pixelX))) return !0;
                        o = d.pixelY
                    }
                else o = Math.abs(d.pixelX) > Math.abs(d.pixelY) ? -d.pixelX * l : -d.pixelY;
                if (0 === o) return !0;
                if (a.invert && (o = -o), i.params.freeMode) {
                    var h = {
                            time: n.now(),
                            delta: Math.abs(o),
                            direction: Math.sign(o)
                        },
                        p = i.mousewheel.lastEventBeforeSnap,
                        c = p && h.time < p.time + 500 && h.delta <= p.delta && h.direction === p.direction;
                    if (!c) {
                        i.mousewheel.lastEventBeforeSnap = void 0, i.params.loop && i.loopFix();
                        var u = i.getTranslate() + o * a.sensitivity,
                            v = i.isBeginning,
                            f = i.isEnd;
                        if (u >= i.minTranslate() && (u = i.minTranslate()), u <= i.maxTranslate() && (u = i.maxTranslate()), i.setTransition(0), i.setTranslate(u), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!v && i.isBeginning || !f && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky) {
                            clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = void 0;
                            var m = i.mousewheel.recentWheelEvents;
                            m.length >= 15 && m.shift();
                            var g = m.length ? m[m.length - 1] : void 0,
                                b = m[0];
                            if (m.push(h), g && (h.delta > g.delta || h.direction !== g.direction)) m.splice(0);
                            else if (m.length >= 15 && h.time - b.time < 500 && b.delta - h.delta >= 1 && h.delta <= 6) {
                                var w = o > 0 ? .8 : .2;
                                i.mousewheel.lastEventBeforeSnap = h, m.splice(0), i.mousewheel.timeout = n.nextTick((function() {
                                    i.slideToClosest(i.params.speed, !0, void 0, w)
                                }), 0)
                            }
                            i.mousewheel.timeout || (i.mousewheel.timeout = n.nextTick((function() {
                                i.mousewheel.lastEventBeforeSnap = h, m.splice(0), i.slideToClosest(i.params.speed, !0, void 0, .5)
                            }), 500))
                        }
                        if (c || i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), u === i.minTranslate() || u === i.maxTranslate()) return !0
                    }
                } else {
                    var y = {
                            time: n.now(),
                            delta: Math.abs(o),
                            direction: Math.sign(o),
                            raw: e
                        },
                        x = i.mousewheel.recentWheelEvents;
                    x.length >= 2 && x.shift();
                    var T = x.length ? x[x.length - 1] : void 0;
                    if (x.push(y), T ? (y.direction !== T.direction || y.delta > T.delta) && i.mousewheel.animateSlider(y) : i.mousewheel.animateSlider(y), i.mousewheel.releaseScroll(y)) return !0
                }
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
            },
            animateSlider: function(e) {
                return e.delta >= 6 && n.now() - this.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(), this.emit("scroll", e.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(), this.emit("scroll", e.raw)), this.mousewheel.lastScrollTime = (new t.Date).getTime(), !1)
            },
            releaseScroll: function(e) {
                var t = this.params.mousewheel;
                if (e.direction < 0) {
                    if (this.isEnd && !this.params.loop && t.releaseOnEdges) return !0
                } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges) return !0;
                return !1
            },
            enable: function() {
                var e = ie.event();
                if (this.params.cssMode) return this.wrapperEl.removeEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (this.mousewheel.enabled) return !1;
                var t = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.on("mouseenter", this.mousewheel.handleMouseEnter), t.on("mouseleave", this.mousewheel.handleMouseLeave), t.on(e, this.mousewheel.handle), this.mousewheel.enabled = !0, !0
            },
            disable: function() {
                var e = ie.event();
                if (this.params.cssMode) return this.wrapperEl.addEventListener(e, this.mousewheel.handle), !0;
                if (!e) return !1;
                if (!this.mousewheel.enabled) return !1;
                var t = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (t = s(this.params.mousewheel.eventsTarged)), t.off(e, this.mousewheel.handle), this.mousewheel.enabled = !1, !0
            }
        },
        se = {
            update: function() {
                var e = this.params.navigation;
                if (!this.params.loop) {
                    var t = this.navigation,
                        i = t.$nextEl,
                        s = t.$prevEl;
                    s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
                }
            },
            onPrevClick: function(e) {
                e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev()
            },
            onNextClick: function(e) {
                e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext()
            },
            init: function() {
                var e, t, i = this.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = s(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = s(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), n.extend(this.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
            },
            destroy: function() {
                var e = this.navigation,
                    t = e.$nextEl,
                    i = e.$prevEl;
                t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass))
            }
        },
        ae = {
            update: function() {
                var e = this.rtl,
                    t = this.params.pagination;
                if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var i, a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        r = this.pagination.$el,
                        n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                    if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                        var o, l, d, h = this.pagination.bullets;
                        if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), r.length > 1) h.each((function(e, a) {
                            var r = s(a),
                                n = r.index();
                            n === i && r.addClass(t.bulletActiveClass), t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"), n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                        }));
                        else {
                            var p = h.eq(i),
                                c = p.index();
                            if (p.addClass(t.bulletActiveClass), t.dynamicBullets) {
                                for (var u = h.eq(o), v = h.eq(l), f = o; f <= l; f += 1) h.eq(f).addClass(t.bulletActiveClass + "-main");
                                if (this.params.loop)
                                    if (c >= h.length - t.dynamicMainBullets) {
                                        for (var m = t.dynamicMainBullets; m >= 0; m -= 1) h.eq(h.length - m).addClass(t.bulletActiveClass + "-main");
                                        h.eq(h.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev")
                                    } else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
                                else u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), v.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                            }
                        }
                        if (t.dynamicBullets) {
                            var g = Math.min(h.length, t.dynamicMainBullets + 4),
                                b = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                                w = e ? "right" : "left";
                            h.css(this.isHorizontal() ? w : "top", b + "px")
                        }
                    }
                    if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), r.find("." + t.totalClass).text(t.formatFractionTotal(n))), "progressbar" === t.type) {
                        var y;
                        y = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                        var x = (i + 1) / n,
                            T = 1,
                            E = 1;
                        "horizontal" === y ? T = x : E = x, r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + E + ")").transition(this.params.speed)
                    }
                    "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]), r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
                }
            },
            render: function() {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        i = this.pagination.$el,
                        s = "";
                    if ("bullets" === e.type) {
                        for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1) e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                        i.html(s), this.pagination.bullets = i.find("." + e.bulletClass)
                    }
                    "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
                }
            },
            init: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el) {
                    var i = s(t.el);
                    0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, (function(t) {
                        t.preventDefault();
                        var i = s(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (i += e.loopedSlides), e.slideTo(i)
                    })), n.extend(e.pagination, {
                        $el: i,
                        el: i[0]
                    }))
                }
            },
            destroy: function() {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.pagination.$el;
                    t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
                }
            }
        },
        re = {
            setTranslate: function() {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.rtlTranslate,
                        i = this.progress,
                        s = e.dragSize,
                        a = e.trackSize,
                        r = e.$dragEl,
                        n = e.$el,
                        o = this.params.scrollbar,
                        l = s,
                        d = (a - s) * i;
                    t ? (d = -d) > 0 ? (l = s - d, d = 0) : -d + s > a && (l = a + d) : d < 0 ? (l = s + d, d = 0) : d + s > a && (l = a - d), this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"), r[0].style.width = l + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout((function() {
                        n[0].style.opacity = 0, n.transition(400)
                    }), 1e3))
                }
            },
            setTransition: function(e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
            },
            updateSize: function() {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = e.$dragEl,
                        i = e.$el;
                    t[0].style.width = "", t[0].style.height = "";
                    var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        r = this.size / this.virtualSize,
                        o = r * (a / this.size);
                    s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), n.extend(e, {
                        trackSize: a,
                        divider: r,
                        moveDivider: o,
                        dragSize: s
                    }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
                }
            },
            getPointerPosition: function(e) {
                return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
            },
            setDragPosition: function(e) {
                var t, i = this.scrollbar,
                    s = this.rtlTranslate,
                    a = i.$el,
                    r = i.dragSize,
                    n = i.trackSize,
                    o = i.dragStartPos;
                t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
                this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    a = i.$el,
                    r = i.$dragEl;
                this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"), this.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this.scrollbar,
                    i = this.$wrapperEl,
                    s = t.$el,
                    a = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    a = i.$el;
                this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = n.nextTick((function() {
                    a.css("opacity", 0), a.transition(400)
                }), 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest())
            },
            enableDraggable: function() {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!o.passiveListener || !a.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        l = !(!o.passiveListener || !a.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    o.touch ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, l))
                }
            },
            disableDraggable: function() {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!o.passiveListener || !a.passiveListeners) && {
                            passive: !1,
                            capture: !1
                        },
                        l = !(!o.passiveListener || !a.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                    o.touch ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, l)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, l))
                }
            },
            init: function() {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.$el,
                        i = this.params.scrollbar,
                        a = s(i.el);
                    this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
                    var r = a.find("." + this.params.scrollbar.dragClass);
                    0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'), a.append(r)), n.extend(e, {
                        $el: a,
                        el: a[0],
                        $dragEl: r,
                        dragEl: r[0]
                    }), i.draggable && e.enableDraggable()
                }
            },
            destroy: function() {
                this.scrollbar.disableDraggable()
            }
        },
        ne = {
            setTransform: function(e, t) {
                var i = this.rtl,
                    a = s(e),
                    r = i ? -1 : 1,
                    n = a.attr("data-swiper-parallax") || "0",
                    o = a.attr("data-swiper-parallax-x"),
                    l = a.attr("data-swiper-parallax-y"),
                    d = a.attr("data-swiper-parallax-scale"),
                    h = a.attr("data-swiper-parallax-opacity");
                if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = n, l = "0") : (l = n, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != h) {
                    var p = h - (h - 1) * (1 - Math.abs(t));
                    a[0].style.opacity = p
                }
                if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)");
                else {
                    var c = d - (d - 1) * (1 - Math.abs(t));
                    a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")")
                }
            },
            setTranslate: function() {
                var e = this,
                    t = e.$el,
                    i = e.slides,
                    a = e.progress,
                    r = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                    e.parallax.setTransform(i, a)
                })), i.each((function(t, i) {
                    var n = i.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                        e.parallax.setTransform(i, n)
                    }))
                }))
            },
            setTransition: function(e) {
                void 0 === e && (e = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t, i) {
                    var a = s(i),
                        r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (r = 0), a.transition(r)
                }))
            }
        },
        oe = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY,
                    s = e.targetTouches[1].pageX,
                    a = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
            },
            onGestureStart: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    a = i.gesture;
                if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !o.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, a.scaleStart = oe.getDistanceBetweenTouches(e)
                }
                a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest("." + this.params.slideClass), 0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), this.zoom.isScaling = !0) : a.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!o.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureMoved = !0, s.scaleMove = oe.getDistanceBetweenTouches(e)
                }
                s.$imageEl && 0 !== s.$imageEl.length && (o.gestures ? i.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
            },
            onGestureEnd: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!o.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !I.android) return;
                    i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
                }
                s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image;
                i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (I.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function(e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image,
                    a = t.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = n.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = n.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var r = s.width * t.scale,
                        o = s.height * t.scale;
                    if (!(r < i.slideWidth && o < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - o / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) {
                            if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
                            if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
                        }
                        e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    s = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1;
                    var a = 300,
                        r = 300,
                        n = s.x * a,
                        o = i.currentX + n,
                        l = s.y * r,
                        d = i.currentY + l;
                    0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                    var h = Math.max(a, r);
                    i.currentX = o, i.currentY = d;
                    var p = i.width * e.scale,
                        c = i.height * e.scale;
                    i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - c / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function(e) {
                var t, i, s, a, r, n, o, l, d, h, p, c, u, v, f, m, g = this.zoom,
                    b = this.params.zoom,
                    w = g.gesture,
                    y = g.image;
                (w.$slideEl || (w.$slideEl = this.slides.eq(this.activeIndex), w.$imageEl = w.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), w.$imageWrapEl = w.$imageEl.parent("." + b.containerClass)), w.$imageEl && 0 !== w.$imageEl.length) && (w.$slideEl.addClass("" + b.zoomedSlideClass), void 0 === y.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = y.touchesStart.x, i = y.touchesStart.y), g.scale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, g.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, e ? (f = w.$slideEl[0].offsetWidth, m = w.$slideEl[0].offsetHeight, s = w.$slideEl.offset().left + f / 2 - t, a = w.$slideEl.offset().top + m / 2 - i, o = w.$imageEl[0].offsetWidth, l = w.$imageEl[0].offsetHeight, d = o * g.scale, h = l * g.scale, u = -(p = Math.min(f / 2 - d / 2, 0)), v = -(c = Math.min(m / 2 - h / 2, 0)), (r = s * g.scale) < p && (r = p), r > u && (r = u), (n = a * g.scale) < c && (n = c), n > v && (n = v)) : (r = 0, n = 0), w.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + g.scale + ")"))
            },
            out: function() {
                var e = this.zoom,
                    t = this.params.zoom,
                    i = e.gesture;
                i.$slideEl || (i.$slideEl = this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
            },
            enable: function() {
                var e = this.zoom;
                if (!e.enabled) {
                    e.enabled = !0;
                    var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        i = !o.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        s = "." + this.params.slideClass;
                    o.gestures ? (this.$wrapperEl.on("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.on("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.on("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.on(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
                }
            },
            disable: function() {
                var e = this.zoom;
                if (e.enabled) {
                    this.zoom.enabled = !1;
                    var t = !("touchstart" !== this.touchEvents.start || !o.passiveListener || !this.params.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        },
                        i = !o.passiveListener || {
                            passive: !1,
                            capture: !0
                        },
                        s = "." + this.params.slideClass;
                    o.gestures ? (this.$wrapperEl.off("gesturestart", s, e.onGestureStart, t), this.$wrapperEl.off("gesturechange", s, e.onGestureChange, t), this.$wrapperEl.off("gestureend", s, e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, s, e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, s, e.onGestureChange, i), this.$wrapperEl.off(this.touchEvents.end, s, e.onGestureEnd, t), this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, s, e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, i)
                }
            }
        },
        le = {
            loadInSlide: function(e, t) {
                void 0 === t && (t = !0);
                var i = this,
                    a = i.params.lazy;
                if (void 0 !== e && 0 !== i.slides.length) {
                    var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                        n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                    !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])), 0 !== n.length && n.each((function(e, n) {
                        var o = s(n);
                        o.addClass(a.loadingClass);
                        var l = o.attr("data-background"),
                            d = o.attr("data-src"),
                            h = o.attr("data-srcset"),
                            p = o.attr("data-sizes");
                        i.loadImage(o[0], d || l, h, p, !1, (function() {
                            if (null != i && i && (!i || i.params) && !i.destroyed) {
                                if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), r.find("." + a.preloaderClass).remove(), i.params.loop && t) {
                                    var e = r.attr("data-swiper-slide-index");
                                    if (r.hasClass(i.params.slideDuplicateClass)) {
                                        var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                        i.lazy.loadInSlide(s.index(), !1)
                                    } else {
                                        var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        i.lazy.loadInSlide(n.index(), !1)
                                    }
                                }
                                i.emit("lazyImageReady", r[0], o[0]), i.params.autoHeight && i.updateAutoHeight()
                            }
                        })), i.emit("lazyImageLoad", r[0], o[0])
                    }))
                }
            },
            load: function() {
                var e = this,
                    t = e.$wrapperEl,
                    i = e.params,
                    a = e.slides,
                    r = e.activeIndex,
                    n = e.virtual && i.virtual.enabled,
                    o = i.lazy,
                    l = i.slidesPerView;

                function d(e) {
                    if (n) {
                        if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
                    } else if (a[e]) return !0;
                    return !1
                }

                function h(e) {
                    return n ? s(e).attr("data-swiper-slide-index") : s(e).index()
                }
                if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each((function(t, i) {
                    var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
                    e.lazy.loadInSlide(a)
                }));
                else if (l > 1)
                    for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p);
                else e.lazy.loadInSlide(r);
                if (o.loadPrevNext)
                    if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) {
                        for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1) d(m) && e.lazy.loadInSlide(m);
                        for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g)
                    } else {
                        var b = t.children("." + i.slideNextClass);
                        b.length > 0 && e.lazy.loadInSlide(h(b));
                        var w = t.children("." + i.slidePrevClass);
                        w.length > 0 && e.lazy.loadInSlide(h(w))
                    }
            }
        },
        de = {
            LinearSpline: function(e, t) {
                var i, s, a, r, n, o = function(e, t) {
                    for (s = -1, i = e.length; i - s > 1;) e[a = i + s >> 1] <= t ? s = a : i = a;
                    return i
                };
                return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
                    return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                }, this
            },
            getInterpolateFunction: function(e) {
                this.controller.spline || (this.controller.spline = this.params.loop ? new de.LinearSpline(this.slidesGrid, e.slidesGrid) : new de.LinearSpline(this.snapGrid, e.snapGrid))
            },
            setTranslate: function(e, t) {
                var i, s, a = this,
                    r = a.controller.control;

                function n(e) {
                    var t = a.rtlTranslate ? -a.translate : a.translate;
                    "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses()
                }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof W && n(r[o]);
                else r instanceof W && t !== r && n(r)
            },
            setTransition: function(e, t) {
                var i, s = this,
                    a = s.controller.control;

                function r(t) {
                    t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.params.autoHeight && n.nextTick((function() {
                        t.updateAutoHeight()
                    })), t.$wrapperEl.transitionEnd((function() {
                        a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd())
                    })))
                }
                if (Array.isArray(a))
                    for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof W && r(a[i]);
                else a instanceof W && t !== a && r(a)
            }
        },
        he = {
            makeElFocusable: function(e) {
                return e.attr("tabIndex", "0"), e
            },
            addElRole: function(e, t) {
                return e.attr("role", t), e
            },
            addElLabel: function(e, t) {
                return e.attr("aria-label", t), e
            },
            disableEl: function(e) {
                return e.attr("aria-disabled", !0), e
            },
            enableEl: function(e) {
                return e.attr("aria-disabled", !1), e
            },
            onEnterKey: function(e) {
                var t = this.params.a11y;
                if (13 === e.keyCode) {
                    var i = s(e.target);
                    this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
                }
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                if (!this.params.loop && this.navigation) {
                    var e = this.navigation,
                        t = e.$nextEl,
                        i = e.$prevEl;
                    i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
                }
            },
            updatePagination: function() {
                var e = this,
                    t = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function(i, a) {
                    var r = s(a);
                    e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
                }))
            },
            init: function() {
                this.$el.append(this.a11y.liveRegion);
                var e, t, i = this.params.a11y;
                this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t;
                this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            }
        },
        pe = {
            init: function() {
                if (this.params.history) {
                    if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void(this.params.hashNavigation.enabled = !0);
                    var e = this.history;
                    e.initialized = !0, e.paths = pe.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
                }
            },
            destroy: function() {
                this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState)
            },
            setHistoryPopState: function() {
                this.history.paths = pe.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
            },
            getPathValues: function() {
                var e = t.location.pathname.slice(1).split("/").filter((function(e) {
                        return "" !== e
                    })),
                    i = e.length;
                return {
                    key: e[i - 2],
                    value: e[i - 1]
                }
            },
            setHistory: function(e, i) {
                if (this.history.initialized && this.params.history.enabled) {
                    var s = this.slides.eq(i),
                        a = pe.slugify(s.attr("data-history"));
                    t.location.pathname.includes(e) || (a = e + "/" + a);
                    var r = t.history.state;
                    r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({
                        value: a
                    }, null, a) : t.history.pushState({
                        value: a
                    }, null, a))
                }
            },
            slugify: function(e) {
                return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
            },
            scrollToSlide: function(e, t, i) {
                if (t)
                    for (var s = 0, a = this.slides.length; s < a; s += 1) {
                        var r = this.slides.eq(s);
                        if (pe.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                            var n = r.index();
                            this.slideTo(n, e, i)
                        }
                    } else this.slideTo(0, e, i)
            }
        },
        ce = {
            onHashCange: function() {
                var t = e.location.hash.replace("#", "");
                if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                    var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                    if (void 0 === i) return;
                    this.slideTo(i)
                }
            },
            setHash: function() {
                if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                    if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || "");
                    else {
                        var i = this.slides.eq(this.activeIndex),
                            s = i.attr("data-hash") || i.attr("data-history");
                        e.location.hash = s || ""
                    }
            },
            init: function() {
                if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                    this.hashNavigation.initialized = !0;
                    var i = e.location.hash.replace("#", "");
                    if (i)
                        for (var a = 0, r = this.slides.length; a < r; a += 1) {
                            var n = this.slides.eq(a);
                            if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                                var o = n.index();
                                this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                            }
                        }
                    this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange)
                }
            },
            destroy: function() {
                this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange)
            }
        },
        ue = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = n.nextTick((function() {
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), e.params.cssMode && e.autoplay.running && e.autoplay.run()
                }), i)
            },
            start: function() {
                return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0))
            },
            stop: function() {
                return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0))
            },
            pause: function(e) {
                this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run())))
            }
        },
        ve = {
            setTranslate: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1) {
                    var i = this.slides.eq(t),
                        s = -i[0].swiperSlideOffset;
                    this.params.virtualTranslate || (s -= this.translate);
                    var a = 0;
                    this.isHorizontal() || (a = s, s = 0);
                    var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({
                        opacity: r
                    }).transform("translate3d(" + s + "px, " + a + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    i = t.slides,
                    s = t.$wrapperEl;
                if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                    var a = !1;
                    i.transitionEnd((function() {
                        if (!a && t && !t.destroyed) {
                            a = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i])
                        }
                    }))
                }
            }
        },
        fe = {
            setTranslate: function() {
                var e, t = this.$el,
                    i = this.$wrapperEl,
                    a = this.slides,
                    r = this.width,
                    n = this.height,
                    o = this.rtlTranslate,
                    l = this.size,
                    d = this.params.cubeEffect,
                    h = this.isHorizontal(),
                    p = this.virtual && this.params.virtual.enabled,
                    c = 0;
                d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
                    height: r + "px"
                })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), t.append(e)));
                for (var u = 0; u < a.length; u += 1) {
                    var v = a.eq(u),
                        f = u;
                    p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                    var m = 90 * f,
                        g = Math.floor(m / 360);
                    o && (m = -m, g = Math.floor(-m / 360));
                    var b = Math.max(Math.min(v[0].progress, 1), -1),
                        w = 0,
                        y = 0,
                        x = 0;
                    f % 4 == 0 ? (w = 4 * -g * l, x = 0) : (f - 1) % 4 == 0 ? (w = 0, x = 4 * -g * l) : (f - 2) % 4 == 0 ? (w = l + 4 * g * l, x = l) : (f - 3) % 4 == 0 && (w = -l, x = 3 * l + 4 * l * g), o && (w = -w), h || (y = w, w = 0);
                    var T = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                    if (b <= 1 && b > -1 && (c = 90 * f + 90 * b, o && (c = 90 * -f - 90 * b)), v.transform(T), d.slideShadows) {
                        var E = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), v.append(E)), 0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), v.append(S)), E.length && (E[0].style.opacity = Math.max(-b, 0)), S.length && (S[0].style.opacity = Math.max(b, 0))
                    }
                }
                if (i.css({
                        "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                        "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                        "transform-origin": "50% 50% -" + l / 2 + "px"
                    }), d.shadow)
                    if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var C = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
                            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                            P = d.shadowScale,
                            z = d.shadowScale / M,
                            k = d.shadowOffset;
                        e.transform("scale3d(" + P + ", 1, " + z + ") translate3d(0px, " + (n / 2 + k) + "px, " + -n / 2 / z + "px) rotateX(-90deg)")
                    }
                var $ = j.isSafari || j.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + $ + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        },
        me = {
            setTranslate: function() {
                for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                    var a = e.eq(i),
                        r = a[0].progress;
                    this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -a[0].swiperSlideOffset,
                        d = 0;
                    if (this.isHorizontal() ? t && (n = -n) : (d = l, l = 0, o = -n, n = 0), a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length, this.params.flipEffect.slideShadows) {
                        var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                            p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                        0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), a.append(h)), 0 === p.length && (p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(p)), h.length && (h[0].style.opacity = Math.max(-r, 0)), p.length && (p[0].style.opacity = Math.max(r, 0))
                    }
                    a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    i = t.slides,
                    s = t.activeIndex,
                    a = t.$wrapperEl;
                if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    i.eq(s).transitionEnd((function() {
                        if (!r && t && !t.destroyed) {
                            r = !0, t.animating = !1;
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i])
                        }
                    }))
                }
            }
        },
        ge = {
            setTranslate: function() {
                for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, l = this.isHorizontal(), d = this.translate, h = l ? e / 2 - d : t / 2 - d, p = l ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) {
                    var f = i.eq(u),
                        m = r[u],
                        g = (h - f[0].swiperSlideOffset - m / 2) / m * n.modifier,
                        b = l ? p * g : 0,
                        w = l ? 0 : p * g,
                        y = -c * Math.abs(g),
                        x = n.stretch;
                    "string" == typeof x && -1 !== x.indexOf("%") && (x = parseFloat(n.stretch) / 100 * m);
                    var T = l ? 0 : x * g,
                        E = l ? x * g : 0;
                    Math.abs(E) < .001 && (E = 0), Math.abs(T) < .001 && (T = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0), Math.abs(w) < .001 && (w = 0);
                    var S = "translate3d(" + E + "px," + T + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
                    if (f.transform(S), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), n.slideShadows) {
                        var C = l ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            M = l ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (l ? "left" : "top") + '"></div>'), f.append(C)), 0 === M.length && (M = s('<div class="swiper-slide-shadow-' + (l ? "right" : "bottom") + '"></div>'), f.append(M)), C.length && (C[0].style.opacity = g > 0 ? g : 0), M.length && (M[0].style.opacity = -g > 0 ? -g : 0)
                    }
                }(o.pointerEvents || o.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%")
            },
            setTransition: function(e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
            }
        },
        be = {
            init: function() {
                var e = this.params.thumbs,
                    t = this.constructor;
                e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, n.extend(this.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }), n.extend(this.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : n.isObject(e.swiper) && (this.thumbs.swiper = new t(n.extend({}, e.swiper, {
                    watchSlidesVisibility: !0,
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
            },
            onThumbClick: function() {
                var e = this.thumbs.swiper;
                if (e) {
                    var t = e.clickedIndex,
                        i = e.clickedSlide;
                    if (!(i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
                        var a;
                        if (a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) {
                            var r = this.activeIndex;
                            this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, r = this.activeIndex);
                            var n = this.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(),
                                o = this.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
                            a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                        }
                        this.slideTo(a)
                    }
                }
            },
            update: function(e) {
                var t = this.thumbs.swiper;
                if (t) {
                    var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
                    if (this.realIndex !== t.realIndex) {
                        var s, a = t.activeIndex;
                        if (t.params.loop) {
                            t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, a = t.activeIndex);
                            var r = t.slides.eq(a).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
                                n = t.slides.eq(a).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                            s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r
                        } else s = this.realIndex;
                        t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(s) < 0 && (t.params.centeredSlides ? s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > a && (s = s - i + 1), t.slideTo(s, e ? 0 : void 0))
                    }
                    var o = 1,
                        l = this.params.thumbs.slideThumbActiveClass;
                    if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView), this.params.thumbs.multipleActiveThumbs || (o = 1), o = Math.floor(o), t.slides.removeClass(l), t.params.loop || t.params.virtual && t.params.virtual.enabled)
                        for (var d = 0; d < o; d += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l);
                    else
                        for (var h = 0; h < o; h += 1) t.slides.eq(this.realIndex + h).addClass(l)
                }
            }
        },
        we = [R, q, K, U, Z, J, te, {
            name: "mousewheel",
            params: {
                mousewheel: {
                    enabled: !1,
                    releaseOnEdges: !1,
                    invert: !1,
                    forceToAxis: !1,
                    sensitivity: 1,
                    eventsTarged: "container"
                }
            },
            create: function() {
                n.extend(this, {
                    mousewheel: {
                        enabled: !1,
                        enable: ie.enable.bind(this),
                        disable: ie.disable.bind(this),
                        handle: ie.handle.bind(this),
                        handleMouseEnter: ie.handleMouseEnter.bind(this),
                        handleMouseLeave: ie.handleMouseLeave.bind(this),
                        animateSlider: ie.animateSlider.bind(this),
                        releaseScroll: ie.releaseScroll.bind(this),
                        lastScrollTime: n.now(),
                        lastEventBeforeSnap: void 0,
                        recentWheelEvents: []
                    }
                })
            },
            on: {
                init: function() {
                    !this.params.mousewheel.enabled && this.params.cssMode && this.mousewheel.disable(), this.params.mousewheel.enabled && this.mousewheel.enable()
                },
                destroy: function() {
                    this.params.cssMode && this.mousewheel.enable(), this.mousewheel.enabled && this.mousewheel.disable()
                }
            }
        }, {
            name: "navigation",
            params: {
                navigation: {
                    nextEl: null,
                    prevEl: null,
                    hideOnClick: !1,
                    disabledClass: "swiper-button-disabled",
                    hiddenClass: "swiper-button-hidden",
                    lockClass: "swiper-button-lock"
                }
            },
            create: function() {
                n.extend(this, {
                    navigation: {
                        init: se.init.bind(this),
                        update: se.update.bind(this),
                        destroy: se.destroy.bind(this),
                        onNextClick: se.onNextClick.bind(this),
                        onPrevClick: se.onPrevClick.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.navigation.init(), this.navigation.update()
                },
                toEdge: function() {
                    this.navigation.update()
                },
                fromEdge: function() {
                    this.navigation.update()
                },
                destroy: function() {
                    this.navigation.destroy()
                },
                click: function(e) {
                    var t, i = this.navigation,
                        a = i.$nextEl,
                        r = i.$prevEl;
                    !this.params.navigation.hideOnClick || s(e.target).is(r) || s(e.target).is(a) || (a ? t = a.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), a && a.toggleClass(this.params.navigation.hiddenClass), r && r.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, {
            name: "pagination",
            params: {
                pagination: {
                    el: null,
                    bulletElement: "span",
                    clickable: !1,
                    hideOnClick: !1,
                    renderBullet: null,
                    renderProgressbar: null,
                    renderFraction: null,
                    renderCustom: null,
                    progressbarOpposite: !1,
                    type: "bullets",
                    dynamicBullets: !1,
                    dynamicMainBullets: 1,
                    formatFractionCurrent: function(e) {
                        return e
                    },
                    formatFractionTotal: function(e) {
                        return e
                    },
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                    modifierClass: "swiper-pagination-",
                    currentClass: "swiper-pagination-current",
                    totalClass: "swiper-pagination-total",
                    hiddenClass: "swiper-pagination-hidden",
                    progressbarFillClass: "swiper-pagination-progressbar-fill",
                    progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                    clickableClass: "swiper-pagination-clickable",
                    lockClass: "swiper-pagination-lock"
                }
            },
            create: function() {
                n.extend(this, {
                    pagination: {
                        init: ae.init.bind(this),
                        render: ae.render.bind(this),
                        update: ae.update.bind(this),
                        destroy: ae.destroy.bind(this),
                        dynamicBulletIndex: 0
                    }
                })
            },
            on: {
                init: function() {
                    this.pagination.init(), this.pagination.render(), this.pagination.update()
                },
                activeIndexChange: function() {
                    this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update()
                },
                snapIndexChange: function() {
                    this.params.loop || this.pagination.update()
                },
                slidesLengthChange: function() {
                    this.params.loop && (this.pagination.render(), this.pagination.update())
                },
                snapGridLengthChange: function() {
                    this.params.loop || (this.pagination.render(), this.pagination.update())
                },
                destroy: function() {
                    this.pagination.destroy()
                },
                click: function(e) {
                    this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass))
                }
            }
        }, {
            name: "scrollbar",
            params: {
                scrollbar: {
                    el: null,
                    dragSize: "auto",
                    hide: !1,
                    draggable: !1,
                    snapOnRelease: !0,
                    lockClass: "swiper-scrollbar-lock",
                    dragClass: "swiper-scrollbar-drag"
                }
            },
            create: function() {
                n.extend(this, {
                    scrollbar: {
                        init: re.init.bind(this),
                        destroy: re.destroy.bind(this),
                        updateSize: re.updateSize.bind(this),
                        setTranslate: re.setTranslate.bind(this),
                        setTransition: re.setTransition.bind(this),
                        enableDraggable: re.enableDraggable.bind(this),
                        disableDraggable: re.disableDraggable.bind(this),
                        setDragPosition: re.setDragPosition.bind(this),
                        getPointerPosition: re.getPointerPosition.bind(this),
                        onDragStart: re.onDragStart.bind(this),
                        onDragMove: re.onDragMove.bind(this),
                        onDragEnd: re.onDragEnd.bind(this),
                        isTouched: !1,
                        timeout: null,
                        dragTimeout: null
                    }
                })
            },
            on: {
                init: function() {
                    this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate()
                },
                update: function() {
                    this.scrollbar.updateSize()
                },
                resize: function() {
                    this.scrollbar.updateSize()
                },
                observerUpdate: function() {
                    this.scrollbar.updateSize()
                },
                setTranslate: function() {
                    this.scrollbar.setTranslate()
                },
                setTransition: function(e) {
                    this.scrollbar.setTransition(e)
                },
                destroy: function() {
                    this.scrollbar.destroy()
                }
            }
        }, {
            name: "parallax",
            params: {
                parallax: {
                    enabled: !1
                }
            },
            create: function() {
                n.extend(this, {
                    parallax: {
                        setTransform: ne.setTransform.bind(this),
                        setTranslate: ne.setTranslate.bind(this),
                        setTransition: ne.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
                },
                init: function() {
                    this.params.parallax.enabled && this.parallax.setTranslate()
                },
                setTranslate: function() {
                    this.params.parallax.enabled && this.parallax.setTranslate()
                },
                setTransition: function(e) {
                    this.params.parallax.enabled && this.parallax.setTransition(e)
                }
            }
        }, {
            name: "zoom",
            params: {
                zoom: {
                    enabled: !1,
                    maxRatio: 3,
                    minRatio: 1,
                    toggle: !0,
                    containerClass: "swiper-zoom-container",
                    zoomedSlideClass: "swiper-slide-zoomed"
                }
            },
            create: function() {
                var e = this,
                    t = {
                        enabled: !1,
                        scale: 1,
                        currentScale: 1,
                        isScaling: !1,
                        gesture: {
                            $slideEl: void 0,
                            slideWidth: void 0,
                            slideHeight: void 0,
                            $imageEl: void 0,
                            $imageWrapEl: void 0,
                            maxRatio: 3
                        },
                        image: {
                            isTouched: void 0,
                            isMoved: void 0,
                            currentX: void 0,
                            currentY: void 0,
                            minX: void 0,
                            minY: void 0,
                            maxX: void 0,
                            maxY: void 0,
                            width: void 0,
                            height: void 0,
                            startX: void 0,
                            startY: void 0,
                            touchesStart: {},
                            touchesCurrent: {}
                        },
                        velocity: {
                            x: void 0,
                            y: void 0,
                            prevPositionX: void 0,
                            prevPositionY: void 0,
                            prevTime: void 0
                        }
                    };
                "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach((function(i) {
                    t[i] = oe[i].bind(e)
                })), n.extend(e, {
                    zoom: t
                });
                var i = 1;
                Object.defineProperty(e.zoom, "scale", {
                    get: function() {
                        return i
                    },
                    set: function(t) {
                        if (i !== t) {
                            var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                            e.emit("zoomChange", t, s, a)
                        }
                        i = t
                    }
                })
            },
            on: {
                init: function() {
                    this.params.zoom.enabled && this.zoom.enable()
                },
                destroy: function() {
                    this.zoom.disable()
                },
                touchStart: function(e) {
                    this.zoom.enabled && this.zoom.onTouchStart(e)
                },
                touchEnd: function(e) {
                    this.zoom.enabled && this.zoom.onTouchEnd(e)
                },
                doubleTap: function(e) {
                    this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e)
                },
                transitionEnd: function() {
                    this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd()
                },
                slideChange: function() {
                    this.zoom.enabled && this.params.zoom.enabled && this.params.cssMode && this.zoom.onTransitionEnd()
                }
            }
        }, {
            name: "lazy",
            params: {
                lazy: {
                    enabled: !1,
                    loadPrevNext: !1,
                    loadPrevNextAmount: 1,
                    loadOnTransitionStart: !1,
                    elementClass: "swiper-lazy",
                    loadingClass: "swiper-lazy-loading",
                    loadedClass: "swiper-lazy-loaded",
                    preloaderClass: "swiper-lazy-preloader"
                }
            },
            create: function() {
                n.extend(this, {
                    lazy: {
                        initialImageLoaded: !1,
                        load: le.load.bind(this),
                        loadInSlide: le.loadInSlide.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1)
                },
                init: function() {
                    this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load()
                },
                scroll: function() {
                    this.params.freeMode && !this.params.freeModeSticky && this.lazy.load()
                },
                resize: function() {
                    this.params.lazy.enabled && this.lazy.load()
                },
                scrollbarDragMove: function() {
                    this.params.lazy.enabled && this.lazy.load()
                },
                transitionStart: function() {
                    this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load()
                },
                transitionEnd: function() {
                    this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load()
                },
                slideChange: function() {
                    this.params.lazy.enabled && this.params.cssMode && this.lazy.load()
                }
            }
        }, {
            name: "controller",
            params: {
                controller: {
                    control: void 0,
                    inverse: !1,
                    by: "slide"
                }
            },
            create: function() {
                n.extend(this, {
                    controller: {
                        control: this.params.controller.control,
                        getInterpolateFunction: de.getInterpolateFunction.bind(this),
                        setTranslate: de.setTranslate.bind(this),
                        setTransition: de.setTransition.bind(this)
                    }
                })
            },
            on: {
                update: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                resize: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                observerUpdate: function() {
                    this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline)
                },
                setTranslate: function(e, t) {
                    this.controller.control && this.controller.setTranslate(e, t)
                },
                setTransition: function(e, t) {
                    this.controller.control && this.controller.setTransition(e, t)
                }
            }
        }, {
            name: "a11y",
            params: {
                a11y: {
                    enabled: !0,
                    notificationClass: "swiper-notification",
                    prevSlideMessage: "Previous slide",
                    nextSlideMessage: "Next slide",
                    firstSlideMessage: "This is the first slide",
                    lastSlideMessage: "This is the last slide",
                    paginationBulletMessage: "Go to slide {{index}}"
                }
            },
            create: function() {
                var e = this;
                n.extend(e, {
                    a11y: {
                        liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                    }
                }), Object.keys(he).forEach((function(t) {
                    e.a11y[t] = he[t].bind(e)
                }))
            },
            on: {
                init: function() {
                    this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation())
                },
                toEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                fromEdge: function() {
                    this.params.a11y.enabled && this.a11y.updateNavigation()
                },
                paginationUpdate: function() {
                    this.params.a11y.enabled && this.a11y.updatePagination()
                },
                destroy: function() {
                    this.params.a11y.enabled && this.a11y.destroy()
                }
            }
        }, {
            name: "history",
            params: {
                history: {
                    enabled: !1,
                    replaceState: !1,
                    key: "slides"
                }
            },
            create: function() {
                n.extend(this, {
                    history: {
                        init: pe.init.bind(this),
                        setHistory: pe.setHistory.bind(this),
                        setHistoryPopState: pe.setHistoryPopState.bind(this),
                        scrollToSlide: pe.scrollToSlide.bind(this),
                        destroy: pe.destroy.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.history.enabled && this.history.init()
                },
                destroy: function() {
                    this.params.history.enabled && this.history.destroy()
                },
                transitionEnd: function() {
                    this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex)
                },
                slideChange: function() {
                    this.history.initialized && this.params.cssMode && this.history.setHistory(this.params.history.key, this.activeIndex)
                }
            }
        }, {
            name: "hash-navigation",
            params: {
                hashNavigation: {
                    enabled: !1,
                    replaceState: !1,
                    watchState: !1
                }
            },
            create: function() {
                n.extend(this, {
                    hashNavigation: {
                        initialized: !1,
                        init: ce.init.bind(this),
                        destroy: ce.destroy.bind(this),
                        setHash: ce.setHash.bind(this),
                        onHashCange: ce.onHashCange.bind(this)
                    }
                })
            },
            on: {
                init: function() {
                    this.params.hashNavigation.enabled && this.hashNavigation.init()
                },
                destroy: function() {
                    this.params.hashNavigation.enabled && this.hashNavigation.destroy()
                },
                transitionEnd: function() {
                    this.hashNavigation.initialized && this.hashNavigation.setHash()
                },
                slideChange: function() {
                    this.hashNavigation.initialized && this.params.cssMode && this.hashNavigation.setHash()
                }
            }
        }, {
            name: "autoplay",
            params: {
                autoplay: {
                    enabled: !1,
                    delay: 3e3,
                    waitForTransition: !0,
                    disableOnInteraction: !0,
                    stopOnLastSlide: !1,
                    reverseDirection: !1
                }
            },
            create: function() {
                var e = this;
                n.extend(e, {
                    autoplay: {
                        running: !1,
                        paused: !1,
                        run: ue.run.bind(e),
                        start: ue.start.bind(e),
                        stop: ue.stop.bind(e),
                        pause: ue.pause.bind(e),
                        onVisibilityChange: function() {
                            "hidden" === document.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === document.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
                        },
                        onTransitionEnd: function(t) {
                            e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop())
                        }
                    }
                })
            },
            on: {
                init: function() {
                    this.params.autoplay.enabled && (this.autoplay.start(), document.addEventListener("visibilitychange", this.autoplay.onVisibilityChange))
                },
                beforeTransitionStart: function(e, t) {
                    this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop())
                },
                sliderFirstMove: function() {
                    this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause())
                },
                touchEnd: function() {
                    this.params.cssMode && this.autoplay.paused && !this.params.autoplay.disableOnInteraction && this.autoplay.run()
                },
                destroy: function() {
                    this.autoplay.running && this.autoplay.stop(), document.removeEventListener("visibilitychange", this.autoplay.onVisibilityChange)
                }
            }
        }, {
            name: "effect-fade",
            params: {
                fadeEffect: {
                    crossFade: !1
                }
            },
            create: function() {
                n.extend(this, {
                    fadeEffect: {
                        setTranslate: ve.setTranslate.bind(this),
                        setTransition: ve.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if ("fade" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "fade");
                        var e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        n.extend(this.params, e), n.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() {
                    "fade" === this.params.effect && this.fadeEffect.setTranslate()
                },
                setTransition: function(e) {
                    "fade" === this.params.effect && this.fadeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-cube",
            params: {
                cubeEffect: {
                    slideShadows: !0,
                    shadow: !0,
                    shadowOffset: 20,
                    shadowScale: .94
                }
            },
            create: function() {
                n.extend(this, {
                    cubeEffect: {
                        setTranslate: fe.setTranslate.bind(this),
                        setTransition: fe.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if ("cube" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            resistanceRatio: 0,
                            spaceBetween: 0,
                            centeredSlides: !1,
                            virtualTranslate: !0
                        };
                        n.extend(this.params, e), n.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() {
                    "cube" === this.params.effect && this.cubeEffect.setTranslate()
                },
                setTransition: function(e) {
                    "cube" === this.params.effect && this.cubeEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-flip",
            params: {
                flipEffect: {
                    slideShadows: !0,
                    limitRotation: !0
                }
            },
            create: function() {
                n.extend(this, {
                    flipEffect: {
                        setTranslate: me.setTranslate.bind(this),
                        setTransition: me.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    if ("flip" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var e = {
                            slidesPerView: 1,
                            slidesPerColumn: 1,
                            slidesPerGroup: 1,
                            watchSlidesProgress: !0,
                            spaceBetween: 0,
                            virtualTranslate: !0
                        };
                        n.extend(this.params, e), n.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() {
                    "flip" === this.params.effect && this.flipEffect.setTranslate()
                },
                setTransition: function(e) {
                    "flip" === this.params.effect && this.flipEffect.setTransition(e)
                }
            }
        }, {
            name: "effect-coverflow",
            params: {
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: !0
                }
            },
            create: function() {
                n.extend(this, {
                    coverflowEffect: {
                        setTranslate: ge.setTranslate.bind(this),
                        setTransition: ge.setTransition.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0)
                },
                setTranslate: function() {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTranslate()
                },
                setTransition: function(e) {
                    "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e)
                }
            }
        }, {
            name: "thumbs",
            params: {
                thumbs: {
                    multipleActiveThumbs: !0,
                    swiper: null,
                    slideThumbActiveClass: "swiper-slide-thumb-active",
                    thumbsContainerClass: "swiper-container-thumbs"
                }
            },
            create: function() {
                n.extend(this, {
                    thumbs: {
                        swiper: null,
                        init: be.init.bind(this),
                        update: be.update.bind(this),
                        onThumbClick: be.onThumbClick.bind(this)
                    }
                })
            },
            on: {
                beforeInit: function() {
                    var e = this.params.thumbs;
                    e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
                },
                slideChange: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                update: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                resize: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                observerUpdate: function() {
                    this.thumbs.swiper && this.thumbs.update()
                },
                setTransition: function(e) {
                    var t = this.thumbs.swiper;
                    t && t.setTransition(e)
                },
                beforeDestroy: function() {
                    var e = this.thumbs.swiper;
                    e && this.thumbs.swiperCreated && e && e.destroy()
                }
            }
        }];
    return void 0 === W.use && (W.use = W.Class.use, W.installModule = W.Class.installModule), W.use(we), W
}));
/*-----------------------------------------------------------------------------------*/
/*	23. FLICKR FEED
/*-----------------------------------------------------------------------------------*/
/*
 * Copyright (C) 2009 Joel Sutherland
 * Licenced under the MIT license
 * http://www.newmediacampaigns.com/page/jquery-flickr-plugin
 *
 * Available tags for templates:
 * title, link, date_taken, description, published, author, author_id, tags, image*
 */
(function($) {
    $.fn.jflickrfeed = function(settings, callback) {
        settings = $.extend(true, {
            flickrbase: 'http://api.flickr.com/services/feeds/',
            feedapi: 'photos_public.gne',
            limit: 20,
            qstrings: {
                lang: 'en-us',
                format: 'json',
                jsoncallback: '?'
            },
            cleanDescription: true,
            useTemplate: true,
            itemTemplate: '',
            itemCallback: function() {}
        }, settings);
        var url = settings.flickrbase + settings.feedapi + '?';
        var first = true;
        for (var key in settings.qstrings) {
            if (!first)
                url += '&';
            url += key + '=' + settings.qstrings[key];
            first = false;
        }
        return $(this).each(function() {
            var $container = $(this);
            var container = this;
            $.getJSON(url, function(data) {
                $.each(data.items, function(i, item) {
                    if (i < settings.limit) {
                        if (settings.cleanDescription) {
                            var regex = /<p>(.*?)<\/p>/g;
                            var input = item.description;
                            if (regex.test(input)) {
                                item.description = input.match(regex)[2]
                                if (item.description != undefined)
                                    item.description = item.description.replace('<p>', '').replace('</p>', '');
                            }
                        }
                        item['image_s'] = item.media.m.replace('_m', '_s');
                        item['image_q'] = item.media.m.replace('_m', '_q');
                        item['image_z'] = item.media.m.replace('_m', '_z');
                        item['image_t'] = item.media.m.replace('_m', '_t');
                        item['image_m'] = item.media.m.replace('_m', '_m');
                        item['image'] = item.media.m.replace('_m', '');
                        item['image_b'] = item.media.m.replace('_m', '_b');
                        delete item.media;
                        if (settings.useTemplate) {
                            var template = settings.itemTemplate;
                            for (var key in item) {
                                var rgx = new RegExp('{{' + key + '}}', 'g');
                                template = template.replace(rgx, item[key]);
                            }
                            $container.append(template)
                        }
                        settings.itemCallback.call(container, item);
                    }
                });
                if ($.isFunction(callback)) {
                    callback.call(container, data);
                }
            });
        });
    }
})(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	24. TYPER
/*-----------------------------------------------------------------------------------*/
function TyperSetup() {
    typers = {}, elements = document.getElementsByClassName("typer");
    for (var b, a = 0; b = elements[a++];) typers[b.id] = new Typer(b);
    elements = document.getElementsByClassName("typer-stop");
    for (var b, a = 0; b = elements[a++];) {
        var c = typers[b.dataset.owner];
        b.onclick = function() {
            c.stop()
        }
    }
    elements = document.getElementsByClassName("typer-start");
    for (var b, a = 0; b = elements[a++];) {
        var c = typers[b.dataset.owner];
        b.onclick = function() {
            c.start()
        }
    }
    elements2 = document.getElementsByClassName("cursor");
    for (var b, a = 0; b = elements2[a++];) {
        var d = new Cursor(b);
        d.owner.cursor = d, console.log(d.owner.cursor)
    }
}
var Typer = function(a) {
    console.log("constructor called"), this.element = a;
    var b = a.dataset.delim || ",",
        c = a.dataset.words || "override these,sample typing";
    this.words = c.split(b).filter(function(a) {
        return a
    }), this.delay = a.dataset.delay || 200, this.deleteDelay = a.dataset.deleteDelay || 800, this.progress = {
        word: 0,
        char: 0,
        building: !0,
        atWordEnd: !1
    }, this.typing = !0;
    var d = a.dataset.colors || "inherit";
    this.colors = d.split(","), this.element.style.color = this.colors[0], this.colorIndex = 0, this.doTyping()
};
Typer.prototype.start = function() {
    this.typing || (this.typing = !0, this.doTyping())
}, Typer.prototype.stop = function() {
    this.typing = !1
}, Typer.prototype.doTyping = function() {
    var a = this.element,
        b = this.progress,
        c = b.word,
        d = b.char,
        e = this.words[c][d];
    if (b.atWordEnd = !1, this.cursor) {
        this.cursor.element.style.opacity = "1", this.cursor.on = !0, clearInterval(this.cursor.interval);
        var f = this.cursor;
        this.cursor.interval = setInterval(function() {
            f.updateBlinkState()
        }, 400)
    }
    b.building ? (a.innerHTML += e, b.char += 1, b.char == this.words[c].length && (b.building = !1, b.atWordEnd = !0)) : (a.innerHTML = a.innerHTML.slice(0, -1), this.element.innerHTML || (b.building = !0, b.word = (b.word + 1) % this.words.length, b.char = 0, this.colorIndex = (this.colorIndex + 1) % this.colors.length, this.element.style.color = this.colors[this.colorIndex]));
    var g = this;
    setTimeout(function() {
        g.typing && g.doTyping()
    }, b.atWordEnd ? this.deleteDelay : this.delay)
};
var Cursor = function(a) {
    this.element = a, this.cursorDisplay = a.dataset.cursorDisplay || "|", this.owner = typers[a.dataset.owner] || "", a.innerHTML = this.cursorDisplay, this.on = !0, a.style.transition = "all 0.1s";
    var b = this;
    this.interval = setInterval(function() {
        b.updateBlinkState()
    }, 400)
};
Cursor.prototype.updateBlinkState = function() {
    this.on ? (this.element.style.opacity = "0", this.on = !1) : (this.element.style.opacity = "1", this.on = !0)
}, TyperSetup();
/*-----------------------------------------------------------------------------------*/
/*	25. COCOEN
/*-----------------------------------------------------------------------------------*/
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.Cocoen = e()
    }
}(function() {
    return function e(t, n, i) {
        function s(o, a) {
            if (!n[o]) {
                if (!t[o]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(o, !0);
                    if (r) return r(o, !0);
                    var d = new Error("Cannot find module '" + o + "'");
                    throw d.code = "MODULE_NOT_FOUND", d
                }
                var h = n[o] = {
                    exports: {}
                };
                t[o][0].call(h.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, h, h.exports, e, t, n, i)
            }
            return n[o].exports
        }
        for (var r = "function" == typeof require && require, o = 0; o < i.length; o++) s(i[o]);
        return s
    }({
        1: [function(e, t, n) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            var s = Object.assign || function(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = arguments[t];
                        for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
                    }
                    return e
                },
                r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        return n && e(t.prototype, n), i && e(t, i), t
                    }
                }(),
                o = function() {
                    function e(t, n) {
                        i(this, e), this.options = s({}, e.defaults, n), this.element = t || document.querySelector(".cocoen"), this.init()
                    }
                    return r(e, [{
                        key: "init",
                        value: function() {
                            this.createElements(), this.addEventListeners(), this.dimensions()
                        }
                    }, {
                        key: "createElements",
                        value: function() {
                            var e = document.createElement("span");
                            e.className = this.options.dragElementSelector.replace(".", ""), this.element.appendChild(e);
                            var t = document.createElement("div"),
                                n = this.element.querySelector("img:first-child");
                            t.appendChild(n.cloneNode(!0)), n.parentNode.replaceChild(t, n), this.dragElement = this.element.querySelector(this.options.dragElementSelector), this.beforeElement = this.element.querySelector("div:first-child"), this.beforeImage = this.beforeElement.querySelector("img")
                        }
                    }, {
                        key: "addEventListeners",
                        value: function() {
                            this.element.addEventListener("click", this.onTap.bind(this)), this.element.addEventListener("mousemove", this.onDrag.bind(this)), this.element.addEventListener("touchmove", this.onDrag.bind(this)), this.dragElement.addEventListener("mousedown", this.onDragStart.bind(this)), this.dragElement.addEventListener("touchstart", this.onDragStart.bind(this)), window.addEventListener("mouseup", this.onDragEnd.bind(this)), window.addEventListener("resize", this.dimensions.bind(this))
                        }
                    }, {
                        key: "dimensions",
                        value: function() {
                            this.elementWidth = parseInt(window.getComputedStyle(this.element).width, 10), this.elementOffsetLeft = this.element.getBoundingClientRect().left + document.body.scrollLeft, this.beforeImage.style.width = this.elementWidth + "px", this.dragElementWidth = parseInt(window.getComputedStyle(this.dragElement).width, 10), this.minLeftPos = this.elementOffsetLeft + 10, this.maxLeftPos = this.elementOffsetLeft + this.elementWidth - this.dragElementWidth - 10
                        }
                    }, {
                        key: "onTap",
                        value: function(e) {
                            e.preventDefault(), this.leftPos = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX, this.requestDrag()
                        }
                    }, {
                        key: "onDragStart",
                        value: function(e) {
                            e.preventDefault();
                            var t = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX,
                                n = this.dragElement.getBoundingClientRect().left + document.body.scrollLeft;
                            this.posX = n + this.dragElementWidth - t, this.isDragging = !0
                        }
                    }, {
                        key: "onDragEnd",
                        value: function(e) {
                            e.preventDefault(), this.isDragging = !1
                        }
                    }, {
                        key: "onDrag",
                        value: function(e) {
                            e.preventDefault(), this.isDragging && (this.moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX, this.leftPos = this.moveX + this.posX - this.dragElementWidth, this.requestDrag())
                        }
                    }, {
                        key: "drag",
                        value: function() {
                            this.leftPos < this.minLeftPos ? this.leftPos = this.minLeftPos : this.leftPos > this.maxLeftPos && (this.leftPos = this.maxLeftPos);
                            var e = this.leftPos + this.dragElementWidth / 2 - this.elementOffsetLeft;
                            e /= this.elementWidth;
                            var t = 100 * e + "%";
                            this.dragElement.style.left = t, this.beforeElement.style.width = t, this.options.dragCallback && this.options.dragCallback(e)
                        }
                    }, {
                        key: "requestDrag",
                        value: function() {
                            window.requestAnimationFrame(this.drag.bind(this))
                        }
                    }]), e
                }();
            o.defaults = {
                dragElementSelector: ".cocoen-drag",
                dragCallback: null
            }, t.exports = o
        }, {}]
    }, {}, [1])(1)
});
! function r(n, e, t) {
    function o(i, f) {
        if (!e[i]) {
            if (!n[i]) {
                var c = "function" == typeof require && require;
                if (!f && c) return c(i, !0);
                if (u) return u(i, !0);
                var a = new Error("Cannot find module '" + i + "'");
                throw a.code = "MODULE_NOT_FOUND", a
            }
            var s = e[i] = {
                exports: {}
            };
            n[i][0].call(s.exports, function(r) {
                var e = n[i][1][r];
                return o(e ? e : r)
            }, s, s.exports, r, n, e, t)
        }
        return e[i].exports
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o
}({
    1: [function(r, n, e) {
        "use strict";
        ! function(r, n) {
            r && n && (r.fn.cocoen = function(e) {
                function t() {
                    return new n(this, r.extend({}, n.defaults, e))
                }
                return this.each(t)
            })
        }(window.jQuery, window.Cocoen)
    }, {}]
}, {}, [1]);
/*-----------------------------------------------------------------------------------*/
/*	26. SLIDE PORTFOLIO
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function($) {
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

    //open team-member bio
    $('#slide-portfolio').find('a.slide-portfolio-item').on('click', function(event) {
        event.preventDefault();
        var selected_member = $(this).data('type');
        $('.slide-portfolio-item-content.' + selected_member + '').addClass('slide-in');
        $('.slide-portfolio-item-content-close').addClass('is-visible');
        $('.banner--stick').addClass('d-none');

        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if (is_firefox) {
            $('main').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').addClass('overflow-hidden');
            });
        } else {
            $('main').addClass('slide-out');
            $('body').addClass('overflow-hidden');
        }

    });

    //close team-member bio
    $(document).on('click', '.slide-portfolio-overlay, .slide-portfolio-item-content-close', function(event) {
        event.preventDefault();
        $('.slide-portfolio-item-content').removeClass('slide-in');
        $('.slide-portfolio-item-content-close').removeClass('is-visible');
        $('.banner--stick').removeClass('d-none');

        if (is_firefox) {
            $('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('main').removeClass('slide-out');
            $('body').removeClass('overflow-hidden');
        }
    });
});
/*-----------------------------------------------------------------------------------*/
/*	27. EASING
/*-----------------------------------------------------------------------------------*/
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], function(e) {
        return n(e)
    }) : "object" == typeof module && "object" == typeof module.exports ? exports = n(require("jquery")) : n(jQuery)
}(function(n) {
    function e(n) {
        var e = 7.5625,
            t = 2.75;
        return n < 1 / t ? e * n * n : n < 2 / t ? e * (n -= 1.5 / t) * n + .75 : n < 2.5 / t ? e * (n -= 2.25 / t) * n + .9375 : e * (n -= 2.625 / t) * n + .984375
    }
    n.easing.jswing = n.easing.swing;
    var t = Math.pow,
        u = Math.sqrt,
        r = Math.sin,
        i = Math.cos,
        a = Math.PI,
        c = 1.70158,
        o = 1.525 * c,
        s = 2 * a / 3,
        f = 2 * a / 4.5;
    n.extend(n.easing, {
        def: "easeOutQuad",
        swing: function(e) {
            return n.easing[n.easing.def](e)
        },
        easeInQuad: function(n) {
            return n * n
        },
        easeOutQuad: function(n) {
            return 1 - (1 - n) * (1 - n)
        },
        easeInOutQuad: function(n) {
            return n < .5 ? 2 * n * n : 1 - t(-2 * n + 2, 2) / 2
        },
        easeInCubic: function(n) {
            return n * n * n
        },
        easeOutCubic: function(n) {
            return 1 - t(1 - n, 3)
        },
        easeInOutCubic: function(n) {
            return n < .5 ? 4 * n * n * n : 1 - t(-2 * n + 2, 3) / 2
        },
        easeInQuart: function(n) {
            return n * n * n * n
        },
        easeOutQuart: function(n) {
            return 1 - t(1 - n, 4)
        },
        easeInOutQuart: function(n) {
            return n < .5 ? 8 * n * n * n * n : 1 - t(-2 * n + 2, 4) / 2
        },
        easeInQuint: function(n) {
            return n * n * n * n * n
        },
        easeOutQuint: function(n) {
            return 1 - t(1 - n, 5)
        },
        easeInOutQuint: function(n) {
            return n < .5 ? 16 * n * n * n * n * n : 1 - t(-2 * n + 2, 5) / 2
        },
        easeInSine: function(n) {
            return 1 - i(n * a / 2)
        },
        easeOutSine: function(n) {
            return r(n * a / 2)
        },
        easeInOutSine: function(n) {
            return -(i(a * n) - 1) / 2
        },
        easeInExpo: function(n) {
            return 0 === n ? 0 : t(2, 10 * n - 10)
        },
        easeOutExpo: function(n) {
            return 1 === n ? 1 : 1 - t(2, -10 * n)
        },
        easeInOutExpo: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? t(2, 20 * n - 10) / 2 : (2 - t(2, -20 * n + 10)) / 2
        },
        easeInCirc: function(n) {
            return 1 - u(1 - t(n, 2))
        },
        easeOutCirc: function(n) {
            return u(1 - t(n - 1, 2))
        },
        easeInOutCirc: function(n) {
            return n < .5 ? (1 - u(1 - t(2 * n, 2))) / 2 : (u(1 - t(-2 * n + 2, 2)) + 1) / 2
        },
        easeInElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : -t(2, 10 * n - 10) * r((10 * n - 10.75) * s)
        },
        easeOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : t(2, -10 * n) * r((10 * n - .75) * s) + 1
        },
        easeInOutElastic: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? -(t(2, 20 * n - 10) * r((20 * n - 11.125) * f)) / 2 : t(2, -20 * n + 10) * r((20 * n - 11.125) * f) / 2 + 1
        },
        easeInBack: function(n) {
            return (c + 1) * n * n * n - c * n * n
        },
        easeOutBack: function(n) {
            return 1 + (c + 1) * t(n - 1, 3) + c * t(n - 1, 2)
        },
        easeInOutBack: function(n) {
            return n < .5 ? t(2 * n, 2) * (7.189819 * n - o) / 2 : (t(2 * n - 2, 2) * ((o + 1) * (2 * n - 2) + o) + 2) / 2
        },
        easeInBounce: function(n) {
            return 1 - e(1 - n)
        },
        easeOutBounce: e,
        easeInOutBounce: function(n) {
            return n < .5 ? (1 - e(1 - 2 * n)) / 2 : (1 + e(2 * n - 1)) / 2
        }
    })
});
/*-----------------------------------------------------------------------------------*/
/*	28. BACKSTRETCH
/*-----------------------------------------------------------------------------------*/
/*! Backstretch - v2.1.15 - 2017-06-22\n* Copyright (c) 2017 Scott Robbin;* Fork of improvements - by Daniel Cohen Gindi (danielgindi@gmail.com) Licensed MIT */
! function(a, b, c) {
    "use strict";

    function d(a) {
        return m.hasOwnProperty(a) ? a : "cover"
    }
    var e = /^.*(youtu\.be\/|youtube\.com\/v\/|youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtube\.com\/watch\?.*\&v=)([^#\&\?]*).*/i;
    a.fn.backstretch = function(d, e) {
        var f = arguments;
        0 === a(b).scrollTop() && b.scrollTo(0, 0);
        var g;
        return this.each(function(b) {
            var h = a(this),
                i = h.data("backstretch");
            if (i) {
                if ("string" == typeof f[0] && "function" == typeof i[f[0]]) {
                    var j = i[f[0]].apply(i, Array.prototype.slice.call(f, 1));
                    return j === i && (j = c), void(j !== c && (g = g || [], g[b] = j))
                }
                e = a.extend(i.options, e), i.hasOwnProperty("destroy") && i.destroy(!0)
            }
            if (!d || d && 0 === d.length) {
                var k = h.css("background-image");
                k && "none" !== k ? d = [{
                    url: h.css("backgroundImage").replace(/url\(|\)|"|'/g, "")
                }] : a.error("No images were supplied for Backstretch, or element must have a CSS-defined background image.")
            }
            i = new n(this, d, e || {}), h.data("backstretch", i)
        }), g ? 1 === g.length ? g[0] : g : this
    }, a.backstretch = function(b, c) {
        return a("body").backstretch(b, c).data("backstretch")
    }, a.expr[":"].backstretch = function(b) {
        return a(b).data("backstretch") !== c
    }, a.fn.backstretch.defaults = {
        duration: 5e3,
        transition: "fade",
        transitionDuration: 0,
        animateFirst: !0,
        alignX: .5,
        alignY: .5,
        paused: !1,
        start: 0,
        preload: 2,
        preloadSize: 1,
        resolutionRefreshRate: 2500,
        resolutionChangeRatioThreshold: .1
    };
    var f = {
            wrap: {
                left: 0,
                top: 0,
                overflow: "hidden",
                margin: 0,
                padding: 0,
                height: "100%",
                width: "100%",
                zIndex: -999999
            },
            itemWrapper: {
                position: "absolute",
                display: "none",
                margin: 0,
                padding: 0,
                border: "none",
                width: "100%",
                height: "100%",
                zIndex: -999999
            },
            item: {
                position: "absolute",
                margin: 0,
                padding: 0,
                border: "none",
                width: "100%",
                height: "100%",
                maxWidth: "none"
            }
        },
        g = function() {
            var c = function(a) {
                    for (var b = 1; b < a.length; b++) {
                        for (var c = a[b], d = b; a[d - 1] && parseInt(a[d - 1].width, 10) > parseInt(c.width, 10);) a[d] = a[d - 1], --d;
                        a[d] = c
                    }
                    return a
                },
                d = function(a, c, d) {
                    for (var e, f, g = b.devicePixelRatio || 1, h = q(), i = (r(), c > a ? "portrait" : a > c ? "landscape" : "square"), j = 0, k = 0; k < d.length && (f = d[k], "string" == typeof f && (f = d[k] = {
                            url: f
                        }), f.pixelRatio && "auto" !== f.pixelRatio && parseFloat(f.pixelRatio) !== g || f.deviceOrientation && f.deviceOrientation !== h || f.windowOrientation && f.windowOrientation !== h || f.orientation && f.orientation !== i || (j = k, e = a, "auto" === f.pixelRatio && (a *= g), !(f.width >= e))); k++);
                    return d[Math.min(k, j)]
                },
                e = function(a, b) {
                    if ("string" == typeof a) a = a.replace(/{{(width|height)}}/g, b);
                    else if (a instanceof Array)
                        for (var c = 0; c < a.length; c++) a[c].src ? a[c].src = e(a[c].src, b) : a[c] = e(a[c], b);
                    return a
                };
            return function(b, f) {
                for (var g = b.width(), h = b.height(), i = [], j = function(a, b) {
                        return "width" === b ? g : "height" === b ? h : a
                    }, k = 0; k < f.length; k++)
                    if (a.isArray(f[k])) {
                        f[k] = c(f[k]);
                        var l = d(g, h, f[k]);
                        i.push(l)
                    } else {
                        "string" == typeof f[k] && (f[k] = {
                            url: f[k]
                        });
                        var m = a.extend({}, f[k]);
                        m.url = e(m.url, j), i.push(m)
                    }
                return i
            }
        }(),
        h = function(a) {
            return e.test(a.url) || a.isVideo
        },
        i = function(b, c, d, e, f) {
            var g = [],
                i = function(a) {
                    for (var b = 0; b < g.length; b++)
                        if (g[b].src === a.src) return g[b];
                    return g.push(a), a
                },
                j = function(a, b, c) {
                    "function" == typeof b && b.call(a, c)
                };
            return function b(c, d, e, f, g) {
                if ("undefined" != typeof c) {
                    a.isArray(c) || (c = [c]), arguments.length < 5 && "function" == typeof arguments[arguments.length - 1] && (g = arguments[arguments.length - 1]), d = "function" != typeof d && d ? d : 0, e = "function" == typeof e || !e || e < 0 ? c.length : Math.min(e, c.length), f = "function" != typeof f && f ? f : 1, d >= c.length && (d = 0, e = 0), f < 0 && (f = e), f = Math.min(f, e);
                    var k = c.slice(d + f, e - f);
                    if (c = c.slice(d, f), e = c.length, !e) return void j(c, g, !0);
                    for (var l, m = 0, n = function() {
                            m++, m === e && (j(c, g, !k), b(k, 0, 0, f, g))
                        }, o = 0; o < c.length; o++) h(c[o]) || (l = new Image, l.src = c[o].url, l = i(l), l.complete ? n() : a(l).on("load error", n))
                }
            }
        }(),
        j = function(b) {
            for (var c = [], d = 0; d < b.length; d++) "string" == typeof b[d] ? c.push({
                url: b[d]
            }) : a.isArray(b[d]) ? c.push(j(b[d])) : c.push(k(b[d]));
            return c
        },
        k = function(a, e) {
            return (a.centeredX || a.centeredY) && (b.console && b.console.log && b.console.log("jquery.backstretch: `centeredX`/`centeredY` is deprecated, please use `alignX`/`alignY`"), a.centeredX && (a.alignX = .5), a.centeredY && (a.alignY = .5)), a.speed !== c && (b.console && b.console.log && b.console.log("jquery.backstretch: `speed` is deprecated, please use `transitionDuration`"), a.transitionDuration = a.speed, a.transition = "fade"), a.resolutionChangeRatioTreshold !== c && (b.console.log("jquery.backstretch: `treshold` is a typo!"), a.resolutionChangeRatioThreshold = a.resolutionChangeRatioTreshold), a.fadeFirst !== c && (a.animateFirst = a.fadeFirst), a.fade !== c && (a.transitionDuration = a.fade, a.transition = "fade"), a.scale && (a.scale = d(a.scale)), l(a)
        },
        l = function(a, b) {
            return "left" === a.alignX ? a.alignX = 0 : "center" === a.alignX ? a.alignX = .5 : "right" === a.alignX ? a.alignX = 1 : (a.alignX !== c || b) && (a.alignX = parseFloat(a.alignX), isNaN(a.alignX) && (a.alignX = .5)), "top" === a.alignY ? a.alignY = 0 : "center" === a.alignY ? a.alignY = .5 : "bottom" === a.alignY ? a.alignY = 1 : (a.alignX !== c || b) && (a.alignY = parseFloat(a.alignY), isNaN(a.alignY) && (a.alignY = .5)), a
        },
        m = {
            cover: "cover",
            fit: "fit",
            "fit-smaller": "fit-smaller",
            fill: "fill"
        },
        n = function(c, d, e) {
            this.options = a.extend({}, a.fn.backstretch.defaults, e || {}), this.firstShow = !0, k(this.options, !0), this.images = j(a.isArray(d) ? d : [d]), this.options.paused && (this.paused = !0), this.options.start >= this.images.length && (this.options.start = this.images.length - 1), this.options.start < 0 && (this.options.start = 0), this.isBody = c === document.body;
            var h = a(b);
            this.$container = a(c), this.$root = this.isBody ? s ? h : a(document) : this.$container, this.originalImages = this.images, this.images = g(this.options.alwaysTestWindowResolution ? h : this.$root, this.originalImages), i(this.images, this.options.start || 0, this.options.preload || 1);
            var l = this.$container.children(".backstretch").first();
            if (this.$wrap = l.length ? l : a('<div class="backstretch"></div>').css(this.options.bypassCss ? {} : f.wrap).appendTo(this.$container), !this.options.bypassCss) {
                if (!this.isBody) {
                    var m = this.$container.css("position"),
                        n = this.$container.css("zIndex");
                    this.$container.css({
                        position: "static" === m ? "relative" : m,
                        zIndex: "auto" === n ? 0 : n
                    }), this.$wrap.css({
                        zIndex: -999998
                    })
                }
                this.$wrap.css({
                    position: this.isBody && s ? "fixed" : "absolute"
                })
            }
            this.index = this.options.start, this.show(this.index), h.on("resize.backstretch", a.proxy(this.resize, this)).on("orientationchange.backstretch", a.proxy(function() {
                this.isBody && 0 === b.pageYOffset && (b.scrollTo(0, 1), this.resize())
            }, this))
        },
        o = function(b) {
            var d = b.transition || "fade";
            "string" == typeof d && d.indexOf("|") > -1 && (d = d.split("|")), d instanceof Array && (d = d[Math.round(Math.random() * (d.length - 1))]);
            var e = b.new,
                f = b.old ? b.old : a([]);
            switch (d.toString().toLowerCase()) {
                default:
                    case "fade":
                    e.fadeIn({
                    duration: b.duration,
                    complete: b.complete,
                    easing: b.easing || c
                });
                break;
                case "fadeinout":
                        case "fade_in_out":
                        var g = function() {
                        e.fadeIn({
                            duration: b.duration / 2,
                            complete: b.complete,
                            easing: b.easing || c
                        })
                    };f.length ? f.fadeOut({
                        duration: b.duration / 2,
                        complete: g,
                        easing: b.easing || c
                    }) : g();
                    break;
                case "pushleft":
                        case "push_left":
                        case "pushright":
                        case "push_right":
                        case "pushup":
                        case "push_up":
                        case "pushdown":
                        case "push_down":
                        case "coverleft":
                        case "cover_left":
                        case "coverright":
                        case "cover_right":
                        case "coverup":
                        case "cover_up":
                        case "coverdown":
                        case "cover_down":
                        var h = d.match(/^(cover|push)_?(.*)$/),
                        i = "left" === h[2] ? "right" : "right" === h[2] ? "left" : "down" === h[2] ? "top" : "up" === h[2] ? "bottom" : "right",
                        j = {
                            display: ""
                        },
                        k = {};
                    if (j[i] = "-100%", k[i] = 0, e.css(j).animate(k, {
                            duration: b.duration,
                            complete: function() {
                                e.css(i, ""), b.complete.apply(this, arguments)
                            },
                            easing: b.easing || c
                        }), "push" === h[1] && f.length) {
                        var l = {};
                        l[i] = "100%", f.animate(l, {
                            duration: b.duration,
                            complete: function() {
                                f.css("display", "none")
                            },
                            easing: b.easing || c
                        })
                    }
            }
        };
    n.prototype = {
        resize: function() {
            try {
                var e = this.options.alwaysTestWindowResolution ? a(b) : this.$root,
                    f = e.width(),
                    h = e.height(),
                    j = f / (this._lastResizeContainerWidth || 0),
                    k = h / (this._lastResizeContainerHeight || 0),
                    l = this.options.resolutionChangeRatioThreshold || 0;
                if ((f !== this._lastResizeContainerWidth || h !== this._lastResizeContainerHeight) && (Math.abs(j - 1) >= l || isNaN(j) || Math.abs(k - 1) >= l || isNaN(k)) && (this._lastResizeContainerWidth = f, this._lastResizeContainerHeight = h, this.images = g(e, this.originalImages), this.options.preload && i(this.images, (this.index + 1) % this.images.length, this.options.preload), 1 === this.images.length && this._currentImage.url !== this.images[0].url)) {
                    var m = this;
                    clearTimeout(m._selectAnotherResolutionTimeout), m._selectAnotherResolutionTimeout = setTimeout(function() {
                        m.show(0)
                    }, this.options.resolutionRefreshRate)
                }
                var n, o, p = {
                        left: 0,
                        top: 0,
                        right: "auto",
                        bottom: "auto"
                    },
                    q = this.isBody ? this.$root.width() : this.$root.innerWidth(),
                    r = this.isBody ? b.innerHeight ? b.innerHeight : this.$root.height() : this.$root.innerHeight(),
                    s = this.$itemWrapper.data("width"),
                    t = this.$itemWrapper.data("height"),
                    u = s / t || 1,
                    v = this._currentImage.alignX === c ? this.options.alignX : this._currentImage.alignX,
                    w = this._currentImage.alignY === c ? this.options.alignY : this._currentImage.alignY,
                    x = d(this._currentImage.scale || this.options.scale);
                if ("fit" === x || "fit-smaller" === x) {
                    if (n = s, o = t, n > q || o > r || "fit-smaller" === x) {
                        var y = q / r;
                        y > u ? (n = Math.floor(r * u), o = r) : y < u ? (n = q, o = Math.floor(q / u)) : (n = q, o = r)
                    }
                } else "fill" === x ? (n = q, o = r) : (n = Math.max(r * u, q), o = Math.max(n / u, r));
                p.top = -(o - r) * w, p.left = -(n - q) * v, p.width = n, p.height = o, this.options.bypassCss || this.$wrap.css({
                    width: q,
                    height: r
                }).find(">.backstretch-item").not(".deleteable").each(function() {
                    var b = a(this);
                    b.find("img,video,iframe").css(p)
                });
                var z = a.Event("backstretch.resize", {
                    relatedTarget: this.$container[0]
                });
                this.$container.trigger(z, this)
            } catch (a) {}
            return this
        },
        show: function(b, d) {
            if (!(Math.abs(b) > this.images.length - 1)) {
                var e = this,
                    g = e.$wrap.find(">.backstretch-item").addClass("deleteable"),
                    i = e.videoWrapper,
                    j = {
                        relatedTarget: e.$container[0]
                    };
                e.$container.trigger(a.Event("backstretch.before", j), [e, b]), this.index = b;
                var k = e.images[b];
                clearTimeout(e._cycleTimeout), delete e.videoWrapper;
                var l = h(k);
                return l ? (e.videoWrapper = new p(k), e.$item = e.videoWrapper.$video.css("pointer-events", "none")) : e.$item = a("<img />"), e.$itemWrapper = a('<div class="backstretch-item">').append(e.$item), this.options.bypassCss ? e.$itemWrapper.css({
                    display: "none"
                }) : (e.$itemWrapper.css(f.itemWrapper), e.$item.css(f.item)), e.$item.bind(l ? "canplay" : "load", function(f) {
                    var h = a(this),
                        k = h.parent(),
                        m = k.data("options");
                    d && (m = a.extend({}, m, d));
                    var n = this.naturalWidth || this.videoWidth || this.width,
                        p = this.naturalHeight || this.videoHeight || this.height;
                    k.data("width", n).data("height", p);
                    var q = function(a) {
                            return m[a] !== c ? m[a] : e.options[a]
                        },
                        r = q("transition"),
                        s = q("transitionEasing"),
                        t = q("transitionDuration"),
                        u = function() {
                            i && (i.stop(), i.destroy()), g.remove(), !e.paused && e.images.length > 1 && e.cycle(), e.options.bypassCss || e.isBody || e.$container.css("background-image", "none"), a(["after", "show"]).each(function() {
                                e.$container.trigger(a.Event("backstretch." + this, j), [e, b])
                            }), l && e.videoWrapper.play()
                        };
                    e.firstShow && !e.options.animateFirst || !t || !r ? (k.show(), u()) : o({
                        new: k,
                        old: g,
                        transition: r,
                        duration: t,
                        easing: s,
                        complete: u
                    }), e.firstShow = !1, e.resize()
                }), e.$itemWrapper.appendTo(e.$wrap), e.$item.attr("alt", k.alt || ""), e.$itemWrapper.data("options", k), l || e.$item.attr("src", k.url), e._currentImage = k, e
            }
        },
        current: function() {
            return this.index
        },
        next: function() {
            var a = Array.prototype.slice.call(arguments, 0);
            return a.unshift(this.index < this.images.length - 1 ? this.index + 1 : 0), this.show.apply(this, a)
        },
        prev: function() {
            var a = Array.prototype.slice.call(arguments, 0);
            return a.unshift(0 === this.index ? this.images.length - 1 : this.index - 1), this.show.apply(this, a)
        },
        pause: function() {
            return this.paused = !0, this.videoWrapper && this.videoWrapper.pause(), this
        },
        resume: function() {
            return this.paused = !1, this.videoWrapper && this.videoWrapper.play(), this.cycle(), this
        },
        cycle: function() {
            if (this.images.length > 1) {
                clearTimeout(this._cycleTimeout);
                var b = this._currentImage && this._currentImage.duration || this.options.duration,
                    c = h(this._currentImage),
                    d = function() {
                        this.$item.off(".cycle"), this.paused || this.next()
                    };
                if (c) {
                    if (!this._currentImage.loop) {
                        var e = 0;
                        this.$item.on("playing.cycle", function() {
                            var b = a(this).data("player");
                            clearTimeout(e), e = setTimeout(function() {
                                b.pause(), b.$video.trigger("ended")
                            }, 1e3 * (b.getDuration() - b.getCurrentTime()))
                        }).on("ended.cycle", function() {
                            clearTimeout(e)
                        })
                    }
                    this.$item.on("error.cycle initerror.cycle", a.proxy(d, this))
                }
                c && !this._currentImage.duration ? this.$item.on("ended.cycle", a.proxy(d, this)) : this._cycleTimeout = setTimeout(a.proxy(d, this), b)
            }
            return this
        },
        destroy: function(c) {
            a(b).off("resize.backstretch orientationchange.backstretch"), this.videoWrapper && this.videoWrapper.destroy(), clearTimeout(this._cycleTimeout), c || this.$wrap.remove(), this.$container.removeData("backstretch")
        }
    };
    var p = function() {
        this.init.apply(this, arguments)
    };
    p.prototype.init = function(d) {
        var f, g = this,
            h = function() {
                g.$video = f, g.video = f[0]
            },
            i = "video";
        if (d.url instanceof Array || !e.test(d.url) || (i = "youtube"), g.type = i, "youtube" === i) {
            p.loadYoutubeAPI(), g.ytId = d.url.match(e)[2];
            var j = "https://www.youtube.com/embed/" + g.ytId + "?rel=0&autoplay=0&showinfo=0&controls=0&modestbranding=1&cc_load_policy=0&disablekb=1&iv_load_policy=3&loop=0&enablejsapi=1&origin=" + encodeURIComponent(b.location.origin);
            g.__ytStartMuted = !!d.mute || d.mute === c, f = a("<iframe />").attr({
                src_to_load: j
            }).css({
                border: 0,
                margin: 0,
                padding: 0
            }).data("player", g), d.loop && f.on("ended.loop", function() {
                g.__manuallyStopped || g.play()
            }), g.ytReady = !1, h(), b.YT ? (g._initYoutube(), f.trigger("initsuccess")) : a(b).one("youtube_api_load", function() {
                g._initYoutube(), f.trigger("initsuccess")
            })
        } else {
            f = a("<video>").prop("autoplay", !1).prop("controls", !1).prop("loop", !!d.loop).prop("muted", !!d.mute || d.mute === c).prop("preload", "auto").prop("poster", d.poster || "");
            for (var k = d.url instanceof Array ? d.url : [d.url], l = 0; l < k.length; l++) {
                var m = k[l];
                "string" == typeof m && (m = {
                    src: m
                }), a("<source>").attr("src", m.src).attr("type", m.type || null).appendTo(f)
            }
            f[0].canPlayType && k.length ? f.trigger("initsuccess") : f.trigger("initerror"), h()
        }
    }, p.prototype._initYoutube = function() {
        var c = this,
            d = b.YT;
        c.$video.attr("src", c.$video.attr("src_to_load")).removeAttr("src_to_load");
        var e = !!c.$video[0].parentNode;
        if (!e) {
            var f = a("<div>").css("display", "none !important").appendTo(document.body);
            c.$video.appendTo(f)
        }
        var g = new d.Player(c.video, {
            events: {
                onReady: function() {
                    c.__ytStartMuted && g.mute(), e || (c.$video[0].parentNode === f[0] && c.$video.detach(), f.remove()), c.ytReady = !0, c._updateYoutubeSize(), c.$video.trigger("canplay")
                },
                onStateChange: function(a) {
                    switch (a.data) {
                        case d.PlayerState.PLAYING:
                            c.$video.trigger("playing");
                            break;
                        case d.PlayerState.ENDED:
                            c.$video.trigger("ended");
                            break;
                        case d.PlayerState.PAUSED:
                            c.$video.trigger("pause");
                            break;
                        case d.PlayerState.BUFFERING:
                            c.$video.trigger("waiting");
                            break;
                        case d.PlayerState.CUED:
                            c.$video.trigger("canplay")
                    }
                },
                onPlaybackQualityChange: function() {
                    c._updateYoutubeSize(), c.$video.trigger("resize")
                },
                onError: function(a) {
                    c.hasError = !0, c.$video.trigger({
                        type: "error",
                        error: a
                    })
                }
            }
        });
        return c.ytPlayer = g, c
    }, p.prototype._updateYoutubeSize = function() {
        var a = this;
        switch (a.ytPlayer.getPlaybackQuality() || "medium") {
            case "small":
                a.video.videoWidth = 426, a.video.videoHeight = 240;
                break;
            case "medium":
                a.video.videoWidth = 640, a.video.videoHeight = 360;
                break;
            default:
            case "large":
                a.video.videoWidth = 854, a.video.videoHeight = 480;
                break;
            case "hd720":
                a.video.videoWidth = 1280, a.video.videoHeight = 720;
                break;
            case "hd1080":
                a.video.videoWidth = 1920, a.video.videoHeight = 1080;
                break;
            case "highres":
                a.video.videoWidth = 2560, a.video.videoHeight = 1440
        }
        return a
    }, p.prototype.play = function() {
        var a = this;
        return a.__manuallyStopped = !1, "youtube" === a.type ? a.ytReady && (a.$video.trigger("play"), a.ytPlayer.playVideo()) : a.video.play(), a
    }, p.prototype.pause = function() {
        var a = this;
        return a.__manuallyStopped = !1, "youtube" === a.type ? a.ytReady && a.ytPlayer.pauseVideo() : a.video.pause(), a
    }, p.prototype.stop = function() {
        var a = this;
        return a.__manuallyStopped = !0, "youtube" === a.type ? a.ytReady && (a.ytPlayer.pauseVideo(), a.ytPlayer.seekTo(0)) : (a.video.pause(), a.video.currentTime = 0), a
    }, p.prototype.destroy = function() {
        var a = this;
        return a.ytPlayer && a.ytPlayer.destroy(), a.$video.remove(), a
    }, p.prototype.getCurrentTime = function(a) {
        var b = this;
        return "youtube" !== b.type ? b.video.currentTime : b.ytReady ? b.ytPlayer.getCurrentTime() : 0
    }, p.prototype.setCurrentTime = function(a) {
        var b = this;
        return "youtube" === b.type ? b.ytReady && b.ytPlayer.seekTo(a, !0) : b.video.currentTime = a, b
    }, p.prototype.getDuration = function() {
        var a = this;
        return "youtube" !== a.type ? a.video.duration : a.ytReady ? a.ytPlayer.getDuration() : 0
    }, p.loadYoutubeAPI = function() {
        if (!b.YT) {
            a("script[src*=www\\.youtube\\.com\\/iframe_api]").length || a('<script type="text/javascript" src="https://www.youtube.com/iframe_api">').appendTo("body");
            var c = setInterval(function() {
                b.YT && b.YT.loaded && (a(b).trigger("youtube_api_load"), clearTimeout(c))
            }, 50)
        }
    };
    var q = function() {
            if ("matchMedia" in b) {
                if (b.matchMedia("(orientation: portrait)").matches) return "portrait";
                if (b.matchMedia("(orientation: landscape)").matches) return "landscape"
            }
            return screen.height > screen.width ? "portrait" : "landscape"
        },
        r = function() {
            return b.innerHeight > b.innerWidth ? "portrait" : b.innerWidth > b.innerHeight ? "landscape" : "square"
        },
        s = function() {
            var a = navigator.userAgent,
                c = navigator.platform,
                d = a.match(/AppleWebKit\/([0-9]+)/),
                e = !!d && d[1],
                f = a.match(/Fennec\/([0-9]+)/),
                g = !!f && f[1],
                h = a.match(/Opera Mobi\/([0-9]+)/),
                i = !!h && h[1],
                j = a.match(/MSIE ([0-9]+)/),
                k = !!j && j[1];
            return !((c.indexOf("iPhone") > -1 || c.indexOf("iPad") > -1 || c.indexOf("iPod") > -1) && e && e < 534 || b.operamini && "[object OperaMini]" === {}.toString.call(b.operamini) || h && i < 7458 || a.indexOf("Android") > -1 && e && e < 533 || g && g < 6 || "palmGetResource" in b && e && e < 534 || a.indexOf("MeeGo") > -1 && a.indexOf("NokiaBrowser/8.5.0") > -1 || k && k <= 6)
        }()
}(jQuery, window);
/*-----------------------------------------------------------------------------------*/
/*	29. ISCROLL
/*-----------------------------------------------------------------------------------*/
! function(t, i, s) {
    var e = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame || function(i) {
            t.setTimeout(i, 1e3 / 60)
        },
        o = function() {
            var e = {},
                o = i.createElement("div").style,
                n = function() {
                    for (var t = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, s = t.length; i < s; i++)
                        if (t[i] + "ransform" in o) return t[i].substr(0, t[i].length - 1);
                    return !1
                }();

            function r(t) {
                return !1 !== n && ("" === n ? t : n + t.charAt(0).toUpperCase() + t.substr(1))
            }
            e.getTime = Date.now || function() {
                return (new Date).getTime()
            }, e.extend = function(t, i) {
                for (var s in i) t[s] = i[s]
            }, e.addEvent = function(t, i, s, e) {
                t.addEventListener(i, s, !!e)
            }, e.removeEvent = function(t, i, s, e) {
                t.removeEventListener(i, s, !!e)
            }, e.prefixPointerEvent = function(i) {
                return t.MSPointerEvent ? "MSPointer" + i.charAt(7).toUpperCase() + i.substr(8) : i
            }, e.momentum = function(t, i, e, o, n, r) {
                var h, a, l = t - i,
                    c = s.abs(l) / e;
                return a = c / (r = void 0 === r ? 6e-4 : r), (h = t + c * c / (2 * r) * (l < 0 ? -1 : 1)) < o ? (h = n ? o - n / 2.5 * (c / 8) : o, a = (l = s.abs(h - t)) / c) : h > 0 && (h = n ? n / 2.5 * (c / 8) : 0, a = (l = s.abs(t) + h) / c), {
                    destination: s.round(h),
                    duration: a
                }
            };
            var h = r("transform");
            return e.extend(e, {
                hasTransform: !1 !== h,
                hasPerspective: r("perspective") in o,
                hasTouch: "ontouchstart" in t,
                hasPointer: !(!t.PointerEvent && !t.MSPointerEvent),
                hasTransition: r("transition") in o
            }), e.isBadAndroid = function() {
                var i = t.navigator.appVersion;
                if (/Android/.test(i) && !/Chrome\/\d/.test(i)) {
                    var s = i.match(/Safari\/(\d+.\d)/);
                    return !(s && "object" == typeof s && s.length >= 2) || parseFloat(s[1]) < 535.19
                }
                return !1
            }(), e.extend(e.style = {}, {
                transform: h,
                transitionTimingFunction: r("transitionTimingFunction"),
                transitionDuration: r("transitionDuration"),
                transitionDelay: r("transitionDelay"),
                transformOrigin: r("transformOrigin")
            }), e.hasClass = function(t, i) {
                return new RegExp("(^|\\s)" + i + "(\\s|$)").test(t.className)
            }, e.addClass = function(t, i) {
                if (!e.hasClass(t, i)) {
                    var s = t.className.split(" ");
                    s.push(i), t.className = s.join(" ")
                }
            }, e.removeClass = function(t, i) {
                if (e.hasClass(t, i)) {
                    var s = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
                    t.className = t.className.replace(s, " ")
                }
            }, e.offset = function(t) {
                for (var i = -t.offsetLeft, s = -t.offsetTop; t = t.offsetParent;) i -= t.offsetLeft, s -= t.offsetTop;
                return {
                    left: i,
                    top: s
                }
            }, e.preventDefaultException = function(t, i) {
                for (var s in i)
                    if (i[s].test(t[s])) return !0;
                return !1
            }, e.extend(e.eventType = {}, {
                touchstart: 1,
                touchmove: 1,
                touchend: 1,
                mousedown: 2,
                mousemove: 2,
                mouseup: 2,
                pointerdown: 3,
                pointermove: 3,
                pointerup: 3,
                MSPointerDown: 3,
                MSPointerMove: 3,
                MSPointerUp: 3
            }), e.extend(e.ease = {}, {
                quadratic: {
                    style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    fn: function(t) {
                        return t * (2 - t)
                    }
                },
                circular: {
                    style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                    fn: function(t) {
                        return s.sqrt(1 - --t * t)
                    }
                },
                back: {
                    style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fn: function(t) {
                        return (t -= 1) * t * (5 * t + 4) + 1
                    }
                },
                bounce: {
                    style: "",
                    fn: function(t) {
                        return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                    }
                },
                elastic: {
                    style: "",
                    fn: function(t) {
                        return 0 === t ? 0 : 1 == t ? 1 : .4 * s.pow(2, -10 * t) * s.sin((t - .055) * (2 * s.PI) / .22) + 1
                    }
                }
            }), e.tap = function(t, s) {
                var e = i.createEvent("Event");
                e.initEvent(s, !0, !0), e.pageX = t.pageX, e.pageY = t.pageY, t.target.dispatchEvent(e)
            }, e.click = function(t) {
                var s, e = t.target;
                /(SELECT|INPUT|TEXTAREA)/i.test(e.tagName) || ((s = i.createEvent("MouseEvents")).initMouseEvent("click", !0, !0, t.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), s._constructed = !0, e.dispatchEvent(s))
            }, e
        }();

    function n(s, e) {
        for (var n in this.wrapper = "string" == typeof s ? i.querySelector(s) : s, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
                resizeScrollbars: !0,
                mouseWheelSpeed: 20,
                snapThreshold: .334,
                disablePointer: !o.hasPointer,
                disableTouch: o.hasPointer || !o.hasTouch,
                disableMouse: o.hasPointer || o.hasTouch,
                startX: 0,
                startY: 0,
                scrollY: !0,
                directionLockThreshold: 5,
                momentum: !0,
                bounce: !0,
                bounceTime: 600,
                bounceEasing: "",
                preventDefault: !0,
                preventDefaultException: {
                    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
                },
                HWCompositing: !0,
                useTransition: !0,
                useTransform: !0,
                bindToWrapper: void 0 === t.onmousedown
            }, e) this.options[n] = e[n];
        this.translateZ = this.options.HWCompositing && o.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = o.hasTransition && this.options.useTransition, this.options.useTransform = o.hasTransform && this.options.useTransform, this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? o.ease[this.options.bounceEasing] || o.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, !0 === this.options.tap && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
    }

    function r(t, s, e) {
        var o = i.createElement("div"),
            n = i.createElement("div");
        return !0 === e && (o.style.cssText = "position:absolute;z-index:9999", n.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), n.className = "iScrollIndicator", "h" == t ? (!0 === e && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", n.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (!0 === e && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", n.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", s || (o.style.pointerEvents = "none"), o.appendChild(n), o
    }

    function h(s, n) {
        for (var r in this.wrapper = "string" == typeof n.el ? i.querySelector(n.el) : n.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = s, this.options = {
                listenX: !0,
                listenY: !0,
                interactive: !1,
                resize: !0,
                defaultScrollbars: !1,
                shrink: !1,
                fade: !1,
                speedRatioX: 0,
                speedRatioY: 0
            }, n) this.options[r] = n[r];
        if (this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (o.addEvent(this.indicator, "touchstart", this), o.addEvent(t, "touchend", this)), this.options.disablePointer || (o.addEvent(this.indicator, o.prefixPointerEvent("pointerdown"), this), o.addEvent(t, o.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (o.addEvent(this.indicator, "mousedown", this), o.addEvent(t, "mouseup", this))), this.options.fade) {
            this.wrapperStyle[o.style.transform] = this.scroller.translateZ;
            var h = o.style.transitionDuration;
            this.wrapperStyle[h] = o.isBadAndroid ? "0.0001ms" : "0ms";
            var a = this;
            o.isBadAndroid && e(function() {
                "0.0001ms" === a.wrapperStyle[h] && (a.wrapperStyle[h] = "0s")
            }), this.wrapperStyle.opacity = "0"
        }
    }
    n.prototype = {
        version: "5.2.0",
        _init: function() {
            this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
        },
        destroy: function() {
            this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
        },
        _transitionEnd: function(t) {
            t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        },
        _start: function(t) {
            if (1 != o.eventType[t.type] && 0 !== (t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2)) return;
            if (this.enabled && (!this.initiated || o.eventType[t.type] === this.initiated)) {
                !this.options.preventDefault || o.isBadAndroid || o.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                var i, e = t.touches ? t.touches[0] : t;
                this.initiated = o.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this.startTime = o.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, i = this.getComputedPosition(), this._translate(s.round(i.x), s.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = e.pageX, this.pointY = e.pageY, this._execEvent("beforeScrollStart")
            }
        },
        _move: function(t) {
            if (this.enabled && o.eventType[t.type] === this.initiated) {
                this.options.preventDefault && t.preventDefault();
                var i, e, n, r, h = t.touches ? t.touches[0] : t,
                    a = h.pageX - this.pointX,
                    l = h.pageY - this.pointY,
                    c = o.getTime();
                if (this.pointX = h.pageX, this.pointY = h.pageY, this.distX += a, this.distY += l, n = s.abs(this.distX), r = s.abs(this.distY), !(c - this.endTime > 300 && n < 10 && r < 10)) {
                    if (this.directionLocked || this.options.freeScroll || (n > r + this.options.directionLockThreshold ? this.directionLocked = "h" : r >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough) t.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                        l = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough) t.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                        a = 0
                    }
                    a = this.hasHorizontalScroll ? a : 0, l = this.hasVerticalScroll ? l : 0, i = this.x + a, e = this.y + l, (i > 0 || i < this.maxScrollX) && (i = this.options.bounce ? this.x + a / 3 : i > 0 ? 0 : this.maxScrollX), (e > 0 || e < this.maxScrollY) && (e = this.options.bounce ? this.y + l / 3 : e > 0 ? 0 : this.maxScrollY), this.directionX = a > 0 ? -1 : a < 0 ? 1 : 0, this.directionY = l > 0 ? -1 : l < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(i, e), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
                }
            }
        },
        _end: function(t) {
            if (this.enabled && o.eventType[t.type] === this.initiated) {
                this.options.preventDefault && !o.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
                t.changedTouches && t.changedTouches[0];
                var i, e, n = o.getTime() - this.startTime,
                    r = s.round(this.x),
                    h = s.round(this.y),
                    a = s.abs(r - this.startX),
                    l = s.abs(h - this.startY),
                    c = 0,
                    p = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = o.getTime(), !this.resetPosition(this.options.bounceTime)) {
                    if (this.scrollTo(r, h), !this.moved) return this.options.tap && o.tap(t, this.options.tap), this.options.click && o.click(t), void this._execEvent("scrollCancel");
                    if (this._events.flick && n < 200 && a < 100 && l < 100) this._execEvent("flick");
                    else {
                        if (this.options.momentum && n < 300 && (i = this.hasHorizontalScroll ? o.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                                destination: r,
                                duration: 0
                            }, e = this.hasVerticalScroll ? o.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                                destination: h,
                                duration: 0
                            }, r = i.destination, h = e.destination, c = s.max(i.duration, e.duration), this.isInTransition = 1), this.options.snap) {
                            var d = this._nearestSnap(r, h);
                            this.currentPage = d, c = this.options.snapSpeed || s.max(s.max(s.min(s.abs(r - d.x), 1e3), s.min(s.abs(h - d.y), 1e3)), 300), r = d.x, h = d.y, this.directionX = 0, this.directionY = 0, p = this.options.bounceEasing
                        }
                        if (r != this.x || h != this.y) return (r > 0 || r < this.maxScrollX || h > 0 || h < this.maxScrollY) && (p = o.ease.quadratic), void this.scrollTo(r, h, c, p);
                        this._execEvent("scrollEnd")
                    }
                }
            }
        },
        _resize: function() {
            var t = this;
            clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                t.refresh()
            }, this.options.resizePolling)
        },
        resetPosition: function(t) {
            var i = this.x,
                s = this.y;
            return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? i = 0 : this.x < this.maxScrollX && (i = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? s = 0 : this.y < this.maxScrollY && (s = this.maxScrollY), (i != this.x || s != this.y) && (this.scrollTo(i, s, t, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = o.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
        },
        on: function(t, i) {
            this._events[t] || (this._events[t] = []), this._events[t].push(i)
        },
        off: function(t, i) {
            if (this._events[t]) {
                var s = this._events[t].indexOf(i);
                s > -1 && this._events[t].splice(s, 1)
            }
        },
        _execEvent: function(t) {
            if (this._events[t]) {
                var i = 0,
                    s = this._events[t].length;
                if (s)
                    for (; i < s; i++) this._events[t][i].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollBy: function(t, i, s, e) {
            t = this.x + t, i = this.y + i, s = s || 0, this.scrollTo(t, i, s, e)
        },
        scrollTo: function(t, i, s, e) {
            e = e || o.ease.circular, this.isInTransition = this.options.useTransition && s > 0;
            var n = this.options.useTransition && e.style;
            !s || n ? (n && (this._transitionTimingFunction(e.style), this._transitionTime(s)), this._translate(t, i)) : this._animate(t, i, s, e.fn)
        },
        scrollToElement: function(t, i, e, n, r) {
            if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                var h = o.offset(t);
                h.left -= this.wrapperOffset.left, h.top -= this.wrapperOffset.top, !0 === e && (e = s.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === n && (n = s.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), h.left -= e || 0, h.top -= n || 0, h.left = h.left > 0 ? 0 : h.left < this.maxScrollX ? this.maxScrollX : h.left, h.top = h.top > 0 ? 0 : h.top < this.maxScrollY ? this.maxScrollY : h.top, i = null == i || "auto" === i ? s.max(s.abs(this.x - h.left), s.abs(this.y - h.top)) : i, this.scrollTo(h.left, h.top, i, r)
            }
        },
        _transitionTime: function(t) {
            t = t || 0;
            var i = o.style.transitionDuration;
            if (this.scrollerStyle[i] = t + "ms", !t && o.isBadAndroid) {
                this.scrollerStyle[i] = "0.0001ms";
                var s = this;
                e(function() {
                    "0.0001ms" === s.scrollerStyle[i] && (s.scrollerStyle[i] = "0s")
                })
            }
            if (this.indicators)
                for (var n = this.indicators.length; n--;) this.indicators[n].transitionTime(t)
        },
        _transitionTimingFunction: function(t) {
            if (this.scrollerStyle[o.style.transitionTimingFunction] = t, this.indicators)
                for (var i = this.indicators.length; i--;) this.indicators[i].transitionTimingFunction(t)
        },
        _translate: function(t, i) {
            if (this.options.useTransform ? this.scrollerStyle[o.style.transform] = "translate(" + t + "px," + i + "px)" + this.translateZ : (t = s.round(t), i = s.round(i), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = i + "px"), this.x = t, this.y = i, this.indicators)
                for (var e = this.indicators.length; e--;) this.indicators[e].updatePosition()
        },
        _initEvents: function(i) {
            var s = i ? o.removeEvent : o.addEvent,
                e = this.options.bindToWrapper ? this.wrapper : t;
            s(t, "orientationchange", this), s(t, "resize", this), this.options.click && s(this.wrapper, "click", this, !0), this.options.disableMouse || (s(this.wrapper, "mousedown", this), s(e, "mousemove", this), s(e, "mousecancel", this), s(e, "mouseup", this)), o.hasPointer && !this.options.disablePointer && (s(this.wrapper, o.prefixPointerEvent("pointerdown"), this), s(e, o.prefixPointerEvent("pointermove"), this), s(e, o.prefixPointerEvent("pointercancel"), this), s(e, o.prefixPointerEvent("pointerup"), this)), o.hasTouch && !this.options.disableTouch && (s(this.wrapper, "touchstart", this), s(e, "touchmove", this), s(e, "touchcancel", this), s(e, "touchend", this)), s(this.scroller, "transitionend", this), s(this.scroller, "webkitTransitionEnd", this), s(this.scroller, "oTransitionEnd", this), s(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var i, s, e = t.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (i = +((e = e[o.style.transform].split(")")[0].split(", "))[12] || e[4]), s = +(e[13] || e[5])) : (i = +e.left.replace(/[^-\d.]/g, ""), s = +e.top.replace(/[^-\d.]/g, "")), {
                x: i,
                y: s
            }
        },
        _initIndicators: function() {
            var t, i = this.options.interactiveScrollbars,
                s = "string" != typeof this.options.scrollbars,
                e = [],
                o = this;
            this.indicators = [], this.options.scrollbars && (this.options.scrollY && (t = {
                el: r("v", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: s,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenX: !1
            }, this.wrapper.appendChild(t.el), e.push(t)), this.options.scrollX && (t = {
                el: r("h", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: s,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenY: !1
            }, this.wrapper.appendChild(t.el), e.push(t))), this.options.indicators && (e = e.concat(this.options.indicators));
            for (var n = e.length; n--;) this.indicators.push(new h(this, e[n]));

            function a(t) {
                if (o.indicators)
                    for (var i = o.indicators.length; i--;) t.call(o.indicators[i])
            }
            this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                a(function() {
                    this.fade()
                })
            }), this.on("scrollCancel", function() {
                a(function() {
                    this.fade()
                })
            }), this.on("scrollStart", function() {
                a(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart", function() {
                a(function() {
                    this.fade(1, !0)
                })
            })), this.on("refresh", function() {
                a(function() {
                    this.refresh()
                })
            }), this.on("destroy", function() {
                a(function() {
                    this.destroy()
                }), delete this.indicators
            })
        },
        _initWheel: function() {
            o.addEvent(this.wrapper, "wheel", this), o.addEvent(this.wrapper, "mousewheel", this), o.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                clearTimeout(this.wheelTimeout), this.wheelTimeout = null, o.removeEvent(this.wrapper, "wheel", this), o.removeEvent(this.wrapper, "mousewheel", this), o.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(t) {
            if (this.enabled) {
                t.preventDefault();
                var i, e, o, n, r = this;
                if (void 0 === this.wheelTimeout && r._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                        r.options.snap || r._execEvent("scrollEnd"), r.wheelTimeout = void 0
                    }, 400), "deltaX" in t) 1 === t.deltaMode ? (i = -t.deltaX * this.options.mouseWheelSpeed, e = -t.deltaY * this.options.mouseWheelSpeed) : (i = -t.deltaX, e = -t.deltaY);
                else if ("wheelDeltaX" in t) i = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, e = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in t) i = e = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail" in t)) return;
                    i = e = -t.detail / 3 * this.options.mouseWheelSpeed
                }
                if (i *= this.options.invertWheelDirection, e *= this.options.invertWheelDirection, this.hasVerticalScroll || (i = e, e = 0), this.options.snap) return o = this.currentPage.pageX, n = this.currentPage.pageY, i > 0 ? o-- : i < 0 && o++, e > 0 ? n-- : e < 0 && n++, void this.goToPage(o, n);
                o = this.x + s.round(this.hasHorizontalScroll ? i : 0), n = this.y + s.round(this.hasVerticalScroll ? e : 0), this.directionX = i > 0 ? -1 : i < 0 ? 1 : 0, this.directionY = e > 0 ? -1 : e < 0 ? 1 : 0, o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), n > 0 ? n = 0 : n < this.maxScrollY && (n = this.maxScrollY), this.scrollTo(o, n, 0)
            }
        },
        _initSnap: function() {
            this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                var t, i, e, o, n, r, h = 0,
                    a = 0,
                    l = 0,
                    c = this.options.snapStepX || this.wrapperWidth,
                    p = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (!0 === this.options.snap)
                        for (e = s.round(c / 2), o = s.round(p / 2); l > -this.scrollerWidth;) {
                            for (this.pages[h] = [], t = 0, n = 0; n > -this.scrollerHeight;) this.pages[h][t] = {
                                x: s.max(l, this.maxScrollX),
                                y: s.max(n, this.maxScrollY),
                                width: c,
                                height: p,
                                cx: l - e,
                                cy: n - o
                            }, n -= p, t++;
                            l -= c, h++
                        } else
                            for (t = (r = this.options.snap).length, i = -1; h < t; h++)(0 === h || r[h].offsetLeft <= r[h - 1].offsetLeft) && (a = 0, i++), this.pages[a] || (this.pages[a] = []), l = s.max(-r[h].offsetLeft, this.maxScrollX), n = s.max(-r[h].offsetTop, this.maxScrollY), e = l - s.round(r[h].offsetWidth / 2), o = n - s.round(r[h].offsetHeight / 2), this.pages[a][i] = {
                                x: l,
                                y: n,
                                width: r[h].offsetWidth,
                                height: r[h].offsetHeight,
                                cx: e,
                                cy: o
                            }, l > this.maxScrollX && a++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 == 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = s.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            }), this.on("flick", function() {
                var t = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.x - this.startX), 1e3), s.min(s.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
            })
        },
        _nearestSnap: function(t, i) {
            if (!this.pages.length) return {
                x: 0,
                y: 0,
                pageX: 0,
                pageY: 0
            };
            var e = 0,
                o = this.pages.length,
                n = 0;
            if (s.abs(t - this.absStartX) < this.snapThresholdX && s.abs(i - this.absStartY) < this.snapThresholdY) return this.currentPage;
            for (t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), i > 0 ? i = 0 : i < this.maxScrollY && (i = this.maxScrollY); e < o; e++)
                if (t >= this.pages[e][0].cx) {
                    t = this.pages[e][0].x;
                    break
                }
            for (o = this.pages[e].length; n < o; n++)
                if (i >= this.pages[0][n].cy) {
                    i = this.pages[0][n].y;
                    break
                }
            return e == this.currentPage.pageX && ((e += this.directionX) < 0 ? e = 0 : e >= this.pages.length && (e = this.pages.length - 1), t = this.pages[e][0].x), n == this.currentPage.pageY && ((n += this.directionY) < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), i = this.pages[0][n].y), {
                x: t,
                y: i,
                pageX: e,
                pageY: n
            }
        },
        goToPage: function(t, i, e, o) {
            o = o || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), i >= this.pages[t].length ? i = this.pages[t].length - 1 : i < 0 && (i = 0);
            var n = this.pages[t][i].x,
                r = this.pages[t][i].y;
            e = void 0 === e ? this.options.snapSpeed || s.max(s.max(s.min(s.abs(n - this.x), 1e3), s.min(s.abs(r - this.y), 1e3)), 300) : e, this.currentPage = {
                x: n,
                y: r,
                pageX: t,
                pageY: i
            }, this.scrollTo(n, r, e, o)
        },
        next: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            ++s >= this.pages.length && this.hasVerticalScroll && (s = 0, e++), this.goToPage(s, e, t, i)
        },
        prev: function(t, i) {
            var s = this.currentPage.pageX,
                e = this.currentPage.pageY;
            --s < 0 && this.hasVerticalScroll && (s = 0, e--), this.goToPage(s, e, t, i)
        },
        _initKeys: function(i) {
            var s, e = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            if ("object" == typeof this.options.keyBindings)
                for (s in this.options.keyBindings) "string" == typeof this.options.keyBindings[s] && (this.options.keyBindings[s] = this.options.keyBindings[s].toUpperCase().charCodeAt(0));
            else this.options.keyBindings = {};
            for (s in e) this.options.keyBindings[s] = this.options.keyBindings[s] || e[s];
            o.addEvent(t, "keydown", this), this.on("destroy", function() {
                o.removeEvent(t, "keydown", this)
            })
        },
        _key: function(t) {
            if (this.enabled) {
                var i, e = this.options.snap,
                    n = e ? this.currentPage.pageX : this.x,
                    r = e ? this.currentPage.pageY : this.y,
                    h = o.getTime(),
                    a = this.keyTime || 0;
                switch (this.options.useTransition && this.isInTransition && (i = this.getComputedPosition(), this._translate(s.round(i.x), s.round(i.y)), this.isInTransition = !1), this.keyAcceleration = h - a < 200 ? s.min(this.keyAcceleration + .25, 50) : 0, t.keyCode) {
                    case this.options.keyBindings.pageUp:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? n += e ? 1 : this.wrapperWidth : r += e ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.pageDown:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? n -= e ? 1 : this.wrapperWidth : r -= e ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.end:
                        n = e ? this.pages.length - 1 : this.maxScrollX, r = e ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        n = 0, r = 0;
                        break;
                    case this.options.keyBindings.left:
                        n += e ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        r += e ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        n -= e ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        r -= e ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return
                }
                e ? this.goToPage(n, r) : (n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollX && (n = this.maxScrollX, this.keyAcceleration = 0), r > 0 ? (r = 0, this.keyAcceleration = 0) : r < this.maxScrollY && (r = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(n, r, 0), this.keyTime = h)
            }
        },
        _animate: function(t, i, s, n) {
            var r = this,
                h = this.x,
                a = this.y,
                l = o.getTime(),
                c = l + s;
            this.isAnimating = !0,
                function p() {
                    var d, u, m, f = o.getTime();
                    if (f >= c) return r.isAnimating = !1, r._translate(t, i), void(r.resetPosition(r.options.bounceTime) || r._execEvent("scrollEnd"));
                    m = n(f = (f - l) / s), d = (t - h) * m + h, u = (i - a) * m + a, r._translate(d, u), r.isAnimating && e(p)
                }()
        },
        handleEvent: function(t) {
            switch (t.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(t);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(t);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(t);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(t);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(t);
                    break;
                case "keydown":
                    this._key(t);
                    break;
                case "click":
                    this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
            }
        }
    }, h.prototype = {
        handleEvent: function(t) {
            switch (t.type) {
                case "touchstart":
                case "pointerdown":
                case "MSPointerDown":
                case "mousedown":
                    this._start(t);
                    break;
                case "touchmove":
                case "pointermove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(t);
                    break;
                case "touchend":
                case "pointerup":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "pointercancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(t)
            }
        },
        destroy: function() {
            this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null), this.options.interactive && (o.removeEvent(this.indicator, "touchstart", this), o.removeEvent(this.indicator, o.prefixPointerEvent("pointerdown"), this), o.removeEvent(this.indicator, "mousedown", this), o.removeEvent(t, "touchmove", this), o.removeEvent(t, o.prefixPointerEvent("pointermove"), this), o.removeEvent(t, "mousemove", this), o.removeEvent(t, "touchend", this), o.removeEvent(t, o.prefixPointerEvent("pointerup"), this), o.removeEvent(t, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        },
        _start: function(i) {
            var s = i.touches ? i.touches[0] : i;
            i.preventDefault(), i.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = s.pageX, this.lastPointY = s.pageY, this.startTime = o.getTime(), this.options.disableTouch || o.addEvent(t, "touchmove", this), this.options.disablePointer || o.addEvent(t, o.prefixPointerEvent("pointermove"), this), this.options.disableMouse || o.addEvent(t, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
        },
        _move: function(t) {
            var i, s, e, n, r = t.touches ? t.touches[0] : t;
            o.getTime();
            this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, i = r.pageX - this.lastPointX, this.lastPointX = r.pageX, s = r.pageY - this.lastPointY, this.lastPointY = r.pageY, e = this.x + i, n = this.y + s, this._pos(e, n), t.preventDefault(), t.stopPropagation()
        },
        _end: function(i) {
            if (this.initiated) {
                if (this.initiated = !1, i.preventDefault(), i.stopPropagation(), o.removeEvent(t, "touchmove", this), o.removeEvent(t, o.prefixPointerEvent("pointermove"), this), o.removeEvent(t, "mousemove", this), this.scroller.options.snap) {
                    var e = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        n = this.options.snapSpeed || s.max(s.max(s.min(s.abs(this.scroller.x - e.x), 1e3), s.min(s.abs(this.scroller.y - e.y), 1e3)), 300);
                    this.scroller.x == e.x && this.scroller.y == e.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = e, this.scroller.scrollTo(e.x, e.y, n, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(t) {
            t = t || 0;
            var i = o.style.transitionDuration;
            if (this.indicatorStyle[i] = t + "ms", !t && o.isBadAndroid) {
                this.indicatorStyle[i] = "0.0001ms";
                var s = this;
                e(function() {
                    "0.0001ms" === s.indicatorStyle[i] && (s.indicatorStyle[i] = "0s")
                })
            }
        },
        transitionTimingFunction: function(t) {
            this.indicatorStyle[o.style.transitionTimingFunction] = t
        },
        refresh: function() {
            this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (o.addClass(this.wrapper, "iScrollBothScrollbars"), o.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (o.removeClass(this.wrapper, "iScrollBothScrollbars"), o.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
            this.wrapper.offsetHeight;
            this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = s.max(s.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = 8 - this.indicatorWidth, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = s.max(s.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = 8 - this.indicatorHeight, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
        },
        updatePosition: function() {
            var t = this.options.listenX && s.round(this.sizeRatioX * this.scroller.x) || 0,
                i = this.options.listenY && s.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = s.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = s.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), i < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = s.max(this.indicatorHeight + 3 * i, 8), this.indicatorStyle.height = this.height + "px"), i = this.minBoundaryY) : i > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = s.max(this.indicatorHeight - 3 * (i - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", i = this.maxPosY + this.indicatorHeight - this.height) : i = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = t, this.y = i, this.scroller.options.useTransform ? this.indicatorStyle[o.style.transform] = "translate(" + t + "px," + i + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = i + "px")
        },
        _pos: function(t, i) {
            t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), i < 0 ? i = 0 : i > this.maxPosY && (i = this.maxPosY), t = this.options.listenX ? s.round(t / this.sizeRatioX) : this.scroller.x, i = this.options.listenY ? s.round(i / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, i)
        },
        fade: function(t, i) {
            if (!i || this.visible) {
                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                var s = t ? 250 : 500,
                    e = t ? 0 : 300;
                t = t ? "1" : "0", this.wrapperStyle[o.style.transitionDuration] = s + "ms", this.fadeTimeout = setTimeout(function(t) {
                    this.wrapperStyle.opacity = t, this.visible = +t
                }.bind(this, t), e)
            }
        }
    }, n.utils = o, "undefined" != typeof module && module.exports ? module.exports = n : "function" == typeof define && define.amd ? define(function() {
        return n
    }) : t.IScroll = n
}(window, document, Math);
/*-----------------------------------------------------------------------------------*/
/*	30. FOOTER REVEAL
/*-----------------------------------------------------------------------------------*/
! function(a) {
    a.fn.footerReveal = function(b) {
        var c = a(this),
            d = c.prev(),
            e = a(window),
            f = a.extend({
                shadow: !0,
                shadowOpacity: .8,
                zIndex: -100
            }, b);
        a.extend(!0, {}, f, b);
        return c.outerHeight() <= e.outerHeight() && c.offset().top >= e.outerHeight() && (c.css({
            "z-index": f.zIndex,
            position: "fixed",
            bottom: 0
        }), f.shadow && d.css({
            "-moz-box-shadow": "0 20px 30px -20px rgba(0,0,0," + f.shadowOpacity + ")",
            "-webkit-box-shadow": "0 20px 30px -20px rgba(0,0,0," + f.shadowOpacity + ")",
            "box-shadow": "0 20px 30px -20px rgba(0,0,0," + f.shadowOpacity + ")"
        }), e.on("load resize footerRevealResize", function() {
            c.css({
                width: d.outerWidth()
            }), d.css({
                "margin-bottom": c.outerHeight()
            })
        })), this
    }
}(jQuery);
/*-----------------------------------------------------------------------------------*/
/*	31. COLLAGEPLUS
/*-----------------------------------------------------------------------------------*/
/*!
 *
 * jQuery collagePlus Plugin v0.3.3
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */
;
(function(e) {
    e.fn.collagePlus = function(t) {
        function n(t, n, i, s) {
            var o = i.padding * (t.length - 1) + t.length * t[0][3],
                u = i.albumWidth - o,
                a = u / (n - o),
                f = o,
                l = n < i.albumWidth ? true : false;
            for (var c = 0; c < t.length; c++) {
                var h = e(t[c][0]),
                    p = Math.floor(t[c][1] * a),
                    d = Math.floor(t[c][2] * a),
                    v = !!(c < t.length - 1);
                if (i.allowPartialLastRow === true && l === true) {
                    p = t[c][1];
                    d = t[c][2]
                }
                f += p;
                if (!v && f < i.albumWidth) {
                    if (i.allowPartialLastRow === true && l === true) {
                        p = p
                    } else {
                        p = p + (i.albumWidth - f)
                    }
                }
                p--;
                var m = h.is("img") ? h : h.find("img");
                m.width(p);
                if (!h.is("img")) {
                    h.width(p + t[c][3])
                }
                m.height(d);
                if (!h.is("img")) {
                    h.height(d + t[c][4])
                }
                r(h, v, i);
                m.one("load", function(e) {
                    return function() {
                        if (i.effect == "default") {
                            e.animate({
                                opacity: "1"
                            }, {
                                duration: i.fadeSpeed
                            })
                        } else {
                            if (i.direction == "vertical") {
                                var t = s <= 10 ? s : 10
                            } else {
                                var t = c <= 9 ? c + 1 : 10
                            }
                            e.removeClass(function(e, t) {
                                return (t.match(/\beffect-\S+/g) || []).join(" ")
                            });
                            e.addClass(i.effect);
                            e.addClass("effect-duration-" + t)
                        }
                    }
                }(h)).each(function() {
                    if (this.complete) e(this).trigger("load")
                })
            }
        }

        function r(e, t, n) {
            var r = {
                "margin-bottom": n.padding + "px",
                "margin-right": t ? n.padding + "px" : "0px",
                display: n.display,
                "vertical-align": "bottom",
                overflow: "hidden"
            };
            return e.css(r)
        }

        function i(t) {
            $img = e(t);
            var n = new Array;
            n["w"] = parseFloat($img.css("border-left-width")) + parseFloat($img.css("border-right-width"));
            n["h"] = parseFloat($img.css("border-top-width")) + parseFloat($img.css("border-bottom-width"));
            return n
        }
        return this.each(function() {
            var r = 0,
                s = [],
                o = 1,
                u = e(this);
            e.fn.collagePlus.defaults.albumWidth = u.width();
            e.fn.collagePlus.defaults.padding = parseFloat(u.css("padding-left"));
            e.fn.collagePlus.defaults.images = u.children();
            var a = e.extend({}, e.fn.collagePlus.defaults, t);
            a.images.each(function(t) {
                var u = e(this),
                    f = u.is("img") ? u : e(this).find("img");
                var l = typeof f.data("width") != "undefined" ? f.data("width") : f.width(),
                    c = typeof f.data("height") != "undefined" ? f.data("height") : f.height();
                var h = i(f);
                f.data("width", l);
                f.data("height", c);
                var p = Math.ceil(l / c * a.targetHeight),
                    d = Math.ceil(a.targetHeight);
                s.push([this, p, d, h["w"], h["h"]]);
                r += p + h["w"] + a.padding;
                if (r > a.albumWidth && s.length != 0) {
                    n(s, r - a.padding, a, o);
                    delete r;
                    delete s;
                    r = 0;
                    s = [];
                    o += 1
                }
                if (a.images.length - 1 == t && s.length != 0) {
                    n(s, r, a, o);
                    delete r;
                    delete s;
                    r = 0;
                    s = [];
                    o += 1
                }
            })
        })
    };
    e.fn.collagePlus.defaults = {
        targetHeight: 400,
        fadeSpeed: "fast",
        display: "inline-block",
        effect: "effect-2",
        direction: "vertical",
        allowPartialLastRow: false
    }
})(jQuery);

(function(a) {
    a.fn.removeWhitespace = function() {
        this.contents().filter(function() {
            return this.nodeType == 3 && !/\S/.test(this.nodeValue)
        }).remove();
        return this
    }
})(jQuery)