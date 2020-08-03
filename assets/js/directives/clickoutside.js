import Vue from 'vue';

const isServer = Vue.prototype.$isServer;
const ctx = '@@clickoutsideContext';
const nodeList = [];

let startClick;
let seed = 0;

if (!isServer) {
    document.addEventListener('mousedown', e => startClick = e, false);
    document.addEventListener('mouseup', e => {
        nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
    }, false);
}

function createDocumentHandler(el, binding, vnode) {
    return function(mouseup = {}, mousedown = {}) {
        if (
            !vnode ||
            !vnode.context ||
            !mouseup.target ||
            !mousedown.target ||
            el.contains(mouseup.target) ||
            el.contains(mousedown.target) ||
            el === mouseup.target ||
            (vnode.context.popperEl &&
                (vnode.context.popperEl.contains(mouseup.target) ||
                    vnode.context.popperEl.contains(mousedown.target)))
        ) {
            return;
        }

        if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
            vnode.context[el[ctx].methodName]();
        } else if (el[ctx].bindingFn) {
            el[ctx].bindingFn();
        }
    };
}

export default {
    bind(el, binding, vnode) {
        nodeList.push(el);
        const id = seed++;
        el[ctx] = {
            id,
            documentHandler: createDocumentHandler(el, binding, vnode),
            methodName: binding.expression,
            bindingFn: binding.value,
        };
    },

    // update(el, binding, vnode) {
    //     el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
    //     el[ctx].methodName = binding.expression;
    //     el[ctx].bindingFn = binding.value;
    // },

    unbind(el) {
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i][ctx].id === el[ctx].id) {
                nodeList.splice(i, 1);
                break;
            }
        }
        delete el[ctx];
    },
};
