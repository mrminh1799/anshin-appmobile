import {Colors} from "@/styles/Colors";

/**
 * @author ANHVTN11
 * 01/11/2019
 * */
let _messages;

function alert(message = '', _action = null, title = "message-modal.titleDefault", btnClose = "message-modal.buttonCancel") {
    _messages._onPushMessage({
        type: 'TIP',
        args: {
            title: title,
            icon: require('@/assets/icons/iconSuccess.png'),
            content: message,
            btn: {
                text: btnClose,
                callback: _action,
            },
        }
    });
}

function error(message = '', _action = null, title = "message-modal.titleError", btnClose = "message-modal.buttonCancel") {
    _messages._onPushMessage({
        type: 'TIP',
        args: {
            title: title,
            content: message,
            icon: require('@/assets/icons/iconWaring.png'),
            color: Colors.light.redBase,
            btn: {
                text: btnClose,
                callback: _action,
                style: {
                    btnStyle: {
                        backgroundColor: Colors.dark.secondary,
                    }
                }
            },
        }
    })
}

async function showLoading(isLoading = true, type = true) {
    _messages.loading(isLoading)
}

async function hideLoading(isLoading = false) {
    _messages.loading(isLoading)
}

function confirm(message = '',
                 _confirm = null,
                 _cancel = null,
                 title = "message-modal.titleDefault",
                 txtOK = "message-modal.buttonConfirm",
                 txtCancel = "message-modal.buttonCancel",
                 icon = require('@/assets/icons/iconWaring.png')) {
    _messages._onPushMessage({
        type: 'CONFIRM',
        args: {
            title: title,
            content: message,
            ok: {
                text: txtOK,
                callback: _confirm,
                style: {
                    textStyle: {
                        color: '#ffffff',
                    },
                    btnStyle: {
                        backgroundColor: Colors.dark.secondary,
                    }
                }
            },
            cancel: {
                text: txtCancel,
                callback: _cancel,
                style: {
                    textStyle: {
                        color: Colors.light.backgroundGray,
                    },
                    btnStyle: {
                        backgroundColor: 'F5F5F5',
                    }
                }
            },
            icon: icon
        }
    });
}

function setDialogRef(dialogRef) {
    _messages = dialogRef;
}

export default {
    confirm,
    hideLoading,
    showLoading,
    error,
    alert,
    setDialogRef,
};
