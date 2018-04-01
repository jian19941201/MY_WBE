//获取元素
var getElem =function (selcetor) {
    return document.querySelector(selcetor);
}
var getAllElem =function (selcetor) {
    return document.querySelectorAll(selcetor);
}
//获取元素样式
var getClass =function (element) {
    return element.getAttribute('class');
}
//设置元素样式
var setClass =function (element,uclass) {
    return element.setAttribute('class',uclass);
}
//加元素样式
var addClass =function (element,uclass) {
    var baseclass =getClass(element);
    if(baseclass.indexOf(uclass)===-1){
        setClass(element,baseclass+' '+uclass);

    }

}
//删除元素样式
var delClass =function (element,uclass) {
    var baseclass =getClass(element);
    if(baseclass.indexOf(uclass)!=-1){
        setClass(element,baseclass.split(uclass).join(' ').replace(/\s+/g,' '));
    }

}

//初始化样式

//需要设置样式的动画的class




var testscreen ={
    '.screen-1':[
        '.screen-1_heading',
        '.screen-1_phone',
        '.screen-1_shadow'
    ],'.screen-2':[
        '.screen-2_heading',
        '.screen-2_phone',
        '.screen-2_subheading',
        '.screen-2_point_i_3',
        '.screen-2_point_i_1',
        '.screen-2_point_right',
    ],'.screen-3':[
        '.screen-3_heading',
        '.screen-3_phone',
        '.screen-3_subheading',
        '.screen-3_phone_box',
    ]
    ,'.imx_cmos':[
        '.imx_cmos_head1',
        '.imx_cmos_head2',
        '.imx_cmos_head3',
    ]
    ,'.screen-4':[
        '.cont'
    ] ,'.screen-6':[
        '.screen-6_head1',
        '.screen-6_head2',
        '.screen-6_head3',
    ]
    ,'.screen-5':[
        '.screen-5_heading',
        '.screen-5_subheading',
        '.screen-5_phone_img1',
        '.screen-5_phone_img2',
        '.screen-5_phone_img3',
        '.screen-5_phone_img4',
    ]
};

var isSetAnimateClass=false ;//是否有初始化子元素的样式

//初始化样式  增加init
var setscreenanimate=function (screencls) {

             var animateElements =testscreen[screencls];//需要设置动画的元素
        for (var i=0;i<animateElements.length;i++)
        {
            var element =document.querySelector(animateElements[i]);
            var  baseclassanimate=element.getAttribute('class');
            element.setAttribute('class',baseclassanimate+' '+animateElements[i].substr(1)+'_animate_init')
        }
}
//触发动画样式  修改init变成
var setscreenanimate_done=function (screencls) {

    var animateElements =testscreen[screencls];//需要设置动画的元素
    for (var i=0;i<animateElements.length;i++)
    {
        var element =document.querySelector(animateElements[i]);
        var  baseclassanimate=element.getAttribute('class');
        element.setAttribute('class',baseclassanimate.replace('animate_init','animate_done'));
    }
}

window.onload=function () {
    var k;
    for(k in testscreen){
        setscreenanimate(k);
    }
}


//根据滚动条高度来触发动画  或者用fullpage 插件来触发
var navitems =getAllElem('.header_nav_item');
var outlineitems =getAllElem('.outline_item');
var switchNavItemAcitive =function (idx) {
    for(var i=0; i<navitems.length;i++){
        delClass(navitems[i],'header_nav_item_status_active')
    }
    addClass(navitems[idx],'header_nav_item_status_active')
    for(var i=0; i<outlineitems.length;i++){
        delClass(outlineitems[i],'outline_item_status_active')
    }
    addClass(outlineitems[idx],'outline_item_status_active')
}

    window.onscroll=function () {
    var top =document.documentElement.scrollTop || document.body.scrollTop;
   // console.log(top)
        if(top>960){
            addClass(getElem('.header'),'header_status_back')
            addClass(getElem('.outline'),'outline_status_in')
        }else {
            delClass(getElem('.header'),'header_status_back')
            delClass(getElem('.outline'),'outline_status_in')
        }
        if(top>900){
            setscreenanimate_done('.screen-1');
            switchNavItemAcitive(1);
        }
        if(top>900*2){
            setscreenanimate_done('.screen-2');
        }
        if(top>900*3){
            setscreenanimate_done('.screen-3');
        }
        if(top>900*4){
            setscreenanimate_done('.imx_cmos');
            switchNavItemAcitive(2);
        }
        if(top>900*5){
            setscreenanimate_done('.screen-4');
        }
        if(top>900*6){
            setscreenanimate_done('.screen-6');
            switchNavItemAcitive(3);
        }
        if(top>900*7){
            setscreenanimate_done('.screen-5');
            switchNavItemAcitive(4);
        }
    }

    //双向定位
var setnavjump =function (i,lib) {
    var item =lib[i]
    item.onclick=function () {
        console.log(i)
        if(i==0){document.documentElement.scrollTop=i*960;document.body.scrollTop=i*960;}
        if(i==1){document.documentElement.scrollTop=960;document.body.scrollTop=960;}
        if(i==2){document.documentElement.scrollTop=4*960;document.body.scrollTop=4*960;}
        if(i==3){document.documentElement.scrollTop=6*960;document.body.scrollTop=6*960;}
        if(i==4){document.documentElement.scrollTop=7*960;document.body.scrollTop=7*960;}
    }
}

for(var i=0;i<navitems.length;i++){
    setnavjump(i,navitems)
}
for(var i=0;i<outlineitems.length;i++){
    setnavjump(i,outlineitems)
}
//导航条滑动特效

var navtip =getElem('.header_nav-tip');

var settip =function (idx,lib) {
    lib[idx].onmouseover=function () {
        console.log(this,idx)
        navtip.style.left=(idx*78)+'px';
    }
document.body.scrollTop


    var acviveidx=0;
    lib[idx].onmouseout=function () {
        console.log(this,idx)
        for(var i=0;i<lib.length;i++)
        {
          if(getClass(lib[i]).indexOf('header_nav_item_status_active')>-1){
              acviveidx=i;
            break;
          }
         }
        navtip.style.left=(acviveidx*78)+'px';
        }
    }

for(var i=0; i<navitems.length;i++){
    settip(i,navitems)
}


