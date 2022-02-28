import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, TouchableWithoutFeedback, View, ActivityIndicator, Modal} from 'react-native';
import PopContent from './PopContent';
import DisplayPopup from './DisplayPopup';
import styleShape from './style-shape';
import styleSheet from './styles';
import {withTranslation} from 'react-i18next';

import uuid from 'react-native-uuid';

class DialogBox extends Component {

    static DisplayPopup = DisplayPopup;

    static propTypes = {
        isOverlay: PropTypes.bool,
        isOverlayClickClose: PropTypes.bool,
        onDismiss: PropTypes.func,
        style: PropTypes.shape(styleShape),
        childRef: PropTypes.func,
        t: PropTypes.func,
    };

    static defaultProps = {
        isOverlay: true,
        isOverlayClickClose: true,
    };
    queueMessage = null;


    constructor(props, context) {
        super(props, context);
        this.state = {
            isVisible: false,
            content: null,
            isLoading: false,
            type: false,
            listQueueMessage: [],
            uuidInQueue: null
        };
        this.springValue = new Animated.Value(0.3);
    }

    componentDidMount = () => {
        const {childRef} = this.props;
        childRef(this);
        this._onQueueMessage();
    };

    _onCheckDuplicate = (lstMess, mess) => {
        let lstFound = lstMess.filter(message => message.args.content === mess.args.content);
        return lstFound.length > 0
    }

    _onPushMessage = (callMess) => {
        let lst = this.state.listQueueMessage;
        if (lst) {
            if (this._onCheckDuplicate(lst, callMess)) {
                return;
            } else {
                lst.push({
                    ...callMess,
                    uuid: uuid.v4()
                })
            }
        } else {
            lst = []
        }
        this.setState((prev) => ({
            ...prev,
            listQueueMessage: [...lst]
        }))
    }

    _onRemoveMessage = () => {
        if (this.state.uuidInQueue !== null) {
            this.setState((prev) => ({
                listQueueMessage: prev.listQueueMessage.filter(message => message.uuid !== this.state.uuidInQueue)
            }))
        }
    }

    _onQueueMessage = () => {
        this.queueMessage = setInterval(() => {
            if (this.state.listQueueMessage.length > 0) {
                let mess = this.state.listQueueMessage[0]
                if ((this._resolve === null || this._resolve === undefined) && this.state.isVisible === false && this.state.type === false && this.state.isLoading === false) {
                    this.setState((prev) => ({
                        uuidInQueue: mess.uuid,
                    }), async () => {
                        switch (mess.type) {
                            case 'ALERT':
                                await this.alert(mess.args)
                                break;
                            case'CONFIRM':
                                await this.confirm(mess.args)
                                break;
                            case 'TIP':
                                await this.tip(mess.args);
                                break;
                            default:
                                break;
                        }
                    })
                }
            }
        }, 200)
    }

    componentWillUnmount = () => {
        clearInterval(this.queueMessage);
    }

    _animatedShow = () => {
        Animated.spring(this.springValue, {
            toValue: 1,
            bounciness: 10,
            useNativeDriver: true,
        }).start();
    };

    _animatedHide = () => {
        Animated.spring(this.springValue, {
            toValue: 0,
            tension: 10,
            useNativeDriver: true,
        }).start();
    };

    _onOverlayDismiss = () => {
        const {isOverlayClickClose, onDismiss} = this.props;
        const {isLoading} = this.state;
        if (!isLoading && isOverlayClickClose) {
            //this.close();
            if (onDismiss && typeof onDismiss === 'function') {
                onDismiss();
            }
        }
    };

    _pop = (args) => {
        this._animatedShow();
        if (this._resolve) {
            this._resolve({index: -1, button: undefined});
        }
        const transformed = Object.assign({}, args, {
            btns: Array.prototype.map.call(args.btns, (item, index) => (Object.assign({}, item, {
                callback: () => {
                    const resolve = this._resolve;
                    this._resolve = null;
                    const {callback, ...button} = item;
                    if (callback) {
                        callback();
                    }
                    resolve({index, button});
                },
            }))),
        });
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this.setState({
                content: (<PopContent {...transformed} style={this.props.style}/>),
                isVisible: true,
            });
        });
    };

    loading = (isLoading = false, type) => {
        if (isLoading) {
            return new Promise((resolve, reject) => {
                this._resolve = resolve;
                this.setState({
                    content: null,
                    isLoading: isLoading,
                    isVisible: true,
                    type: isLoading,
                });
            });
        } else {
            this.close();
        }
    };
    input = (args) => {
        const {title, content, btn, icon, color} = args;
        const {t} = this.props;
        return this._pop({
            title: t(title) || 'Input',
            buttonFlow: 'row',
            content: content,
            icon: icon,
            color: color,
            btns: [{
                text: (title) && t(btn.text) || 'OK',
                style: btn && btn.style,
                callback: () => {
                    this.close();
                    btn && typeof btn.callback === 'function' && btn.callback();
                },
            }],
        });
    };

    alert = (...text) => {
        text = text.map(text => text);
        return this._pop({
            content: text || '',
            buttonFlow: 'column',
            btns: [{
                text: 'OK',
                callback: () => {
                    this.close();
                },
            }],
        }).then((res) => {
            console.log(res)
        });
    };


    tip = (args) => {
        const {title, content, btn, icon, color} = args;
        const {t} = this.props;
        return this._pop({
            title: t(title) || 'Tip',
            buttonFlow: 'row',
            content: content,
            icon: icon,
            color: color,
            btns: [{
                text: (title) && t(btn.text) || 'OK',
                style: btn && btn.style,
                callback: () => {
                    this.close();
                    btn && typeof btn.callback === 'function' && btn.callback();
                },
            }],
        });
    };

    confirm = (args) => {
        const {title, content, ok, cancel, icon} = args;
        const {t} = this.props;
        return this._pop({
            title: t(title),
            buttonFlow: 'row',
            icon: icon,
            content,
            btns: [
                {
                    text: cancel && t(cancel.text) || 'Cancel',
                    style: cancel && cancel.style,
                    callback: () => {
                        this.close();
                        cancel && typeof cancel.callback === 'function' && cancel.callback();
                    },
                },
                {
                    text: ok && t(ok.text) || 'OK',
                    style: ok && ok.style,
                    callback: () => {
                        this.close();
                        ok && typeof ok.callback === 'function' && ok.callback();
                    },
                },
            ],
        });
    };

    pop = (args) => {
        return this._pop(args);
    };

    close = () => {
        this._animatedHide();
        if (this._resolve) {
            this._resolve({index: -1, button: undefined});
            this._resolve = null;
        }
        this.setState({
            isVisible: false,
            isLoading: false,
            type: false,
        }, () => {
            this._onRemoveMessage();
        });
    };

    _renderOverlay = (styles) => {
        const {isOverlay} = this.props;
        if (isOverlay) {
            return (
                <TouchableWithoutFeedback onPress={this._onOverlayDismiss}>
                    <View style={styles.overlay}/>
                </TouchableWithoutFeedback>
            );
        }
        return null;
    };

    _renderContent = (styles) => {
        const animated = {transform: [{scale: this.springValue}]};
        return (
            <Animated.View
                style={[styles.tipBoxView, animated, {backgroundColor: this.state.isLoading ? 'rgba(00, 00, 00, 0)' : '#fff'}]}>
                {this.state.content}
            </Animated.View>
        );
    };

    render() {
        const {isVisible} = this.state;
        const styles = styleSheet;
        const animated = {transform: [{scale: this.springValue}]};
        if (isVisible) {
            return (
                <Modal transparent={true}>
                    <View style={[styles.popupContainer]}>
                        {this._renderOverlay(styles)}
                        {this._renderContent(styles)}
                        {

                            this.state.type ? <ActivityIndicator size="small" color="#ED1F24"/> : null
                        }
                    </View>
                </Modal>
            );
        }
        return <Animated.View style={[styles.hidden, animated]}/>;
    }
}

export default withTranslation('Common')(DialogBox);
