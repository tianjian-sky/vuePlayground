
import { type } from 'type'
import { random } from 'commom'

const _getInputNodeHtml = (nodeType) => {
    let html = ``
    if (nodeType === 'input') {
        html = `
        <input type="text" :class="{formInput: true, edit: isEditing, hover: isHover, placeholder: showPlaceHolder, error: errMsg, errorText: markErrorInputContent, emptyWarning: $props.showWarning}" id="inqName-0" :value="showValue" 
        @mouseover="mouseoverHandler" @mouseout="mouseoutHandler"
        @focus="focusHandler"
        @keyup="inputHandler"
        @blur="blurHandler"
        />
        `
    } else if (nodeType === 'textarea') {
        html = `
        <textarea type="text" :class="{formInput: true, edit: isEditing, hover: isHover, placeholder: showPlaceHolder, error: errMsg, errorText: markErrorInputContent, emptyWarning: $props.showWarning}" id="inqName-0" :value="showValue" 
        @mouseover="mouseoverHandler" @mouseout="mouseoutHandler"
        @focus="focusHandler"
        @keyup="inputHandler"
        @blur="blurHandler"
        >{{showValue}}</textarea>
        `
    }
    return html
}

// 部分浏览器ctrl+v 黏贴文字到contenteditable div后，会将格式一起黏贴进去,所以用此方法提取里面的纯文本
const __parseText = (rawText) => {
    let text = ''
    let div = document.createElement('div')
    div.innerHTML = rawText
    for (let i = 0; i < div.childNodes.length; i++) {
        let cur = div.childNodes[i]
        if (cur.nodeType === 1) {
            text += ''.trim.call(cur.innerText || cur.textContent)
            if ('div|p|br'.indexOf(cur.nodeName.toLowerCase()) >= 0) {
                text += '\r\n'
            }
        } else if (cur.nodeType === 3) {
            text += ''.trim.call(cur.nodeValue)
        }
    }
    return text
}

/*
* option： 配置项
* option.maxInputLen | number | 最长输入长度
* option.placeholderText | string | 占位符提示话术
*/
export const FormInput = function (option) {
    option = option || {}
    let nonce = random(8)
    let baseClass = ['formInputContainer']
    let baseDataOption = {
        maxInputLen: 15,
        inputValue: '',
        showValue: '',
        placeholderText: '请输入',
        showPlaceHolder: false,
        errMsg: '',
        isHover: false,
        isEditing: false,
        isOverSize: false,
        markErrorInputContent: false,
    }

    let mixinDataOptionKeys = ['maxInputLen', 'placeholderText']
    mixinDataOptionKeys.forEach(k => {
        if (k in option) baseDataOption[k] = option[k]
    })

    let classList = baseClass.concat(option.classList || [])
    let nodeType = option.nodeType || 'input'
    let inputNode = _getInputNodeHtml(nodeType)
    let componentObj =  {
        template: `
            <div class="${classList.join(' ')}" contenteditable="false">
                ${inputNode}
                <div v-if="errMsg" class="alert">{{errMsg}}</div>
            </div>
        `,
        data: function () {
            return Object.assign({}, baseDataOption)
        },
        props: ['initialValue', 'onChange', 'showWarning'],
        methods: {
            mouseoverHandler(e) {
                this.isHover = true
            },
            mouseoutHandler () {
                this.isHover = false
            },
            focusHandler () {
                this.isEditing = true
            },
            inputHandler (e) {
                let srcEle = e.target
                this.showValue = this.getInputValue(srcEle)
                if (this.showValue.length > this.maxInputLen) {
                    this.showValue = this.showValue.slice(0, this.maxInputLen)
                    this.errMsg = '只能输入' + this.maxInputLen + '个字符'
                } else {
                    this.errMsg = ''
                }
                console.log(this.showValue, this.isEditing)
                this.inputValue = this.showValue
                this.$props.onChange && this.$props.onChange(this.inputValue, this)
            },
            blurHandler () {
                this.isEditing = false
                this.errMsg = ''
                this.$props.onChange && this.$props.onChange(this.inputValue, this)
            },
            getInputValue (node) {
                if (!node) {
                    console.error('参数格式错误')
                    return
                }
                let nodeName = node.nodeName.toLowerCase()
                if (nodeName === 'input' || nodeName === 'textarea') {
                    return node.value
                } else {
                    return node.innerHTML
                }
            }
        },
        watch: {
            isEditing: {
                handler: function (isEditing) {
                    let inputVal = this.inputValue
                    if (!isEditing) {
                        if (inputVal) {
                            this.showValue = inputVal
                            this.showPlaceHolder = false
                        } else {
                            this.showValue = this.placeholderText
                            this.showPlaceHolder = true
                        }
                    } else {
                        this.showValue = inputVal
                        this.showPlaceHolder = false
                    }
                }
            },
            '$props.initialValue': {
                handler: function (newVal) {
                    this.$data.inputValue = newVal
                    if (this.$data.inputValue) {
                        this.$data.showValue = this.inputValue
                        this.$data.showPlaceHolder = false
                    } else if (!this.isEditing) {
                        this.$data.showValue = this.$data.placeholderText
                        this.$data.showPlaceHolder = true
                    }
                }
            }
        },
        created () {
            this.$data.inputValue = this.$props.initialValue
            if (this.$data.inputValue) {
                this.$data.showValue = this.inputValue
                this.$data.showPlaceHolder = false
            } else {
                this.$data.showValue = this.$data.placeholderText
                this.$data.showPlaceHolder = true
            }
        }
    }
    return componentObj
}