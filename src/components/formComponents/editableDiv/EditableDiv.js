

const _getInputNodeHtml = (nodeType) => {
    let html = `
        <div contenteditable="true" :class="{formInput: true, edit: isEditing, hover: isHover, placeholder: showPlaceHolder, error: errMsg, errorText: markErrorInputContent, emptyWarning: showWarning}" :id="id"
        @keyup="inputHandler"
        @click="clickHandler"
        v-html="showValue"
        ></div>
        `
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
* option.onChange | function | 输入内容改变时的回调
*/
export const EditableDiv = function (option) {
    option = option || {}
    let baseClass = ['formInputContainer']
    let baseDataOption = {
        currentPosition: 0,
        maxInputLen: 15,
        inputValue: '',
        placeholderText: '请输入',
        showPlaceHolder: false,
        errMsg: '',
        isHover: false,
        isEditing: false,
        isOverSize: false,
        markErrorInputContent: false
    }

    let mixinDataOptionKeys = ['maxInputLen', 'placeholderText']
    mixinDataOptionKeys.forEach(k => {
        if (k in option) baseDataOption[k] = option[k]
    })
    let classList = baseClass.concat(option.classList || [])
    let inputNode = _getInputNodeHtml()
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
        props: ['initialValue', 'onChange', 'errorInfo', 'id', 'args'],
        methods: {
            initShowValue (initialValue) {
                if (initialValue) {
                    this.showValue = initialValue
                    this.showPlaceHolder = false
                } else {
                    this.showValue = this.placeholderText
                    this.showPlaceHolder = true
                }
                // console.log(this.id, this.showValue)
            },
            mouseoverHandler (e) {
                this.isHover = true
            },
            mouseoutHandler () {
                this.isHover = false
            },
            clickHandler (e) {
                let isEditing = false
                (function () {
                    if (!isEditing) {
                        isEditing = true
                        this.isEditing = true
                        this.$nextTick(() => {
                            document.body.addEventListener('click', this.blurHandler) // 模拟触发blur
                        })
                    }
                    if (this.showPlaceHolder) {
                        this.showPlaceHolder = false
                        this.showValue = this.inputValue
                    }
                })()
            },
            blurHandler (e) {
                if (e.target == this.$el) {
                    return
                } else {
                    this.$on('click', this.clickHandler)
                    this.isEditing = false
                    this.errMsg = ''
                    if (!this.inputValue) {
                        this.showPlaceHolder = true
                        this.showValue = this.placeholderText
                    } else {
                        this.showValue = this.inputValue
                    }
                    document.body.removeEventListener('click', this.blurHandler)
                }
            },
            inputHandler (e) {
                let srcEle = e.target
                let showValue = this.getInputValue(srcEle).trim()
                if (showValue.length > this.maxInputLen) {
                    this.inputValue = showValue.slice(0, this.maxInputLen)
                    this.errMsg = '只能输入' + this.maxInputLen + '个字符'
                } else {
                    this.inputValue = showValue
                    this.errMsg = ''
                }
                if (e.which < 37 || e.which > 40) {
                }
                this.onChange && this.onChange(this.inputValue, this)
            },
            getInputValue (node) {
                if (!node) {
                    console.error('参数格式错误')
                    return
                }
                let input = ''
                let nodeName = node.nodeName.toLowerCase()
                if (nodeName === 'input' || nodeName === 'textarea') {
                    input = __parseText(node.value)
                } else {
                    input = __parseText(node.innerHTML)
                }
                return input
            }
        },
        watch: {
            initialValue (newVal) {
                console.log(this.id, newVal)
                this.inputValue = newVal
                this.initShowValue(newVal)
                // this.$nextTick(() => {
                //     this.$forceUpdate()
                // })
                // this.$el.innerHTML = newVal
            }
        },
        computed : {
            showWarning () {
                return this.errorInfo && !this.isEditing && !this.inputValue
            }
        },
        created () {
            console.log('created')
            this.inputValue = this.initialValue
            this.initShowValue(this.initialValue)
        },
        mounted () {
        }
    }
    return componentObj
}
