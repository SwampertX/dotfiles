(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const server_1 = __importDefault(__webpack_require__(2));
const commands_1 = __webpack_require__(97);
const organizeImports_1 = __webpack_require__(77);
const plugins_1 = __webpack_require__(98);
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let { subscriptions } = context;
        const config = coc_nvim_1.workspace.getConfiguration().get('tsserver', {});
        if (!config.enable)
            return;
        const pluginManager = new plugins_1.PluginManager();
        const service = new server_1.default(pluginManager);
        subscriptions.push(coc_nvim_1.services.regist(service));
        yield service.start();
        function registCommand(cmd) {
            let { id, execute } = cmd;
            subscriptions.push(coc_nvim_1.commands.registerCommand(id, execute, cmd));
        }
        registCommand(new commands_1.AutoFixCommand(service.clientHost));
        registCommand(new commands_1.ReloadProjectsCommand(service.clientHost));
        registCommand(new commands_1.OpenTsServerLogCommand(service.clientHost));
        registCommand(new commands_1.TypeScriptGoToProjectConfigCommand(service.clientHost));
        registCommand(new organizeImports_1.OrganizeImportsCommand(service.clientHost.serviceClient));
        registCommand(new commands_1.ConfigurePluginCommand(pluginManager));
        registCommand(coc_nvim_1.commands.register({
            id: 'tsserver.restart',
            execute: () => {
                // tslint:disable-next-line:no-floating-promises
                service.stop().then(() => {
                    setTimeout(() => {
                        service.restart();
                    }, 100);
                });
            }
        }));
        return {
            configurePlugin: (pluginId, configuration) => {
                pluginManager.setConfiguration(pluginId, configuration);
            }
        };
    });
}
exports.activate = activate;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("coc.nvim");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const typescriptServiceClientHost_1 = __importDefault(__webpack_require__(31));
const languageDescription_1 = __webpack_require__(78);
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
class TsserverService {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        this.id = 'tsserver';
        this.name = 'tsserver';
        this.state = coc_nvim_1.ServiceStat.Initial;
        this._onDidServiceReady = new vscode_languageserver_protocol_1.Emitter();
        this.onServiceReady = this._onDidServiceReady.event;
        this.disposables = [];
        this.descriptions = [];
        const config = coc_nvim_1.workspace.getConfiguration('tsserver');
        const enableJavascript = !!config.get('enableJavascript');
        this.enable = config.get('enable');
        this.descriptions = languageDescription_1.standardLanguageDescriptions.filter(o => {
            return enableJavascript ? true : o.id != 'javascript';
        });
        this.selector = this.descriptions.reduce((arr, c) => {
            return arr.concat(c.modeIds);
        }, []);
    }
    get config() {
        return coc_nvim_1.workspace.getConfiguration('tsserver');
    }
    start() {
        if (this.clientHost)
            return;
        this.state = coc_nvim_1.ServiceStat.Starting;
        this.clientHost = new typescriptServiceClientHost_1.default(this.descriptions, this.pluginManager);
        this.disposables.push(this.clientHost);
        let client = this.clientHost.serviceClient;
        return new Promise(resolve => {
            let started = false;
            client.onTsServerStarted(() => {
                Object.defineProperty(this, 'state', {
                    get: () => {
                        return this.clientHost.serviceClient.state;
                    }
                });
                this._onDidServiceReady.fire(void 0);
                this.ensureConfiguration(); // tslint:disable-line
                if (!started) {
                    started = true;
                    resolve();
                }
            });
        });
    }
    ensureConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientHost)
                return;
            let document = yield coc_nvim_1.workspace.document;
            yield wait(100);
            let uri = coc_nvim_1.Uri.parse(document.uri);
            let language = this.clientHost.findLanguage(uri);
            if (!language)
                return;
            yield language.fileConfigurationManager.ensureConfigurationForDocument(document.textDocument);
        });
    }
    dispose() {
        coc_nvim_1.disposeAll(this.disposables);
    }
    restart() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientHost)
                return;
            let client = this.clientHost.serviceClient;
            yield client.restartTsServer();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.clientHost)
                return;
            this.clientHost.reset();
            let client = this.clientHost.serviceClient;
            yield client.stop();
            return;
        });
    }
}
exports.default = TsserverService;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
exports.ErrorCodes = vscode_jsonrpc_1.ErrorCodes;
exports.ResponseError = vscode_jsonrpc_1.ResponseError;
exports.CancellationToken = vscode_jsonrpc_1.CancellationToken;
exports.CancellationTokenSource = vscode_jsonrpc_1.CancellationTokenSource;
exports.Disposable = vscode_jsonrpc_1.Disposable;
exports.Event = vscode_jsonrpc_1.Event;
exports.Emitter = vscode_jsonrpc_1.Emitter;
exports.Trace = vscode_jsonrpc_1.Trace;
exports.TraceFormat = vscode_jsonrpc_1.TraceFormat;
exports.SetTraceNotification = vscode_jsonrpc_1.SetTraceNotification;
exports.LogTraceNotification = vscode_jsonrpc_1.LogTraceNotification;
exports.RequestType = vscode_jsonrpc_1.RequestType;
exports.RequestType0 = vscode_jsonrpc_1.RequestType0;
exports.NotificationType = vscode_jsonrpc_1.NotificationType;
exports.NotificationType0 = vscode_jsonrpc_1.NotificationType0;
exports.MessageReader = vscode_jsonrpc_1.MessageReader;
exports.MessageWriter = vscode_jsonrpc_1.MessageWriter;
exports.ConnectionStrategy = vscode_jsonrpc_1.ConnectionStrategy;
exports.StreamMessageReader = vscode_jsonrpc_1.StreamMessageReader;
exports.StreamMessageWriter = vscode_jsonrpc_1.StreamMessageWriter;
exports.IPCMessageReader = vscode_jsonrpc_1.IPCMessageReader;
exports.IPCMessageWriter = vscode_jsonrpc_1.IPCMessageWriter;
exports.createClientPipeTransport = vscode_jsonrpc_1.createClientPipeTransport;
exports.createServerPipeTransport = vscode_jsonrpc_1.createServerPipeTransport;
exports.generateRandomPipeName = vscode_jsonrpc_1.generateRandomPipeName;
exports.createClientSocketTransport = vscode_jsonrpc_1.createClientSocketTransport;
exports.createServerSocketTransport = vscode_jsonrpc_1.createServerSocketTransport;
__export(__webpack_require__(18));
__export(__webpack_require__(19));
const callHierarchy = __webpack_require__(28);
const progress = __webpack_require__(29);
const sr = __webpack_require__(30);
var Proposed;
(function (Proposed) {
    let SelectionRangeRequest;
    (function (SelectionRangeRequest) {
        SelectionRangeRequest.type = sr.SelectionRangeRequest.type;
    })(SelectionRangeRequest = Proposed.SelectionRangeRequest || (Proposed.SelectionRangeRequest = {}));
    let CallHierarchyRequest;
    (function (CallHierarchyRequest) {
        CallHierarchyRequest.type = callHierarchy.CallHierarchyRequest.type;
    })(CallHierarchyRequest = Proposed.CallHierarchyRequest || (Proposed.CallHierarchyRequest = {}));
    let CallHierarchyDirection;
    (function (CallHierarchyDirection) {
        CallHierarchyDirection.CallsFrom = callHierarchy.CallHierarchyDirection.CallsFrom;
        CallHierarchyDirection.CallsTo = callHierarchy.CallHierarchyDirection.CallsTo;
    })(CallHierarchyDirection = Proposed.CallHierarchyDirection || (Proposed.CallHierarchyDirection = {}));
    let ProgressStartNotification;
    (function (ProgressStartNotification) {
        ProgressStartNotification.type = progress.ProgressStartNotification.type;
    })(ProgressStartNotification = Proposed.ProgressStartNotification || (Proposed.ProgressStartNotification = {}));
    let ProgressReportNotification;
    (function (ProgressReportNotification) {
        ProgressReportNotification.type = progress.ProgressReportNotification.type;
    })(ProgressReportNotification = Proposed.ProgressReportNotification || (Proposed.ProgressReportNotification = {}));
    let ProgressDoneNotification;
    (function (ProgressDoneNotification) {
        ProgressDoneNotification.type = progress.ProgressDoneNotification.type;
    })(ProgressDoneNotification = Proposed.ProgressDoneNotification || (Proposed.ProgressDoneNotification = {}));
    let ProgressCancelNotification;
    (function (ProgressCancelNotification) {
        ProgressCancelNotification.type = progress.ProgressCancelNotification.type;
    })(ProgressCancelNotification = Proposed.ProgressCancelNotification || (Proposed.ProgressCancelNotification = {}));
})(Proposed = exports.Proposed || (exports.Proposed = {}));
function createProtocolConnection(reader, writer, logger, strategy) {
    return vscode_jsonrpc_1.createMessageConnection(reader, writer, logger, strategy);
}
exports.createProtocolConnection = createProtocolConnection;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
/// <reference path="./thenable.ts" />

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Is = __webpack_require__(5);
const messages_1 = __webpack_require__(6);
exports.RequestType = messages_1.RequestType;
exports.RequestType0 = messages_1.RequestType0;
exports.RequestType1 = messages_1.RequestType1;
exports.RequestType2 = messages_1.RequestType2;
exports.RequestType3 = messages_1.RequestType3;
exports.RequestType4 = messages_1.RequestType4;
exports.RequestType5 = messages_1.RequestType5;
exports.RequestType6 = messages_1.RequestType6;
exports.RequestType7 = messages_1.RequestType7;
exports.RequestType8 = messages_1.RequestType8;
exports.RequestType9 = messages_1.RequestType9;
exports.ResponseError = messages_1.ResponseError;
exports.ErrorCodes = messages_1.ErrorCodes;
exports.NotificationType = messages_1.NotificationType;
exports.NotificationType0 = messages_1.NotificationType0;
exports.NotificationType1 = messages_1.NotificationType1;
exports.NotificationType2 = messages_1.NotificationType2;
exports.NotificationType3 = messages_1.NotificationType3;
exports.NotificationType4 = messages_1.NotificationType4;
exports.NotificationType5 = messages_1.NotificationType5;
exports.NotificationType6 = messages_1.NotificationType6;
exports.NotificationType7 = messages_1.NotificationType7;
exports.NotificationType8 = messages_1.NotificationType8;
exports.NotificationType9 = messages_1.NotificationType9;
const messageReader_1 = __webpack_require__(7);
exports.MessageReader = messageReader_1.MessageReader;
exports.StreamMessageReader = messageReader_1.StreamMessageReader;
exports.IPCMessageReader = messageReader_1.IPCMessageReader;
exports.SocketMessageReader = messageReader_1.SocketMessageReader;
const messageWriter_1 = __webpack_require__(9);
exports.MessageWriter = messageWriter_1.MessageWriter;
exports.StreamMessageWriter = messageWriter_1.StreamMessageWriter;
exports.IPCMessageWriter = messageWriter_1.IPCMessageWriter;
exports.SocketMessageWriter = messageWriter_1.SocketMessageWriter;
const events_1 = __webpack_require__(8);
exports.Disposable = events_1.Disposable;
exports.Event = events_1.Event;
exports.Emitter = events_1.Emitter;
const cancellation_1 = __webpack_require__(10);
exports.CancellationTokenSource = cancellation_1.CancellationTokenSource;
exports.CancellationToken = cancellation_1.CancellationToken;
const linkedMap_1 = __webpack_require__(11);
__export(__webpack_require__(12));
__export(__webpack_require__(17));
var CancelNotification;
(function (CancelNotification) {
    CancelNotification.type = new messages_1.NotificationType('$/cancelRequest');
})(CancelNotification || (CancelNotification = {}));
exports.NullLogger = Object.freeze({
    error: () => { },
    warn: () => { },
    info: () => { },
    log: () => { }
});
var Trace;
(function (Trace) {
    Trace[Trace["Off"] = 0] = "Off";
    Trace[Trace["Messages"] = 1] = "Messages";
    Trace[Trace["Verbose"] = 2] = "Verbose";
})(Trace = exports.Trace || (exports.Trace = {}));
(function (Trace) {
    function fromString(value) {
        value = value.toLowerCase();
        switch (value) {
            case 'off':
                return Trace.Off;
            case 'messages':
                return Trace.Messages;
            case 'verbose':
                return Trace.Verbose;
            default:
                return Trace.Off;
        }
    }
    Trace.fromString = fromString;
    function toString(value) {
        switch (value) {
            case Trace.Off:
                return 'off';
            case Trace.Messages:
                return 'messages';
            case Trace.Verbose:
                return 'verbose';
            default:
                return 'off';
        }
    }
    Trace.toString = toString;
})(Trace = exports.Trace || (exports.Trace = {}));
var TraceFormat;
(function (TraceFormat) {
    TraceFormat["Text"] = "text";
    TraceFormat["JSON"] = "json";
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
(function (TraceFormat) {
    function fromString(value) {
        value = value.toLowerCase();
        if (value === 'json') {
            return TraceFormat.JSON;
        }
        else {
            return TraceFormat.Text;
        }
    }
    TraceFormat.fromString = fromString;
})(TraceFormat = exports.TraceFormat || (exports.TraceFormat = {}));
var SetTraceNotification;
(function (SetTraceNotification) {
    SetTraceNotification.type = new messages_1.NotificationType('$/setTraceNotification');
})(SetTraceNotification = exports.SetTraceNotification || (exports.SetTraceNotification = {}));
var LogTraceNotification;
(function (LogTraceNotification) {
    LogTraceNotification.type = new messages_1.NotificationType('$/logTraceNotification');
})(LogTraceNotification = exports.LogTraceNotification || (exports.LogTraceNotification = {}));
var ConnectionErrors;
(function (ConnectionErrors) {
    /**
     * The connection is closed.
     */
    ConnectionErrors[ConnectionErrors["Closed"] = 1] = "Closed";
    /**
     * The connection got disposed.
     */
    ConnectionErrors[ConnectionErrors["Disposed"] = 2] = "Disposed";
    /**
     * The connection is already in listening mode.
     */
    ConnectionErrors[ConnectionErrors["AlreadyListening"] = 3] = "AlreadyListening";
})(ConnectionErrors = exports.ConnectionErrors || (exports.ConnectionErrors = {}));
class ConnectionError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, ConnectionError.prototype);
    }
}
exports.ConnectionError = ConnectionError;
var ConnectionStrategy;
(function (ConnectionStrategy) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.cancelUndispatched);
    }
    ConnectionStrategy.is = is;
})(ConnectionStrategy = exports.ConnectionStrategy || (exports.ConnectionStrategy = {}));
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["New"] = 1] = "New";
    ConnectionState[ConnectionState["Listening"] = 2] = "Listening";
    ConnectionState[ConnectionState["Closed"] = 3] = "Closed";
    ConnectionState[ConnectionState["Disposed"] = 4] = "Disposed";
})(ConnectionState || (ConnectionState = {}));
function _createMessageConnection(messageReader, messageWriter, logger, strategy) {
    let sequenceNumber = 0;
    let notificationSquenceNumber = 0;
    let unknownResponseSquenceNumber = 0;
    const version = '2.0';
    let starRequestHandler = undefined;
    let requestHandlers = Object.create(null);
    let starNotificationHandler = undefined;
    let notificationHandlers = Object.create(null);
    let timer;
    let messageQueue = new linkedMap_1.LinkedMap();
    let responsePromises = Object.create(null);
    let requestTokens = Object.create(null);
    let trace = Trace.Off;
    let traceFormat = TraceFormat.Text;
    let tracer;
    let state = ConnectionState.New;
    let errorEmitter = new events_1.Emitter();
    let closeEmitter = new events_1.Emitter();
    let unhandledNotificationEmitter = new events_1.Emitter();
    let disposeEmitter = new events_1.Emitter();
    function createRequestQueueKey(id) {
        return 'req-' + id.toString();
    }
    function createResponseQueueKey(id) {
        if (id === null) {
            return 'res-unknown-' + (++unknownResponseSquenceNumber).toString();
        }
        else {
            return 'res-' + id.toString();
        }
    }
    function createNotificationQueueKey() {
        return 'not-' + (++notificationSquenceNumber).toString();
    }
    function addMessageToQueue(queue, message) {
        if (messages_1.isRequestMessage(message)) {
            queue.set(createRequestQueueKey(message.id), message);
        }
        else if (messages_1.isResponseMessage(message)) {
            queue.set(createResponseQueueKey(message.id), message);
        }
        else {
            queue.set(createNotificationQueueKey(), message);
        }
    }
    function cancelUndispatched(_message) {
        return undefined;
    }
    function isListening() {
        return state === ConnectionState.Listening;
    }
    function isClosed() {
        return state === ConnectionState.Closed;
    }
    function isDisposed() {
        return state === ConnectionState.Disposed;
    }
    function closeHandler() {
        if (state === ConnectionState.New || state === ConnectionState.Listening) {
            state = ConnectionState.Closed;
            closeEmitter.fire(undefined);
        }
        // If the connection is disposed don't sent close events.
    }
    ;
    function readErrorHandler(error) {
        errorEmitter.fire([error, undefined, undefined]);
    }
    function writeErrorHandler(data) {
        errorEmitter.fire(data);
    }
    messageReader.onClose(closeHandler);
    messageReader.onError(readErrorHandler);
    messageWriter.onClose(closeHandler);
    messageWriter.onError(writeErrorHandler);
    function triggerMessageQueue() {
        if (timer || messageQueue.size === 0) {
            return;
        }
        timer = setImmediate(() => {
            timer = undefined;
            processMessageQueue();
        });
    }
    function processMessageQueue() {
        if (messageQueue.size === 0) {
            return;
        }
        let message = messageQueue.shift();
        try {
            if (messages_1.isRequestMessage(message)) {
                handleRequest(message);
            }
            else if (messages_1.isNotificationMessage(message)) {
                handleNotification(message);
            }
            else if (messages_1.isResponseMessage(message)) {
                handleResponse(message);
            }
            else {
                handleInvalidMessage(message);
            }
        }
        finally {
            triggerMessageQueue();
        }
    }
    let callback = (message) => {
        try {
            // We have received a cancellation message. Check if the message is still in the queue
            // and cancel it if allowed to do so.
            if (messages_1.isNotificationMessage(message) && message.method === CancelNotification.type.method) {
                let key = createRequestQueueKey(message.params.id);
                let toCancel = messageQueue.get(key);
                if (messages_1.isRequestMessage(toCancel)) {
                    let response = strategy && strategy.cancelUndispatched ? strategy.cancelUndispatched(toCancel, cancelUndispatched) : cancelUndispatched(toCancel);
                    if (response && (response.error !== void 0 || response.result !== void 0)) {
                        messageQueue.delete(key);
                        response.id = toCancel.id;
                        traceSendingResponse(response, message.method, Date.now());
                        messageWriter.write(response);
                        return;
                    }
                }
            }
            addMessageToQueue(messageQueue, message);
        }
        finally {
            triggerMessageQueue();
        }
    };
    function handleRequest(requestMessage) {
        if (isDisposed()) {
            // we return here silently since we fired an event when the
            // connection got disposed.
            return;
        }
        function reply(resultOrError, method, startTime) {
            let message = {
                jsonrpc: version,
                id: requestMessage.id
            };
            if (resultOrError instanceof messages_1.ResponseError) {
                message.error = resultOrError.toJson();
            }
            else {
                message.result = resultOrError === void 0 ? null : resultOrError;
            }
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        function replyError(error, method, startTime) {
            let message = {
                jsonrpc: version,
                id: requestMessage.id,
                error: error.toJson()
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        function replySuccess(result, method, startTime) {
            // The JSON RPC defines that a response must either have a result or an error
            // So we can't treat undefined as a valid response result.
            if (result === void 0) {
                result = null;
            }
            let message = {
                jsonrpc: version,
                id: requestMessage.id,
                result: result
            };
            traceSendingResponse(message, method, startTime);
            messageWriter.write(message);
        }
        traceReceivedRequest(requestMessage);
        let element = requestHandlers[requestMessage.method];
        let type;
        let requestHandler;
        if (element) {
            type = element.type;
            requestHandler = element.handler;
        }
        let startTime = Date.now();
        if (requestHandler || starRequestHandler) {
            let cancellationSource = new cancellation_1.CancellationTokenSource();
            let tokenKey = String(requestMessage.id);
            requestTokens[tokenKey] = cancellationSource;
            try {
                let handlerResult;
                if (requestMessage.params === void 0 || (type !== void 0 && type.numberOfParams === 0)) {
                    handlerResult = requestHandler
                        ? requestHandler(cancellationSource.token)
                        : starRequestHandler(requestMessage.method, cancellationSource.token);
                }
                else if (Is.array(requestMessage.params) && (type === void 0 || type.numberOfParams > 1)) {
                    handlerResult = requestHandler
                        ? requestHandler(...requestMessage.params, cancellationSource.token)
                        : starRequestHandler(requestMessage.method, ...requestMessage.params, cancellationSource.token);
                }
                else {
                    handlerResult = requestHandler
                        ? requestHandler(requestMessage.params, cancellationSource.token)
                        : starRequestHandler(requestMessage.method, requestMessage.params, cancellationSource.token);
                }
                let promise = handlerResult;
                if (!handlerResult) {
                    delete requestTokens[tokenKey];
                    replySuccess(handlerResult, requestMessage.method, startTime);
                }
                else if (promise.then) {
                    promise.then((resultOrError) => {
                        delete requestTokens[tokenKey];
                        reply(resultOrError, requestMessage.method, startTime);
                    }, error => {
                        delete requestTokens[tokenKey];
                        if (error instanceof messages_1.ResponseError) {
                            replyError(error, requestMessage.method, startTime);
                        }
                        else if (error && Is.string(error.message)) {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                        }
                        else {
                            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                        }
                    });
                }
                else {
                    delete requestTokens[tokenKey];
                    reply(handlerResult, requestMessage.method, startTime);
                }
            }
            catch (error) {
                delete requestTokens[tokenKey];
                if (error instanceof messages_1.ResponseError) {
                    reply(error, requestMessage.method, startTime);
                }
                else if (error && Is.string(error.message)) {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed with message: ${error.message}`), requestMessage.method, startTime);
                }
                else {
                    replyError(new messages_1.ResponseError(messages_1.ErrorCodes.InternalError, `Request ${requestMessage.method} failed unexpectedly without providing any details.`), requestMessage.method, startTime);
                }
            }
        }
        else {
            replyError(new messages_1.ResponseError(messages_1.ErrorCodes.MethodNotFound, `Unhandled method ${requestMessage.method}`), requestMessage.method, startTime);
        }
    }
    function handleResponse(responseMessage) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        if (responseMessage.id === null) {
            if (responseMessage.error) {
                logger.error(`Received response message without id: Error is: \n${JSON.stringify(responseMessage.error, undefined, 4)}`);
            }
            else {
                logger.error(`Received response message without id. No further error information provided.`);
            }
        }
        else {
            let key = String(responseMessage.id);
            let responsePromise = responsePromises[key];
            traceReceivedResponse(responseMessage, responsePromise);
            if (responsePromise) {
                delete responsePromises[key];
                try {
                    if (responseMessage.error) {
                        let error = responseMessage.error;
                        responsePromise.reject(new messages_1.ResponseError(error.code, error.message, error.data));
                    }
                    else if (responseMessage.result !== void 0) {
                        responsePromise.resolve(responseMessage.result);
                    }
                    else {
                        throw new Error('Should never happen.');
                    }
                }
                catch (error) {
                    if (error.message) {
                        logger.error(`Response handler '${responsePromise.method}' failed with message: ${error.message}`);
                    }
                    else {
                        logger.error(`Response handler '${responsePromise.method}' failed unexpectedly.`);
                    }
                }
            }
        }
    }
    function handleNotification(message) {
        if (isDisposed()) {
            // See handle request.
            return;
        }
        let type = undefined;
        let notificationHandler;
        if (message.method === CancelNotification.type.method) {
            notificationHandler = (params) => {
                let id = params.id;
                let source = requestTokens[String(id)];
                if (source) {
                    source.cancel();
                }
            };
        }
        else {
            let element = notificationHandlers[message.method];
            if (element) {
                notificationHandler = element.handler;
                type = element.type;
            }
        }
        if (notificationHandler || starNotificationHandler) {
            try {
                traceReceivedNotification(message);
                if (message.params === void 0 || (type !== void 0 && type.numberOfParams === 0)) {
                    notificationHandler ? notificationHandler() : starNotificationHandler(message.method);
                }
                else if (Is.array(message.params) && (type === void 0 || type.numberOfParams > 1)) {
                    notificationHandler ? notificationHandler(...message.params) : starNotificationHandler(message.method, ...message.params);
                }
                else {
                    notificationHandler ? notificationHandler(message.params) : starNotificationHandler(message.method, message.params);
                }
            }
            catch (error) {
                if (error.message) {
                    logger.error(`Notification handler '${message.method}' failed with message: ${error.message}`);
                }
                else {
                    logger.error(`Notification handler '${message.method}' failed unexpectedly.`);
                }
            }
        }
        else {
            unhandledNotificationEmitter.fire(message);
        }
    }
    function handleInvalidMessage(message) {
        if (!message) {
            logger.error('Received empty message.');
            return;
        }
        logger.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(message, null, 4)}`);
        // Test whether we find an id to reject the promise
        let responseMessage = message;
        if (Is.string(responseMessage.id) || Is.number(responseMessage.id)) {
            let key = String(responseMessage.id);
            let responseHandler = responsePromises[key];
            if (responseHandler) {
                responseHandler.reject(new Error('The received response has neither a result nor an error property.'));
            }
        }
    }
    function traceSendingRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose && message.params) {
                data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
            }
            tracer.log(`Sending request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('send-request', message);
        }
    }
    function traceSendingNotification(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.params) {
                    data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Sending notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('send-notification', message);
        }
    }
    function traceSendingResponse(message, method, startTime) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.error && message.error.data) {
                    data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
                    }
                    else if (message.error === void 0) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            tracer.log(`Sending response '${method} - (${message.id})'. Processing request took ${Date.now() - startTime}ms`, data);
        }
        else {
            logLSPMessage('send-response', message);
        }
    }
    function traceReceivedRequest(message) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose && message.params) {
                data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
            }
            tracer.log(`Received request '${message.method} - (${message.id})'.`, data);
        }
        else {
            logLSPMessage('receive-request', message);
        }
    }
    function traceReceivedNotification(message) {
        if (trace === Trace.Off || !tracer || message.method === LogTraceNotification.type.method) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.params) {
                    data = `Params: ${JSON.stringify(message.params, null, 4)}\n\n`;
                }
                else {
                    data = 'No parameters provided.\n\n';
                }
            }
            tracer.log(`Received notification '${message.method}'.`, data);
        }
        else {
            logLSPMessage('receive-notification', message);
        }
    }
    function traceReceivedResponse(message, responsePromise) {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        if (traceFormat === TraceFormat.Text) {
            let data = undefined;
            if (trace === Trace.Verbose) {
                if (message.error && message.error.data) {
                    data = `Error data: ${JSON.stringify(message.error.data, null, 4)}\n\n`;
                }
                else {
                    if (message.result) {
                        data = `Result: ${JSON.stringify(message.result, null, 4)}\n\n`;
                    }
                    else if (message.error === void 0) {
                        data = 'No result returned.\n\n';
                    }
                }
            }
            if (responsePromise) {
                let error = message.error ? ` Request failed: ${message.error.message} (${message.error.code}).` : '';
                tracer.log(`Received response '${responsePromise.method} - (${message.id})' in ${Date.now() - responsePromise.timerStart}ms.${error}`, data);
            }
            else {
                tracer.log(`Received response ${message.id} without active response promise.`, data);
            }
        }
        else {
            logLSPMessage('receive-response', message);
        }
    }
    function logLSPMessage(type, message) {
        if (!tracer || trace === Trace.Off) {
            return;
        }
        const lspMessage = {
            isLSPMessage: true,
            type,
            message,
            timestamp: Date.now()
        };
        tracer.log(lspMessage);
    }
    function throwIfClosedOrDisposed() {
        if (isClosed()) {
            throw new ConnectionError(ConnectionErrors.Closed, 'Connection is closed.');
        }
        if (isDisposed()) {
            throw new ConnectionError(ConnectionErrors.Disposed, 'Connection is disposed.');
        }
    }
    function throwIfListening() {
        if (isListening()) {
            throw new ConnectionError(ConnectionErrors.AlreadyListening, 'Connection is already listening');
        }
    }
    function throwIfNotListening() {
        if (!isListening()) {
            throw new Error('Call listen() first.');
        }
    }
    function undefinedToNull(param) {
        if (param === void 0) {
            return null;
        }
        else {
            return param;
        }
    }
    function computeMessageParams(type, params) {
        let result;
        let numberOfParams = type.numberOfParams;
        switch (numberOfParams) {
            case 0:
                result = null;
                break;
            case 1:
                result = undefinedToNull(params[0]);
                break;
            default:
                result = [];
                for (let i = 0; i < params.length && i < numberOfParams; i++) {
                    result.push(undefinedToNull(params[i]));
                }
                if (params.length < numberOfParams) {
                    for (let i = params.length; i < numberOfParams; i++) {
                        result.push(null);
                    }
                }
                break;
        }
        return result;
    }
    let connection = {
        sendNotification: (type, ...params) => {
            throwIfClosedOrDisposed();
            let method;
            let messageParams;
            if (Is.string(type)) {
                method = type;
                switch (params.length) {
                    case 0:
                        messageParams = null;
                        break;
                    case 1:
                        messageParams = params[0];
                        break;
                    default:
                        messageParams = params;
                        break;
                }
            }
            else {
                method = type.method;
                messageParams = computeMessageParams(type, params);
            }
            let notificationMessage = {
                jsonrpc: version,
                method: method,
                params: messageParams
            };
            traceSendingNotification(notificationMessage);
            messageWriter.write(notificationMessage);
        },
        onNotification: (type, handler) => {
            throwIfClosedOrDisposed();
            if (Is.func(type)) {
                starNotificationHandler = type;
            }
            else if (handler) {
                if (Is.string(type)) {
                    notificationHandlers[type] = { type: undefined, handler };
                }
                else {
                    notificationHandlers[type.method] = { type, handler };
                }
            }
        },
        sendRequest: (type, ...params) => {
            throwIfClosedOrDisposed();
            throwIfNotListening();
            let method;
            let messageParams;
            let token = undefined;
            if (Is.string(type)) {
                method = type;
                switch (params.length) {
                    case 0:
                        messageParams = null;
                        break;
                    case 1:
                        // The cancellation token is optional so it can also be undefined.
                        if (cancellation_1.CancellationToken.is(params[0])) {
                            messageParams = null;
                            token = params[0];
                        }
                        else {
                            messageParams = undefinedToNull(params[0]);
                        }
                        break;
                    default:
                        const last = params.length - 1;
                        if (cancellation_1.CancellationToken.is(params[last])) {
                            token = params[last];
                            if (params.length === 2) {
                                messageParams = undefinedToNull(params[0]);
                            }
                            else {
                                messageParams = params.slice(0, last).map(value => undefinedToNull(value));
                            }
                        }
                        else {
                            messageParams = params.map(value => undefinedToNull(value));
                        }
                        break;
                }
            }
            else {
                method = type.method;
                messageParams = computeMessageParams(type, params);
                let numberOfParams = type.numberOfParams;
                token = cancellation_1.CancellationToken.is(params[numberOfParams]) ? params[numberOfParams] : undefined;
            }
            let id = sequenceNumber++;
            let result = new Promise((resolve, reject) => {
                let requestMessage = {
                    jsonrpc: version,
                    id: id,
                    method: method,
                    params: messageParams
                };
                let responsePromise = { method: method, timerStart: Date.now(), resolve, reject };
                traceSendingRequest(requestMessage);
                try {
                    messageWriter.write(requestMessage);
                }
                catch (e) {
                    // Writing the message failed. So we need to reject the promise.
                    responsePromise.reject(new messages_1.ResponseError(messages_1.ErrorCodes.MessageWriteError, e.message ? e.message : 'Unknown reason'));
                    responsePromise = null;
                }
                if (responsePromise) {
                    responsePromises[String(id)] = responsePromise;
                }
            });
            if (token) {
                token.onCancellationRequested(() => {
                    connection.sendNotification(CancelNotification.type, { id });
                });
            }
            return result;
        },
        onRequest: (type, handler) => {
            throwIfClosedOrDisposed();
            if (Is.func(type)) {
                starRequestHandler = type;
            }
            else if (handler) {
                if (Is.string(type)) {
                    requestHandlers[type] = { type: undefined, handler };
                }
                else {
                    requestHandlers[type.method] = { type, handler };
                }
            }
        },
        trace: (_value, _tracer, sendNotificationOrTraceOptions) => {
            let _sendNotification = false;
            let _traceFormat = TraceFormat.Text;
            if (sendNotificationOrTraceOptions !== void 0) {
                if (Is.boolean(sendNotificationOrTraceOptions)) {
                    _sendNotification = sendNotificationOrTraceOptions;
                }
                else {
                    _sendNotification = sendNotificationOrTraceOptions.sendNotification || false;
                    _traceFormat = sendNotificationOrTraceOptions.traceFormat || TraceFormat.Text;
                }
            }
            trace = _value;
            traceFormat = _traceFormat;
            if (trace === Trace.Off) {
                tracer = undefined;
            }
            else {
                tracer = _tracer;
            }
            if (_sendNotification && !isClosed() && !isDisposed()) {
                connection.sendNotification(SetTraceNotification.type, { value: Trace.toString(_value) });
            }
        },
        onError: errorEmitter.event,
        onClose: closeEmitter.event,
        onUnhandledNotification: unhandledNotificationEmitter.event,
        onDispose: disposeEmitter.event,
        dispose: () => {
            if (isDisposed()) {
                return;
            }
            state = ConnectionState.Disposed;
            disposeEmitter.fire(undefined);
            let error = new Error('Connection got disposed.');
            Object.keys(responsePromises).forEach((key) => {
                responsePromises[key].reject(error);
            });
            responsePromises = Object.create(null);
            requestTokens = Object.create(null);
            messageQueue = new linkedMap_1.LinkedMap();
            // Test for backwards compatibility
            if (Is.func(messageWriter.dispose)) {
                messageWriter.dispose();
            }
            if (Is.func(messageReader.dispose)) {
                messageReader.dispose();
            }
        },
        listen: () => {
            throwIfClosedOrDisposed();
            throwIfListening();
            state = ConnectionState.Listening;
            messageReader.listen(callback);
        },
        inspect: () => {
            console.log("inspect");
        }
    };
    connection.onNotification(LogTraceNotification.type, (params) => {
        if (trace === Trace.Off || !tracer) {
            return;
        }
        tracer.log(params.message, trace === Trace.Verbose ? params.verbose : undefined);
    });
    return connection;
}
function isMessageReader(value) {
    return value.listen !== void 0 && value.read === void 0;
}
function isMessageWriter(value) {
    return value.write !== void 0 && value.end === void 0;
}
function createMessageConnection(input, output, logger, strategy) {
    if (!logger) {
        logger = exports.NullLogger;
    }
    let reader = isMessageReader(input) ? input : new messageReader_1.StreamMessageReader(input);
    let writer = isMessageWriter(output) ? output : new messageWriter_1.StreamMessageWriter(output);
    return _createMessageConnection(reader, writer, logger, strategy);
}
exports.createMessageConnection = createMessageConnection;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const is = __webpack_require__(5);
/**
 * Predefined error codes.
 */
var ErrorCodes;
(function (ErrorCodes) {
    // Defined by JSON RPC
    ErrorCodes.ParseError = -32700;
    ErrorCodes.InvalidRequest = -32600;
    ErrorCodes.MethodNotFound = -32601;
    ErrorCodes.InvalidParams = -32602;
    ErrorCodes.InternalError = -32603;
    ErrorCodes.serverErrorStart = -32099;
    ErrorCodes.serverErrorEnd = -32000;
    ErrorCodes.ServerNotInitialized = -32002;
    ErrorCodes.UnknownErrorCode = -32001;
    // Defined by the protocol.
    ErrorCodes.RequestCancelled = -32800;
    ErrorCodes.ContentModified = -32801;
    // Defined by VSCode library.
    ErrorCodes.MessageWriteError = 1;
    ErrorCodes.MessageReadError = 2;
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
/**
 * An error object return in a response in case a request
 * has failed.
 */
class ResponseError extends Error {
    constructor(code, message, data) {
        super(message);
        this.code = is.number(code) ? code : ErrorCodes.UnknownErrorCode;
        this.data = data;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    toJson() {
        return {
            code: this.code,
            message: this.message,
            data: this.data,
        };
    }
}
exports.ResponseError = ResponseError;
/**
 * An abstract implementation of a MessageType.
 */
class AbstractMessageType {
    constructor(_method, _numberOfParams) {
        this._method = _method;
        this._numberOfParams = _numberOfParams;
    }
    get method() {
        return this._method;
    }
    get numberOfParams() {
        return this._numberOfParams;
    }
}
exports.AbstractMessageType = AbstractMessageType;
/**
 * Classes to type request response pairs
 */
class RequestType0 extends AbstractMessageType {
    constructor(method) {
        super(method, 0);
        this._ = undefined;
    }
}
exports.RequestType0 = RequestType0;
class RequestType extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
        this._ = undefined;
    }
}
exports.RequestType = RequestType;
class RequestType1 extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
        this._ = undefined;
    }
}
exports.RequestType1 = RequestType1;
class RequestType2 extends AbstractMessageType {
    constructor(method) {
        super(method, 2);
        this._ = undefined;
    }
}
exports.RequestType2 = RequestType2;
class RequestType3 extends AbstractMessageType {
    constructor(method) {
        super(method, 3);
        this._ = undefined;
    }
}
exports.RequestType3 = RequestType3;
class RequestType4 extends AbstractMessageType {
    constructor(method) {
        super(method, 4);
        this._ = undefined;
    }
}
exports.RequestType4 = RequestType4;
class RequestType5 extends AbstractMessageType {
    constructor(method) {
        super(method, 5);
        this._ = undefined;
    }
}
exports.RequestType5 = RequestType5;
class RequestType6 extends AbstractMessageType {
    constructor(method) {
        super(method, 6);
        this._ = undefined;
    }
}
exports.RequestType6 = RequestType6;
class RequestType7 extends AbstractMessageType {
    constructor(method) {
        super(method, 7);
        this._ = undefined;
    }
}
exports.RequestType7 = RequestType7;
class RequestType8 extends AbstractMessageType {
    constructor(method) {
        super(method, 8);
        this._ = undefined;
    }
}
exports.RequestType8 = RequestType8;
class RequestType9 extends AbstractMessageType {
    constructor(method) {
        super(method, 9);
        this._ = undefined;
    }
}
exports.RequestType9 = RequestType9;
class NotificationType extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
        this._ = undefined;
    }
}
exports.NotificationType = NotificationType;
class NotificationType0 extends AbstractMessageType {
    constructor(method) {
        super(method, 0);
        this._ = undefined;
    }
}
exports.NotificationType0 = NotificationType0;
class NotificationType1 extends AbstractMessageType {
    constructor(method) {
        super(method, 1);
        this._ = undefined;
    }
}
exports.NotificationType1 = NotificationType1;
class NotificationType2 extends AbstractMessageType {
    constructor(method) {
        super(method, 2);
        this._ = undefined;
    }
}
exports.NotificationType2 = NotificationType2;
class NotificationType3 extends AbstractMessageType {
    constructor(method) {
        super(method, 3);
        this._ = undefined;
    }
}
exports.NotificationType3 = NotificationType3;
class NotificationType4 extends AbstractMessageType {
    constructor(method) {
        super(method, 4);
        this._ = undefined;
    }
}
exports.NotificationType4 = NotificationType4;
class NotificationType5 extends AbstractMessageType {
    constructor(method) {
        super(method, 5);
        this._ = undefined;
    }
}
exports.NotificationType5 = NotificationType5;
class NotificationType6 extends AbstractMessageType {
    constructor(method) {
        super(method, 6);
        this._ = undefined;
    }
}
exports.NotificationType6 = NotificationType6;
class NotificationType7 extends AbstractMessageType {
    constructor(method) {
        super(method, 7);
        this._ = undefined;
    }
}
exports.NotificationType7 = NotificationType7;
class NotificationType8 extends AbstractMessageType {
    constructor(method) {
        super(method, 8);
        this._ = undefined;
    }
}
exports.NotificationType8 = NotificationType8;
class NotificationType9 extends AbstractMessageType {
    constructor(method) {
        super(method, 9);
        this._ = undefined;
    }
}
exports.NotificationType9 = NotificationType9;
/**
 * Tests if the given message is a request message
 */
function isRequestMessage(message) {
    let candidate = message;
    return candidate && is.string(candidate.method) && (is.string(candidate.id) || is.number(candidate.id));
}
exports.isRequestMessage = isRequestMessage;
/**
 * Tests if the given message is a notification message
 */
function isNotificationMessage(message) {
    let candidate = message;
    return candidate && is.string(candidate.method) && message.id === void 0;
}
exports.isNotificationMessage = isNotificationMessage;
/**
 * Tests if the given message is a response message
 */
function isResponseMessage(message) {
    let candidate = message;
    return candidate && (candidate.result !== void 0 || !!candidate.error) && (is.string(candidate.id) || is.number(candidate.id) || candidate.id === null);
}
exports.isResponseMessage = isResponseMessage;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(8);
const Is = __webpack_require__(5);
let DefaultSize = 8192;
let CR = Buffer.from('\r', 'ascii')[0];
let LF = Buffer.from('\n', 'ascii')[0];
let CRLF = '\r\n';
class MessageBuffer {
    constructor(encoding = 'utf8') {
        this.encoding = encoding;
        this.index = 0;
        this.buffer = Buffer.allocUnsafe(DefaultSize);
    }
    append(chunk) {
        var toAppend = chunk;
        if (typeof (chunk) === 'string') {
            var str = chunk;
            var bufferLen = Buffer.byteLength(str, this.encoding);
            toAppend = Buffer.allocUnsafe(bufferLen);
            toAppend.write(str, 0, bufferLen, this.encoding);
        }
        if (this.buffer.length - this.index >= toAppend.length) {
            toAppend.copy(this.buffer, this.index, 0, toAppend.length);
        }
        else {
            var newSize = (Math.ceil((this.index + toAppend.length) / DefaultSize) + 1) * DefaultSize;
            if (this.index === 0) {
                this.buffer = Buffer.allocUnsafe(newSize);
                toAppend.copy(this.buffer, 0, 0, toAppend.length);
            }
            else {
                this.buffer = Buffer.concat([this.buffer.slice(0, this.index), toAppend], newSize);
            }
        }
        this.index += toAppend.length;
    }
    tryReadHeaders() {
        let result = undefined;
        let current = 0;
        while (current + 3 < this.index && (this.buffer[current] !== CR || this.buffer[current + 1] !== LF || this.buffer[current + 2] !== CR || this.buffer[current + 3] !== LF)) {
            current++;
        }
        // No header / body separator found (e.g CRLFCRLF)
        if (current + 3 >= this.index) {
            return result;
        }
        result = Object.create(null);
        let headers = this.buffer.toString('ascii', 0, current).split(CRLF);
        headers.forEach((header) => {
            let index = header.indexOf(':');
            if (index === -1) {
                throw new Error('Message header must separate key and value using :');
            }
            let key = header.substr(0, index);
            let value = header.substr(index + 1).trim();
            result[key] = value;
        });
        let nextStart = current + 4;
        this.buffer = this.buffer.slice(nextStart);
        this.index = this.index - nextStart;
        return result;
    }
    tryReadContent(length) {
        if (this.index < length) {
            return null;
        }
        let result = this.buffer.toString(this.encoding, 0, length);
        let nextStart = length;
        this.buffer.copy(this.buffer, 0, nextStart);
        this.index = this.index - nextStart;
        return result;
    }
    get numberOfBytes() {
        return this.index;
    }
}
var MessageReader;
(function (MessageReader) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.listen) && Is.func(candidate.dispose) &&
            Is.func(candidate.onError) && Is.func(candidate.onClose) && Is.func(candidate.onPartialMessage);
    }
    MessageReader.is = is;
})(MessageReader = exports.MessageReader || (exports.MessageReader = {}));
class AbstractMessageReader {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
        this.partialMessageEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error) {
        this.errorEmitter.fire(this.asError(error));
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    get onPartialMessage() {
        return this.partialMessageEmitter.event;
    }
    firePartialMessage(info) {
        this.partialMessageEmitter.fire(info);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Reader received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageReader = AbstractMessageReader;
class StreamMessageReader extends AbstractMessageReader {
    constructor(readable, encoding = 'utf8') {
        super();
        this.readable = readable;
        this.buffer = new MessageBuffer(encoding);
        this._partialMessageTimeout = 10000;
    }
    set partialMessageTimeout(timeout) {
        this._partialMessageTimeout = timeout;
    }
    get partialMessageTimeout() {
        return this._partialMessageTimeout;
    }
    listen(callback) {
        this.nextMessageLength = -1;
        this.messageToken = 0;
        this.partialMessageTimer = undefined;
        this.callback = callback;
        this.readable.on('data', (data) => {
            this.onData(data);
        });
        this.readable.on('error', (error) => this.fireError(error));
        this.readable.on('close', () => this.fireClose());
    }
    onData(data) {
        this.buffer.append(data);
        while (true) {
            if (this.nextMessageLength === -1) {
                let headers = this.buffer.tryReadHeaders();
                if (!headers) {
                    return;
                }
                let contentLength = headers['Content-Length'];
                if (!contentLength) {
                    throw new Error('Header must provide a Content-Length property.');
                }
                let length = parseInt(contentLength);
                if (isNaN(length)) {
                    throw new Error('Content-Length value must be a number.');
                }
                this.nextMessageLength = length;
                // Take the encoding form the header. For compatibility
                // treat both utf-8 and utf8 as node utf8
            }
            var msg = this.buffer.tryReadContent(this.nextMessageLength);
            if (msg === null) {
                /** We haven't received the full message yet. */
                this.setPartialMessageTimer();
                return;
            }
            this.clearPartialMessageTimer();
            this.nextMessageLength = -1;
            this.messageToken++;
            var json = JSON.parse(msg);
            this.callback(json);
        }
    }
    clearPartialMessageTimer() {
        if (this.partialMessageTimer) {
            clearTimeout(this.partialMessageTimer);
            this.partialMessageTimer = undefined;
        }
    }
    setPartialMessageTimer() {
        this.clearPartialMessageTimer();
        if (this._partialMessageTimeout <= 0) {
            return;
        }
        this.partialMessageTimer = setTimeout((token, timeout) => {
            this.partialMessageTimer = undefined;
            if (token === this.messageToken) {
                this.firePartialMessage({ messageToken: token, waitingTime: timeout });
                this.setPartialMessageTimer();
            }
        }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout);
    }
}
exports.StreamMessageReader = StreamMessageReader;
class IPCMessageReader extends AbstractMessageReader {
    constructor(process) {
        super();
        this.process = process;
        let eventEmitter = this.process;
        eventEmitter.on('error', (error) => this.fireError(error));
        eventEmitter.on('close', () => this.fireClose());
    }
    listen(callback) {
        this.process.on('message', callback);
    }
}
exports.IPCMessageReader = IPCMessageReader;
class SocketMessageReader extends StreamMessageReader {
    constructor(socket, encoding = 'utf-8') {
        super(socket, encoding);
    }
}
exports.SocketMessageReader = SocketMessageReader;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
var Disposable;
(function (Disposable) {
    function create(func) {
        return {
            dispose: func
        };
    }
    Disposable.create = create;
})(Disposable = exports.Disposable || (exports.Disposable = {}));
var Event;
(function (Event) {
    const _disposable = { dispose() { } };
    Event.None = function () { return _disposable; };
})(Event = exports.Event || (exports.Event = {}));
class CallbackList {
    add(callback, context = null, bucket) {
        if (!this._callbacks) {
            this._callbacks = [];
            this._contexts = [];
        }
        this._callbacks.push(callback);
        this._contexts.push(context);
        if (Array.isArray(bucket)) {
            bucket.push({ dispose: () => this.remove(callback, context) });
        }
    }
    remove(callback, context = null) {
        if (!this._callbacks) {
            return;
        }
        var foundCallbackWithDifferentContext = false;
        for (var i = 0, len = this._callbacks.length; i < len; i++) {
            if (this._callbacks[i] === callback) {
                if (this._contexts[i] === context) {
                    // callback & context match => remove it
                    this._callbacks.splice(i, 1);
                    this._contexts.splice(i, 1);
                    return;
                }
                else {
                    foundCallbackWithDifferentContext = true;
                }
            }
        }
        if (foundCallbackWithDifferentContext) {
            throw new Error('When adding a listener with a context, you should remove it with the same context');
        }
    }
    invoke(...args) {
        if (!this._callbacks) {
            return [];
        }
        var ret = [], callbacks = this._callbacks.slice(0), contexts = this._contexts.slice(0);
        for (var i = 0, len = callbacks.length; i < len; i++) {
            try {
                ret.push(callbacks[i].apply(contexts[i], args));
            }
            catch (e) {
                console.error(e);
            }
        }
        return ret;
    }
    isEmpty() {
        return !this._callbacks || this._callbacks.length === 0;
    }
    dispose() {
        this._callbacks = undefined;
        this._contexts = undefined;
    }
}
class Emitter {
    constructor(_options) {
        this._options = _options;
    }
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event() {
        if (!this._event) {
            this._event = (listener, thisArgs, disposables) => {
                if (!this._callbacks) {
                    this._callbacks = new CallbackList();
                }
                if (this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty()) {
                    this._options.onFirstListenerAdd(this);
                }
                this._callbacks.add(listener, thisArgs);
                let result;
                result = {
                    dispose: () => {
                        this._callbacks.remove(listener, thisArgs);
                        result.dispose = Emitter._noop;
                        if (this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty()) {
                            this._options.onLastListenerRemove(this);
                        }
                    }
                };
                if (Array.isArray(disposables)) {
                    disposables.push(result);
                }
                return result;
            };
        }
        return this._event;
    }
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event) {
        if (this._callbacks) {
            this._callbacks.invoke.call(this._callbacks, event);
        }
    }
    dispose() {
        if (this._callbacks) {
            this._callbacks.dispose();
            this._callbacks = undefined;
        }
    }
}
Emitter._noop = function () { };
exports.Emitter = Emitter;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(8);
const Is = __webpack_require__(5);
let ContentLength = 'Content-Length: ';
let CRLF = '\r\n';
var MessageWriter;
(function (MessageWriter) {
    function is(value) {
        let candidate = value;
        return candidate && Is.func(candidate.dispose) && Is.func(candidate.onClose) &&
            Is.func(candidate.onError) && Is.func(candidate.write);
    }
    MessageWriter.is = is;
})(MessageWriter = exports.MessageWriter || (exports.MessageWriter = {}));
class AbstractMessageWriter {
    constructor() {
        this.errorEmitter = new events_1.Emitter();
        this.closeEmitter = new events_1.Emitter();
    }
    dispose() {
        this.errorEmitter.dispose();
        this.closeEmitter.dispose();
    }
    get onError() {
        return this.errorEmitter.event;
    }
    fireError(error, message, count) {
        this.errorEmitter.fire([this.asError(error), message, count]);
    }
    get onClose() {
        return this.closeEmitter.event;
    }
    fireClose() {
        this.closeEmitter.fire(undefined);
    }
    asError(error) {
        if (error instanceof Error) {
            return error;
        }
        else {
            return new Error(`Writer received error. Reason: ${Is.string(error.message) ? error.message : 'unknown'}`);
        }
    }
}
exports.AbstractMessageWriter = AbstractMessageWriter;
class StreamMessageWriter extends AbstractMessageWriter {
    constructor(writable, encoding = 'utf8') {
        super();
        this.writable = writable;
        this.encoding = encoding;
        this.errorCount = 0;
        this.writable.on('error', (error) => this.fireError(error));
        this.writable.on('close', () => this.fireClose());
    }
    write(msg) {
        let json = JSON.stringify(msg);
        let contentLength = Buffer.byteLength(json, this.encoding);
        let headers = [
            ContentLength, contentLength.toString(), CRLF,
            CRLF
        ];
        try {
            // Header must be written in ASCII encoding
            this.writable.write(headers.join(''), 'ascii');
            // Now write the content. This can be written in any encoding
            this.writable.write(json, this.encoding);
            this.errorCount = 0;
        }
        catch (error) {
            this.errorCount++;
            this.fireError(error, msg, this.errorCount);
        }
    }
}
exports.StreamMessageWriter = StreamMessageWriter;
class IPCMessageWriter extends AbstractMessageWriter {
    constructor(process) {
        super();
        this.process = process;
        this.errorCount = 0;
        this.queue = [];
        this.sending = false;
        let eventEmitter = this.process;
        eventEmitter.on('error', (error) => this.fireError(error));
        eventEmitter.on('close', () => this.fireClose);
    }
    write(msg) {
        if (!this.sending && this.queue.length === 0) {
            // See https://github.com/nodejs/node/issues/7657
            this.doWriteMessage(msg);
        }
        else {
            this.queue.push(msg);
        }
    }
    doWriteMessage(msg) {
        try {
            if (this.process.send) {
                this.sending = true;
                this.process.send(msg, undefined, undefined, (error) => {
                    this.sending = false;
                    if (error) {
                        this.errorCount++;
                        this.fireError(error, msg, this.errorCount);
                    }
                    else {
                        this.errorCount = 0;
                    }
                    if (this.queue.length > 0) {
                        this.doWriteMessage(this.queue.shift());
                    }
                });
            }
        }
        catch (error) {
            this.errorCount++;
            this.fireError(error, msg, this.errorCount);
        }
    }
}
exports.IPCMessageWriter = IPCMessageWriter;
class SocketMessageWriter extends AbstractMessageWriter {
    constructor(socket, encoding = 'utf8') {
        super();
        this.socket = socket;
        this.queue = [];
        this.sending = false;
        this.encoding = encoding;
        this.errorCount = 0;
        this.socket.on('error', (error) => this.fireError(error));
        this.socket.on('close', () => this.fireClose());
    }
    dispose() {
        super.dispose();
        this.socket.destroy();
    }
    write(msg) {
        if (!this.sending && this.queue.length === 0) {
            // See https://github.com/nodejs/node/issues/7657
            this.doWriteMessage(msg);
        }
        else {
            this.queue.push(msg);
        }
    }
    doWriteMessage(msg) {
        let json = JSON.stringify(msg);
        let contentLength = Buffer.byteLength(json, this.encoding);
        let headers = [
            ContentLength, contentLength.toString(), CRLF,
            CRLF
        ];
        try {
            // Header must be written in ASCII encoding
            this.sending = true;
            this.socket.write(headers.join(''), 'ascii', (error) => {
                if (error) {
                    this.handleError(error, msg);
                }
                try {
                    // Now write the content. This can be written in any encoding
                    this.socket.write(json, this.encoding, (error) => {
                        this.sending = false;
                        if (error) {
                            this.handleError(error, msg);
                        }
                        else {
                            this.errorCount = 0;
                        }
                        if (this.queue.length > 0) {
                            this.doWriteMessage(this.queue.shift());
                        }
                    });
                }
                catch (error) {
                    this.handleError(error, msg);
                }
            });
        }
        catch (error) {
            this.handleError(error, msg);
        }
    }
    handleError(error, msg) {
        this.errorCount++;
        this.fireError(error, msg, this.errorCount);
    }
}
exports.SocketMessageWriter = SocketMessageWriter;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(8);
const Is = __webpack_require__(5);
var CancellationToken;
(function (CancellationToken) {
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: events_1.Event.None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: events_1.Event.None
    });
    function is(value) {
        let candidate = value;
        return candidate && (candidate === CancellationToken.None
            || candidate === CancellationToken.Cancelled
            || (Is.boolean(candidate.isCancellationRequested) && !!candidate.onCancellationRequested));
    }
    CancellationToken.is = is;
})(CancellationToken = exports.CancellationToken || (exports.CancellationToken = {}));
const shortcutEvent = Object.freeze(function (callback, context) {
    let handle = setTimeout(callback.bind(context), 0);
    return { dispose() { clearTimeout(handle); } };
});
class MutableToken {
    constructor() {
        this._isCancelled = false;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new events_1.Emitter();
        }
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = undefined;
        }
    }
}
class CancellationTokenSource {
    get token() {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }
    cancel() {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else {
            this._token.cancel();
        }
    }
    dispose() {
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    }
}
exports.CancellationTokenSource = CancellationTokenSource;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var Touch;
(function (Touch) {
    Touch.None = 0;
    Touch.First = 1;
    Touch.Last = 2;
})(Touch = exports.Touch || (exports.Touch = {}));
class LinkedMap {
    constructor() {
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        return item.value;
    }
    set(key, value, touch = Touch.None) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== Touch.None) {
                this.touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case Touch.None:
                    this.addItemLast(item);
                    break;
                case Touch.First:
                    this.addItemFirst(item);
                    break;
                case Touch.Last:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
    }
    delete(key) {
        const item = this._map.get(key);
        if (!item) {
            return false;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return true;
    }
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            current = current.next;
        }
    }
    forEachReverse(callbackfn, thisArg) {
        let current = this._tail;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            current = current.previous;
        }
    }
    values() {
        let result = [];
        let current = this._head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
    keys() {
        let result = [];
        let current = this._head;
        while (current) {
            result.push(current.key);
            current = current.next;
        }
        return result;
    }
    /* JSON RPC run on es5 which has no Symbol.iterator
    public keys(): IterableIterator<K> {
        let current = this._head;
        let iterator: IterableIterator<K> = {
            [Symbol.iterator]() {
                return iterator;
            },
            next():IteratorResult<K> {
                if (current) {
                    let result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }

    public values(): IterableIterator<V> {
        let current = this._head;
        let iterator: IterableIterator<V> = {
            [Symbol.iterator]() {
                return iterator;
            },
            next():IteratorResult<V> {
                if (current) {
                    let result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    */
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            this._head = item.next;
        }
        else if (item === this._tail) {
            this._tail = item.previous;
        }
        else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
    }
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if ((touch !== Touch.First && touch !== Touch.Last)) {
            return;
        }
        if (touch === Touch.First) {
            if (item === this._head) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
        }
        else if (touch === Touch.Last) {
            if (item === this._tail) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
        }
    }
}
exports.LinkedMap = LinkedMap;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(13);
const os_1 = __webpack_require__(14);
const crypto_1 = __webpack_require__(15);
const net_1 = __webpack_require__(16);
const messageReader_1 = __webpack_require__(7);
const messageWriter_1 = __webpack_require__(9);
function generateRandomPipeName() {
    const randomSuffix = crypto_1.randomBytes(21).toString('hex');
    if (process.platform === 'win32') {
        return `\\\\.\\pipe\\vscode-jsonrpc-${randomSuffix}-sock`;
    }
    else {
        // Mac/Unix: use socket file
        return path_1.join(os_1.tmpdir(), `vscode-${randomSuffix}.sock`);
    }
}
exports.generateRandomPipeName = generateRandomPipeName;
function createClientPipeTransport(pipeName, encoding = 'utf-8') {
    let connectResolve;
    let connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
    });
    return new Promise((resolve, reject) => {
        let server = net_1.createServer((socket) => {
            server.close();
            connectResolve([
                new messageReader_1.SocketMessageReader(socket, encoding),
                new messageWriter_1.SocketMessageWriter(socket, encoding)
            ]);
        });
        server.on('error', reject);
        server.listen(pipeName, () => {
            server.removeListener('error', reject);
            resolve({
                onConnected: () => { return connected; }
            });
        });
    });
}
exports.createClientPipeTransport = createClientPipeTransport;
function createServerPipeTransport(pipeName, encoding = 'utf-8') {
    const socket = net_1.createConnection(pipeName);
    return [
        new messageReader_1.SocketMessageReader(socket, encoding),
        new messageWriter_1.SocketMessageWriter(socket, encoding)
    ];
}
exports.createServerPipeTransport = createServerPipeTransport;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const net_1 = __webpack_require__(16);
const messageReader_1 = __webpack_require__(7);
const messageWriter_1 = __webpack_require__(9);
function createClientSocketTransport(port, encoding = 'utf-8') {
    let connectResolve;
    let connected = new Promise((resolve, _reject) => {
        connectResolve = resolve;
    });
    return new Promise((resolve, reject) => {
        let server = net_1.createServer((socket) => {
            server.close();
            connectResolve([
                new messageReader_1.SocketMessageReader(socket, encoding),
                new messageWriter_1.SocketMessageWriter(socket, encoding)
            ]);
        });
        server.on('error', reject);
        server.listen(port, '127.0.0.1', () => {
            server.removeListener('error', reject);
            resolve({
                onConnected: () => { return connected; }
            });
        });
    });
}
exports.createClientSocketTransport = createClientSocketTransport;
function createServerSocketTransport(port, encoding = 'utf-8') {
    const socket = net_1.createConnection(port, '127.0.0.1');
    return [
        new messageReader_1.SocketMessageReader(socket, encoding),
        new messageWriter_1.SocketMessageWriter(socket, encoding)
    ];
}
exports.createServerSocketTransport = createServerSocketTransport;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Location", function() { return Location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationLink", function() { return LocationLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorInformation", function() { return ColorInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorPresentation", function() { return ColorPresentation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRangeKind", function() { return FoldingRangeKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoldingRange", function() { return FoldingRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticRelatedInformation", function() { return DiagnosticRelatedInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticSeverity", function() { return DiagnosticSeverity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiagnosticTag", function() { return DiagnosticTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Diagnostic", function() { return Diagnostic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Command", function() { return Command; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextEdit", function() { return TextEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentEdit", function() { return TextDocumentEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateFile", function() { return CreateFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenameFile", function() { return RenameFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteFile", function() { return DeleteFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceEdit", function() { return WorkspaceEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorkspaceChange", function() { return WorkspaceChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentIdentifier", function() { return TextDocumentIdentifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VersionedTextDocumentIdentifier", function() { return VersionedTextDocumentIdentifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentItem", function() { return TextDocumentItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupKind", function() { return MarkupKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkupContent", function() { return MarkupContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItemKind", function() { return CompletionItemKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertTextFormat", function() { return InsertTextFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionItem", function() { return CompletionItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompletionList", function() { return CompletionList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkedString", function() { return MarkedString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hover", function() { return Hover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParameterInformation", function() { return ParameterInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureInformation", function() { return SignatureInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlightKind", function() { return DocumentHighlightKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentHighlight", function() { return DocumentHighlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolKind", function() { return SymbolKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SymbolInformation", function() { return SymbolInformation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentSymbol", function() { return DocumentSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionKind", function() { return CodeActionKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeActionContext", function() { return CodeActionContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeAction", function() { return CodeAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CodeLens", function() { return CodeLens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattingOptions", function() { return FormattingOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentLink", function() { return DocumentLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOL", function() { return EOL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocument", function() { return TextDocument; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDocumentSaveReason", function() { return TextDocumentSaveReason; });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */
var Position;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position.is = is;
})(Position || (Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        }
        else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        }
        else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (Location = {}));
/**
 * The LocationLink namespace provides helper functions to work with
 * [LocationLink](#LocationLink) literals.
 */
var LocationLink;
(function (LocationLink) {
    /**
     * Creates a LocationLink literal.
     * @param targetUri The definition's uri.
     * @param targetRange The full range of the definition.
     * @param targetSelectionRange The span of the symbol definition at the target.
     * @param originSelectionRange The span of the symbol being defined in the originating source file.
     */
    function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
        return { targetUri: targetUri, targetRange: targetRange, targetSelectionRange: targetSelectionRange, originSelectionRange: originSelectionRange };
    }
    LocationLink.create = create;
    /**
     * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri)
            && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange))
            && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
    }
    LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
/**
 * The Color namespace provides helper functions to work with
 * [Color](#Color) literals.
 */
var Color;
(function (Color) {
    /**
     * Creates a new Color literal.
     */
    function create(red, green, blue, alpha) {
        return {
            red: red,
            green: green,
            blue: blue,
            alpha: alpha,
        };
    }
    Color.create = create;
    /**
     * Checks whether the given literal conforms to the [Color](#Color) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.number(candidate.red)
            && Is.number(candidate.green)
            && Is.number(candidate.blue)
            && Is.number(candidate.alpha);
    }
    Color.is = is;
})(Color || (Color = {}));
/**
 * The ColorInformation namespace provides helper functions to work with
 * [ColorInformation](#ColorInformation) literals.
 */
var ColorInformation;
(function (ColorInformation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(range, color) {
        return {
            range: range,
            color: color,
        };
    }
    ColorInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Range.is(candidate.range) && Color.is(candidate.color);
    }
    ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
/**
 * The Color namespace provides helper functions to work with
 * [ColorPresentation](#ColorPresentation) literals.
 */
var ColorPresentation;
(function (ColorPresentation) {
    /**
     * Creates a new ColorInformation literal.
     */
    function create(label, textEdit, additionalTextEdits) {
        return {
            label: label,
            textEdit: textEdit,
            additionalTextEdits: additionalTextEdits,
        };
    }
    ColorPresentation.create = create;
    /**
     * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate.label)
            && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate))
            && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
    }
    ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
/**
 * Enum of known range kinds
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
/**
 * The folding range namespace provides helper functions to work with
 * [FoldingRange](#FoldingRange) literals.
 */
var FoldingRange;
(function (FoldingRange) {
    /**
     * Creates a new FoldingRange literal.
     */
    function create(startLine, endLine, startCharacter, endCharacter, kind) {
        var result = {
            startLine: startLine,
            endLine: endLine
        };
        if (Is.defined(startCharacter)) {
            result.startCharacter = startCharacter;
        }
        if (Is.defined(endCharacter)) {
            result.endCharacter = endCharacter;
        }
        if (Is.defined(kind)) {
            result.kind = kind;
        }
        return result;
    }
    FoldingRange.create = create;
    /**
     * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.number(candidate.startLine) && Is.number(candidate.startLine)
            && (Is.undefined(candidate.startCharacter) || Is.number(candidate.startCharacter))
            && (Is.undefined(candidate.endCharacter) || Is.number(candidate.endCharacter))
            && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
    }
    FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
/**
 * The DiagnosticRelatedInformation namespace provides helper functions to work with
 * [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) literals.
 */
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
    /**
     * Creates a new DiagnosticRelatedInformation literal.
     */
    function create(location, message) {
        return {
            location: location,
            message: message
        };
    }
    DiagnosticRelatedInformation.create = create;
    /**
     * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
    }
    DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
/**
 * The diagnostic's severity.
 */
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
var DiagnosticTag;
(function (DiagnosticTag) {
    /**
     * Unused or unnecessary code.
     *
     * Clients are allowed to render diagnostics with this tag faded out instead of having
     * an error squiggle.
     */
    DiagnosticTag.Unnecessary = 1;
})(DiagnosticTag || (DiagnosticTag = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source, relatedInformation) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        if (Is.defined(relatedInformation)) {
            result.relatedInformation = relatedInformation;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && Range.is(candidate.range)
            && Is.string(candidate.message)
            && (Is.number(candidate.severity) || Is.undefined(candidate.severity))
            && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code))
            && (Is.string(candidate.source) || Is.undefined(candidate.source))
            && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
    }
    Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
    }
    Command.is = is;
})(Command || (Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(candidate)
            && Is.string(candidate.newText)
            && Range.is(candidate.range);
    }
    TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate)
            && VersionedTextDocumentIdentifier.is(candidate.textDocument)
            && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
    function create(uri, options) {
        var result = {
            kind: 'create',
            uri: uri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    CreateFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'create' && Is.string(candidate.uri) &&
            (candidate.options === void 0 ||
                ((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
    }
    CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
    function create(oldUri, newUri, options) {
        var result = {
            kind: 'rename',
            oldUri: oldUri,
            newUri: newUri
        };
        if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    RenameFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) &&
            (candidate.options === void 0 ||
                ((candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))));
    }
    RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
    function create(uri, options) {
        var result = {
            kind: 'delete',
            uri: uri
        };
        if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) {
            result.options = options;
        }
        return result;
    }
    DeleteFile.create = create;
    function is(value) {
        var candidate = value;
        return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) &&
            (candidate.options === void 0 ||
                ((candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))));
    }
    DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function is(value) {
        var candidate = value;
        return candidate &&
            (candidate.changes !== void 0 || candidate.documentChanges !== void 0) &&
            (candidate.documentChanges === void 0 || candidate.documentChanges.every(function (change) {
                if (Is.string(change.kind)) {
                    return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
                }
                else {
                    return TextDocumentEdit.is(change);
                }
            }));
    }
    WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = /** @class */ (function () {
    function TextEditChangeImpl(edits) {
        this.edits = edits;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText) {
        this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl.prototype.replace = function (range, newText) {
        this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl.prototype.delete = function (range) {
        this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl;
}());
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */ (function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                workspaceEdit.documentChanges.forEach(function (change) {
                    if (TextDocumentEdit.is(change)) {
                        var textEditChange = new TextEditChangeImpl(change.edits);
                        _this._textEditChanges[change.textDocument.uri] = textEditChange;
                    }
                });
            }
            else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function () {
            return this._workspaceEdit;
        },
        enumerable: true,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (VersionedTextDocumentIdentifier.is(key)) {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    documentChanges: []
                };
            }
            if (!this._workspaceEdit.documentChanges) {
                throw new Error('Workspace edit is not configured for document changes.');
            }
            var textDocument = key;
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        }
        else {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    changes: Object.create(null)
                };
            }
            if (!this._workspaceEdit.changes) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    WorkspaceChange.prototype.createFile = function (uri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(CreateFile.create(uri, options));
    };
    WorkspaceChange.prototype.renameFile = function (oldUri, newUri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(RenameFile.create(oldUri, newUri, options));
    };
    WorkspaceChange.prototype.deleteFile = function (uri, options) {
        this.checkDocumentChanges();
        this._workspaceEdit.documentChanges.push(DeleteFile.create(uri, options));
    };
    WorkspaceChange.prototype.checkDocumentChanges = function () {
        if (!this._workspaceEdit || !this._workspaceEdit.documentChanges) {
            throw new Error('Workspace edit is not configured for document changes.');
        }
    };
    return WorkspaceChange;
}());

/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.number(candidate.version));
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind || (MarkupKind = {}));
(function (MarkupKind) {
    /**
     * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
     */
    function is(value) {
        var candidate = value;
        return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
    }
    MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
    /**
     * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
    }
    MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
    /**
     * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
     */
    function is(value) {
        var candidate = value;
        return Is.string(candidate) || (Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value));
    }
    MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
    /**
     * Checks whether the given value conforms to the [Hover](#Hover) interface.
     */
    function is(value) {
        var candidate = value;
        return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) ||
            MarkedString.is(candidate.contents) ||
            Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
    }
    Hover.is = is;
})(Hover || (Hover = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
    ;
})(ParameterInformation || (ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        }
        else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolInformation;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containing the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
/**
 * Represents programming constructs like variables, classes, interfaces etc.
 * that appear in a document. Document symbols can be hierarchical and they
 * have two ranges: one that encloses its definition and one that points to
 * its most interesting range, e.g. the range of an identifier.
 */
var DocumentSymbol = /** @class */ (function () {
    function DocumentSymbol() {
    }
    return DocumentSymbol;
}());

(function (DocumentSymbol) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param detail The detail of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the symbol.
     * @param selectionRange The selectionRange of the symbol.
     * @param children Children of the symbol.
     */
    function create(name, detail, kind, range, selectionRange, children) {
        var result = {
            name: name,
            detail: detail,
            kind: kind,
            range: range,
            selectionRange: selectionRange
        };
        if (children !== void 0) {
            result.children = children;
        }
        return result;
    }
    DocumentSymbol.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
     */
    function is(value) {
        var candidate = value;
        return candidate &&
            Is.string(candidate.name) && Is.number(candidate.kind) &&
            Range.is(candidate.range) && Range.is(candidate.selectionRange) &&
            (candidate.detail === void 0 || Is.string(candidate.detail)) &&
            (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) &&
            (candidate.children === void 0 || Array.isArray(candidate.children));
    }
    DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
/**
 * A set of predefined code action kinds
 */
var CodeActionKind;
(function (CodeActionKind) {
    /**
     * Base kind for quickfix actions: 'quickfix'
     */
    CodeActionKind.QuickFix = 'quickfix';
    /**
     * Base kind for refactoring actions: 'refactor'
     */
    CodeActionKind.Refactor = 'refactor';
    /**
     * Base kind for refactoring extraction actions: 'refactor.extract'
     *
     * Example extract actions:
     *
     * - Extract method
     * - Extract function
     * - Extract variable
     * - Extract interface from class
     * - ...
     */
    CodeActionKind.RefactorExtract = 'refactor.extract';
    /**
     * Base kind for refactoring inline actions: 'refactor.inline'
     *
     * Example inline actions:
     *
     * - Inline function
     * - Inline variable
     * - Inline constant
     * - ...
     */
    CodeActionKind.RefactorInline = 'refactor.inline';
    /**
     * Base kind for refactoring rewrite actions: 'refactor.rewrite'
     *
     * Example rewrite actions:
     *
     * - Convert JavaScript function to class
     * - Add or remove parameter
     * - Encapsulate field
     * - Make method static
     * - Move method to base class
     * - ...
     */
    CodeActionKind.RefactorRewrite = 'refactor.rewrite';
    /**
     * Base kind for source actions: `source`
     *
     * Source code actions apply to the entire file.
     */
    CodeActionKind.Source = 'source';
    /**
     * Base kind for an organize imports source action: `source.organizeImports`
     */
    CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
})(CodeActionKind || (CodeActionKind = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics, only) {
        var result = { diagnostics: diagnostics };
        if (only !== void 0 && only !== null) {
            result.only = only;
        }
        return result;
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string));
    }
    CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
    function create(title, commandOrEdit, kind) {
        var result = { title: title };
        if (Command.is(commandOrEdit)) {
            result.command = commandOrEdit;
        }
        else {
            result.edit = commandOrEdit;
        }
        if (kind !== void null) {
            result.kind = kind;
        }
        return result;
    }
    CodeAction.create = create;
    function is(value) {
        var candidate = value;
        return candidate && Is.string(candidate.title) &&
            (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) &&
            (candidate.kind === void 0 || Is.string(candidate.kind)) &&
            (candidate.edit !== void 0 || candidate.command !== void 0) &&
            (candidate.command === void 0 || Command.is(candidate.command)) &&
            (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
    }
    CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data))
            result.data = data;
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
/**
 * A document link is a range in a text document that links to an internal or external resource, like another
 * text document or a web site.
 */
var DocumentLink = /** @class */ (function () {
    function DocumentLink() {
    }
    return DocumentLink;
}());

/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */
(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target, data) {
        return { range: range, target: target, data: data };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
var EOL = ['\n', '\r\n', '\r'];
var TextDocument;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount)
            && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return diff;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            }
            else {
                throw new Error('Overlapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = (data.length / 2) | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            }
            else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (TextDocument = {}));
/**
 * Represents reasons why a text document is saved.
 */
var TextDocumentSaveReason;
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason || (TextDocumentSaveReason = {}));
var FullTextDocument = /** @class */ (function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = null;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function () {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function () {
            return this._languageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = null;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === null) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = (ch === '\r' || ch === '\n');
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0, high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            }
            else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        }
        else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = (position.line + 1 < lineOffsets.length) ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function () {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    return FullTextDocument;
}());
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function objectLiteral(value) {
        // Strictly speaking class instances pass this check as well. Since the LSP
        // doesn't use classes we ignore this for now. If we do we need to add something
        // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
        return value !== null && typeof value === 'object';
    }
    Is.objectLiteral = objectLiteral;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const Is = __webpack_require__(20);
const vscode_jsonrpc_1 = __webpack_require__(4);
const protocol_implementation_1 = __webpack_require__(21);
exports.ImplementationRequest = protocol_implementation_1.ImplementationRequest;
const protocol_typeDefinition_1 = __webpack_require__(22);
exports.TypeDefinitionRequest = protocol_typeDefinition_1.TypeDefinitionRequest;
const protocol_workspaceFolders_1 = __webpack_require__(23);
exports.WorkspaceFoldersRequest = protocol_workspaceFolders_1.WorkspaceFoldersRequest;
exports.DidChangeWorkspaceFoldersNotification = protocol_workspaceFolders_1.DidChangeWorkspaceFoldersNotification;
const protocol_configuration_1 = __webpack_require__(24);
exports.ConfigurationRequest = protocol_configuration_1.ConfigurationRequest;
const protocol_colorProvider_1 = __webpack_require__(25);
exports.DocumentColorRequest = protocol_colorProvider_1.DocumentColorRequest;
exports.ColorPresentationRequest = protocol_colorProvider_1.ColorPresentationRequest;
const protocol_foldingRange_1 = __webpack_require__(26);
exports.FoldingRangeRequest = protocol_foldingRange_1.FoldingRangeRequest;
const protocol_declaration_1 = __webpack_require__(27);
exports.DeclarationRequest = protocol_declaration_1.DeclarationRequest;
// @ts-ignore: to avoid inlining LocatioLink as dynamic import
let __noDynamicImport;
var DocumentFilter;
(function (DocumentFilter) {
    function is(value) {
        let candidate = value;
        return Is.string(candidate.language) || Is.string(candidate.scheme) || Is.string(candidate.pattern);
    }
    DocumentFilter.is = is;
})(DocumentFilter = exports.DocumentFilter || (exports.DocumentFilter = {}));
/**
 * The `client/registerCapability` request is sent from the server to the client to register a new capability
 * handler on the client side.
 */
var RegistrationRequest;
(function (RegistrationRequest) {
    RegistrationRequest.type = new vscode_jsonrpc_1.RequestType('client/registerCapability');
})(RegistrationRequest = exports.RegistrationRequest || (exports.RegistrationRequest = {}));
/**
 * The `client/unregisterCapability` request is sent from the server to the client to unregister a previously registered capability
 * handler on the client side.
 */
var UnregistrationRequest;
(function (UnregistrationRequest) {
    UnregistrationRequest.type = new vscode_jsonrpc_1.RequestType('client/unregisterCapability');
})(UnregistrationRequest = exports.UnregistrationRequest || (exports.UnregistrationRequest = {}));
var ResourceOperationKind;
(function (ResourceOperationKind) {
    /**
     * Supports creating new files and folders.
     */
    ResourceOperationKind.Create = 'create';
    /**
     * Supports renaming existing files and folders.
     */
    ResourceOperationKind.Rename = 'rename';
    /**
     * Supports deleting existing files and folders.
     */
    ResourceOperationKind.Delete = 'delete';
})(ResourceOperationKind = exports.ResourceOperationKind || (exports.ResourceOperationKind = {}));
var FailureHandlingKind;
(function (FailureHandlingKind) {
    /**
     * Applying the workspace change is simply aborted if one of the changes provided
     * fails. All operations executed before the failing operation stay executed.
     */
    FailureHandlingKind.Abort = 'abort';
    /**
     * All operations are executed transactional. That means they either all
     * succeed or no changes at all are applied to the workspace.
     */
    FailureHandlingKind.Transactional = 'transactional';
    /**
     * If the workspace edit contains only textual file changes they are executed transactional.
     * If resource changes (create, rename or delete file) are part of the change the failure
     * handling startegy is abort.
     */
    FailureHandlingKind.TextOnlyTransactional = 'textOnlyTransactional';
    /**
     * The client tries to undo the operations already executed. But there is no
     * guaruntee that this is succeeding.
     */
    FailureHandlingKind.Undo = 'undo';
})(FailureHandlingKind = exports.FailureHandlingKind || (exports.FailureHandlingKind = {}));
/**
 * Defines how the host (editor) should sync
 * document changes to the language server.
 */
var TextDocumentSyncKind;
(function (TextDocumentSyncKind) {
    /**
     * Documents should not be synced at all.
     */
    TextDocumentSyncKind.None = 0;
    /**
     * Documents are synced by always sending the full content
     * of the document.
     */
    TextDocumentSyncKind.Full = 1;
    /**
     * Documents are synced by sending the full content on open.
     * After that only incremental updates to the document are
     * send.
     */
    TextDocumentSyncKind.Incremental = 2;
})(TextDocumentSyncKind = exports.TextDocumentSyncKind || (exports.TextDocumentSyncKind = {}));
/**
 * The initialize request is sent from the client to the server.
 * It is sent once as the request after starting up the server.
 * The requests parameter is of type [InitializeParams](#InitializeParams)
 * the response if of type [InitializeResult](#InitializeResult) of a Thenable that
 * resolves to such.
 */
var InitializeRequest;
(function (InitializeRequest) {
    InitializeRequest.type = new vscode_jsonrpc_1.RequestType('initialize');
})(InitializeRequest = exports.InitializeRequest || (exports.InitializeRequest = {}));
/**
 * Known error codes for an `InitializeError`;
 */
var InitializeError;
(function (InitializeError) {
    /**
     * If the protocol version provided by the client can't be handled by the server.
     * @deprecated This initialize error got replaced by client capabilities. There is
     * no version handshake in version 3.0x
     */
    InitializeError.unknownProtocolVersion = 1;
})(InitializeError = exports.InitializeError || (exports.InitializeError = {}));
/**
 * The intialized notification is sent from the client to the
 * server after the client is fully initialized and the server
 * is allowed to send requests from the server to the client.
 */
var InitializedNotification;
(function (InitializedNotification) {
    InitializedNotification.type = new vscode_jsonrpc_1.NotificationType('initialized');
})(InitializedNotification = exports.InitializedNotification || (exports.InitializedNotification = {}));
//---- Shutdown Method ----
/**
 * A shutdown request is sent from the client to the server.
 * It is sent once when the client decides to shutdown the
 * server. The only notification that is sent after a shutdown request
 * is the exit event.
 */
var ShutdownRequest;
(function (ShutdownRequest) {
    ShutdownRequest.type = new vscode_jsonrpc_1.RequestType0('shutdown');
})(ShutdownRequest = exports.ShutdownRequest || (exports.ShutdownRequest = {}));
//---- Exit Notification ----
/**
 * The exit event is sent from the client to the server to
 * ask the server to exit its process.
 */
var ExitNotification;
(function (ExitNotification) {
    ExitNotification.type = new vscode_jsonrpc_1.NotificationType0('exit');
})(ExitNotification = exports.ExitNotification || (exports.ExitNotification = {}));
//---- Configuration notification ----
/**
 * The configuration change notification is sent from the client to the server
 * when the client's configuration has changed. The notification contains
 * the changed configuration as defined by the language client.
 */
var DidChangeConfigurationNotification;
(function (DidChangeConfigurationNotification) {
    DidChangeConfigurationNotification.type = new vscode_jsonrpc_1.NotificationType('workspace/didChangeConfiguration');
})(DidChangeConfigurationNotification = exports.DidChangeConfigurationNotification || (exports.DidChangeConfigurationNotification = {}));
//---- Message show and log notifications ----
/**
 * The message type
 */
var MessageType;
(function (MessageType) {
    /**
     * An error message.
     */
    MessageType.Error = 1;
    /**
     * A warning message.
     */
    MessageType.Warning = 2;
    /**
     * An information message.
     */
    MessageType.Info = 3;
    /**
     * A log message.
     */
    MessageType.Log = 4;
})(MessageType = exports.MessageType || (exports.MessageType = {}));
/**
 * The show message notification is sent from a server to a client to ask
 * the client to display a particular message in the user interface.
 */
var ShowMessageNotification;
(function (ShowMessageNotification) {
    ShowMessageNotification.type = new vscode_jsonrpc_1.NotificationType('window/showMessage');
})(ShowMessageNotification = exports.ShowMessageNotification || (exports.ShowMessageNotification = {}));
/**
 * The show message request is sent from the server to the client to show a message
 * and a set of options actions to the user.
 */
var ShowMessageRequest;
(function (ShowMessageRequest) {
    ShowMessageRequest.type = new vscode_jsonrpc_1.RequestType('window/showMessageRequest');
})(ShowMessageRequest = exports.ShowMessageRequest || (exports.ShowMessageRequest = {}));
/**
 * The log message notification is sent from the server to the client to ask
 * the client to log a particular message.
 */
var LogMessageNotification;
(function (LogMessageNotification) {
    LogMessageNotification.type = new vscode_jsonrpc_1.NotificationType('window/logMessage');
})(LogMessageNotification = exports.LogMessageNotification || (exports.LogMessageNotification = {}));
//---- Telemetry notification
/**
 * The telemetry event notification is sent from the server to the client to ask
 * the client to log telemetry data.
 */
var TelemetryEventNotification;
(function (TelemetryEventNotification) {
    TelemetryEventNotification.type = new vscode_jsonrpc_1.NotificationType('telemetry/event');
})(TelemetryEventNotification = exports.TelemetryEventNotification || (exports.TelemetryEventNotification = {}));
/**
 * The document open notification is sent from the client to the server to signal
 * newly opened text documents. The document's truth is now managed by the client
 * and the server must not try to read the document's truth using the document's
 * uri. Open in this sense means it is managed by the client. It doesn't necessarily
 * mean that its content is presented in an editor. An open notification must not
 * be sent more than once without a corresponding close notification send before.
 * This means open and close notification must be balanced and the max open count
 * is one.
 */
var DidOpenTextDocumentNotification;
(function (DidOpenTextDocumentNotification) {
    DidOpenTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didOpen');
})(DidOpenTextDocumentNotification = exports.DidOpenTextDocumentNotification || (exports.DidOpenTextDocumentNotification = {}));
/**
 * The document change notification is sent from the client to the server to signal
 * changes to a text document.
 */
var DidChangeTextDocumentNotification;
(function (DidChangeTextDocumentNotification) {
    DidChangeTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didChange');
})(DidChangeTextDocumentNotification = exports.DidChangeTextDocumentNotification || (exports.DidChangeTextDocumentNotification = {}));
/**
 * The document close notification is sent from the client to the server when
 * the document got closed in the client. The document's truth now exists where
 * the document's uri points to (e.g. if the document's uri is a file uri the
 * truth now exists on disk). As with the open notification the close notification
 * is about managing the document's content. Receiving a close notification
 * doesn't mean that the document was open in an editor before. A close
 * notification requires a previous open notification to be sent.
 */
var DidCloseTextDocumentNotification;
(function (DidCloseTextDocumentNotification) {
    DidCloseTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didClose');
})(DidCloseTextDocumentNotification = exports.DidCloseTextDocumentNotification || (exports.DidCloseTextDocumentNotification = {}));
/**
 * The document save notification is sent from the client to the server when
 * the document got saved in the client.
 */
var DidSaveTextDocumentNotification;
(function (DidSaveTextDocumentNotification) {
    DidSaveTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/didSave');
})(DidSaveTextDocumentNotification = exports.DidSaveTextDocumentNotification || (exports.DidSaveTextDocumentNotification = {}));
/**
 * A document will save notification is sent from the client to the server before
 * the document is actually saved.
 */
var WillSaveTextDocumentNotification;
(function (WillSaveTextDocumentNotification) {
    WillSaveTextDocumentNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/willSave');
})(WillSaveTextDocumentNotification = exports.WillSaveTextDocumentNotification || (exports.WillSaveTextDocumentNotification = {}));
/**
 * A document will save request is sent from the client to the server before
 * the document is actually saved. The request can return an array of TextEdits
 * which will be applied to the text document before it is saved. Please note that
 * clients might drop results if computing the text edits took too long or if a
 * server constantly fails on this request. This is done to keep the save fast and
 * reliable.
 */
var WillSaveTextDocumentWaitUntilRequest;
(function (WillSaveTextDocumentWaitUntilRequest) {
    WillSaveTextDocumentWaitUntilRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/willSaveWaitUntil');
})(WillSaveTextDocumentWaitUntilRequest = exports.WillSaveTextDocumentWaitUntilRequest || (exports.WillSaveTextDocumentWaitUntilRequest = {}));
//---- File eventing ----
/**
 * The watched files notification is sent from the client to the server when
 * the client detects changes to file watched by the language client.
 */
var DidChangeWatchedFilesNotification;
(function (DidChangeWatchedFilesNotification) {
    DidChangeWatchedFilesNotification.type = new vscode_jsonrpc_1.NotificationType('workspace/didChangeWatchedFiles');
})(DidChangeWatchedFilesNotification = exports.DidChangeWatchedFilesNotification || (exports.DidChangeWatchedFilesNotification = {}));
/**
 * The file event type
 */
var FileChangeType;
(function (FileChangeType) {
    /**
     * The file got created.
     */
    FileChangeType.Created = 1;
    /**
     * The file got changed.
     */
    FileChangeType.Changed = 2;
    /**
     * The file got deleted.
     */
    FileChangeType.Deleted = 3;
})(FileChangeType = exports.FileChangeType || (exports.FileChangeType = {}));
var WatchKind;
(function (WatchKind) {
    /**
     * Interested in create events.
     */
    WatchKind.Create = 1;
    /**
     * Interested in change events
     */
    WatchKind.Change = 2;
    /**
     * Interested in delete events
     */
    WatchKind.Delete = 4;
})(WatchKind = exports.WatchKind || (exports.WatchKind = {}));
//---- Diagnostic notification ----
/**
 * Diagnostics notification are sent from the server to the client to signal
 * results of validation runs.
 */
var PublishDiagnosticsNotification;
(function (PublishDiagnosticsNotification) {
    PublishDiagnosticsNotification.type = new vscode_jsonrpc_1.NotificationType('textDocument/publishDiagnostics');
})(PublishDiagnosticsNotification = exports.PublishDiagnosticsNotification || (exports.PublishDiagnosticsNotification = {}));
/**
 * How a completion was triggered
 */
var CompletionTriggerKind;
(function (CompletionTriggerKind) {
    /**
     * Completion was triggered by typing an identifier (24x7 code
     * complete), manual invocation (e.g Ctrl+Space) or via API.
     */
    CompletionTriggerKind.Invoked = 1;
    /**
     * Completion was triggered by a trigger character specified by
     * the `triggerCharacters` properties of the `CompletionRegistrationOptions`.
     */
    CompletionTriggerKind.TriggerCharacter = 2;
    /**
     * Completion was re-triggered as current completion list is incomplete
     */
    CompletionTriggerKind.TriggerForIncompleteCompletions = 3;
})(CompletionTriggerKind = exports.CompletionTriggerKind || (exports.CompletionTriggerKind = {}));
/**
 * Request to request completion at a given text document position. The request's
 * parameter is of type [TextDocumentPosition](#TextDocumentPosition) the response
 * is of type [CompletionItem[]](#CompletionItem) or [CompletionList](#CompletionList)
 * or a Thenable that resolves to such.
 *
 * The request can delay the computation of the [`detail`](#CompletionItem.detail)
 * and [`documentation`](#CompletionItem.documentation) properties to the `completionItem/resolve`
 * request. However, properties that are needed for the initial sorting and filtering, like `sortText`,
 * `filterText`, `insertText`, and `textEdit`, must not be changed during resolve.
 */
var CompletionRequest;
(function (CompletionRequest) {
    CompletionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/completion');
})(CompletionRequest = exports.CompletionRequest || (exports.CompletionRequest = {}));
/**
 * Request to resolve additional information for a given completion item.The request's
 * parameter is of type [CompletionItem](#CompletionItem) the response
 * is of type [CompletionItem](#CompletionItem) or a Thenable that resolves to such.
 */
var CompletionResolveRequest;
(function (CompletionResolveRequest) {
    CompletionResolveRequest.type = new vscode_jsonrpc_1.RequestType('completionItem/resolve');
})(CompletionResolveRequest = exports.CompletionResolveRequest || (exports.CompletionResolveRequest = {}));
//---- Hover Support -------------------------------
/**
 * Request to request hover information at a given text document position. The request's
 * parameter is of type [TextDocumentPosition](#TextDocumentPosition) the response is of
 * type [Hover](#Hover) or a Thenable that resolves to such.
 */
var HoverRequest;
(function (HoverRequest) {
    HoverRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/hover');
})(HoverRequest = exports.HoverRequest || (exports.HoverRequest = {}));
var SignatureHelpRequest;
(function (SignatureHelpRequest) {
    SignatureHelpRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/signatureHelp');
})(SignatureHelpRequest = exports.SignatureHelpRequest || (exports.SignatureHelpRequest = {}));
//---- Goto Definition -------------------------------------
/**
 * A request to resolve the definition location of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the response is of either type [Definition](#Definition)
 * or a typed array of [DefinitionLink](#DefinitionLink) or a Thenable that resolves
 * to such.
 */
var DefinitionRequest;
(function (DefinitionRequest) {
    DefinitionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/definition');
})(DefinitionRequest = exports.DefinitionRequest || (exports.DefinitionRequest = {}));
/**
 * A request to resolve project-wide references for the symbol denoted
 * by the given text document position. The request's parameter is of
 * type [ReferenceParams](#ReferenceParams) the response is of type
 * [Location[]](#Location) or a Thenable that resolves to such.
 */
var ReferencesRequest;
(function (ReferencesRequest) {
    ReferencesRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/references');
})(ReferencesRequest = exports.ReferencesRequest || (exports.ReferencesRequest = {}));
//---- Document Highlight ----------------------------------
/**
 * Request to resolve a [DocumentHighlight](#DocumentHighlight) for a given
 * text document position. The request's parameter is of type [TextDocumentPosition]
 * (#TextDocumentPosition) the request response is of type [DocumentHighlight[]]
 * (#DocumentHighlight) or a Thenable that resolves to such.
 */
var DocumentHighlightRequest;
(function (DocumentHighlightRequest) {
    DocumentHighlightRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentHighlight');
})(DocumentHighlightRequest = exports.DocumentHighlightRequest || (exports.DocumentHighlightRequest = {}));
//---- Document Symbol Provider ---------------------------
/**
 * A request to list all symbols found in a given text document. The request's
 * parameter is of type [TextDocumentIdentifier](#TextDocumentIdentifier) the
 * response is of type [SymbolInformation[]](#SymbolInformation) or a Thenable
 * that resolves to such.
 */
var DocumentSymbolRequest;
(function (DocumentSymbolRequest) {
    DocumentSymbolRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentSymbol');
})(DocumentSymbolRequest = exports.DocumentSymbolRequest || (exports.DocumentSymbolRequest = {}));
//---- Workspace Symbol Provider ---------------------------
/**
 * A request to list project-wide symbols matching the query string given
 * by the [WorkspaceSymbolParams](#WorkspaceSymbolParams). The response is
 * of type [SymbolInformation[]](#SymbolInformation) or a Thenable that
 * resolves to such.
 */
var WorkspaceSymbolRequest;
(function (WorkspaceSymbolRequest) {
    WorkspaceSymbolRequest.type = new vscode_jsonrpc_1.RequestType('workspace/symbol');
})(WorkspaceSymbolRequest = exports.WorkspaceSymbolRequest || (exports.WorkspaceSymbolRequest = {}));
/**
 * A request to provide commands for the given text document and range.
 */
var CodeActionRequest;
(function (CodeActionRequest) {
    CodeActionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/codeAction');
})(CodeActionRequest = exports.CodeActionRequest || (exports.CodeActionRequest = {}));
/**
 * A request to provide code lens for the given text document.
 */
var CodeLensRequest;
(function (CodeLensRequest) {
    CodeLensRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/codeLens');
})(CodeLensRequest = exports.CodeLensRequest || (exports.CodeLensRequest = {}));
/**
 * A request to resolve a command for a given code lens.
 */
var CodeLensResolveRequest;
(function (CodeLensResolveRequest) {
    CodeLensResolveRequest.type = new vscode_jsonrpc_1.RequestType('codeLens/resolve');
})(CodeLensResolveRequest = exports.CodeLensResolveRequest || (exports.CodeLensResolveRequest = {}));
/**
 * A request to to format a whole document.
 */
var DocumentFormattingRequest;
(function (DocumentFormattingRequest) {
    DocumentFormattingRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/formatting');
})(DocumentFormattingRequest = exports.DocumentFormattingRequest || (exports.DocumentFormattingRequest = {}));
/**
 * A request to to format a range in a document.
 */
var DocumentRangeFormattingRequest;
(function (DocumentRangeFormattingRequest) {
    DocumentRangeFormattingRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/rangeFormatting');
})(DocumentRangeFormattingRequest = exports.DocumentRangeFormattingRequest || (exports.DocumentRangeFormattingRequest = {}));
/**
 * A request to format a document on type.
 */
var DocumentOnTypeFormattingRequest;
(function (DocumentOnTypeFormattingRequest) {
    DocumentOnTypeFormattingRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/onTypeFormatting');
})(DocumentOnTypeFormattingRequest = exports.DocumentOnTypeFormattingRequest || (exports.DocumentOnTypeFormattingRequest = {}));
/**
 * A request to rename a symbol.
 */
var RenameRequest;
(function (RenameRequest) {
    RenameRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/rename');
})(RenameRequest = exports.RenameRequest || (exports.RenameRequest = {}));
/**
 * A request to test and perform the setup necessary for a rename.
 */
var PrepareRenameRequest;
(function (PrepareRenameRequest) {
    PrepareRenameRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/prepareRename');
})(PrepareRenameRequest = exports.PrepareRenameRequest || (exports.PrepareRenameRequest = {}));
/**
 * A request to provide document links
 */
var DocumentLinkRequest;
(function (DocumentLinkRequest) {
    DocumentLinkRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentLink');
})(DocumentLinkRequest = exports.DocumentLinkRequest || (exports.DocumentLinkRequest = {}));
/**
 * Request to resolve additional information for a given document link. The request's
 * parameter is of type [DocumentLink](#DocumentLink) the response
 * is of type [DocumentLink](#DocumentLink) or a Thenable that resolves to such.
 */
var DocumentLinkResolveRequest;
(function (DocumentLinkResolveRequest) {
    DocumentLinkResolveRequest.type = new vscode_jsonrpc_1.RequestType('documentLink/resolve');
})(DocumentLinkResolveRequest = exports.DocumentLinkResolveRequest || (exports.DocumentLinkResolveRequest = {}));
/**
 * A request send from the client to the server to execute a command. The request might return
 * a workspace edit which the client will apply to the workspace.
 */
var ExecuteCommandRequest;
(function (ExecuteCommandRequest) {
    ExecuteCommandRequest.type = new vscode_jsonrpc_1.RequestType('workspace/executeCommand');
})(ExecuteCommandRequest = exports.ExecuteCommandRequest || (exports.ExecuteCommandRequest = {}));
/**
 * A request sent from the server to the client to modified certain resources.
 */
var ApplyWorkspaceEditRequest;
(function (ApplyWorkspaceEditRequest) {
    ApplyWorkspaceEditRequest.type = new vscode_jsonrpc_1.RequestType('workspace/applyEdit');
})(ApplyWorkspaceEditRequest = exports.ApplyWorkspaceEditRequest || (exports.ApplyWorkspaceEditRequest = {}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.string = string;
function number(value) {
    return typeof value === 'number' || value instanceof Number;
}
exports.number = number;
function error(value) {
    return value instanceof Error;
}
exports.error = error;
function func(value) {
    return typeof value === 'function';
}
exports.func = func;
function array(value) {
    return Array.isArray(value);
}
exports.array = array;
function stringArray(value) {
    return array(value) && value.every(elem => string(elem));
}
exports.stringArray = stringArray;
function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
}
exports.typedArray = typedArray;
function thenable(value) {
    return value && func(value.then);
}
exports.thenable = thenable;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
// @ts-ignore: to avoid inlining LocatioLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the implementation locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositioParams]
 * (#TextDocumentPositionParams) the response is of type [Definition](#Definition) or a
 * Thenable that resolves to such.
 */
var ImplementationRequest;
(function (ImplementationRequest) {
    ImplementationRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/implementation');
})(ImplementationRequest = exports.ImplementationRequest || (exports.ImplementationRequest = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
// @ts-ignore: to avoid inlining LocatioLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositioParams]
 * (#TextDocumentPositionParams) the response is of type [Definition](#Definition) or a
 * Thenable that resolves to such.
 */
var TypeDefinitionRequest;
(function (TypeDefinitionRequest) {
    TypeDefinitionRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/typeDefinition');
})(TypeDefinitionRequest = exports.TypeDefinitionRequest || (exports.TypeDefinitionRequest = {}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
/**
 * The `workspace/workspaceFolders` is sent from the server to the client to fetch the open workspace folders.
 */
var WorkspaceFoldersRequest;
(function (WorkspaceFoldersRequest) {
    WorkspaceFoldersRequest.type = new vscode_jsonrpc_1.RequestType0('workspace/workspaceFolders');
})(WorkspaceFoldersRequest = exports.WorkspaceFoldersRequest || (exports.WorkspaceFoldersRequest = {}));
/**
 * The `workspace/didChangeWorkspaceFolders` notification is sent from the client to the server when the workspace
 * folder configuration changes.
 */
var DidChangeWorkspaceFoldersNotification;
(function (DidChangeWorkspaceFoldersNotification) {
    DidChangeWorkspaceFoldersNotification.type = new vscode_jsonrpc_1.NotificationType('workspace/didChangeWorkspaceFolders');
})(DidChangeWorkspaceFoldersNotification = exports.DidChangeWorkspaceFoldersNotification || (exports.DidChangeWorkspaceFoldersNotification = {}));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
/**
 * The 'workspace/configuration' request is sent from the server to the client to fetch a certain
 * configuration setting.
 *
 * This pull model replaces the old push model were the client signaled configuration change via an
 * event. If the server still needs to react to configuration changes (since the server caches the
 * result of `workspace/configuration` requests) the server should register for an empty configuration
 * change event and empty the cache if such an event is received.
 */
var ConfigurationRequest;
(function (ConfigurationRequest) {
    ConfigurationRequest.type = new vscode_jsonrpc_1.RequestType('workspace/configuration');
})(ConfigurationRequest = exports.ConfigurationRequest || (exports.ConfigurationRequest = {}));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
/**
 * A request to list all color symbols found in a given text document. The request's
 * parameter is of type [DocumentColorParams](#DocumentColorParams) the
 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
 * that resolves to such.
 */
var DocumentColorRequest;
(function (DocumentColorRequest) {
    DocumentColorRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/documentColor');
})(DocumentColorRequest = exports.DocumentColorRequest || (exports.DocumentColorRequest = {}));
/**
 * A request to list all presentation for a color. The request's
 * parameter is of type [ColorPresentationParams](#ColorPresentationParams) the
 * response is of type [ColorInformation[]](#ColorInformation) or a Thenable
 * that resolves to such.
 */
var ColorPresentationRequest;
(function (ColorPresentationRequest) {
    ColorPresentationRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/colorPresentation');
})(ColorPresentationRequest = exports.ColorPresentationRequest || (exports.ColorPresentationRequest = {}));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
/**
 * Enum of known range kinds
 */
var FoldingRangeKind;
(function (FoldingRangeKind) {
    /**
     * Folding range for a comment
     */
    FoldingRangeKind["Comment"] = "comment";
    /**
     * Folding range for a imports or includes
     */
    FoldingRangeKind["Imports"] = "imports";
    /**
     * Folding range for a region (e.g. `#region`)
     */
    FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind = exports.FoldingRangeKind || (exports.FoldingRangeKind = {}));
/**
 * A request to provide folding ranges in a document. The request's
 * parameter is of type [FoldingRangeParams](#FoldingRangeParams), the
 * response is of type [FoldingRangeList](#FoldingRangeList) or a Thenable
 * that resolves to such.
 */
var FoldingRangeRequest;
(function (FoldingRangeRequest) {
    FoldingRangeRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/foldingRange');
})(FoldingRangeRequest = exports.FoldingRangeRequest || (exports.FoldingRangeRequest = {}));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
// @ts-ignore: to avoid inlining LocatioLink as dynamic import
let __noDynamicImport;
/**
 * A request to resolve the type definition locations of a symbol at a given text
 * document position. The request's parameter is of type [TextDocumentPositioParams]
 * (#TextDocumentPositionParams) the response is of type [Declaration](#Declaration)
 * or a typed array of [DeclarationLink](#DeclarationLink) or a Thenable that resolves
 * to such.
 */
var DeclarationRequest;
(function (DeclarationRequest) {
    DeclarationRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/declaration');
})(DeclarationRequest = exports.DeclarationRequest || (exports.DeclarationRequest = {}));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) TypeFox and others. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
/**
 * The direction of a call hierarchy request.
 */
var CallHierarchyDirection;
(function (CallHierarchyDirection) {
    /**
     * The callers
     */
    CallHierarchyDirection.CallsFrom = 1;
    /**
     * The callees
     */
    CallHierarchyDirection.CallsTo = 2;
})(CallHierarchyDirection = exports.CallHierarchyDirection || (exports.CallHierarchyDirection = {}));
/**
 * Request to provide the call hierarchy at a given text document position.
 *
 * The request's parameter is of type [CallHierarchyParams](#CallHierarchyParams). The response
 * is of type [CallHierarchyCall[]](#CallHierarchyCall) or a Thenable that resolves to such.
 *
 * Evaluates the symbol defined (or referenced) at the given position, and returns all incoming or outgoing calls to the symbol(s).
 */
var CallHierarchyRequest;
(function (CallHierarchyRequest) {
    CallHierarchyRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/callHierarchy');
})(CallHierarchyRequest = exports.CallHierarchyRequest || (exports.CallHierarchyRequest = {}));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
/**
 * The `window/progress/start` notification is sent from the server to the client
 * to initiate a progress.
 */
var ProgressStartNotification;
(function (ProgressStartNotification) {
    ProgressStartNotification.type = new vscode_jsonrpc_1.NotificationType('window/progress/start');
})(ProgressStartNotification = exports.ProgressStartNotification || (exports.ProgressStartNotification = {}));
/**
 * The `window/progress/report` notification is sent from the server to the client
 * to initiate a progress.
 */
var ProgressReportNotification;
(function (ProgressReportNotification) {
    ProgressReportNotification.type = new vscode_jsonrpc_1.NotificationType('window/progress/report');
})(ProgressReportNotification = exports.ProgressReportNotification || (exports.ProgressReportNotification = {}));
/**
 * The `window/progress/done` notification is sent from the server to the client
 * to initiate a progress.
 */
var ProgressDoneNotification;
(function (ProgressDoneNotification) {
    ProgressDoneNotification.type = new vscode_jsonrpc_1.NotificationType('window/progress/done');
})(ProgressDoneNotification = exports.ProgressDoneNotification || (exports.ProgressDoneNotification = {}));
/**
 * The `window/progress/cancel` notification is sent client to the server to cancel a progress
 * initiated on the server side.
 */
var ProgressCancelNotification;
(function (ProgressCancelNotification) {
    ProgressCancelNotification.type = new vscode_jsonrpc_1.NotificationType('window/progress/cancel');
})(ProgressCancelNotification = exports.ProgressCancelNotification || (exports.ProgressCancelNotification = {}));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = __webpack_require__(4);
const vscode_languageserver_types_1 = __webpack_require__(18);
/**
 * The SelectionRange namespace provides helper function to work with
 * SelectionRange literals.
 */
var SelectionRange;
(function (SelectionRange) {
    /**
     * Creates a new SelectionRange
     * @param range the range.
     * @param parent an optional parent.
     */
    function create(range, parent) {
        return { range, parent };
    }
    SelectionRange.create = create;
    function is(value) {
        let candidate = value;
        return candidate !== undefined && vscode_languageserver_types_1.Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
    }
    SelectionRange.is = is;
})(SelectionRange = exports.SelectionRange || (exports.SelectionRange = {}));
/**
 * A request to provide selection ranges in a document. The request's
 * parameter is of type [SelectionRangeParams](#SelectionRangeParams), the
 * response is of type [SelectionRange[]](#SelectionRange[]) or a Thenable
 * that resolves to such.
 */
var SelectionRangeRequest;
(function (SelectionRangeRequest) {
    SelectionRangeRequest.type = new vscode_jsonrpc_1.RequestType('textDocument/selectionRange');
})(SelectionRangeRequest = exports.SelectionRangeRequest || (exports.SelectionRangeRequest = {}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const languageProvider_1 = __importDefault(__webpack_require__(32));
const PConst = __importStar(__webpack_require__(37));
const typescriptServiceClient_1 = __importDefault(__webpack_require__(79));
const typeConverters = __importStar(__webpack_require__(35));
const typingsStatus_1 = __importStar(__webpack_require__(96));
// Style check diagnostics that can be reported as warnings
const styleCheckDiagnostics = [
    6133,
    6138,
    7027,
    7028,
    7029,
    7030 // not all code paths return a value
];
class TypeScriptServiceClientHost {
    constructor(descriptions, pluginManager) {
        this.languages = [];
        this.languagePerId = new Map();
        this.disposables = [];
        this.reportStyleCheckAsWarnings = true;
        let timer;
        const handleProjectChange = () => {
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(() => {
                this.triggerAllDiagnostics();
            }, 1500);
        };
        const configFileWatcher = coc_nvim_1.workspace.createFileSystemWatcher('**/[tj]sconfig.json');
        this.disposables.push(configFileWatcher);
        configFileWatcher.onDidCreate(this.reloadProjects, this, this.disposables);
        configFileWatcher.onDidDelete(this.reloadProjects, this, this.disposables);
        configFileWatcher.onDidChange(handleProjectChange, this, this.disposables);
        const packageFileWatcher = coc_nvim_1.workspace.createFileSystemWatcher('**/package.json');
        packageFileWatcher.onDidCreate(this.reloadProjects, this, this.disposables);
        packageFileWatcher.onDidChange(handleProjectChange, this, this.disposables);
        this.client = new typescriptServiceClient_1.default(pluginManager);
        this.disposables.push(this.client);
        this.client.onDiagnosticsReceived(({ kind, resource, diagnostics }) => {
            this.diagnosticsReceived(kind, resource, diagnostics);
        }, null, this.disposables);
        this.client.onConfigDiagnosticsReceived(diag => {
            let { body } = diag;
            if (body) {
                let { configFile, diagnostics } = body;
                let uri = coc_nvim_1.Uri.file(configFile);
                let language = this.findLanguage(uri);
                if (!language)
                    return;
                if (diagnostics.length == 0) {
                    this.client.diagnosticsManager.configFileDiagnosticsReceived(uri.toString(), []);
                }
                else {
                    let range = vscode_languageserver_protocol_1.Range.create(vscode_languageserver_protocol_1.Position.create(0, 0), vscode_languageserver_protocol_1.Position.create(0, 1));
                    let { text, code, category } = diagnostics[0];
                    let severity = category == 'error' ? vscode_languageserver_protocol_1.DiagnosticSeverity.Error : vscode_languageserver_protocol_1.DiagnosticSeverity.Warning;
                    let diagnostic = vscode_languageserver_protocol_1.Diagnostic.create(range, text, severity, code);
                    this.client.diagnosticsManager.configFileDiagnosticsReceived(uri.toString(), [diagnostic]);
                }
            }
        }, null, this.disposables);
        this.typingsStatus = new typingsStatus_1.default(this.client);
        this.ataProgressReporter = new typingsStatus_1.AtaProgressReporter(this.client);
        for (const description of descriptions) { // tslint:disable-line
            const manager = new languageProvider_1.default(this.client, description, this.typingsStatus);
            this.languages.push(manager);
            this.disposables.push(manager);
            this.languagePerId.set(description.id, manager);
        }
        this.client.ensureServiceStarted();
        this.client.onTsServerStarted(() => {
            this.triggerAllDiagnostics();
        });
        coc_nvim_1.workspace.onDidChangeConfiguration(this.configurationChanged, this, this.disposables);
        this.configurationChanged();
    }
    dispose() {
        coc_nvim_1.disposeAll(this.disposables);
        this.typingsStatus.dispose();
        this.ataProgressReporter.dispose();
    }
    reset() {
        for (let lang of this.languages) {
            lang.fileConfigurationManager.reset();
        }
    }
    get serviceClient() {
        return this.client;
    }
    reloadProjects() {
        this.client.execute('reloadProjects', null, vscode_languageserver_protocol_1.CancellationToken.None);
        this.triggerAllDiagnostics();
    }
    // typescript or javascript
    getProvider(languageId) {
        return this.languagePerId.get(languageId);
    }
    configurationChanged() {
        const config = coc_nvim_1.workspace.getConfiguration('tsserver');
        this.reportStyleCheckAsWarnings = config.get('reportStyleChecksAsWarnings', true);
    }
    findLanguage(resource) {
        try {
            return this.languages.find(language => language.handles(resource));
        }
        catch (_a) {
            return null;
        }
    }
    handles(uri) {
        return this.findLanguage(coc_nvim_1.Uri.parse(uri)) != null;
    }
    triggerAllDiagnostics() {
        for (const language of this.languagePerId.values()) {
            language.triggerAllDiagnostics();
        }
    }
    diagnosticsReceived(kind, resource, diagnostics) {
        const language = this.findLanguage(resource);
        if (language) {
            language.diagnosticsReceived(kind, resource, this.createMarkerDatas(diagnostics));
        }
    }
    createMarkerDatas(diagnostics) {
        return diagnostics.map(tsDiag => this.tsDiagnosticToLspDiagnostic(tsDiag));
    }
    tsDiagnosticToLspDiagnostic(diagnostic) {
        const { start, end, text } = diagnostic;
        const range = {
            start: typeConverters.Position.fromLocation(start),
            end: typeConverters.Position.fromLocation(end)
        };
        let relatedInformation;
        if (diagnostic.relatedInformation) {
            relatedInformation = diagnostic.relatedInformation.map(o => {
                let { span, message } = o;
                return {
                    location: typeConverters.Location.fromTextSpan(this.client.toResource(span.file), span),
                    message
                };
            });
        }
        return {
            range,
            message: text,
            code: diagnostic.code ? diagnostic.code : null,
            severity: this.getDiagnosticSeverity(diagnostic),
            reportUnnecessary: diagnostic.reportsUnnecessary,
            source: diagnostic.source || 'tsserver',
            relatedInformation
        };
    }
    getDiagnosticSeverity(diagnostic) {
        if (this.reportStyleCheckAsWarnings &&
            this.isStyleCheckDiagnostic(diagnostic.code) &&
            diagnostic.category === PConst.DiagnosticCategory.error) {
            return vscode_languageserver_protocol_1.DiagnosticSeverity.Warning;
        }
        switch (diagnostic.category) {
            case PConst.DiagnosticCategory.error:
                return vscode_languageserver_protocol_1.DiagnosticSeverity.Error;
            case PConst.DiagnosticCategory.warning:
                return vscode_languageserver_protocol_1.DiagnosticSeverity.Warning;
            case PConst.DiagnosticCategory.suggestion:
                return vscode_languageserver_protocol_1.DiagnosticSeverity.Information;
            default:
                return vscode_languageserver_protocol_1.DiagnosticSeverity.Error;
        }
    }
    isStyleCheckDiagnostic(code) {
        return code ? styleCheckDiagnostics.indexOf(code) !== -1 : false;
    }
}
exports.default = TypeScriptServiceClientHost;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const baseCodeLensProvider_1 = __webpack_require__(33);
const completionItemProvider_1 = __importDefault(__webpack_require__(36));
const definitionProvider_1 = __importDefault(__webpack_require__(44));
const directiveCommentCompletions_1 = __importDefault(__webpack_require__(45));
const documentHighlight_1 = __importDefault(__webpack_require__(46));
const documentSymbol_1 = __importDefault(__webpack_require__(48));
const fileConfigurationManager_1 = __importDefault(__webpack_require__(49));
const folding_1 = __importDefault(__webpack_require__(51));
const formatting_1 = __importDefault(__webpack_require__(52));
const hover_1 = __importDefault(__webpack_require__(55));
const implementationsCodeLens_1 = __importDefault(__webpack_require__(56));
// import TagCompletionProvider from './features/tagCompletion'
const quickfix_1 = __importDefault(__webpack_require__(57));
const importFix_1 = __importDefault(__webpack_require__(58));
const refactor_1 = __importDefault(__webpack_require__(60));
const references_1 = __importDefault(__webpack_require__(61));
const referencesCodeLens_1 = __importDefault(__webpack_require__(62));
const rename_1 = __importDefault(__webpack_require__(63));
const signatureHelp_1 = __importDefault(__webpack_require__(64));
const updatePathOnRename_1 = __importDefault(__webpack_require__(65));
const watchBuild_1 = __importDefault(__webpack_require__(66));
const workspaceSymbols_1 = __importDefault(__webpack_require__(72));
const smartSelect_1 = __importDefault(__webpack_require__(73));
const moduleInstall_1 = __importDefault(__webpack_require__(74));
const api_1 = __importDefault(__webpack_require__(38));
const organizeImports_1 = __webpack_require__(77);
const suggestionSetting = 'suggestionActions.enabled';
class LanguageProvider {
    constructor(client, description, typingsStatus) {
        this.client = client;
        this.description = description;
        this.disposables = [];
        this.fileConfigurationManager = new fileConfigurationManager_1.default(client);
        coc_nvim_1.workspace.onDidChangeConfiguration(this.configurationChanged, this, this.disposables);
        this.configurationChanged();
        coc_nvim_1.events.on('BufEnter', bufnr => {
            let doc = coc_nvim_1.workspace.getDocument(bufnr);
            if (!doc || client.state !== coc_nvim_1.ServiceStat.Running)
                return;
            if (description.modeIds.indexOf(doc.filetype) == -1)
                return;
            this.fileConfigurationManager.ensureConfigurationForDocument(doc.textDocument); // tslint:disable-line
        }, this, this.disposables);
        let initialized = false;
        client.onTsServerStarted(() => __awaiter(this, void 0, void 0, function* () {
            if (!initialized) {
                for (let doc of coc_nvim_1.workspace.documents) {
                    if (description.modeIds.indexOf(doc.filetype) !== -1) {
                        this.fileConfigurationManager.ensureConfigurationForDocument(doc.textDocument); // tslint:disable-line
                    }
                }
                initialized = true;
                this.registerProviders(client, typingsStatus);
            }
            else {
                this.client.diagnosticsManager.reInitialize();
            }
        }));
    }
    configurationChanged() {
        const config = coc_nvim_1.workspace.getConfiguration(this.id, null);
        this.client.diagnosticsManager.setEnableSuggestions(this.id, config.get(suggestionSetting, true));
    }
    dispose() {
        coc_nvim_1.disposeAll(this.disposables);
    }
    registerProviders(client, typingsStatus) {
        let languageIds = this.description.modeIds;
        this.disposables.push(coc_nvim_1.languages.registerCompletionItemProvider(`tsserver-${this.description.id}`, 'TSC', languageIds, new completionItemProvider_1.default(client, typingsStatus, this.fileConfigurationManager, this.description.id), completionItemProvider_1.default.triggerCharacters));
        if (this.client.apiVersion.gte(api_1.default.v230)) {
            this.disposables.push(coc_nvim_1.languages.registerCompletionItemProvider(`${this.description.id}-directive`, 'TSC', languageIds, new directiveCommentCompletions_1.default(client), ['@']));
        }
        let definitionProvider = new definitionProvider_1.default(client);
        this.disposables.push(coc_nvim_1.languages.registerDefinitionProvider(languageIds, definitionProvider));
        this.disposables.push(coc_nvim_1.languages.registerTypeDefinitionProvider(languageIds, definitionProvider));
        this.disposables.push(coc_nvim_1.languages.registerImplementationProvider(languageIds, definitionProvider));
        this.disposables.push(coc_nvim_1.languages.registerReferencesProvider(languageIds, new references_1.default(client)));
        this.disposables.push(coc_nvim_1.languages.registerHoverProvider(languageIds, new hover_1.default(client)));
        this.disposables.push(coc_nvim_1.languages.registerDocumentHighlightProvider(languageIds, new documentHighlight_1.default(this.client)));
        this.disposables.push(coc_nvim_1.languages.registerSignatureHelpProvider(languageIds, new signatureHelp_1.default(client), ['(', ',', '<', ')']));
        this.disposables.push(coc_nvim_1.languages.registerDocumentSymbolProvider(languageIds, new documentSymbol_1.default(client)));
        this.disposables.push(coc_nvim_1.languages.registerWorkspaceSymbolProvider(languageIds, new workspaceSymbols_1.default(client, languageIds)));
        this.disposables.push(coc_nvim_1.languages.registerRenameProvider(languageIds, new rename_1.default(client)));
        let formatProvider = new formatting_1.default(client, this.fileConfigurationManager);
        this.disposables.push(coc_nvim_1.languages.registerDocumentFormatProvider(languageIds, formatProvider));
        this.disposables.push(coc_nvim_1.languages.registerDocumentRangeFormatProvider(languageIds, formatProvider));
        this.disposables.push(coc_nvim_1.languages.registerOnTypeFormattingEditProvider(languageIds, formatProvider, [';', '}', '\n', String.fromCharCode(27)]));
        // this.disposables.push(
        //   new ProjectError(client, commandManager)
        // )
        if (this.client.apiVersion.gte(api_1.default.v280)) {
            this.disposables.push(coc_nvim_1.languages.registerFoldingRangeProvider(languageIds, new folding_1.default(this.client)));
            this.disposables.push(coc_nvim_1.languages.registerCodeActionProvider(languageIds, new organizeImports_1.OrganizeImportsCodeActionProvider(this.client, this.fileConfigurationManager), `tsserver-${this.description.id}`, [vscode_languageserver_protocol_1.CodeActionKind.SourceOrganizeImports]));
        }
        let { fileConfigurationManager } = this;
        let conf = fileConfigurationManager.getLanguageConfiguration(this.id);
        if (this.client.apiVersion.gte(api_1.default.v290)
            && conf.get('updateImportsOnFileMove.enable')) {
            this.disposables.push(new updatePathOnRename_1.default(client, this.fileConfigurationManager, this.id));
        }
        if (this.client.apiVersion.gte(api_1.default.v240)) {
            this.disposables.push(coc_nvim_1.languages.registerCodeActionProvider(languageIds, new refactor_1.default(client, this.fileConfigurationManager), 'tsserver', [vscode_languageserver_protocol_1.CodeActionKind.Refactor]));
        }
        this.disposables.push(coc_nvim_1.languages.registerCodeActionProvider(languageIds, new moduleInstall_1.default(client), 'tsserver'));
        this.disposables.push(coc_nvim_1.languages.registerCodeActionProvider(languageIds, new quickfix_1.default(client), 'tsserver', [vscode_languageserver_protocol_1.CodeActionKind.QuickFix]));
        this.disposables.push(coc_nvim_1.languages.registerCodeActionProvider(languageIds, new importFix_1.default(this.client.bufferSyncSupport), 'tsserver', [vscode_languageserver_protocol_1.CodeActionKind.QuickFix]));
        let cachedResponse = new baseCodeLensProvider_1.CachedNavTreeResponse();
        if (this.client.apiVersion.gte(api_1.default.v206)
            && conf.get('referencesCodeLens.enable')) {
            this.disposables.push(coc_nvim_1.languages.registerCodeLensProvider(languageIds, new referencesCodeLens_1.default(client, cachedResponse)));
        }
        if (this.client.apiVersion.gte(api_1.default.v220)
            && conf.get('implementationsCodeLens.enable')) {
            this.disposables.push(coc_nvim_1.languages.registerCodeLensProvider(languageIds, new implementationsCodeLens_1.default(client, cachedResponse)));
        }
        if (this.client.apiVersion.gte(api_1.default.v350)) {
            this.disposables.push(coc_nvim_1.languages.registerSelectionRangeProvider(languageIds, new smartSelect_1.default(this.client)));
        }
        if (this.description.id == 'typescript') {
            this.disposables.push(new watchBuild_1.default(coc_nvim_1.commands));
        }
        // if (this.client.apiVersion.gte(API.v300)) {
        //   this.disposables.push(
        //     languages.registerCompletionItemProvider(
        //       `tsserver-${this.description.id}-tag`,
        //       'TSC',
        //       languageIds,
        //       new TagCompletionProvider(client),
        //       ['>']
        //     )
        //   )
        // }
    }
    handles(resource) {
        let { modeIds, configFile } = this.description;
        if (resource.toString().endsWith(configFile)) {
            return true;
        }
        let doc = coc_nvim_1.workspace.getDocument(resource.toString());
        if (doc && modeIds.indexOf(doc.filetype) !== -1) {
            return true;
        }
        let str = resource.toString();
        if (this.id === 'typescript' && /\.ts(x)?$/.test(str)) {
            return true;
        }
        if (this.id === 'javascript' && /\.js(x)?$/.test(str)) {
            return true;
        }
        return false;
    }
    get id() {
        return this.description.id;
    }
    get diagnosticSource() {
        return this.description.diagnosticSource;
    }
    triggerAllDiagnostics() {
        this.client.bufferSyncSupport.requestAllDiagnostics();
    }
    diagnosticsReceived(diagnosticsKind, file, diagnostics) {
        if (!this.client.bufferSyncSupport.shouldValidate(file.toString())) {
            return;
        }
        const config = coc_nvim_1.workspace.getConfiguration(this.id, file.toString());
        const reportUnnecessary = config.get('showUnused', true);
        this.client.diagnosticsManager.diagnosticsReceived(diagnosticsKind, file.toString(), diagnostics.filter(diag => {
            if (!reportUnnecessary) {
                diag.tags = undefined;
                if (diag.reportUnnecessary && diag.severity === vscode_languageserver_protocol_1.DiagnosticSeverity.Hint) {
                    return false;
                }
            }
            return true;
        }));
    }
}
exports.default = LanguageProvider;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const regexp_1 = __webpack_require__(34);
const typeConverters = __importStar(__webpack_require__(35));
class CachedNavTreeResponse {
    constructor() {
        this.version = -1;
        this.document = '';
    }
    execute(document, f) {
        if (this.matches(document)) {
            return this.response;
        }
        return this.update(document, f());
    }
    matches(document) {
        return (this.version === document.version &&
            this.document === document.uri.toString());
    }
    update(document, response) {
        this.response = response;
        this.version = document.version;
        this.document = document.uri.toString();
        return response;
    }
}
exports.CachedNavTreeResponse = CachedNavTreeResponse;
class TypeScriptBaseCodeLensProvider {
    constructor(client, cachedResponse) {
        this.client = client;
        this.cachedResponse = cachedResponse;
        this.onDidChangeCodeLensesEmitter = new vscode_languageserver_protocol_1.Emitter();
    }
    get onDidChangeCodeLenses() {
        return this.onDidChangeCodeLensesEmitter.event;
    }
    provideCodeLenses(document, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(document.uri);
            if (!filepath) {
                return [];
            }
            try {
                const response = yield this.cachedResponse.execute(document, () => this.client.execute('navtree', { file: filepath }, token));
                if (!response) {
                    return [];
                }
                const tree = response.body;
                const referenceableSpans = [];
                if (tree && tree.childItems) {
                    tree.childItems.forEach(item => this.walkNavTree(document, item, null, referenceableSpans));
                }
                return referenceableSpans.map(range => {
                    return {
                        range,
                        data: { uri: document.uri }
                    };
                });
            }
            catch (_a) {
                return [];
            }
        });
    }
    walkNavTree(document, item, parent, results) {
        if (!item) {
            return;
        }
        const range = this.extractSymbol(document, item, parent);
        if (range) {
            results.push(range);
        }
        if (item.childItems) {
            item.childItems.forEach(child => this.walkNavTree(document, child, item, results));
        }
    }
    getSymbolRange(document, item) {
        if (!item) {
            return null;
        }
        // TS 3.0+ provides a span for just the symbol
        if (item.nameSpan) {
            return typeConverters.Range.fromTextSpan(item.nameSpan);
        }
        // In older versions, we have to calculate this manually. See #23924
        const span = item.spans && item.spans[0];
        if (!span) {
            return null;
        }
        const range = typeConverters.Range.fromTextSpan(span);
        const text = document.getText(range);
        const identifierMatch = new RegExp(`^(.*?(\\b|\\W))${regexp_1.escapeRegExp(item.text || '')}(\\b|\\W)`, 'gm');
        const match = identifierMatch.exec(text);
        const prefixLength = match ? match.index + match[1].length : 0;
        const startOffset = document.offsetAt(range.start) + prefixLength;
        return {
            start: document.positionAt(startOffset),
            end: document.positionAt(startOffset + item.text.length)
        };
    }
}
exports.TypeScriptBaseCodeLensProvider = TypeScriptBaseCodeLensProvider;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
exports.escapeRegExp = escapeRegExp;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Range;
(function (Range) {
    Range.fromTextSpan = (span) => {
        return {
            start: {
                line: span.start.line - 1,
                character: span.start.offset - 1
            },
            end: {
                line: span.end.line - 1,
                character: span.end.offset - 1
            }
        };
    };
    Range.toFormattingRequestArgs = (file, range) => ({
        file,
        line: range.start.line + 1,
        offset: range.start.character + 1,
        endLine: range.end.line + 1,
        endOffset: range.end.character + 1
    });
    Range.toFileRangeRequestArgs = (file, range) => ({
        file,
        startLine: range.start.line + 1,
        startOffset: range.start.character + 1,
        endLine: range.end.line + 1,
        endOffset: range.end.character + 1
    });
})(Range = exports.Range || (exports.Range = {}));
var Position;
(function (Position) {
    Position.fromLocation = (tslocation) => {
        return {
            line: tslocation.line - 1,
            character: tslocation.offset - 1
        };
    };
    Position.toLocation = (position) => ({
        line: position.line + 1,
        offset: position.character + 1,
    });
    Position.toFileLocationRequestArgs = (file, position) => ({
        file,
        line: position.line + 1,
        offset: position.character + 1
    });
})(Position = exports.Position || (exports.Position = {}));
var Location;
(function (Location) {
    Location.fromTextSpan = (uri, tsTextSpan) => {
        return {
            uri,
            range: Range.fromTextSpan(tsTextSpan)
        };
    };
})(Location = exports.Location || (exports.Location = {}));
var TextEdit;
(function (TextEdit) {
    TextEdit.fromCodeEdit = (edit) => {
        return {
            range: Range.fromTextSpan(edit),
            newText: edit.newText
        };
    };
})(TextEdit = exports.TextEdit || (exports.TextEdit = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
    function fromFileCodeEdits(client, edits) {
        let changes = {};
        for (const edit of edits) {
            let uri = client.toResource(edit.fileName);
            changes[uri] = edit.textChanges.map(change => {
                return TextEdit.fromCodeEdit(change);
            });
        }
        return { changes };
    }
    WorkspaceEdit.fromFileCodeEdits = fromFileCodeEdits;
})(WorkspaceEdit = exports.WorkspaceEdit || (exports.WorkspaceEdit = {}));


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const PConst = __importStar(__webpack_require__(37));
const api_1 = __importDefault(__webpack_require__(38));
const codeAction_1 = __webpack_require__(40);
const completionItem_1 = __webpack_require__(41);
const Previewer = __importStar(__webpack_require__(42));
const typeConverters = __importStar(__webpack_require__(35));
const SnippetString_1 = __importDefault(__webpack_require__(43));
class ApplyCompletionCodeActionCommand {
    constructor(client) {
        this.client = client;
        this.id = ApplyCompletionCodeActionCommand.ID;
    }
    // apply code action on complete
    execute(codeActions) {
        return __awaiter(this, void 0, void 0, function* () {
            if (codeActions.length === 0) {
                return;
            }
            if (codeActions.length === 1) {
                yield codeAction_1.applyCodeAction(this.client, codeActions[0]);
                return;
            }
            const idx = yield coc_nvim_1.workspace.showQuickpick(codeActions.map(o => o.description), 'Select code action to apply');
            if (idx < 0)
                return;
            const action = codeActions[idx];
            yield codeAction_1.applyCodeAction(this.client, action);
            return;
        });
    }
}
ApplyCompletionCodeActionCommand.ID = '_typescript.applyCompletionCodeAction';
class TypeScriptCompletionItemProvider {
    constructor(client, typingsStatus, fileConfigurationManager, languageId) {
        this.client = client;
        this.typingsStatus = typingsStatus;
        this.fileConfigurationManager = fileConfigurationManager;
        this.noSemicolons = false;
        this.setCompleteOption(languageId);
        coc_nvim_1.commands.register(new ApplyCompletionCodeActionCommand(this.client));
        coc_nvim_1.workspace.onDidChangeConfiguration(_e => {
            this.setCompleteOption(languageId);
        });
    }
    setCompleteOption(languageId) {
        this.completeOption = this.fileConfigurationManager.getCompleteOptions(languageId);
        this.noSemicolons = this.fileConfigurationManager.removeSemicolons(languageId);
    }
    /**
     * Get completionItems
     *
     * @public
     * @param {TextDocument} document
     * @param {Position} position
     * @param {CancellationToken} token
     * @param {string} triggerCharacter
     * @returns {Promise<CompletionItem[]>}
     */
    provideCompletionItems(document, position, token, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.typingsStatus.isAcquiringTypings) {
                return Promise.resolve({
                    isIncomplete: true,
                    items: [{
                            label: 'Acquiring typings...',
                            detail: 'Acquiring typings definitions for IntelliSense.'
                        }]
                });
            }
            let { uri } = document;
            const file = this.client.toPath(document.uri);
            if (!file)
                return null;
            let preText = document.getText({
                start: { line: position.line, character: 0 },
                end: position
            });
            let { triggerCharacter, option } = context;
            if (!this.shouldTrigger(triggerCharacter, preText, option)) {
                return null;
            }
            const { completeOption } = this;
            const doc = coc_nvim_1.workspace.getDocument(uri);
            const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { includeExternalModuleExports: completeOption.autoImports, includeInsertTextCompletions: true, triggerCharacter: this.getTsTriggerCharacter(context) });
            let msg;
            let isNewIdentifierLocation = true;
            if (this.client.apiVersion.gte(api_1.default.v300)) {
                try {
                    const response = yield this.client.interruptGetErr(() => this.client.execute('completionInfo', args, token));
                    if (response.type !== 'response' || !response.body) {
                        return null;
                    }
                    isNewIdentifierLocation = response.body.isNewIdentifierLocation;
                    msg = response.body.entries;
                }
                catch (e) {
                    if (e.message == 'No content available.') {
                        return null;
                    }
                    throw e;
                }
            }
            else {
                const response = yield this.client.interruptGetErr(() => this.client.execute('completions', args, token));
                if (response.type !== 'response' || !response.body) {
                    return null;
                }
                msg = response.body;
            }
            const completionItems = [];
            for (const element of msg) {
                if (shouldExcludeCompletionEntry(element, completeOption)) {
                    continue;
                }
                const item = completionItem_1.convertCompletionEntry(element, uri, position, completeOption.completeFunctionCalls, isNewIdentifierLocation);
                completionItems.push(item);
            }
            let startcol = null;
            if (triggerCharacter == '@' && !doc.isWord('@')) {
                startcol = option.col - 1;
            }
            let res = {
                startcol,
                isIncomplete: false,
                items: completionItems
            };
            return res;
        });
    }
    getTsTriggerCharacter(context) {
        // Workaround for https://github.com/Microsoft/TypeScript/issues/27321
        if (context.triggerCharacter === '@'
            && this.client.apiVersion.gte(api_1.default.v310) && this.client.apiVersion.lt(api_1.default.v320)) {
            return undefined;
        }
        return context.triggerCharacter;
    }
    /**
     * Resolve complete item, could have documentation added
     *
     * @public
     * @param {CompletionItem} item
     * @param {CancellationToken} token
     * @returns {Promise<CompletionItem>}
     */
    resolveCompletionItem(item, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (item == null)
                return undefined;
            let { uri, position, source } = item.data;
            const filepath = this.client.toPath(uri);
            if (!filepath)
                return undefined;
            let document = coc_nvim_1.workspace.getDocument(uri);
            if (!document)
                return undefined;
            const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(filepath, position), { entryNames: [
                    source
                        ? { name: item.label, source }
                        : item.label
                ] });
            let response;
            try {
                response = yield this.client.interruptGetErr(() => this.client.execute('completionEntryDetails', args, token));
            }
            catch (_a) {
                return item;
            }
            if (response.type !== 'response' || !response.body) {
                return item;
            }
            const details = response.body;
            if (!details || !details.length || !details[0]) {
                return item;
            }
            const detail = details[0];
            item.detail = detail.displayParts.length
                ? Previewer.plain(detail.displayParts)
                : undefined;
            item.documentation = this.getDocumentation(detail);
            const { command, additionalTextEdits } = this.getCodeActions(detail, filepath);
            if (command)
                item.command = command;
            item.additionalTextEdits = additionalTextEdits;
            if (detail && item.insertTextFormat == vscode_languageserver_protocol_1.InsertTextFormat.Snippet) {
                const shouldCompleteFunction = yield this.isValidFunctionCompletionContext(filepath, position, token);
                if (shouldCompleteFunction) {
                    this.createSnippetOfFunctionCall(item, detail);
                }
            }
            return item;
        });
    }
    getCodeActions(detail, filepath) {
        if (!detail.codeActions || !detail.codeActions.length) {
            return {};
        }
        // Try to extract out the additionalTextEdits for the current file.
        // Also check if we still have to apply other workspace edits
        const additionalTextEdits = [];
        let hasReaminingCommandsOrEdits = false;
        for (const tsAction of detail.codeActions) {
            if (tsAction.commands) {
                hasReaminingCommandsOrEdits = true;
            }
            // Convert all edits in the current file using `additionalTextEdits`
            if (tsAction.changes) {
                for (const change of tsAction.changes) {
                    if (change.fileName === filepath) {
                        additionalTextEdits.push(...change.textChanges.map(typeConverters.TextEdit.fromCodeEdit));
                    }
                    else {
                        hasReaminingCommandsOrEdits = true;
                    }
                }
            }
        }
        let command = null;
        if (hasReaminingCommandsOrEdits) {
            // Create command that applies all edits not in the current file.
            command = {
                title: '',
                command: ApplyCompletionCodeActionCommand.ID,
                arguments: [
                    detail.codeActions.map((x) => ({
                        commands: x.commands,
                        description: x.description,
                        changes: x.changes.filter(x => x.fileName !== filepath)
                    }))
                ]
            };
        }
        if (additionalTextEdits.length && this.noSemicolons) {
            // remove comma
            additionalTextEdits.forEach(o => {
                o.newText = o.newText.replace(/;(?=(\n|$))/g, '');
            });
        }
        return {
            command,
            additionalTextEdits: additionalTextEdits.length
                ? additionalTextEdits
                : undefined
        };
    }
    shouldTrigger(triggerCharacter, pre, option) {
        if (triggerCharacter && this.client.apiVersion.lt(api_1.default.v290)) {
            if (triggerCharacter === '@') {
                // trigger in string
                if (option.synname && /string/i.test(option.synname)) {
                    return true;
                }
                // make sure we are in something that looks like the start of a jsdoc comment
                if (!pre.match(/^\s*\*[ ]?@/) && !pre.match(/\/\*\*+[ ]?@/)) {
                    return false;
                }
            }
            else if (triggerCharacter === '<') {
                return false;
            }
        }
        return true;
    }
    // complete item documentation
    getDocumentation(detail) {
        let documentation = '';
        if (detail.source) {
            const importPath = `'${Previewer.plain(detail.source)}'`;
            const autoImportLabel = `Auto import from ${importPath}`;
            documentation += `${autoImportLabel}\n`;
        }
        let parts = [
            Previewer.plain(detail.documentation),
            Previewer.tagsMarkdownPreview(detail.tags)
        ];
        parts = parts.filter(s => s && s.trim() != '');
        documentation += parts.join('\n\n');
        if (documentation.length) {
            return {
                kind: vscode_languageserver_protocol_1.MarkupKind.Markdown,
                value: documentation
            };
        }
        return undefined;
    }
    createSnippetOfFunctionCall(item, detail) {
        let { displayParts } = detail;
        const parameterListParts = completionItem_1.getParameterListParts(displayParts);
        const snippet = new SnippetString_1.default();
        snippet.appendText(`${item.insertText || item.label}(`);
        appendJoinedPlaceholders(snippet, parameterListParts.parts, ', ');
        if (parameterListParts.hasOptionalParameters) {
            snippet.appendTabstop();
        }
        snippet.appendText(')');
        snippet.appendTabstop(0);
        item.insertText = snippet.value;
    }
    isValidFunctionCompletionContext(filepath, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Workaround for https://github.com/Microsoft/TypeScript/issues/12677
            // Don't complete function calls inside of destructive assigments or imports
            try {
                const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
                const response = yield this.client.execute('quickinfo', args, token);
                if (response.type !== 'response') {
                    return true;
                }
                const { body } = response;
                switch (body && body.kind) {
                    case 'var':
                    case 'let':
                    case 'const':
                    case 'alias':
                        return false;
                    default:
                        return true;
                }
            }
            catch (e) {
                return true;
            }
        });
    }
}
TypeScriptCompletionItemProvider.triggerCharacters = ['.', '"', '\'', '/', '@'];
exports.default = TypeScriptCompletionItemProvider;
function shouldExcludeCompletionEntry(element, completionConfiguration) {
    return ((!completionConfiguration.names && element.kind === PConst.Kind.warning)
        || (!completionConfiguration.paths &&
            (element.kind === PConst.Kind.directory || element.kind === PConst.Kind.script || element.kind === PConst.Kind.externalModuleName))
        || (!completionConfiguration.autoImports && element.hasAction));
}
function appendJoinedPlaceholders(snippet, parts, joiner) {
    for (let i = 0; i < parts.length; ++i) {
        const paramterPart = parts[i];
        snippet.appendPlaceholder(paramterPart.text);
        if (i !== parts.length - 1) {
            snippet.appendText(joiner);
        }
    }
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
class Kind {
}
Kind.alias = 'alias';
Kind.callSignature = 'call';
Kind.class = 'class';
Kind.const = 'const';
Kind.constructorImplementation = 'constructor';
Kind.constructSignature = 'construct';
Kind.directory = 'directory';
Kind.enum = 'enum';
Kind.externalModuleName = 'external module name';
Kind.function = 'function';
Kind.indexSignature = 'index';
Kind.interface = 'interface';
Kind.keyword = 'keyword';
Kind.let = 'let';
Kind.localFunction = 'local function';
Kind.localVariable = 'local var';
Kind.memberFunction = 'method';
Kind.memberGetAccessor = 'getter';
Kind.memberSetAccessor = 'setter';
Kind.memberVariable = 'property';
Kind.module = 'module';
Kind.primitiveType = 'primitive type';
Kind.script = 'script';
Kind.type = 'type';
Kind.variable = 'var';
Kind.warning = 'warning';
Kind.string = 'string';
Kind.parameter = 'parameter';
exports.Kind = Kind;
class DiagnosticCategory {
}
DiagnosticCategory.error = 'error';
DiagnosticCategory.warning = 'warning';
DiagnosticCategory.suggestion = 'suggestion';
exports.DiagnosticCategory = DiagnosticCategory;
class KindModifiers {
}
KindModifiers.optional = 'optional';
KindModifiers.color = 'color';
KindModifiers.dtsFile = '.d.ts';
KindModifiers.tsFile = '.ts';
KindModifiers.tsxFile = '.tsx';
KindModifiers.jsFile = '.js';
KindModifiers.jsxFile = '.jsx';
KindModifiers.jsonFile = '.json';
KindModifiers.fileExtensionKindModifiers = [
    KindModifiers.dtsFile,
    KindModifiers.tsFile,
    KindModifiers.tsxFile,
    KindModifiers.jsFile,
    KindModifiers.jsxFile,
    KindModifiers.jsonFile,
];
exports.KindModifiers = KindModifiers;
class DisplayPartKind {
}
DisplayPartKind.functionName = 'functionName';
DisplayPartKind.methodName = 'methodName';
DisplayPartKind.parameterName = 'parameterName';
DisplayPartKind.propertyName = 'propertyName';
DisplayPartKind.punctuation = 'punctuation';
DisplayPartKind.text = 'text';
exports.DisplayPartKind = DisplayPartKind;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const semver = __importStar(__webpack_require__(39));
class API {
    constructor(versionString, version) {
        this.versionString = versionString;
        this.version = version;
    }
    static fromSimpleString(value) {
        return new API(value, value);
    }
    static fromVersionString(versionString) {
        let version = semver.valid(versionString);
        if (!version) {
            return new API('invalid version', '1.0.0');
        }
        // Cut off any prerelease tag since we sometimes consume those on purpose.
        const index = versionString.indexOf('-');
        if (index >= 0) {
            version = version.substr(0, index);
        }
        return new API(versionString, version);
    }
    gte(other) {
        return semver.gte(this.version, other.version);
    }
    lt(other) {
        return !this.gte(other);
    }
}
API.defaultVersion = API.fromSimpleString('1.0.0');
API.v203 = API.fromSimpleString('2.0.3');
API.v206 = API.fromSimpleString('2.0.6');
API.v208 = API.fromSimpleString('2.0.8');
API.v213 = API.fromSimpleString('2.1.3');
API.v220 = API.fromSimpleString('2.2.0');
API.v222 = API.fromSimpleString('2.2.2');
API.v230 = API.fromSimpleString('2.3.0');
API.v234 = API.fromSimpleString('2.3.4');
API.v240 = API.fromSimpleString('2.4.0');
API.v250 = API.fromSimpleString('2.5.0');
API.v260 = API.fromSimpleString('2.6.0');
API.v270 = API.fromSimpleString('2.7.0');
API.v280 = API.fromSimpleString('2.8.0');
API.v290 = API.fromSimpleString('2.9.0');
API.v291 = API.fromSimpleString('2.9.1');
API.v292 = API.fromSimpleString('2.9.2');
API.v300 = API.fromSimpleString('3.0.0');
API.v310 = API.fromSimpleString('3.1.0');
API.v314 = API.fromSimpleString('3.1.4');
API.v320 = API.fromSimpleString('3.2.0');
API.v330 = API.fromSimpleString('3.3.0');
API.v333 = API.fromSimpleString('3.3.3');
API.v340 = API.fromSimpleString('3.4.0');
API.v345 = API.fromSimpleString('3.4.5');
API.v350 = API.fromSimpleString('3.5.0');
exports.default = API;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'), options)
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const typeConverters = __importStar(__webpack_require__(35));
function getEditForCodeAction(client, action) {
    return action.changes && action.changes.length
        ? typeConverters.WorkspaceEdit.fromFileCodeEdits(client, action.changes)
        : undefined;
}
exports.getEditForCodeAction = getEditForCodeAction;
function applyCodeAction(client, action) {
    return __awaiter(this, void 0, void 0, function* () {
        const workspaceEdit = getEditForCodeAction(client, action);
        if (workspaceEdit) {
            if (!(yield coc_nvim_1.workspace.applyEdit(workspaceEdit))) {
                return false;
            }
        }
        return applyCodeActionCommands(client, action);
    });
}
exports.applyCodeAction = applyCodeAction;
function applyCodeActionCommands(client, action) {
    return __awaiter(this, void 0, void 0, function* () {
        // make sure there is command
        if (action.commands && action.commands.length) {
            for (const command of action.commands) {
                const response = yield client.execute('applyCodeActionCommand', { command }, vscode_languageserver_protocol_1.CancellationToken.None);
                if (!response || response.type != 'response' || !response.body) {
                    return false;
                }
            }
        }
        return true;
    });
}
exports.applyCodeActionCommands = applyCodeActionCommands;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const PConst = __importStar(__webpack_require__(37));
function convertCompletionEntry(tsEntry, uri, position, useCodeSnippetsOnMethodSuggest, isNewIdentifierLocation) {
    let label = tsEntry.name;
    let sortText = tsEntry.sortText;
    if (tsEntry.isRecommended) {
        // Make sure isRecommended property always comes first
        // https://github.com/Microsoft/vscode/issues/40325
        sortText = '\0' + sortText;
    }
    else if (tsEntry.source) {
        // De-prioritze auto-imports
        // https://github.com/Microsoft/vscode/issues/40311
        sortText = '\uffff' + sortText;
    }
    else {
        sortText = tsEntry.sortText;
    }
    let kind = convertKind(tsEntry.kind);
    let insertTextFormat = (useCodeSnippetsOnMethodSuggest &&
        (kind === vscode_languageserver_protocol_1.CompletionItemKind.Function ||
            kind === vscode_languageserver_protocol_1.CompletionItemKind.Method)) ? vscode_languageserver_protocol_1.InsertTextFormat.Snippet : vscode_languageserver_protocol_1.InsertTextFormat.PlainText;
    let insertText = tsEntry.insertText;
    let document = coc_nvim_1.workspace.getDocument(uri);
    let preText = document.getline(position.line).slice(0, position.character);
    const isInValidCommitCharacterContext = preText.match(/(^|[a-z_$\(\)\[\]\{\}]|[^.]\.)\s*$/ig) !== null;
    let commitCharacters = getCommitCharacters(tsEntry, { isNewIdentifierLocation, isInValidCommitCharacterContext, useCodeSnippetsOnMethodSuggest });
    let optional = tsEntry.kindModifiers && tsEntry.kindModifiers.match(/\boptional\b/);
    let textEdit = null;
    if (tsEntry.replacementSpan) {
        let { start, end } = tsEntry.replacementSpan;
        if (start.line == end.line) {
            textEdit = {
                range: vscode_languageserver_protocol_1.Range.create(start.line - 1, start.offset - 1, end.line - 1, end.offset - 1),
                newText: insertText || label
            };
        }
    }
    return {
        label,
        insertText,
        textEdit,
        kind,
        insertTextFormat,
        sortText,
        commitCharacters,
        data: {
            uri,
            optional,
            position,
            source: tsEntry.source || ''
        }
    };
}
exports.convertCompletionEntry = convertCompletionEntry;
function convertKind(kind) {
    switch (kind) {
        case PConst.Kind.primitiveType:
        case PConst.Kind.keyword:
            return vscode_languageserver_protocol_1.CompletionItemKind.Keyword;
        case PConst.Kind.const:
            return vscode_languageserver_protocol_1.CompletionItemKind.Constant;
        case PConst.Kind.let:
        case PConst.Kind.variable:
        case PConst.Kind.localVariable:
        case PConst.Kind.alias:
            return vscode_languageserver_protocol_1.CompletionItemKind.Variable;
        case PConst.Kind.memberVariable:
        case PConst.Kind.memberGetAccessor:
        case PConst.Kind.memberSetAccessor:
            return vscode_languageserver_protocol_1.CompletionItemKind.Field;
        case PConst.Kind.function:
            return vscode_languageserver_protocol_1.CompletionItemKind.Function;
        case PConst.Kind.memberFunction:
        case PConst.Kind.constructSignature:
        case PConst.Kind.callSignature:
        case PConst.Kind.indexSignature:
            return vscode_languageserver_protocol_1.CompletionItemKind.Method;
        case PConst.Kind.enum:
            return vscode_languageserver_protocol_1.CompletionItemKind.Enum;
        case PConst.Kind.module:
        case PConst.Kind.externalModuleName:
            return vscode_languageserver_protocol_1.CompletionItemKind.Module;
        case PConst.Kind.class:
        case PConst.Kind.type:
            return vscode_languageserver_protocol_1.CompletionItemKind.Class;
        case PConst.Kind.interface:
            return vscode_languageserver_protocol_1.CompletionItemKind.Interface;
        case PConst.Kind.warning:
        case PConst.Kind.script:
            return vscode_languageserver_protocol_1.CompletionItemKind.File;
        case PConst.Kind.directory:
            return vscode_languageserver_protocol_1.CompletionItemKind.Folder;
    }
    return vscode_languageserver_protocol_1.CompletionItemKind.Variable;
}
function getCommitCharacters(tsEntry, settings) {
    if (settings.isNewIdentifierLocation || !settings.isInValidCommitCharacterContext) {
        return undefined;
    }
    const commitCharacters = [];
    switch (tsEntry.kind) {
        case PConst.Kind.memberGetAccessor:
        case PConst.Kind.memberSetAccessor:
        case PConst.Kind.constructSignature:
        case PConst.Kind.callSignature:
        case PConst.Kind.indexSignature:
        case PConst.Kind.enum:
        case PConst.Kind.interface:
            commitCharacters.push('.', ';');
            break;
        case PConst.Kind.module:
        case PConst.Kind.alias:
        case PConst.Kind.const:
        case PConst.Kind.let:
        case PConst.Kind.variable:
        case PConst.Kind.localVariable:
        case PConst.Kind.memberVariable:
        case PConst.Kind.class:
        case PConst.Kind.function:
        case PConst.Kind.memberFunction:
        case PConst.Kind.keyword:
            commitCharacters.push('.', ',', ';');
            if (settings.useCodeSnippetsOnMethodSuggest) {
                commitCharacters.push('(');
            }
            break;
    }
    return commitCharacters.length === 0 ? undefined : commitCharacters;
}
function getParameterListParts(displayParts) {
    const parts = [];
    let isInMethod = false;
    let hasOptionalParameters = false;
    let parenCount = 0;
    let braceCount = 0;
    outer: for (let i = 0; i < displayParts.length; ++i) {
        const part = displayParts[i];
        switch (part.kind) {
            case PConst.DisplayPartKind.methodName:
            case PConst.DisplayPartKind.functionName:
            case PConst.DisplayPartKind.text:
            case PConst.DisplayPartKind.propertyName:
                if (parenCount === 0 && braceCount === 0) {
                    isInMethod = true;
                }
                break;
            case PConst.DisplayPartKind.parameterName:
                if (parenCount === 1 && braceCount === 0 && isInMethod) {
                    // Only take top level paren names
                    const next = displayParts[i + 1];
                    // Skip optional parameters
                    const nameIsFollowedByOptionalIndicator = next && next.text === '?';
                    if (!nameIsFollowedByOptionalIndicator) {
                        parts.push(part);
                    }
                    hasOptionalParameters = hasOptionalParameters || nameIsFollowedByOptionalIndicator;
                }
                break;
            case PConst.DisplayPartKind.punctuation:
                if (part.text === '(') {
                    ++parenCount;
                }
                else if (part.text === ')') {
                    --parenCount;
                    if (parenCount <= 0 && isInMethod) {
                        break outer;
                    }
                }
                else if (part.text === '...' && parenCount === 1) {
                    // Found rest parmeter. Do not fill in any further arguments
                    hasOptionalParameters = true;
                    break outer;
                }
                else if (part.text === '{') {
                    ++braceCount;
                }
                else if (part.text === '}') {
                    --braceCount;
                }
                break;
        }
    }
    return { hasOptionalParameters, parts };
}
exports.getParameterListParts = getParameterListParts;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_protocol_1 = __webpack_require__(3);
function getTagBodyText(tag) {
    if (!tag.text) {
        return undefined;
    }
    switch (tag.name) {
        case 'example':
        case 'default':
            // Convert to markdown code block if it not already one
            if (tag.text.match(/^\s*[~`]{3}/g)) {
                return tag.text;
            }
            return '```\n' + tag.text + '\n```';
    }
    return tag.text;
}
function getTagDocumentation(tag) {
    switch (tag.name) {
        case 'param':
            const body = (tag.text || '').split(/^([\w\.]+)\s*/);
            if (body && body.length === 3) {
                const param = body[1];
                const doc = body[2];
                const label = `*@${tag.name}* \`${param}\``;
                if (!doc) {
                    return label;
                }
                return label + (doc.match(/\r\n|\n/g) ? '\n' + doc : ` — ${doc}`);
            }
    }
    // Generic tag
    const label = `*@${tag.name}*`;
    const text = getTagBodyText(tag);
    if (!text) {
        return label;
    }
    return label + (text.match(/\r\n|\n/g) ? '\n' + text : ` — ${text}`);
}
function plain(parts) {
    if (!parts || !parts.length)
        return '';
    return parts.map(part => part.text).join('');
}
exports.plain = plain;
function tagsMarkdownPreview(tags) {
    return (tags || []).map(getTagDocumentation).join('  \n\n');
}
exports.tagsMarkdownPreview = tagsMarkdownPreview;
function markdownDocumentation(documentation, tags) {
    let out = plain(documentation);
    const tagsPreview = tagsMarkdownPreview(tags);
    if (tagsPreview) {
        out = out + ('\n\n' + tagsPreview);
    }
    return {
        kind: vscode_languageserver_protocol_1.MarkupKind.Markdown,
        value: out
    };
}
exports.markdownDocumentation = markdownDocumentation;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SnippetString {
    constructor(value) {
        this._tabstop = 1;
        this.value = value || '';
    }
    static isSnippetString(thing) {
        if (thing instanceof SnippetString) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.value === 'string';
    }
    static _escape(value) {
        return value.replace(/\$|}|\\/g, '\\$&');
    }
    appendText(string) {
        this.value += SnippetString._escape(string);
        return this;
    }
    appendTabstop(number = this._tabstop++) {
        this.value += '$';
        this.value += number;
        return this;
    }
    appendPlaceholder(value, number = this._tabstop++) {
        if (typeof value === 'function') {
            const nested = new SnippetString();
            nested._tabstop = this._tabstop;
            value(nested);
            this._tabstop = nested._tabstop;
            value = nested.value;
        }
        else {
            value = SnippetString._escape(value);
        }
        this.value += '${';
        this.value += number;
        this.value += ':';
        this.value += value;
        this.value += '}';
        return this;
    }
    appendVariable(name, defaultValue) {
        if (typeof defaultValue === 'function') {
            const nested = new SnippetString();
            nested._tabstop = this._tabstop;
            defaultValue(nested);
            this._tabstop = nested._tabstop;
            defaultValue = nested.value;
        }
        else if (typeof defaultValue === 'string') {
            defaultValue = defaultValue.replace(/\$|}/g, '\\$&');
        }
        this.value += '${';
        this.value += name;
        if (defaultValue) {
            this.value += ':';
            this.value += defaultValue;
        }
        this.value += '}';
        return this;
    }
}
exports.default = SnippetString;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeConverters = __importStar(__webpack_require__(35));
class TypeScriptDefinitionProvider {
    constructor(client) {
        this.client = client;
    }
    getSymbolLocations(definitionType, document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(document.uri);
            if (!filepath) {
                return undefined;
            }
            const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
            try {
                const response = yield this.client.execute(definitionType, args, token);
                const locations = (response.type == 'response' && response.body) || [];
                return locations.map(location => typeConverters.Location.fromTextSpan(this.client.toResource(location.file), location));
            }
            catch (_a) {
                return [];
            }
        });
    }
    provideDefinition(document, position, token) {
        return this.getSymbolLocations('definition', document, position, token);
    }
    provideTypeDefinition(document, position, token) {
        return this.getSymbolLocations('typeDefinition', document, position, token);
    }
    provideImplementation(document, position, token) {
        return this.getSymbolLocations('implementation', document, position, token);
    }
}
exports.default = TypeScriptDefinitionProvider;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const directives = [
    {
        value: '@ts-check',
        description: 'Enables semantic checking in a JavaScript file. Must be at the top of a file.'
    },
    {
        value: '@ts-nocheck',
        description: 'Disables semantic checking in a JavaScript file. Must be at the top of a file.'
    },
    {
        value: '@ts-ignore',
        description: 'Suppresses @ts-check errors on the next line of a file.'
    }
];
class DirectiveCommentCompletionProvider {
    constructor(client) {
        this.client = client;
    }
    provideCompletionItems(document, position, _token, context) {
        if (context.triggerCharacter != '@') {
            return [];
        }
        const file = this.client.toPath(document.uri);
        if (!file) {
            return [];
        }
        const doc = coc_nvim_1.workspace.getDocument(document.uri);
        const line = doc.getline(position.line);
        const prefix = line.slice(0, position.character);
        const match = prefix.match(/^\s*\/\/+\s?(@[a-zA-Z\-]*)?$/);
        if (match) {
            let items = directives.map(directive => {
                const item = vscode_languageserver_protocol_1.CompletionItem.create(directive.value);
                item.kind = vscode_languageserver_protocol_1.CompletionItemKind.Snippet;
                item.detail = directive.description;
                item.textEdit = {
                    range: vscode_languageserver_protocol_1.Range.create(position.line, Math.max(0, position.character - (match[1] ? match[1].length : 0)), position.line, position.character),
                    newText: directive.value
                };
                return item;
            });
            let res = {
                isIncomplete: false,
                items
            };
            res.startcol = doc.fixStartcol(position, ['@']);
            return res;
        }
        return [];
    }
}
exports.default = DirectiveCommentCompletionProvider;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const typeConverters = __importStar(__webpack_require__(35));
const arrays_1 = __webpack_require__(47);
class TypeScriptDocumentHighlightProvider {
    constructor(client) {
        this.client = client;
    }
    provideDocumentHighlights(resource, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.client.toPath(resource.uri);
            if (!file)
                return [];
            const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { filesToSearch: [file] });
            try {
                const response = yield this.client.execute('documentHighlights', args, token);
                if (response.type !== 'response' || !response.body) {
                    return [];
                }
                return arrays_1.flatten(response.body
                    .filter(highlight => highlight.file === file)
                    .map(convertDocumentHighlight));
            }
            catch (_e) {
                return [];
            }
        });
    }
}
exports.default = TypeScriptDocumentHighlightProvider;
function convertDocumentHighlight(highlight) {
    return highlight.highlightSpans.map(span => {
        return {
            range: typeConverters.Range.fromTextSpan(span),
            kind: span.kind === 'writtenReference' ? vscode_languageserver_protocol_1.DocumentHighlightKind.Write : vscode_languageserver_protocol_1.DocumentHighlightKind.Read
        };
    });
}


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function equals(one, other, itemEquals = (a, b) => a === b) {
    if (one.length !== other.length) {
        return false;
    }
    for (let i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
function flatten(arr) {
    return [].concat.apply([], arr);
}
exports.flatten = flatten;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const PConst = __importStar(__webpack_require__(37));
const typeConverters = __importStar(__webpack_require__(35));
const getSymbolKind = (kind) => {
    switch (kind) {
        case PConst.Kind.module:
            return vscode_languageserver_protocol_1.SymbolKind.Module;
        case PConst.Kind.class:
            return vscode_languageserver_protocol_1.SymbolKind.Class;
        case PConst.Kind.enum:
            return vscode_languageserver_protocol_1.SymbolKind.Enum;
        case PConst.Kind.interface:
            return vscode_languageserver_protocol_1.SymbolKind.Interface;
        case PConst.Kind.memberFunction:
            return vscode_languageserver_protocol_1.SymbolKind.Method;
        case PConst.Kind.memberVariable:
            return vscode_languageserver_protocol_1.SymbolKind.Property;
        case PConst.Kind.memberGetAccessor:
            return vscode_languageserver_protocol_1.SymbolKind.Property;
        case PConst.Kind.memberSetAccessor:
            return vscode_languageserver_protocol_1.SymbolKind.Property;
        case PConst.Kind.variable:
            return vscode_languageserver_protocol_1.SymbolKind.Variable;
        case PConst.Kind.const:
            return vscode_languageserver_protocol_1.SymbolKind.Variable;
        case PConst.Kind.localVariable:
            return vscode_languageserver_protocol_1.SymbolKind.Variable;
        case PConst.Kind.variable:
            return vscode_languageserver_protocol_1.SymbolKind.Variable;
        case PConst.Kind.constructSignature:
        case PConst.Kind.constructorImplementation:
        case PConst.Kind.function:
        case PConst.Kind.localFunction:
            return vscode_languageserver_protocol_1.SymbolKind.Function;
    }
    return vscode_languageserver_protocol_1.SymbolKind.Variable;
};
class TypeScriptDocumentSymbolProvider {
    constructor(client) {
        this.client = client;
    }
    provideDocumentSymbols(resource, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(resource.uri);
            if (!filepath)
                return [];
            const args = {
                file: filepath
            };
            try {
                const response = yield this.client.execute('navtree', args, token);
                if (response.type == 'response' && response.body) {
                    // The root represents the file. Ignore this when showing in the UI
                    const tree = response.body;
                    if (tree.childItems) {
                        const result = new Array();
                        tree.childItems.forEach(item => TypeScriptDocumentSymbolProvider.convertNavTree(result, item));
                        return result;
                    }
                }
                return [];
            }
            catch (e) {
                return [];
            }
        });
    }
    static convertNavTree(bucket, item) {
        let shouldInclude = TypeScriptDocumentSymbolProvider.shouldInclueEntry(item);
        const children = new Set(item.childItems || []);
        for (const span of item.spans) {
            const range = typeConverters.Range.fromTextSpan(span);
            const symbolInfo = vscode_languageserver_protocol_1.DocumentSymbol.create(item.text, '', getSymbolKind(item.kind), range, range);
            symbolInfo.children = children.size > 0 ? [] : null;
            for (const child of children) {
                if (child.spans.some(span => !!containsRange(range, typeConverters.Range.fromTextSpan(span)))) {
                    const includedChild = TypeScriptDocumentSymbolProvider.convertNavTree(symbolInfo.children, child);
                    shouldInclude = shouldInclude || includedChild;
                    children.delete(child);
                }
            }
            if (shouldInclude) {
                bucket.push(symbolInfo);
            }
        }
        return shouldInclude;
    }
    static shouldInclueEntry(item) {
        if (item.kind === PConst.Kind.alias) {
            return false;
        }
        return !!(item.text &&
            item.text !== '<function>' &&
            item.text !== '<class>');
    }
}
exports.default = TypeScriptDocumentSymbolProvider;
function containsRange(range, otherRange) {
    if (otherRange.start.line < range.start.line || otherRange.end.line < range.start.line) {
        return false;
    }
    if (otherRange.start.line > range.end.line || otherRange.end.line > range.end.line) {
        return false;
    }
    if (otherRange.start.line === range.start.line && otherRange.start.character < range.start.character) {
        return false;
    }
    if (otherRange.end.line === range.end.line && otherRange.end.character > range.end.character) {
        return false;
    }
    return true;
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const api_1 = __importDefault(__webpack_require__(38));
const languageIds = __importStar(__webpack_require__(50));
function objAreEqual(a, b) {
    let keys = Object.keys(a);
    for (let i = 0; i < keys.length; i++) { // tslint:disable-line
        let key = keys[i];
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
class FileConfigurationManager {
    constructor(client) {
        this.client = client;
        this.cachedOption = null;
        this.requesting = false;
    }
    ensureConfigurationOptions(languageId, insertSpaces, tabSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let { requesting } = this;
            let options = {
                tabSize,
                insertSpaces
            };
            if (requesting || (this.cachedOption && objAreEqual(this.cachedOption, options)))
                return;
            const currentOptions = this.getFileOptions(options, languageId);
            this.requesting = true;
            const args = Object.assign({ hostInfo: 'nvim-coc' }, currentOptions);
            yield this.client.execute('configure', args, vscode_languageserver_protocol_1.CancellationToken.None);
            this.cachedOption = options;
            this.requesting = false;
        });
    }
    ensureConfigurationForDocument(document) {
        return __awaiter(this, void 0, void 0, function* () {
            let opts = yield coc_nvim_1.workspace.getFormatOptions(document.uri);
            if (!this.client.bufferSyncSupport.has(document.uri))
                return;
            return this.ensureConfigurationOptions(document.languageId, opts.insertSpaces, opts.tabSize);
        });
    }
    reset() {
        this.cachedOption = null;
    }
    getLanguageConfiguration(languageId) {
        return coc_nvim_1.workspace.getConfiguration(languageId);
    }
    isTypeScriptDocument(languageId) {
        return languageId === languageIds.typescript || languageId === languageIds.typescriptreact ||
            languageId === languageIds.typescripttsx || languageId === languageIds.typescriptjsx;
    }
    enableJavascript() {
        const config = coc_nvim_1.workspace.getConfiguration('tsserver');
        return !!config.get('enableJavascript');
    }
    getFileOptions(options, languageId) {
        const lang = this.isTypeScriptDocument(languageId) ? 'typescript' : 'javascript';
        return {
            formatOptions: this.getFormatOptions(options, lang),
            preferences: this.getPreferences(lang)
        };
    }
    getFormatOptions(options, language) {
        const config = coc_nvim_1.workspace.getConfiguration(`${language}.format`);
        return {
            tabSize: options.tabSize,
            indentSize: options.tabSize,
            convertTabsToSpaces: options.insertSpaces,
            // We can use \n here since the editor normalizes later on to its line endings.
            newLineCharacter: '\n',
            insertSpaceAfterCommaDelimiter: config.get('insertSpaceAfterCommaDelimiter'),
            insertSpaceAfterConstructor: config.get('insertSpaceAfterConstructor'),
            insertSpaceAfterSemicolonInForStatements: config.get('insertSpaceAfterSemicolonInForStatements'),
            insertSpaceBeforeAndAfterBinaryOperators: config.get('insertSpaceBeforeAndAfterBinaryOperators'),
            insertSpaceAfterKeywordsInControlFlowStatements: config.get('insertSpaceAfterKeywordsInControlFlowStatements'),
            insertSpaceAfterFunctionKeywordForAnonymousFunctions: config.get('insertSpaceAfterFunctionKeywordForAnonymousFunctions'),
            insertSpaceBeforeFunctionParenthesis: config.get('insertSpaceBeforeFunctionParenthesis'),
            insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: config.get('insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis'),
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: config.get('insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets'),
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: config.get('insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces'),
            insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: config.get('insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces'),
            insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: config.get('insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces'),
            insertSpaceAfterTypeAssertion: config.get('insertSpaceAfterTypeAssertion'),
            placeOpenBraceOnNewLineForFunctions: config.get('placeOpenBraceOnNewLineForFunctions'),
            placeOpenBraceOnNewLineForControlBlocks: config.get('placeOpenBraceOnNewLineForControlBlocks')
        };
    }
    getCompleteOptions(languageId) {
        const lang = this.isTypeScriptDocument(languageId) ? 'typescript' : 'javascript';
        const config = coc_nvim_1.workspace.getConfiguration(`${lang}.suggest`);
        return {
            enabled: config.get('enabled', true),
            names: config.get('names', true),
            paths: config.get('paths', true),
            completeFunctionCalls: config.get('completeFunctionCalls', true),
            autoImports: config.get('autoImports', true)
        };
    }
    removeSemicolons(languageId) {
        const lang = this.isTypeScriptDocument(languageId) ? 'typescript' : 'javascript';
        const config = coc_nvim_1.workspace.getConfiguration(`${lang}.preferences`);
        return config.get('noSemicolons', false);
    }
    getPreferences(language) {
        if (!this.client.apiVersion.gte(api_1.default.v290)) {
            return {};
        }
        const config = coc_nvim_1.workspace.getConfiguration(`${language}`);
        const defaultQuote = this.client.apiVersion.gte(api_1.default.v333) ? 'auto' : undefined;
        return {
            disableSuggestions: !config.get('suggest.enabled', true),
            importModuleSpecifierPreference: getImportModuleSpecifier(config),
            quotePreference: config.get('preferences.quoteStyle', defaultQuote),
            allowRenameOfImportPath: true,
            allowTextChangesInNewFiles: true,
        };
    }
}
exports.default = FileConfigurationManager;
function getImportModuleSpecifier(config) {
    let val = config.get('preferences.importModuleSpecifier');
    switch (val) {
        case 'relative':
            return 'relative';
        case 'non-relative':
            return 'non-relative';
        default:
            return 'auto';
    }
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescript = 'typescript';
exports.typescriptreact = 'typescriptreact';
exports.typescripttsx = 'typescript.tsx';
exports.typescriptjsx = 'typescript.jsx';
exports.javascript = 'javascript';
exports.javascriptreact = 'javascriptreact';
exports.javascriptjsx = 'javascript.jsx';
exports.jsxTags = 'jsx-tags';
exports.languageIds = [exports.typescript, exports.typescriptreact, exports.javascript, exports.javascriptreact, exports.javascriptjsx, exports.typescripttsx, exports.jsxTags];


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = __webpack_require__(18);
const coc_nvim_1 = __webpack_require__(1);
const typeConverters = __importStar(__webpack_require__(35));
class TypeScriptFoldingProvider {
    constructor(client) {
        this.client = client;
    }
    provideFoldingRanges(document, _context, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.client.toPath(document.uri);
            if (!file) {
                return;
            }
            const args = { file };
            const res = yield this.client.execute('getOutliningSpans', args, token);
            if (res.type != 'response') {
                return;
            }
            const { body } = res;
            if (!body) {
                return;
            }
            return body
                .map(span => this.convertOutliningSpan(span, document))
                .filter(foldingRange => !!foldingRange);
        });
    }
    convertOutliningSpan(span, document) {
        const range = typeConverters.Range.fromTextSpan(span.textSpan);
        const kind = TypeScriptFoldingProvider.getFoldingRangeKind(span);
        // Workaround for #49904
        if (span.kind === 'comment') {
            let doc = coc_nvim_1.workspace.getDocument(document.uri);
            const line = doc.getline(range.start.line);
            if (line.match(/\/\/\s*#endregion/gi)) {
                return undefined;
            }
        }
        let { start, end } = range;
        return vscode_languageserver_types_1.FoldingRange.create(start.line, end.line, start.character, end.character, kind);
    }
    static getFoldingRangeKind(span) {
        switch (span.kind) {
            case 'comment':
            case 'region':
            case 'imports':
            case 'code':
                return span.kind;
            default:
                return undefined;
        }
    }
}
exports.default = TypeScriptFoldingProvider;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
const semicolon_1 = __webpack_require__(53);
const typeConverters = __importStar(__webpack_require__(35));
class TypeScriptFormattingProvider {
    constructor(client, formattingOptionsManager) {
        this.client = client;
        this.formattingOptionsManager = formattingOptionsManager;
    }
    doFormat(document, options, args, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.formattingOptionsManager.ensureConfigurationOptions(document.languageId, options.insertSpaces, options.tabSize);
            try {
                const response = yield this.client.execute('format', args, token);
                if (response.type == 'response' && response.body) {
                    let edits = response.body.map(typeConverters.TextEdit.fromCodeEdit);
                    if (this.formattingOptionsManager.removeSemicolons(document.languageId)) {
                        return semicolon_1.removeSemicolon(document, edits);
                    }
                    return edits;
                }
            }
            catch (_a) {
                // noop
            }
            return [];
        });
    }
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(document.uri);
            if (!filepath)
                return [];
            const args = {
                file: filepath,
                line: range.start.line + 1,
                offset: range.start.character + 1,
                endLine: range.end.line + 1,
                endOffset: range.end.character + 1
            };
            return this.doFormat(document, options, args, token);
        });
    }
    provideDocumentFormattingEdits(document, options, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(document.uri);
            if (!filepath)
                return [];
            const args = {
                file: filepath,
                line: 1,
                offset: 1,
                endLine: document.lineCount + 1,
                endOffset: 1
            };
            return this.doFormat(document, options, args, token);
        });
    }
    provideOnTypeFormattingEdits(document, position, ch, options, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client.configuration.formatOnType) {
                return;
            }
            const file = this.client.toPath(document.uri);
            if (!file) {
                return [];
            }
            yield this.formattingOptionsManager.ensureConfigurationOptions(document.languageId, options.insertSpaces, options.tabSize);
            const doc = coc_nvim_1.workspace.getDocument(document.uri);
            const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { key: ch });
            try {
                const res = yield this.client.execute('formatonkey', args, token);
                if (res.type != 'response') {
                    return [];
                }
                const { body } = res;
                const edits = body;
                const result = [];
                if (!edits) {
                    return result;
                }
                for (const edit of edits) {
                    const textEdit = typeConverters.TextEdit.fromCodeEdit(edit);
                    const range = textEdit.range;
                    // Work around for https://github.com/Microsoft/TypeScript/issues/6700.
                    // Check if we have an edit at the beginning of the line which only removes white spaces and leaves
                    // an empty line. Drop those edits
                    if (range.start.character === 0 &&
                        range.start.line === range.end.line &&
                        textEdit.newText === '') {
                        const lText = doc.getline(range.start.line);
                        // If the edit leaves something on the line keep the edit (note that the end character is exclusive).
                        // Keep it also if it removes something else than whitespace
                        if (lText.trim().length > 0 || lText.length > range.end.character) {
                            result.push(textEdit);
                        }
                    }
                    else {
                        result.push(textEdit);
                    }
                }
                return result;
            }
            catch (_a) {
                // noop
            }
            return [];
        });
    }
}
exports.default = TypeScriptFormattingProvider;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_diff_1 = __importDefault(__webpack_require__(54));
const vscode_languageserver_protocol_1 = __webpack_require__(3);
function removeSemicolon(document, edits) {
    let orig = document.getText();
    let content = vscode_languageserver_protocol_1.TextDocument.applyEdits(document, edits);
    let result = content.split('\n').map(s => s.replace(/;$/, '')).join('\n');
    if (result == content)
        return edits;
    let change = getChange(orig, result);
    return [{
            range: {
                start: document.positionAt(change.start),
                end: document.positionAt(change.end)
            },
            newText: change.newText
        }];
}
exports.removeSemicolon = removeSemicolon;
function getChange(oldStr, newStr) {
    let result = fast_diff_1.default(oldStr, newStr, 1);
    let curr = 0;
    let start = -1;
    let end = -1;
    let newText = '';
    let remain = '';
    for (let item of result) {
        let [t, str] = item;
        // equal
        if (t == 0) {
            curr = curr + str.length;
            if (start != -1)
                remain = remain + str;
        }
        else {
            if (start == -1)
                start = curr;
            if (t == 1) {
                newText = newText + remain + str;
                end = curr;
            }
            else {
                newText = newText + remain;
                end = curr + str.length;
            }
            remain = '';
            if (t == -1)
                curr = curr + str.length;
        }
    }
    return { start, end, newText };
}


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/**
 * This library modifies the diff-patch-match library by Neil Fraser
 * by removing the patch and match functionality and certain advanced
 * options in the diff function. The original license is as follows:
 *
 * ===
 *
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {Int|Object} [cursor_pos] Edit position in text1 or object with more info
 * @return {Array} Array of diff tuples.
 */
function diff_main(text1, text2, cursor_pos, _fix_unicode) {
  // Check for equality
  if (text1 === text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (cursor_pos != null) {
    var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
    if (editdiff) {
      return editdiff;
    }
  }

  // Trim off common prefix (speedup).
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = diff_compute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs, _fix_unicode);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 */
function diff_compute_(text1, text2) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i !== -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [
      [DIFF_INSERT, longtext.substring(0, i)],
      [DIFF_EQUAL, shorttext],
      [DIFF_INSERT, longtext.substring(i + shorttext.length)]
    ];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length === 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  return diff_bisect_(text1, text2);
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @return {Array} Array of diff tuples.
 * @private
 */
function diff_bisect_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 !== 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 === -d || (k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (
        x1 < text1_length && y1 < text2_length &&
        text1.charAt(x1) === text2.charAt(y1)
      ) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 === -d || (k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (
        x2 < text1_length && y2 < text2_length &&
        text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)
      ) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @return {Array} Array of diff tuples.
 */
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);

  return diffs.concat(diffsb);
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (
      text1.substring(pointerstart, pointermid) ==
      text2.substring(pointerstart, pointermid)
    ) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
    pointermid--;
  }

  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (
      text1.substring(text1.length - pointermid, text1.length - pointerend) ==
      text2.substring(text2.length - pointermid, text2.length - pointerend)
    ) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
    pointermid--;
  }

  return pointermid;
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 */
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
      var prefixLength = diff_commonPrefix(
        longtext.substring(i), shorttext.substring(j));
      var suffixLength = diff_commonSuffix(
        longtext.substring(0, i), shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(
          j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [
        best_longtext_a, best_longtext_b,
        best_shorttext_a, best_shorttext_b, best_common
      ];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {Array} diffs Array of diff tuples.
 * @param {boolean} fix_unicode Whether to normalize to a unicode-correct diff
 */
function diff_cleanupMerge(diffs, fix_unicode) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
      diffs.splice(pointer, 1);
      continue;
    }
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:

        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        var previous_equality = pointer - count_insert - count_delete - 1;
        if (fix_unicode) {
          // prevent splitting of unicode surrogate pairs.  when fix_unicode is true,
          // we assume that the old and new text in the diff are complete and correct
          // unicode-encoded JS strings, but the tuple boundaries may fall between
          // surrogate pairs.  we fix this by shaving off stray surrogates from the end
          // of the previous equality and the beginning of this equality.  this may create
          // empty equalities or a common prefix or suffix.  for example, if AB and AC are
          // emojis, `[[0, 'A'], [-1, 'BA'], [0, 'C']]` would turn into deleting 'ABAC' and
          // inserting 'AC', and then the common suffix 'AC' will be eliminated.  in this
          // particular case, both equalities go away, we absorb any previous inequalities,
          // and we keep scanning for the next equality before rewriting the tuples.
          if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
            var stray = diffs[previous_equality][1].slice(-1);
            diffs[previous_equality][1] = diffs[previous_equality][1].slice(0, -1);
            text_delete = stray + text_delete;
            text_insert = stray + text_insert;
            if (!diffs[previous_equality][1]) {
              // emptied out previous equality, so delete it and include previous delete/insert
              diffs.splice(previous_equality, 1);
              pointer--;
              var k = previous_equality - 1;
              if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                count_insert++;
                text_insert = diffs[k][1] + text_insert;
                k--;
              }
              if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                count_delete++;
                text_delete = diffs[k][1] + text_delete;
                k--;
              }
              previous_equality = k;
            }
          }
          if (starts_with_pair_end(diffs[pointer][1])) {
            var stray = diffs[pointer][1].charAt(0);
            diffs[pointer][1] = diffs[pointer][1].slice(1);
            text_delete += stray;
            text_insert += stray;
          }
        }
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          // for empty equality not at end, wait for next equality
          diffs.splice(pointer, 1);
          break;
        }
        if (text_delete.length > 0 || text_insert.length > 0) {
          // note that diff_commonPrefix and diff_commonSuffix are unicode-aware
          if (text_delete.length > 0 && text_insert.length > 0) {
            // Factor out any common prefixes.
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if (previous_equality >= 0) {
                diffs[previous_equality][1] += text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL, text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixes.
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] =
                text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length - commonlength);
              text_delete = text_delete.substring(0, text_delete.length - commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          var n = count_insert + count_delete;
          if (text_delete.length === 0 && text_insert.length === 0) {
            diffs.splice(pointer - n, n);
            pointer = pointer - n;
          } else if (text_delete.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
            pointer = pointer - n + 1;
          } else if (text_insert.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
            pointer = pointer - n + 1;
          } else {
            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete], [DIFF_INSERT, text_insert]);
            pointer = pointer - n + 2;
          }
        }
        if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] === DIFF_EQUAL &&
      diffs[pointer + 1][0] === DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
        diffs[pointer - 1][1].length) === diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
          diffs[pointer][1].substring(0, diffs[pointer][1].length -
            diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
        diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
          diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
          diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    diff_cleanupMerge(diffs, fix_unicode);
  }
};

function is_surrogate_pair_start(charCode) {
  return charCode >= 0xD800 && charCode <= 0xDBFF;
}

function is_surrogate_pair_end(charCode) {
  return charCode >= 0xDC00 && charCode <= 0xDFFF;
}

function starts_with_pair_end(str) {
  return is_surrogate_pair_end(str.charCodeAt(0));
}

function ends_with_pair_start(str) {
  return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
}

function remove_empty_tuples(tuples) {
  var ret = [];
  for (var i = 0; i < tuples.length; i++) {
    if (tuples[i][1].length > 0) {
      ret.push(tuples[i]);
    }
  }
  return ret;
}

function make_edit_splice(before, oldMiddle, newMiddle, after) {
  if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
    return null;
  }
  return remove_empty_tuples([
    [DIFF_EQUAL, before],
    [DIFF_DELETE, oldMiddle],
    [DIFF_INSERT, newMiddle],
    [DIFF_EQUAL, after]
  ]);
}

function find_cursor_edit_diff(oldText, newText, cursor_pos) {
  // note: this runs after equality check has ruled out exact equality
  var oldRange = typeof cursor_pos === 'number' ?
    { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
  var newRange = typeof cursor_pos === 'number' ?
    null : cursor_pos.newRange;
  // take into account the old and new selection to generate the best diff
  // possible for a text edit.  for example, a text change from "xxx" to "xx"
  // could be a delete or forwards-delete of any one of the x's, or the
  // result of selecting two of the x's and typing "x".
  var oldLength = oldText.length;
  var newLength = newText.length;
  if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
    // see if we have an insert or delete before or after cursor
    var oldCursor = oldRange.index;
    var oldBefore = oldText.slice(0, oldCursor);
    var oldAfter = oldText.slice(oldCursor);
    var maybeNewCursor = newRange ? newRange.index : null;
    editBefore: {
      // is this an insert or delete right before oldCursor?
      var newCursor = oldCursor + newLength - oldLength;
      if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
        break editBefore;
      }
      if (newCursor < 0 || newCursor > newLength) {
        break editBefore;
      }
      var newBefore = newText.slice(0, newCursor);
      var newAfter = newText.slice(newCursor);
      if (newAfter !== oldAfter) {
        break editBefore;
      }
      var prefixLength = Math.min(oldCursor, newCursor);
      var oldPrefix = oldBefore.slice(0, prefixLength);
      var newPrefix = newBefore.slice(0, prefixLength);
      if (oldPrefix !== newPrefix) {
        break editBefore;
      }
      var oldMiddle = oldBefore.slice(prefixLength);
      var newMiddle = newBefore.slice(prefixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
    }
    editAfter: {
      // is this an insert or delete right after oldCursor?
      if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
        break editAfter;
      }
      var cursor = oldCursor;
      var newBefore = newText.slice(0, cursor);
      var newAfter = newText.slice(cursor);
      if (newBefore !== oldBefore) {
        break editAfter;
      }
      var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
      var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
      var newSuffix = newAfter.slice(newAfter.length - suffixLength);
      if (oldSuffix !== newSuffix) {
        break editAfter;
      }
      var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
      var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
      return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
    }
  }
  if (oldRange.length > 0 && newRange && newRange.length === 0) {
    replaceRange: {
      // see if diff could be a splice of the old selection range
      var oldPrefix = oldText.slice(0, oldRange.index);
      var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
      var prefixLength = oldPrefix.length;
      var suffixLength = oldSuffix.length;
      if (newLength < prefixLength + suffixLength) {
        break replaceRange;
      }
      var newPrefix = newText.slice(0, prefixLength);
      var newSuffix = newText.slice(newLength - suffixLength);
      if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
        break replaceRange;
      }
      var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
      var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
    }
  }

  return null;
}

function diff(text1, text2, cursor_pos) {
  // only pass fix_unicode=true at the top level, not when diff_main is
  // recursively invoked
  return diff_main(text1, text2, cursor_pos, true);
}

diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;

module.exports = diff;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const previewer_1 = __webpack_require__(42);
const typeConverters = __importStar(__webpack_require__(35));
class TypeScriptHoverProvider {
    constructor(client) {
        this.client = client;
    }
    provideHover(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(document.uri);
            if (!filepath) {
                return undefined;
            }
            const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
            try {
                const response = yield this.client.interruptGetErr(() => this.client.execute('quickinfo', args, token));
                if (response && response.type == 'response' && response.body) {
                    const data = response.body;
                    return {
                        contents: TypeScriptHoverProvider.getContents(data),
                        range: typeConverters.Range.fromTextSpan(data)
                    };
                }
            }
            catch (e) {
                // noop
            }
            return undefined;
        });
    }
    static getContents(data) {
        const parts = [];
        if (data.displayString) {
            parts.push({ language: 'typescript', value: data.displayString });
        }
        const tags = previewer_1.tagsMarkdownPreview(data.tags);
        parts.push(data.documentation + (tags ? '\n\n' + tags : ''));
        return parts;
    }
}
exports.default = TypeScriptHoverProvider;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const PConst = __importStar(__webpack_require__(37));
const typeConverters = __importStar(__webpack_require__(35));
const baseCodeLensProvider_1 = __webpack_require__(33);
class TypeScriptImplementationsCodeLensProvider extends baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider {
    resolveCodeLens(codeLens, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let { uri } = codeLens.data;
            let filepath = this.client.toPath(uri);
            const args = typeConverters.Position.toFileLocationRequestArgs(filepath, codeLens.range.start);
            try {
                const response = yield this.client.execute('implementation', args, token, true);
                if (response && response.type == 'response' && response.body) {
                    const locations = response.body
                        .map(reference => {
                        return {
                            uri: this.client.toResource(reference.file),
                            range: {
                                start: typeConverters.Position.fromLocation(reference.start),
                                end: {
                                    line: reference.start.line,
                                    character: 0
                                }
                            }
                        };
                    })
                        // Exclude original from implementations
                        .filter(location => !(location.uri.toString() === uri &&
                        location.range.start.line === codeLens.range.start.line &&
                        location.range.start.character ===
                            codeLens.range.start.character));
                    codeLens.command = this.getCommand(locations, codeLens);
                    return codeLens;
                }
            }
            catch (_a) {
                // noop
            }
            codeLens.command = {
                title: '0 implementations',
                command: ''
            };
            return codeLens;
        });
    }
    getCommand(locations, codeLens) {
        let { uri } = codeLens.data;
        return {
            title: this.getTitle(locations),
            command: locations.length ? 'editor.action.showReferences' : '',
            arguments: [uri, codeLens.range.start, locations]
        };
    }
    getTitle(locations) {
        return locations.length === 1 ? '1 implementation' : `${locations.length} implementations`;
    }
    extractSymbol(document, item, _parent) {
        switch (item.kind) {
            case PConst.Kind.interface:
                return super.getSymbolRange(document, item);
            case PConst.Kind.class:
            case PConst.Kind.memberFunction:
            case PConst.Kind.memberVariable:
            case PConst.Kind.memberGetAccessor:
            case PConst.Kind.memberSetAccessor:
                if (item.kindModifiers.match(/\babstract\b/g)) {
                    return super.getSymbolRange(document, item);
                }
                break;
        }
        return null;
    }
}
exports.default = TypeScriptImplementationsCodeLensProvider;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const api_1 = __importDefault(__webpack_require__(38));
const codeAction_1 = __webpack_require__(40);
const typeConverters = __importStar(__webpack_require__(35));
class ApplyCodeActionCommand {
    constructor(client) {
        this.client = client;
        this.id = ApplyCodeActionCommand.ID;
    }
    execute(action) {
        return __awaiter(this, void 0, void 0, function* () {
            return codeAction_1.applyCodeActionCommands(this.client, action);
        });
    }
}
ApplyCodeActionCommand.ID = '_typescript.applyCodeActionCommand';
class ApplyFixAllCodeAction {
    constructor(client) {
        this.client = client;
        this.id = ApplyFixAllCodeAction.ID;
    }
    execute(file, tsAction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!tsAction.fixId) {
                return;
            }
            const args = {
                scope: {
                    type: 'file',
                    args: { file }
                },
                fixId: tsAction.fixId
            };
            try {
                const res = yield this.client.execute('getCombinedCodeFix', args, vscode_languageserver_protocol_1.CancellationToken.None);
                if (res.type != 'response') {
                    return;
                }
                let { body } = res;
                const edit = typeConverters.WorkspaceEdit.fromFileCodeEdits(this.client, body.changes);
                yield coc_nvim_1.workspace.applyEdit(edit);
                const token = vscode_languageserver_protocol_1.CancellationToken.None;
                const { commands } = body;
                if (commands && commands.length) {
                    for (const command of commands) {
                        yield this.client.execute('applyCodeActionCommand', { command }, token);
                    }
                }
            }
            catch (_a) {
                // noop
            }
        });
    }
}
ApplyFixAllCodeAction.ID = '_typescript.applyFixAllCodeAction';
/**
 * Unique set of diagnostics keyed on diagnostic range and error code.
 */
class DiagnosticsSet {
    constructor(_values) {
        this._values = _values;
    }
    static from(diagnostics) {
        const values = new Map();
        for (const diagnostic of diagnostics) {
            values.set(DiagnosticsSet.key(diagnostic), diagnostic);
        }
        return new DiagnosticsSet(values);
    }
    static key(diagnostic) {
        const { start, end } = diagnostic.range;
        return `${diagnostic.code}-${start.line},${start.character}-${end.line},${end.character}`;
    }
    get values() {
        return this._values.values();
    }
}
class SupportedCodeActionProvider {
    constructor(client) {
        this.client = client;
    }
    getFixableDiagnosticsForContext(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const supportedActions = yield this.supportedCodeActions;
            const fixableDiagnostics = DiagnosticsSet.from(context.diagnostics.filter(diagnostic => supportedActions.has(+diagnostic.code)));
            return Array.from(fixableDiagnostics.values);
        });
    }
    get supportedCodeActions() {
        if (!this._supportedCodeActions) {
            return new Promise((resolve, reject) => {
                this.client.execute('getSupportedCodeFixes', null, vscode_languageserver_protocol_1.CancellationToken.None).then(res => {
                    if (res.type !== 'response') {
                        resolve(new Set());
                        return;
                    }
                    let codes = res.body.map(code => +code).filter(code => !isNaN(code));
                    resolve(new Set(codes));
                }, reject);
            });
        }
        return Promise.resolve(this._supportedCodeActions);
    }
}
class TypeScriptQuickFixProvider {
    constructor(client) {
        this.client = client;
        coc_nvim_1.commands.register(new ApplyCodeActionCommand(client));
        coc_nvim_1.commands.register(new ApplyFixAllCodeAction(client));
        this.supportedCodeActionProvider = new SupportedCodeActionProvider(client);
    }
    provideCodeActions(document, _range, context, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client.apiVersion.gte(api_1.default.v213)) {
                return [];
            }
            const file = this.client.toPath(document.uri);
            if (!file) {
                return [];
            }
            const fixableDiagnostics = yield this.supportedCodeActionProvider.getFixableDiagnosticsForContext(context);
            if (!fixableDiagnostics.length) {
                return [];
            }
            if (this.client.bufferSyncSupport.hasPendingDiagnostics(document.uri)) {
                return [];
            }
            const results = [];
            for (const diagnostic of fixableDiagnostics) {
                results.push(...(yield this.getFixesForDiagnostic(document, file, diagnostic, token)));
            }
            return results;
        });
    }
    getFixesForDiagnostic(document, file, diagnostic, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, typeConverters.Range.toFileRangeRequestArgs(file, diagnostic.range), { errorCodes: [+diagnostic.code] });
            const codeFixesResponse = yield this.client.execute('getCodeFixes', args, token);
            if (codeFixesResponse.type != 'response') {
                return [];
            }
            if (codeFixesResponse.body) {
                const results = [];
                for (const tsCodeFix of codeFixesResponse.body) {
                    results.push(...(yield this.getAllFixesForTsCodeAction(document, file, diagnostic, tsCodeFix)));
                }
                return results;
            }
            return [];
        });
    }
    getAllFixesForTsCodeAction(document, file, diagnostic, tsAction) {
        return __awaiter(this, void 0, void 0, function* () {
            const singleFix = this.getSingleFixForTsCodeAction(diagnostic, tsAction);
            const fixAll = yield this.getFixAllForTsCodeAction(document, file, diagnostic, tsAction);
            return fixAll ? [singleFix, fixAll] : [singleFix];
        });
    }
    getSingleFixForTsCodeAction(diagnostic, tsAction) {
        const codeAction = {
            title: tsAction.description,
            kind: vscode_languageserver_protocol_1.CodeActionKind.QuickFix
        };
        codeAction.edit = codeAction_1.getEditForCodeAction(this.client, tsAction);
        codeAction.diagnostics = [diagnostic];
        codeAction.isPrefered = true;
        if (tsAction.commands) {
            codeAction.command = {
                command: ApplyCodeActionCommand.ID,
                arguments: [tsAction],
                title: tsAction.description
            };
        }
        return codeAction;
    }
    getFixAllForTsCodeAction(document, file, diagnostic, tsAction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!tsAction.fixId || !this.client.apiVersion.gte(api_1.default.v270)) {
                return undefined;
            }
            // Make sure there are multiple diagnostics of the same type in the file
            if (!this.client.diagnosticsManager
                .getDiagnostics(document.uri)
                .some(x => x.code === diagnostic.code && x !== diagnostic)) {
                return;
            }
            const action = {
                title: tsAction.fixAllDescription || 'Fix all in file',
                kind: vscode_languageserver_protocol_1.CodeActionKind.QuickFix
            };
            action.diagnostics = [diagnostic];
            action.command = {
                command: ApplyFixAllCodeAction.ID,
                arguments: [file, tsAction],
                title: ''
            };
            return action;
        });
    }
}
exports.default = TypeScriptQuickFixProvider;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const helper_1 = __webpack_require__(59);
class ImportFixProvider {
    constructor(bufferSyncSupport) {
        this.bufferSyncSupport = bufferSyncSupport;
    }
    provideCodeActions(document, _range, context, _token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bufferSyncSupport.hasPendingDiagnostics(document.uri)) {
                return [];
            }
            let diagnostics = context.diagnostics.filter(d => d.code == 2304);
            if (!diagnostics.length)
                return [];
            let edits = [];
            let names = [];
            let doc = coc_nvim_1.workspace.getDocument(document.uri);
            let command;
            for (const diagnostic of diagnostics) {
                let { range } = diagnostic;
                let line = doc.getline(range.start.line);
                let name = line.slice(range.start.character, range.end.character);
                if (names.indexOf(name) !== -1)
                    continue;
                if (helper_1.nodeModules.indexOf(name) !== -1) {
                    names.push(name);
                    edits.push({
                        range: vscode_languageserver_protocol_1.Range.create(0, 0, 0, 0),
                        newText: `import ${name} from '${name}'\n`
                    });
                    command = 'tsserver.organizeImports';
                }
            }
            let edit = {
                changes: {
                    [document.uri]: edits
                }
            };
            let cmd = null;
            if (command)
                cmd = {
                    title: `fix import`,
                    command: 'tsserver.organizeImports'
                };
            return [{
                    title: `Add import ${names.join(', ')}`,
                    edit,
                    command: cmd
                }];
        });
    }
}
exports.default = ImportFixProvider;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeModules = [
    'assert',
    'cluster',
    'crypto',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'http2',
    'https',
    'inspector',
    'net',
    'os',
    'path',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'tls',
    'tty',
    'url',
    'util',
    'v8',
    'vm',
    'zlib',
    'perf_hooks'
];


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const typeConverters = __importStar(__webpack_require__(35));
class ApplyRefactoringCommand {
    constructor(client) {
        this.client = client;
        this.id = ApplyRefactoringCommand.ID;
    }
    execute(document, file, refactor, action, range) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = Object.assign({}, typeConverters.Range.toFileRangeRequestArgs(file, range), { refactor,
                action });
            const response = yield this.client.execute('getEditsForRefactor', args, vscode_languageserver_protocol_1.CancellationToken.None);
            const body = response && response.body;
            if (!body || !body.edits.length) {
                return false;
            }
            const workspaceEdit = yield this.toWorkspaceEdit(body);
            if (!(yield coc_nvim_1.workspace.applyEdit(workspaceEdit))) {
                return false;
            }
            const renameLocation = body.renameLocation;
            if (renameLocation) {
                coc_nvim_1.commands.executeCommand('editor.action.rename', document.uri, typeConverters.Position.fromLocation(renameLocation));
            }
            return true;
        });
    }
    toWorkspaceEdit(body) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const edit of body.edits) {
                yield coc_nvim_1.workspace.createFile(edit.fileName, { ignoreIfExists: true });
            }
            let workspaceEdit = typeConverters.WorkspaceEdit.fromFileCodeEdits(this.client, body.edits);
            return workspaceEdit;
        });
    }
}
ApplyRefactoringCommand.ID = '_typescript.applyRefactoring';
class SelectRefactorCommand {
    constructor(doRefactoring) {
        this.doRefactoring = doRefactoring;
        this.id = SelectRefactorCommand.ID;
    }
    execute(document, file, info, range) {
        return __awaiter(this, void 0, void 0, function* () {
            let { actions } = info;
            const idx = actions.length == 1 ? 0 : yield coc_nvim_1.workspace.showQuickpick(actions.map(action => action.description || action.name));
            if (idx == -1)
                return false;
            let label = info.actions[idx].name;
            if (!label)
                return false;
            return this.doRefactoring.execute(document, file, info.name, label, range);
        });
    }
}
SelectRefactorCommand.ID = '_typescript.selectRefactoring';
class TypeScriptRefactorProvider {
    constructor(client, formattingOptionsManager) {
        this.client = client;
        this.formattingOptionsManager = formattingOptionsManager;
        const doRefactoringCommand = coc_nvim_1.commands.register(new ApplyRefactoringCommand(this.client));
        coc_nvim_1.commands.register(new SelectRefactorCommand(doRefactoringCommand));
    }
    provideCodeActions(document, range, context, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.shouldTrigger(context)) {
                return undefined;
            }
            const file = this.client.toPath(document.uri);
            if (!file)
                return undefined;
            yield this.formattingOptionsManager.ensureConfigurationForDocument(document);
            const args = typeConverters.Range.toFileRangeRequestArgs(file, range);
            let response;
            try {
                response = yield this.client.interruptGetErr(() => {
                    return this.client.execute('getApplicableRefactors', args, token);
                });
                if (!response || !response.body) {
                    return undefined;
                }
            }
            catch (_a) {
                return undefined;
            }
            return this.convertApplicableRefactors(response.body, document, file, range);
        });
    }
    convertApplicableRefactors(body, document, file, rangeOrSelection) {
        const actions = [];
        for (const info of body) {
            if (!info.inlineable) {
                const codeAction = {
                    title: info.description,
                    kind: vscode_languageserver_protocol_1.CodeActionKind.Refactor
                };
                codeAction.command = {
                    title: info.description,
                    command: SelectRefactorCommand.ID,
                    arguments: [document, file, info, rangeOrSelection]
                };
                actions.push(codeAction);
            }
            else {
                for (const action of info.actions) {
                    actions.push(this.refactorActionToCodeAction(action, document, file, info, rangeOrSelection));
                }
            }
        }
        return actions;
    }
    refactorActionToCodeAction(action, document, file, info, rangeOrSelection) {
        const codeAction = {
            title: action.description,
            kind: TypeScriptRefactorProvider.getKind(action)
        };
        codeAction.command = {
            title: action.description,
            command: ApplyRefactoringCommand.ID,
            arguments: [document, file, info.name, action.name, rangeOrSelection]
        };
        return codeAction;
    }
    shouldTrigger(context) {
        if (context.only &&
            context.only.indexOf(vscode_languageserver_protocol_1.CodeActionKind.Refactor) == -1) {
            return false;
        }
        return true;
    }
    static getKind(refactor) {
        if (refactor.name.startsWith('function_')) {
            return TypeScriptRefactorProvider.extractFunctionKind;
        }
        else if (refactor.name.startsWith('constant_')) {
            return TypeScriptRefactorProvider.extractConstantKind;
        }
        else if (refactor.name.startsWith('Move')) {
            return TypeScriptRefactorProvider.moveKind;
        }
        return vscode_languageserver_protocol_1.CodeActionKind.Refactor;
    }
}
TypeScriptRefactorProvider.extractFunctionKind = vscode_languageserver_protocol_1.CodeActionKind.RefactorExtract + '.function';
TypeScriptRefactorProvider.extractConstantKind = vscode_languageserver_protocol_1.CodeActionKind.RefactorExtract + '.constant';
TypeScriptRefactorProvider.moveKind = vscode_languageserver_protocol_1.CodeActionKind.Refactor + '.move';
TypeScriptRefactorProvider.metadata = {
    providedCodeActionKinds: [vscode_languageserver_protocol_1.CodeActionKind.Refactor]
};
exports.default = TypeScriptRefactorProvider;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeConverters = __importStar(__webpack_require__(35));
class TypeScriptReferences {
    constructor(client) {
        this.client = client;
    }
    provideReferences(document, position, context, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(document.uri);
            if (!filepath)
                return [];
            const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
            try {
                const msg = yield this.client.execute('references', args, token);
                if (!msg || msg.type != 'response' || !msg.body) {
                    return [];
                }
                const result = [];
                for (const ref of msg.body.refs) {
                    if (!context.includeDeclaration && ref.isDefinition) {
                        continue;
                    }
                    const url = this.client.toResource(ref.file);
                    const location = typeConverters.Location.fromTextSpan(url, ref);
                    result.push(location);
                }
                return result;
            }
            catch (_a) {
                return [];
            }
        });
    }
}
exports.default = TypeScriptReferences;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const PConst = __importStar(__webpack_require__(37));
const typeConverters = __importStar(__webpack_require__(35));
const baseCodeLensProvider_1 = __webpack_require__(33);
class TypeScriptReferencesCodeLensProvider extends baseCodeLensProvider_1.TypeScriptBaseCodeLensProvider {
    resolveCodeLens(codeLens, token) {
        let { uri } = codeLens.data;
        let filepath = this.client.toPath(uri);
        const args = typeConverters.Position.toFileLocationRequestArgs(filepath, codeLens.range.start);
        return this.client
            .execute('references', args, token, true)
            .then(response => {
            if (!response || response.type != 'response' || !response.body) {
                throw codeLens;
            }
            const locations = response.body.refs
                .map(reference => typeConverters.Location.fromTextSpan(this.client.toResource(reference.file), reference))
                .filter(location => 
            // Exclude original definition from references
            !(location.uri.toString() === uri &&
                location.range.start.line === codeLens.range.start.line &&
                location.range.start.character ===
                    codeLens.range.start.character));
            codeLens.command = {
                title: locations.length === 1 ? '1 reference' : `${locations.length} references`,
                command: locations.length ? 'editor.action.showReferences' : '',
                arguments: [uri, codeLens.range.start, locations]
            };
            return codeLens;
        })
            .catch(() => {
            codeLens.command = {
                title: '0 references',
                command: ''
            };
            return codeLens;
        });
    }
    extractSymbol(document, item, parent) {
        if (parent && parent.kind === PConst.Kind.enum) {
            return super.getSymbolRange(document, item);
        }
        switch (item.kind) {
            case PConst.Kind.const:
            case PConst.Kind.let:
            case PConst.Kind.variable:
            case PConst.Kind.function:
                // Only show references for exported variables
                if (!item.kindModifiers.match(/\bexport\b/)) {
                    break;
                }
            // fallthrough
            case PConst.Kind.class:
                if (item.text === '<class>') {
                    break;
                }
            // fallthrough
            case PConst.Kind.memberFunction:
            case PConst.Kind.memberVariable:
            case PConst.Kind.memberGetAccessor:
            case PConst.Kind.memberSetAccessor:
            case PConst.Kind.constructorImplementation:
            case PConst.Kind.interface:
            case PConst.Kind.type:
            case PConst.Kind.enum:
                return super.getSymbolRange(document, item);
        }
        return null;
    }
}
exports.default = TypeScriptReferencesCodeLensProvider;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
const path_1 = __importDefault(__webpack_require__(13));
const api_1 = __importDefault(__webpack_require__(38));
const typeConverters = __importStar(__webpack_require__(35));
class TypeScriptRenameProvider {
    constructor(client) {
        this.client = client;
    }
    prepareRename(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.execRename(document, position, token);
            if (!response || response.type !== 'response' || !response.body) {
                return null;
            }
            const renameInfo = response.body.info;
            if (!renameInfo.canRename) {
                return Promise.reject(new Error('Invalid location for rename.'));
            }
            if (this.client.apiVersion.gte(api_1.default.v310)) {
                const triggerSpan = renameInfo.triggerSpan;
                if (triggerSpan) {
                    const range = typeConverters.Range.fromTextSpan(triggerSpan);
                    return range;
                }
            }
            return null;
        });
    }
    provideRenameEdits(document, position, newName, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.execRename(document, position, token);
            if (!response || response.type !== 'response' || !response.body) {
                return null;
            }
            const renameInfo = response.body.info;
            if (!renameInfo.canRename) {
                return Promise.reject(new Error('Invalid location for rename.'));
            }
            if (this.client.apiVersion.gte(api_1.default.v310)) {
                if (renameInfo.fileToRename) {
                    const edits = yield this.renameFile(renameInfo.fileToRename, newName, token);
                    if (edits) {
                        return edits;
                    }
                    else {
                        return Promise.reject(new Error('An error occurred while renaming file'));
                    }
                }
            }
            return this.toWorkspaceEdit(response.body.locs, newName);
        });
    }
    execRename(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.client.toPath(document.uri);
            if (!file)
                return undefined;
            const args = Object.assign({}, typeConverters.Position.toFileLocationRequestArgs(file, position), { findInStrings: false, findInComments: false });
            return this.client.interruptGetErr(() => {
                return this.client.execute('rename', args, token);
            });
        });
    }
    toWorkspaceEdit(locations, newName) {
        let changes = {};
        for (const spanGroup of locations) {
            const uri = this.client.toResource(spanGroup.file);
            if (uri) {
                changes[uri] = [];
                for (const textSpan of spanGroup.locs) {
                    changes[uri].push({
                        range: typeConverters.Range.fromTextSpan(textSpan),
                        newText: newName
                    });
                }
            }
        }
        return { changes };
    }
    renameFile(fileToRename, newName, token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Make sure we preserve file exension if none provided
            if (!path_1.default.extname(newName)) {
                newName += path_1.default.extname(fileToRename);
            }
            const dirname = path_1.default.dirname(fileToRename);
            const newFilePath = path_1.default.join(dirname, newName);
            const args = {
                file: fileToRename,
                oldFilePath: fileToRename,
                newFilePath
            };
            const response = yield this.client.execute('getEditsForFileRename', args, token);
            if (response.type !== 'response' || !response.body) {
                return undefined;
            }
            const edits = typeConverters.WorkspaceEdit.fromFileCodeEdits(this.client, response.body);
            edits.documentChanges = edits.documentChanges || [];
            edits.documentChanges.push({
                kind: 'rename',
                oldUri: coc_nvim_1.Uri.file(fileToRename).toString(),
                newUri: coc_nvim_1.Uri.file(newFilePath).toString(),
                options: {
                    overwrite: false,
                    ignoreIfExists: true
                }
            });
            return edits;
        });
    }
}
exports.default = TypeScriptRenameProvider;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Previewer = __importStar(__webpack_require__(42));
const typeConverters = __importStar(__webpack_require__(35));
class TypeScriptSignatureHelpProvider {
    constructor(client) {
        this.client = client;
    }
    provideSignatureHelp(document, position, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const filepath = this.client.toPath(document.uri);
            if (!filepath) {
                return undefined;
            }
            const args = typeConverters.Position.toFileLocationRequestArgs(filepath, position);
            let response;
            try {
                response = yield this.client.interruptGetErr(() => this.client.execute('signatureHelp', args, token));
            }
            catch (e) {
                return undefined;
            }
            if (response.type !== 'response' || !response.body) {
                return undefined;
            }
            let info = response.body;
            const result = {
                activeSignature: info.selectedItemIndex,
                activeParameter: this.getActiveParmeter(info),
                signatures: info.items.map(signature => {
                    return this.convertSignature(signature);
                })
            };
            return result;
        });
    }
    getActiveParmeter(info) {
        const activeSignature = info.items[info.selectedItemIndex];
        if (activeSignature && activeSignature.isVariadic) {
            return Math.min(info.argumentIndex, activeSignature.parameters.length - 1);
        }
        return info.argumentIndex;
    }
    convertSignature(item) {
        let parameters = item.parameters.map(p => {
            return {
                label: Previewer.plain(p.displayParts),
                documentation: Previewer.markdownDocumentation(p.documentation, [])
            };
        });
        let label = Previewer.plain(item.prefixDisplayParts);
        label += parameters.map(parameter => parameter.label).join(Previewer.plain(item.separatorDisplayParts));
        label += Previewer.plain(item.suffixDisplayParts);
        return {
            label,
            documentation: Previewer.markdownDocumentation(item.documentation, item.tags.filter(x => x.name !== 'param')),
            parameters
        };
    }
}
TypeScriptSignatureHelpProvider.triggerCharacters = ['(', ',', '<'];
exports.default = TypeScriptSignatureHelpProvider;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const typeConverters = __importStar(__webpack_require__(35));
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
class UpdateImportsOnFileRenameHandler {
    constructor(client, fileConfigurationManager, languageId) {
        this.client = client;
        this.fileConfigurationManager = fileConfigurationManager;
        this.disposables = [];
        let glob = languageId == 'typescript' ? '**/*.ts' : '**/*.js';
        const watcher = coc_nvim_1.workspace.createFileSystemWatcher(glob);
        this.disposables.push(watcher);
        watcher.onDidRename(e => {
            this.doRename(e.oldUri, e.newUri).catch(e => {
                client.logger.error(e.message);
            });
        }, null, this.disposables);
    }
    dispose() {
        coc_nvim_1.disposeAll(this.disposables);
    }
    doRename(oldResource, newResource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (oldResource.scheme !== 'file' || newResource.scheme !== 'file') {
                return;
            }
            const targetFile = newResource.fsPath;
            const oldFile = oldResource.fsPath;
            yield coc_nvim_1.workspace.openResource(newResource.toString());
            // Make sure TS knows about file
            yield wait(100);
            let document = coc_nvim_1.workspace.getDocument(newResource.toString());
            if (!document)
                return;
            const edits = yield this.getEditsForFileRename(document.textDocument, oldFile, targetFile);
            if (!edits)
                return;
            if (yield this.promptUser(newResource)) {
                yield coc_nvim_1.workspace.applyEdit(edits);
            }
        });
    }
    promptUser(newResource) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield coc_nvim_1.workspace.nvim.call('coc#util#prompt_confirm', [`Update imports for moved file: ${newResource.fsPath} ?`]);
            return res == 1;
        });
    }
    getEditsForFileRename(document, oldFile, newFile) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fileConfigurationManager.ensureConfigurationForDocument(document);
            const response = yield this.client.interruptGetErr(() => {
                const args = {
                    oldFilePath: oldFile,
                    newFilePath: newFile,
                };
                return this.client.execute('getEditsForFileRename', args, vscode_languageserver_protocol_1.CancellationToken.None);
            });
            if (!response || response.type != 'response' || !response.body) {
                return;
            }
            const edits = [];
            for (const edit of response.body) {
                // Workaround for https://github.com/Microsoft/vscode/issues/52675
                if (edit.fileName.match(/[\/\\]node_modules[\/\\]/gi)) {
                    continue;
                }
                for (const change of edit.textChanges) {
                    if (change.newText.match(/\/node_modules\//gi)) {
                        continue;
                    }
                }
                edits.push(edit);
            }
            return typeConverters.WorkspaceEdit.fromFileCodeEdits(this.client, edits);
        });
    }
}
exports.default = UpdateImportsOnFileRenameHandler;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const fs_1 = __importDefault(__webpack_require__(67));
const path_1 = __importDefault(__webpack_require__(13));
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const which_1 = __importDefault(__webpack_require__(68));
const countRegex = /Found\s+(\d+)\s+error/;
const errorRegex = /^(.+)\((\d+),(\d+)\):\s(\w+)\sTS(\d+):\s*(.+)$/;
var TscStatus;
(function (TscStatus) {
    TscStatus[TscStatus["INIT"] = 0] = "INIT";
    TscStatus[TscStatus["COMPILING"] = 1] = "COMPILING";
    TscStatus[TscStatus["RUNNING"] = 2] = "RUNNING";
    TscStatus[TscStatus["ERROR"] = 3] = "ERROR";
})(TscStatus || (TscStatus = {}));
class WatchProject {
    constructor(commandManager) {
        this.disposables = [];
        this.statusItem = coc_nvim_1.workspace.createStatusBarItem(1, { progress: true });
        let task = this.task = coc_nvim_1.workspace.createTask('TSC');
        this.disposables.push(commandManager.registerCommand(WatchProject.id, () => __awaiter(this, void 0, void 0, function* () {
            let opts = this.options = yield this.getOptions();
            yield this.start(opts);
        })));
        task.onExit(code => {
            if (code != 0) {
                coc_nvim_1.workspace.showMessage(`TSC exit with code ${code}`, 'warning');
            }
            this.onStop();
        });
        task.onStdout(lines => {
            for (let line of lines) {
                this.onLine(line);
            }
        });
        task.onStderr(lines => {
            coc_nvim_1.workspace.showMessage(`TSC error: ` + lines.join('\n'), 'error');
        });
        this.disposables.push(vscode_languageserver_protocol_1.Disposable.create(() => {
            task.dispose();
        }));
        this.check().catch(_e => {
            // noop
        });
    }
    check() {
        return __awaiter(this, void 0, void 0, function* () {
            let running = yield this.task.running;
            if (running) {
                this.options = yield this.getOptions();
                this.statusItem.isProgress = false;
                this.statusItem.text = '?';
                this.statusItem.show();
            }
            else {
                this.onStop();
            }
        });
    }
    start(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.task.start(options);
        });
    }
    onStop() {
        this.statusItem.hide();
    }
    onStart() {
        this.statusItem.text = 'compiling';
        this.statusItem.isProgress = true;
        this.statusItem.show();
        coc_nvim_1.workspace.nvim.call('setqflist', [[]], true);
    }
    onLine(line) {
        if (countRegex.test(line)) {
            let ms = line.match(countRegex);
            this.statusItem.text = ms[1] == '0' ? '✓' : '✗';
            this.statusItem.isProgress = false;
        }
        else if (WatchProject.startTexts.findIndex(s => line.indexOf(s) !== -1) != -1) {
            this.onStart();
        }
        else {
            let ms = line.match(errorRegex);
            if (!ms)
                return;
            let fullpath = path_1.default.join(this.options.cwd, ms[1]);
            let uri = coc_nvim_1.Uri.file(fullpath).toString();
            let doc = coc_nvim_1.workspace.getDocument(uri);
            let bufnr = doc ? doc.bufnr : null;
            let item = {
                filename: fullpath,
                lnum: Number(ms[2]),
                col: Number(ms[3]),
                text: `[tsc ${ms[5]}] ${ms[6]}`,
                type: /error/i.test(ms[4]) ? 'E' : 'W'
            };
            if (bufnr)
                item.bufnr = bufnr;
            coc_nvim_1.workspace.nvim.call('setqflist', [[item], 'a']);
        }
    }
    getOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield coc_nvim_1.workspace.findUp(['node_modules']);
            let root;
            let cmd;
            // let root: string
            if (!res) {
                if (executable('tsc')) {
                    cmd = 'tsc';
                    root = coc_nvim_1.workspace.cwd;
                }
            }
            else {
                let file = path_1.default.join(path_1.default.dirname(res), 'node_modules/.bin/tsc');
                if (fs_1.default.existsSync(file)) {
                    cmd = './node_modules/.bin/tsc';
                    root = path_1.default.dirname(res);
                }
            }
            if (!cmd) {
                coc_nvim_1.workspace.showMessage(`Local & global tsc not found`, 'error');
                return;
            }
            let find = yield coc_nvim_1.workspace.findUp(['tsconfig.json']);
            if (!find) {
                coc_nvim_1.workspace.showMessage('tsconfig.json not found!', 'error');
                return;
            }
            let configRoot = path_1.default.dirname(find);
            let configPath = path_1.default.relative(root, path_1.default.join(configRoot, 'tsconfig.json'));
            return {
                cmd,
                args: ['-p', configPath, '--watch', 'true', '--pretty', 'false'],
                cwd: root
            };
        });
    }
    dispose() {
        coc_nvim_1.disposeAll(this.disposables);
    }
}
WatchProject.id = 'tsserver.watchBuild';
WatchProject.startTexts = ['Starting compilation in watch mode', 'Starting incremental compilation'];
exports.default = WatchProject;
function executable(command) {
    try {
        which_1.default.sync(command);
    }
    catch (e) {
        return false;
    }
    return true;
}


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = which
which.sync = whichSync

var isWindows = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys'

var path = __webpack_require__(13)
var COLON = isWindows ? ';' : ':'
var isexe = __webpack_require__(69)

function getNotFoundError (cmd) {
  var er = new Error('not found: ' + cmd)
  er.code = 'ENOENT'

  return er
}

function getPathInfo (cmd, opt) {
  var colon = opt.colon || COLON
  var pathEnv = opt.path || process.env.PATH || ''
  var pathExt = ['']

  pathEnv = pathEnv.split(colon)

  var pathExtExe = ''
  if (isWindows) {
    pathEnv.unshift(process.cwd())
    pathExtExe = (opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM')
    pathExt = pathExtExe.split(colon)


    // Always test the cmd itself first.  isexe will check to make sure
    // it's found in the pathExt set.
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('')
  }

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
    pathEnv = ['']

  return {
    env: pathEnv,
    ext: pathExt,
    extExe: pathExtExe
  }
}

function which (cmd, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var pathExtExe = info.extExe
  var found = []

  ;(function F (i, l) {
    if (i === l) {
      if (opt.all && found.length)
        return cb(null, found)
      else
        return cb(getNotFoundError(cmd))
    }

    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.join(pathPart, cmd)
    if (!pathPart && (/^\.[\\\/]/).test(cmd)) {
      p = cmd.slice(0, 2) + p
    }
    ;(function E (ii, ll) {
      if (ii === ll) return F(i + 1, l)
      var ext = pathExt[ii]
      isexe(p + ext, { pathExt: pathExtExe }, function (er, is) {
        if (!er && is) {
          if (opt.all)
            found.push(p + ext)
          else
            return cb(null, p + ext)
        }
        return E(ii + 1, ll)
      })
    })(0, pathExt.length)
  })(0, pathEnv.length)
}

function whichSync (cmd, opt) {
  opt = opt || {}

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var pathExtExe = info.extExe
  var found = []

  for (var i = 0, l = pathEnv.length; i < l; i ++) {
    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.join(pathPart, cmd)
    if (!pathPart && /^\.[\\\/]/.test(cmd)) {
      p = cmd.slice(0, 2) + p
    }
    for (var j = 0, ll = pathExt.length; j < ll; j ++) {
      var cur = p + pathExt[j]
      var is
      try {
        is = isexe.sync(cur, { pathExt: pathExtExe })
        if (is) {
          if (opt.all)
            found.push(cur)
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(67)
var core
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = __webpack_require__(70)
} else {
  core = __webpack_require__(71)
}

module.exports = isexe
isexe.sync = sync

function isexe (path, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe(path, options || {}, function (er, is) {
        if (er) {
          reject(er)
        } else {
          resolve(is)
        }
      })
    })
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null
        is = false
      }
    }
    cb(er, is)
  })
}

function sync (path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(67)

function checkPathExt (path, options) {
  var pathext = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';')
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase()
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat (stat, path, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, path, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), path, options)
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(67)

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat, options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat, options) {
  var mod = stat.mode
  var uid = stat.uid
  var gid = stat.gid

  var myUid = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid()
  var myGid = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid()

  var u = parseInt('100', 8)
  var g = parseInt('010', 8)
  var o = parseInt('001', 8)
  var ug = u | g

  var ret = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0

  return ret
}


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const typeConverters = __importStar(__webpack_require__(35));
function getSymbolKind(item) {
    switch (item.kind) {
        case 'method':
            return vscode_languageserver_protocol_1.SymbolKind.Method;
        case 'enum':
            return vscode_languageserver_protocol_1.SymbolKind.Enum;
        case 'function':
            return vscode_languageserver_protocol_1.SymbolKind.Function;
        case 'class':
            return vscode_languageserver_protocol_1.SymbolKind.Class;
        case 'interface':
            return vscode_languageserver_protocol_1.SymbolKind.Interface;
        case 'var':
            return vscode_languageserver_protocol_1.SymbolKind.Variable;
        default:
            return vscode_languageserver_protocol_1.SymbolKind.Variable;
    }
}
class TypeScriptWorkspaceSymbolProvider {
    constructor(client, languageIds) {
        this.client = client;
        this.languageIds = languageIds;
    }
    provideWorkspaceSymbols(search, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = this.getUri();
            if (!uri)
                return [];
            const filepath = this.client.toPath(uri);
            if (!filepath)
                return [];
            const args = {
                file: filepath,
                searchValue: search
            };
            const response = yield this.client.execute('navto', args, token);
            if (response.type !== 'response' || response.body == null)
                return [];
            const result = [];
            for (const item of response.body) {
                if (!item.containerName && item.kind === 'alias') {
                    continue;
                }
                const label = TypeScriptWorkspaceSymbolProvider.getLabel(item);
                const range = {
                    start: typeConverters.Position.fromLocation(item.start),
                    end: typeConverters.Position.fromLocation(item.end),
                };
                const symbolInfo = vscode_languageserver_protocol_1.SymbolInformation.create(label, getSymbolKind(item), range, this.client.toResource(item.file));
                result.push(symbolInfo);
            }
            return result;
        });
    }
    static getLabel(item) {
        let label = item.name;
        if (item.kind === 'method' || item.kind === 'function') {
            label += '()';
        }
        return label;
    }
    getUri() {
        // typescript wants to have a resource even when asking
        // general questions so we check the active editor. If this
        // doesn't match we take the first TS document.
        const documents = coc_nvim_1.workspace.textDocuments;
        for (const document of documents) {
            if (this.languageIds.indexOf(document.languageId) >= 0) {
                return document.uri;
            }
        }
        return undefined;
    }
}
exports.default = TypeScriptWorkspaceSymbolProvider;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeConverters = __importStar(__webpack_require__(35));
class SmartSelection {
    constructor(client) {
        this.client = client;
    }
    provideSelectionRanges(document, positions, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.client.toPath(document.uri);
            if (!file) {
                return undefined;
            }
            const args = {
                file,
                locations: positions.map(typeConverters.Position.toLocation)
            };
            const response = yield this.client.execute('selectionRange', args, token);
            if (response.type !== 'response' || !response.body) {
                return undefined;
            }
            return response.body.map(SmartSelection.convertSelectionRange);
        });
    }
    static convertSelectionRange(selectionRange) {
        return {
            range: typeConverters.Range.fromTextSpan(selectionRange.textSpan),
            parent: selectionRange.parent ? SmartSelection.convertSelectionRange(selectionRange.parent) : undefined,
        };
    }
}
exports.default = SmartSelection;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const modules_1 = __webpack_require__(75);
class InstallModuleCommand {
    constructor() {
        this.id = InstallModuleCommand.ID;
    }
    execute(uri, name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield modules_1.installModules(uri, [name]);
        });
    }
}
InstallModuleCommand.ID = '_tsserver.installModule';
class InstallModuleProvider {
    constructor(client) {
        this.client = client;
        coc_nvim_1.commands.register(new InstallModuleCommand(), true);
    }
    provideCodeActions(document, _range, context, _token) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = coc_nvim_1.Uri.parse(document.uri);
            if (uri.scheme != 'file')
                return null;
            let { diagnostics } = context;
            let diags = diagnostics.filter(s => s.code == 2307);
            let names = diags.map(o => {
                let ms = o.message.match(/module\s'(.+)'\./);
                return ms ? ms[1] : null;
            });
            names = names.filter(s => s != null);
            if (!names.length)
                return null;
            let actions = [];
            for (let name of names) {
                let title = `install ${name}`;
                let command = {
                    title: `install ${name}`,
                    command: InstallModuleCommand.ID,
                    arguments: [document.uri, name]
                };
                let codeAction = vscode_languageserver_protocol_1.CodeAction.create(title, command);
                actions.push(codeAction);
            }
            return actions;
        });
    }
}
exports.default = InstallModuleProvider;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __webpack_require__(76);
const path_1 = __importDefault(__webpack_require__(13));
const coc_nvim_1 = __webpack_require__(1);
function runCommand(cmd, cwd, timeout) {
    return new Promise((resolve, reject) => {
        let timer;
        if (timeout) {
            timer = setTimeout(() => {
                reject(new Error(`timeout after ${timeout}s`));
            }, timeout * 1000);
        }
        child_process_1.exec(cmd, { cwd }, (err, stdout) => {
            if (timer)
                clearTimeout(timer);
            if (err) {
                reject(new Error(`exited with ${err.code}`));
                return;
            }
            resolve(stdout);
        });
    });
}
exports.runCommand = runCommand;
function getManager() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield coc_nvim_1.workspace.findUp(['yarn.lock', 'package-lock.json']);
        if (!res)
            return 'yarn';
        return res.endsWith('yarn.lock') ? 'yarn' : 'npm';
    });
}
function getRoot() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield coc_nvim_1.workspace.findUp(['package.json']);
        if (!res)
            return null;
        return path_1.default.dirname(res);
    });
}
function moduleExists(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let content = yield runCommand(`npm info ${name} --json`, process.cwd());
            if (!content)
                return false;
            let obj = JSON.parse(content);
            if (obj.error != null)
                return false;
            return true;
        }
        catch (e) {
            return false;
        }
        return false;
    });
}
exports.moduleExists = moduleExists;
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equalness by returning a unique string for each.
 */
function distinct(array, keyFn) {
    if (!keyFn) {
        return array.filter((element, position) => {
            return array.indexOf(element) === position;
        });
    }
    const seen = Object.create(null);
    return array.filter(elem => {
        const key = keyFn(elem);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    });
}
exports.distinct = distinct;
function installModules(uri, names) {
    return __awaiter(this, void 0, void 0, function* () {
        names = distinct(names);
        let root = yield getRoot();
        if (!root) {
            coc_nvim_1.workspace.showMessage(`package.json not found from cwd: ${coc_nvim_1.workspace.cwd}`, 'error');
            return;
        }
        let arr = names.concat(names.map(s => `@types/${s}`));
        let statusItem = coc_nvim_1.workspace.createStatusBarItem(99, { progress: true });
        statusItem.text = `Checking module ${arr.join(' ')}`;
        statusItem.show();
        let exists = yield Promise.all(arr.map(name => {
            return moduleExists(name).then(exists => {
                return exists ? name : null;
            });
        }));
        let manager = yield getManager();
        exists = exists.filter(s => s != null);
        if (!exists.length)
            return;
        let devs = exists.filter(s => s.startsWith('@types'));
        let deps = exists.filter(s => devs.indexOf(s) == -1);
        statusItem.text = `Installing ${exists.join(' ')}`;
        try {
            yield Promise.all([deps, devs].map((names, i) => {
                let cmd = manager == 'npm' ? `npm i ${names.join(' ')}` : `yarn add ${names.join(' ')} --ignore-scripts --no-default-rc`;
                if (i == 1)
                    cmd = cmd + ' --dev';
                return runCommand(cmd, root);
            }));
        }
        catch (e) {
            statusItem.dispose();
            coc_nvim_1.workspace.showMessage(`Install error ${e.message}`, 'error');
            return;
        }
        statusItem.dispose();
        coc_nvim_1.workspace.showMessage(`Installed: ${exists.join(' ')}`, 'more');
    });
}
exports.installModules = installModules;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const languageDescription_1 = __webpack_require__(78);
const languageModeIds_1 = __webpack_require__(50);
const typeconverts = __importStar(__webpack_require__(35));
class OrganizeImportsCommand {
    constructor(client) {
        this.client = client;
        this.id = 'tsserver.organizeImports';
    }
    getTextEdits(document) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = this.client;
            let file = client.toPath(document.uri);
            const args = {
                scope: {
                    type: 'file',
                    args: {
                        file
                    }
                }
            };
            const response = yield this.client.interruptGetErr(() => this.client.execute('organizeImports', args, vscode_languageserver_protocol_1.CancellationToken.None));
            if (!response || response.type != 'response' || !response.success) {
                return;
            }
            const edit = typeconverts.WorkspaceEdit.fromFileCodeEdits(client, response.body);
            let desc = languageDescription_1.standardLanguageDescriptions.find(o => o.modeIds.indexOf(document.languageId) !== -1);
            if (!desc)
                return null;
            const config = coc_nvim_1.workspace.getConfiguration(`${desc.id}.preferences`);
            let noSemicolons = config.get('noSemicolons', false);
            if (noSemicolons) {
                let { changes } = edit;
                if (changes) {
                    for (let c of Object.keys(changes)) {
                        for (let textEdit of changes[c]) {
                            textEdit.newText = textEdit.newText.replace(/;(?=(\n|$))/g, '');
                        }
                    }
                }
            }
            return edit;
        });
    }
    execute(document) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!document) {
                let doc = yield coc_nvim_1.workspace.document;
                if (languageModeIds_1.languageIds.indexOf(doc.filetype) == -1)
                    return;
                document = doc.textDocument;
            }
            let edit = yield this.getTextEdits(document);
            if (edit)
                yield coc_nvim_1.workspace.applyEdit(edit);
            return;
        });
    }
}
exports.OrganizeImportsCommand = OrganizeImportsCommand;
class OrganizeImportsCodeActionProvider {
    // public static readonly minVersion = API.v280
    constructor(client, fileConfigManager) {
        this.client = client;
        this.fileConfigManager = fileConfigManager;
        this.metadata = {
            providedCodeActionKinds: [vscode_languageserver_protocol_1.CodeActionKind.SourceOrganizeImports]
        };
    }
    provideCodeActions(document, _range, context, _token) {
        if (languageModeIds_1.languageIds.indexOf(document.languageId) == -1)
            return;
        if (!context.only || !context.only.includes(vscode_languageserver_protocol_1.CodeActionKind.SourceOrganizeImports)) {
            return [];
        }
        const action = vscode_languageserver_protocol_1.CodeAction.create('Organize Imports', {
            title: '',
            command: 'tsserver.organizeImports',
            arguments: [document]
        }, vscode_languageserver_protocol_1.CodeActionKind.SourceOrganizeImports);
        return [action];
    }
}
exports.OrganizeImportsCodeActionProvider = OrganizeImportsCodeActionProvider;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const languageModeIds = __importStar(__webpack_require__(50));
exports.standardLanguageDescriptions = [
    {
        id: 'typescript',
        diagnosticSource: 'ts',
        diagnosticOwner: 'typescript',
        modeIds: [languageModeIds.typescript, languageModeIds.typescriptreact,
            languageModeIds.typescripttsx, languageModeIds.typescriptjsx],
        diagnosticLanguage: 1 /* TypeScript */,
        configFile: 'tsconfig.json'
    },
    {
        id: 'javascript',
        diagnosticSource: 'ts',
        diagnosticOwner: 'typescript',
        modeIds: [languageModeIds.javascript, languageModeIds.javascriptreact],
        diagnosticLanguage: 0 /* JavaScript */,
        configFile: 'jsconfig.json'
    }
];


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(67));
const os_1 = __importDefault(__webpack_require__(14));
const path_1 = __importDefault(__webpack_require__(13));
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const which_1 = __importDefault(__webpack_require__(68));
const coc_nvim_1 = __webpack_require__(1);
const fileConfigurationManager_1 = __importDefault(__webpack_require__(49));
const typescriptService_1 = __webpack_require__(80);
const api_1 = __importDefault(__webpack_require__(38));
const configuration_1 = __webpack_require__(81);
const logger_1 = __importDefault(__webpack_require__(82));
const process_1 = __webpack_require__(84);
const languageModeIds_1 = __webpack_require__(50);
const tracer_1 = __importDefault(__webpack_require__(85));
const tsconfig_1 = __webpack_require__(86);
const versionProvider_1 = __webpack_require__(87);
const versionStatus_1 = __importDefault(__webpack_require__(88));
const wireProtocol_1 = __webpack_require__(89);
const callbackMap_1 = __webpack_require__(90);
const requestQueue_1 = __webpack_require__(91);
const bufferSyncSupport_1 = __importDefault(__webpack_require__(92));
const diagnostics_1 = __webpack_require__(94);
class ForkedTsServerProcess {
    constructor(childProcess) {
        this.childProcess = childProcess;
    }
    onError(cb) {
        this.childProcess.on('error', cb);
    }
    onExit(cb) {
        this.childProcess.on('exit', cb);
    }
    write(serverRequest) {
        this.childProcess.stdin.write(JSON.stringify(serverRequest) + '\r\n', 'utf8');
    }
    createReader(callback, onError) {
        // tslint:disable-next-line:no-unused-expression
        new wireProtocol_1.Reader(this.childProcess.stdout, callback, onError);
    }
    kill() {
        this.childProcess.kill();
    }
}
class TypeScriptServiceClient {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        this.state = coc_nvim_1.ServiceStat.Initial;
        this.logger = new logger_1.default();
        this.tsServerLogFile = null;
        this.cancellationPipeName = null;
        this._callbacks = new callbackMap_1.CallbackMap();
        this._requestQueue = new requestQueue_1.RequestQueue();
        this._pendingResponses = new Set();
        this._onTsServerStarted = new vscode_languageserver_protocol_1.Emitter();
        this._onProjectLanguageServiceStateChanged = new vscode_languageserver_protocol_1.Emitter();
        this._onDidBeginInstallTypings = new vscode_languageserver_protocol_1.Emitter();
        this._onDidEndInstallTypings = new vscode_languageserver_protocol_1.Emitter();
        this._onTypesInstallerInitializationFailed = new vscode_languageserver_protocol_1.Emitter();
        this.disposables = [];
        this.isRestarting = false;
        this._onDiagnosticsReceived = new vscode_languageserver_protocol_1.Emitter();
        this._onConfigDiagnosticsReceived = new vscode_languageserver_protocol_1.Emitter();
        this._onResendModelsRequested = new vscode_languageserver_protocol_1.Emitter();
        this.pathSeparator = path_1.default.sep;
        this.lastStart = Date.now();
        this.servicePromise = null;
        this.lastError = null;
        this.numberRestarts = 0;
        this.fileConfigurationManager = new fileConfigurationManager_1.default(this);
        this._configuration = configuration_1.TypeScriptServiceConfiguration.loadFromWorkspace();
        this.versionProvider = new versionProvider_1.TypeScriptVersionProvider(this._configuration);
        this._apiVersion = api_1.default.defaultVersion;
        this.tracer = new tracer_1.default(this.logger);
        this.versionStatus = new versionStatus_1.default(this.normalizePath.bind(this), this.fileConfigurationManager.enableJavascript());
        pluginManager.onDidUpdateConfig(update => {
            this.configurePlugin(update.pluginId, update.config);
        }, null, this.disposables);
        pluginManager.onDidChangePlugins(() => {
            this.restartTsServer();
        }, null, this.disposables);
        this.bufferSyncSupport = new bufferSyncSupport_1.default(this);
        this.onTsServerStarted(() => {
            this.bufferSyncSupport.listen();
        });
        this.diagnosticsManager = new diagnostics_1.DiagnosticsManager();
        this.bufferSyncSupport.onDelete(resource => {
            this.diagnosticsManager.delete(resource);
        }, null, this.disposables);
    }
    get onDiagnosticsReceived() {
        return this._onDiagnosticsReceived.event;
    }
    get onConfigDiagnosticsReceived() {
        return this._onConfigDiagnosticsReceived.event;
    }
    get onResendModelsRequested() {
        return this._onResendModelsRequested.event;
    }
    get configuration() {
        return this._configuration;
    }
    dispose() {
        if (this.servicePromise) {
            this.servicePromise
                .then(childProcess => {
                childProcess.kill();
            })
                .then(undefined, () => void 0);
        }
        this.bufferSyncSupport.dispose();
        coc_nvim_1.disposeAll(this.disposables);
        this.logger.dispose();
        this._onTsServerStarted.dispose();
        this._onResendModelsRequested.dispose();
    }
    info(message, data) {
        this.logger.info(message, data);
    }
    error(message, data) {
        this.logger.error(message, data);
    }
    restartTsServer() {
        const start = () => {
            this.servicePromise = this.startService(true);
            return this.servicePromise;
        };
        if (this.servicePromise) {
            return Promise.resolve(this.servicePromise.then(childProcess => {
                this.state = coc_nvim_1.ServiceStat.Stopping;
                this.info('Killing TS Server');
                this.isRestarting = true;
                childProcess.kill();
                this.servicePromise = null;
            }).then(start));
        }
        else {
            return Promise.resolve(start());
        }
    }
    stop() {
        if (!this.servicePromise)
            return;
        return new Promise((resolve, reject) => {
            this.servicePromise.then(childProcess => {
                if (this.state == coc_nvim_1.ServiceStat.Running) {
                    this.info('Killing TS Server');
                    childProcess.onExit(() => {
                        resolve();
                    });
                    childProcess.kill();
                    this.servicePromise = null;
                }
                else {
                    resolve();
                }
            }, reject);
        });
    }
    get onTsServerStarted() {
        return this._onTsServerStarted.event;
    }
    get onProjectLanguageServiceStateChanged() {
        return this._onProjectLanguageServiceStateChanged.event;
    }
    get onDidBeginInstallTypings() {
        return this._onDidBeginInstallTypings.event;
    }
    get onDidEndInstallTypings() {
        return this._onDidEndInstallTypings.event;
    }
    get onTypesInstallerInitializationFailed() {
        return this._onTypesInstallerInitializationFailed.event;
    }
    get apiVersion() {
        return this._apiVersion;
    }
    service() {
        if (this.servicePromise) {
            return this.servicePromise;
        }
        if (this.lastError) {
            return Promise.reject(this.lastError);
        }
        return this.startService().then(() => {
            if (this.servicePromise) {
                return this.servicePromise;
            }
        });
    }
    ensureServiceStarted() {
        if (!this.servicePromise) {
            this.startService().catch(err => {
                coc_nvim_1.workspace.showMessage(`TSServer start failed: ${err.message}`, 'error');
                this.error(`Service start failed: ${err.stack}`);
            });
        }
    }
    startService(resendModels = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ignoreLocalTsserver } = this.configuration;
            let currentVersion;
            if (!ignoreLocalTsserver)
                currentVersion = this.versionProvider.getLocalVersion();
            if (!currentVersion || !fs_1.default.existsSync(currentVersion.tsServerPath)) {
                currentVersion = this.versionProvider.getDefaultVersion();
            }
            if (!currentVersion || !currentVersion.isValid) {
                if (this.configuration.globalTsdk) {
                    coc_nvim_1.workspace.showMessage(`Can not find typescript module, in 'tsserver.tsdk': ${this.configuration.globalTsdk}`, 'error');
                }
                else {
                    coc_nvim_1.workspace.showMessage(`Can not find typescript module, run ':CocInstall coc-tsserver' to fix it!`, 'error');
                }
                return;
            }
            this._apiVersion = currentVersion.version;
            this.versionStatus.onDidChangeTypeScriptVersion(currentVersion);
            this.lastError = null;
            const tsServerForkArgs = yield this.getTsServerArgs();
            const debugPort = this._configuration.debugPort;
            const options = {
                execArgv: debugPort ? [`--inspect=${debugPort}`] : [],
                cwd: coc_nvim_1.workspace.root
            };
            this.servicePromise = this.startProcess(currentVersion, tsServerForkArgs, options, resendModels);
            return this.servicePromise;
        });
    }
    startProcess(currentVersion, args, options, resendModels) {
        this.state = coc_nvim_1.ServiceStat.Starting;
        return new Promise((resolve, reject) => {
            try {
                process_1.fork(currentVersion.tsServerPath, args, options, this.logger, (err, childProcess) => {
                    if (err || !childProcess) {
                        this.state = coc_nvim_1.ServiceStat.StartFailed;
                        this.lastError = err;
                        this.error('Starting TSServer failed with error.', err.stack);
                        return;
                    }
                    this.state = coc_nvim_1.ServiceStat.Running;
                    this.info('Started TSServer', JSON.stringify(currentVersion, null, 2));
                    const handle = new ForkedTsServerProcess(childProcess);
                    this.lastStart = Date.now();
                    handle.onError((err) => {
                        this.lastError = err;
                        this.error('TSServer errored with error.', err);
                        this.error(`TSServer log file: ${this.tsServerLogFile || ''}`);
                        coc_nvim_1.workspace.showMessage(`TSServer errored with error. ${err.message}`, 'error');
                        this.serviceExited(false);
                    });
                    handle.onExit((code) => {
                        if (code == null) {
                            this.info('TSServer normal exit');
                        }
                        else {
                            this.error(`TSServer exited with code: ${code}`);
                        }
                        this.info(`TSServer log file: ${this.tsServerLogFile || ''}`);
                        this.serviceExited(!this.isRestarting);
                        this.isRestarting = false;
                    });
                    handle.createReader(msg => {
                        this.dispatchMessage(msg);
                    }, error => {
                        this.error('ReaderError', error);
                    });
                    resolve(handle);
                    this.serviceStarted(resendModels);
                    this._onTsServerStarted.fire(currentVersion.version);
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    openTsServerLogFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const isRoot = process.getuid && process.getuid() == 0;
            let echoErr = (msg) => {
                coc_nvim_1.workspace.showMessage(msg, 'error');
            };
            if (isRoot) {
                echoErr('Log disabled for root user.');
                return false;
            }
            if (!this.apiVersion.gte(api_1.default.v222)) {
                echoErr('TS Server logging requires TS 2.2.2+');
                return false;
            }
            if (this._configuration.tsServerLogLevel === configuration_1.TsServerLogLevel.Off) {
                echoErr(`TS Server logging is off. Change 'tsserver.log' in 'coc-settings.json' to enable`);
                return false;
            }
            if (!this.tsServerLogFile) {
                echoErr('TS Server has not started logging.');
                return false;
            }
            try {
                yield coc_nvim_1.workspace.nvim.command(`edit ${this.tsServerLogFile}`);
                return true;
            }
            catch (_a) {
                echoErr('Could not open TS Server log file');
                return false;
            }
        });
    }
    serviceStarted(resendModels) {
        let document = coc_nvim_1.workspace.getDocument(coc_nvim_1.workspace.bufnr);
        if (document && languageModeIds_1.languageIds.indexOf(document.filetype) !== -1) {
            this.fileConfigurationManager.ensureConfigurationForDocument(document.textDocument); // tslint:disable-line
        }
        else {
            const configureOptions = {
                hostInfo: 'nvim-coc'
            };
            this.execute('configure', configureOptions, vscode_languageserver_protocol_1.CancellationToken.None); // tslint:disable-line
        }
        this.setCompilerOptionsForInferredProjects(this._configuration);
        if (resendModels) {
            this._onResendModelsRequested.fire(void 0);
        }
    }
    setCompilerOptionsForInferredProjects(configuration) {
        if (!this.apiVersion.gte(api_1.default.v206))
            return;
        const args = {
            options: this.getCompilerOptionsForInferredProjects(configuration)
        };
        this.executeWithoutWaitingForResponse('compilerOptionsForInferredProjects', args); // tslint:disable-line
    }
    getCompilerOptionsForInferredProjects(configuration) {
        return Object.assign({}, tsconfig_1.inferredProjectConfig(configuration), { allowJs: true, allowSyntheticDefaultImports: true, allowNonTsExtensions: true });
    }
    serviceExited(restart) {
        this.state = coc_nvim_1.ServiceStat.Stopped;
        this.servicePromise = null;
        this.tsServerLogFile = null;
        this._callbacks.destroy('Service died.');
        this._callbacks = new callbackMap_1.CallbackMap();
        this._requestQueue = new requestQueue_1.RequestQueue();
        this._pendingResponses = new Set();
        if (restart) {
            const diff = Date.now() - this.lastStart;
            this.numberRestarts++;
            let startService = true;
            if (this.numberRestarts > 5) {
                this.numberRestarts = 0;
                if (diff < 10 * 1000 /* 10 seconds */) {
                    this.lastStart = Date.now();
                    startService = false;
                    coc_nvim_1.workspace.showMessage('The TypeScript language service died 5 times right after it got started.', 'error'); // tslint:disable-line
                }
                else if (diff < 60 * 1000 /* 1 Minutes */) {
                    this.lastStart = Date.now();
                    coc_nvim_1.workspace.showMessage('The TypeScript language service died unexpectedly 5 times in the last 5 Minutes.', 'error'); // tslint:disable-line
                }
            }
            if (startService) {
                this.startService(true); // tslint:disable-line
            }
        }
    }
    toPath(uri) {
        return this.normalizePath(coc_nvim_1.Uri.parse(uri));
    }
    toResource(filepath) {
        if (this._apiVersion.gte(api_1.default.v213)) {
            if (filepath.startsWith('untitled:')) {
                let resource = coc_nvim_1.Uri.parse(filepath);
                if (this.inMemoryResourcePrefix) {
                    const dirName = path_1.default.dirname(resource.path);
                    const fileName = path_1.default.basename(resource.path);
                    if (fileName.startsWith(this.inMemoryResourcePrefix)) {
                        resource = resource.with({ path: path_1.default.posix.join(dirName, fileName.slice(this.inMemoryResourcePrefix.length)) });
                    }
                }
                return resource.toString();
            }
        }
        return coc_nvim_1.Uri.file(filepath).toString();
    }
    normalizePath(resource) {
        if (this._apiVersion.gte(api_1.default.v213)) {
            if (resource.scheme == 'untitled') {
                const dirName = path_1.default.dirname(resource.path);
                const fileName = this.inMemoryResourcePrefix + path_1.default.basename(resource.path);
                return resource
                    .with({ path: path_1.default.posix.join(dirName, fileName) })
                    .toString(true);
            }
        }
        const result = resource.fsPath;
        if (!result)
            return null;
        // Both \ and / must be escaped in regular expressions
        return result.replace(new RegExp('\\' + this.pathSeparator, 'g'), '/');
    }
    get inMemoryResourcePrefix() {
        return this._apiVersion.gte(api_1.default.v270) ? '^' : '';
    }
    asUrl(filepath) {
        if (this._apiVersion.gte(api_1.default.v213)) {
            if (filepath.startsWith('untitled:')) {
                let resource = coc_nvim_1.Uri.parse(filepath);
                if (this.inMemoryResourcePrefix) {
                    const dirName = path_1.default.dirname(resource.path);
                    const fileName = path_1.default.basename(resource.path);
                    if (fileName.startsWith(this.inMemoryResourcePrefix)) {
                        resource = resource.with({
                            path: path_1.default.posix.join(dirName, fileName.slice(this.inMemoryResourcePrefix.length))
                        });
                    }
                }
                return resource;
            }
        }
        return coc_nvim_1.Uri.file(filepath);
    }
    execute(command, args, token, lowPriority) {
        return this.executeImpl(command, args, {
            isAsync: false,
            token,
            expectsResult: true,
            lowPriority
        });
    }
    executeAsync(command, args, token) {
        return this.executeImpl(command, args, {
            isAsync: true,
            token,
            expectsResult: true
        });
    }
    executeWithoutWaitingForResponse(command, args) {
        this.executeImpl(command, args, {
            isAsync: false,
            token: undefined,
            expectsResult: false
        });
    }
    executeImpl(command, args, executeInfo) {
        if (this.servicePromise == null) {
            return Promise.resolve(undefined);
        }
        this.bufferSyncSupport.beforeCommand(command);
        const request = this._requestQueue.createRequest(command, args);
        const requestInfo = {
            request,
            expectsResponse: executeInfo.expectsResult,
            isAsync: executeInfo.isAsync,
            queueingType: getQueueingType(command, executeInfo.lowPriority)
        };
        let result;
        if (executeInfo.expectsResult) {
            result = new Promise((resolve, reject) => {
                this._callbacks.add(request.seq, { onSuccess: resolve, onError: reject, startTime: Date.now(), isAsync: executeInfo.isAsync }, executeInfo.isAsync);
                if (executeInfo.token) {
                    executeInfo.token.onCancellationRequested(() => {
                        this.tryCancelRequest(request.seq, command);
                    });
                }
            }).catch((err) => {
                throw err;
            });
        }
        this._requestQueue.enqueue(requestInfo);
        this.sendNextRequests();
        return result;
    }
    sendNextRequests() {
        while (this._pendingResponses.size === 0 && this._requestQueue.length > 0) {
            const item = this._requestQueue.dequeue();
            if (item) {
                this.sendRequest(item);
            }
        }
    }
    sendRequest(requestItem) {
        const serverRequest = requestItem.request;
        this.tracer.traceRequest(serverRequest, requestItem.expectsResponse, this._requestQueue.length);
        if (requestItem.expectsResponse && !requestItem.isAsync) {
            this._pendingResponses.add(requestItem.request.seq);
        }
        this.service().then(childProcess => {
            try {
                childProcess.write(serverRequest);
            }
            catch (err) {
                const callback = this.fetchCallback(serverRequest.seq);
                if (callback) {
                    callback.onError(err);
                }
            }
        });
    }
    tryCancelRequest(seq, command) {
        try {
            if (this._requestQueue.tryDeletePendingRequest(seq)) {
                this.tracer.logTrace(`TypeScript Server: canceled request with sequence number ${seq}`);
                return true;
            }
            if (this.cancellationPipeName) {
                this.tracer.logTrace(`TypeScript Server: trying to cancel ongoing request with sequence number ${seq}`);
                try {
                    fs_1.default.writeFileSync(this.cancellationPipeName + seq, '');
                }
                catch (_a) {
                    // noop
                }
                return true;
            }
            this.tracer.logTrace(`TypeScript Server: tried to cancel request with sequence number ${seq}. But request got already delivered.`);
            return false;
        }
        finally {
            const callback = this.fetchCallback(seq);
            if (callback) {
                callback.onSuccess(new typescriptService_1.ServerResponse.Cancelled(`Cancelled request ${seq} - ${command}`));
            }
        }
    }
    fetchCallback(seq) {
        const callback = this._callbacks.fetch(seq);
        if (!callback) {
            return undefined;
        }
        this._pendingResponses.delete(seq);
        return callback;
    }
    dispatchMessage(message) {
        try {
            switch (message.type) {
                case 'response':
                    this.dispatchResponse(message);
                    break;
                case 'event':
                    const event = message;
                    if (event.event === 'requestCompleted') {
                        const seq = event.body.request_seq;
                        const p = this._callbacks.fetch(seq);
                        if (p) {
                            this.tracer.traceRequestCompleted('requestCompleted', seq, p.startTime);
                            p.onSuccess(undefined);
                        }
                    }
                    else {
                        this.tracer.traceEvent(event);
                        this.dispatchEvent(event);
                    }
                    break;
                default:
                    throw new Error(`Unknown message type ${message.type} received`);
            }
        }
        finally {
            this.sendNextRequests();
        }
    }
    dispatchResponse(response) {
        const callback = this.fetchCallback(response.request_seq);
        if (!callback) {
            return;
        }
        this.tracer.traceResponse(response, callback.startTime);
        if (response.success) {
            callback.onSuccess(response);
        }
        else if (response.message === 'No content available.') {
            // Special case where response itself is successful but there is not any data to return.
            callback.onSuccess(typescriptService_1.ServerResponse.NoContent);
        }
        else {
            callback.onError(new Error(response.message));
        }
    }
    dispatchEvent(event) {
        switch (event.event) {
            case 'syntaxDiag':
            case 'semanticDiag':
            case 'suggestionDiag':
                const diagnosticEvent = event;
                if (diagnosticEvent.body && diagnosticEvent.body.diagnostics) {
                    this._onDiagnosticsReceived.fire({
                        kind: getDiagnosticsKind(event),
                        resource: this.asUrl(diagnosticEvent.body.file),
                        diagnostics: diagnosticEvent.body.diagnostics
                    });
                }
                break;
            case 'configFileDiag':
                this._onConfigDiagnosticsReceived.fire(event);
                break;
            case 'projectLanguageServiceState':
                if (event.body) {
                    this._onProjectLanguageServiceStateChanged.fire(event.body);
                }
                break;
            case 'beginInstallTypes':
                if (event.body) {
                    this._onDidBeginInstallTypings.fire(event.body);
                }
                break;
            case 'endInstallTypes':
                if (event.body) {
                    this._onDidEndInstallTypings.fire(event.body);
                }
                break;
            case 'projectsUpdatedInBackground':
                const body = event.body;
                const resources = body.openFiles.map(coc_nvim_1.Uri.file);
                this.bufferSyncSupport.getErr(resources);
                break;
            case 'typesInstallerInitializationFailed':
                if (event.body) {
                    this._onTypesInstallerInitializationFailed.fire(event.body);
                }
                break;
            case 'projectLoadingStart':
                this.versionStatus.loading = true;
                break;
            case 'projectLoadingFinish':
                this.versionStatus.loading = false;
                break;
        }
    }
    getTsServerArgs() {
        return __awaiter(this, void 0, void 0, function* () {
            const args = [];
            args.push('--allowLocalPluginLoads');
            if (this.apiVersion.gte(api_1.default.v250)) {
                args.push('--useInferredProjectPerProjectRoot');
            }
            else {
                args.push('--useSingleInferredProject');
            }
            if (this.apiVersion.gte(api_1.default.v206) && this._configuration.disableAutomaticTypeAcquisition) {
                args.push('--disableAutomaticTypingAcquisition');
            }
            if (this.apiVersion.gte(api_1.default.v222)) {
                this.cancellationPipeName = process_1.getTempFile(`tscancellation-${process_1.makeRandomHexString(20)}`);
                args.push('--cancellationPipeName', this.cancellationPipeName + '*');
            }
            if (this.apiVersion.gte(api_1.default.v222)) {
                const isRoot = process.getuid && process.getuid() == 0;
                if (this._configuration.tsServerLogLevel !== configuration_1.TsServerLogLevel.Off && !isRoot) {
                    const logDir = os_1.default.tmpdir();
                    if (logDir) {
                        this.tsServerLogFile = path_1.default.join(logDir, `coc-nvim-tsc.log`);
                        this.info('TSServer log file :', this.tsServerLogFile);
                    }
                    else {
                        this.tsServerLogFile = null;
                        this.error('Could not create TSServer log directory');
                    }
                    if (this.tsServerLogFile) {
                        args.push('--logVerbosity', configuration_1.TsServerLogLevel.toString(this._configuration.tsServerLogLevel));
                        args.push('--logFile', this.tsServerLogFile);
                    }
                }
            }
            if (this.apiVersion.gte(api_1.default.v230)) {
                const pluginNames = this.pluginManager.plugins.map(x => x.name);
                const pluginRoot = this._configuration.tsServerPluginRoot;
                const pluginPaths = pluginRoot ? [pluginRoot] : [];
                if (pluginNames.length) {
                    args.push('--globalPlugins', pluginNames.join(','));
                    for (const plugin of this.pluginManager.plugins) {
                        pluginPaths.push(plugin.path);
                    }
                }
                if (pluginPaths.length) {
                    args.push('--pluginProbeLocations', pluginPaths.join(','));
                }
            }
            if (this._configuration.typingsCacheLocation) {
                args.push('--globalTypingsCacheLocation', `"${this._configuration.typingsCacheLocation}"`);
            }
            if (this.apiVersion.gte(api_1.default.v234)) {
                if (this._configuration.npmLocation) {
                    args.push('--npmLocation', `"${this._configuration.npmLocation}"`);
                }
                else {
                    try {
                        args.push('--npmLocation', `"${which_1.default.sync('npm')}"`);
                    }
                    catch (e) { } // tslint:disable-line
                }
            }
            if (this.apiVersion.gte(api_1.default.v291)) {
                args.push('--noGetErrOnBackgroundUpdate');
            }
            if (this.apiVersion.gte(api_1.default.v345)) {
                args.push('--validateDefaultNpmLocation');
            }
            return args;
        });
    }
    getProjectRootPath(uri) {
        let root = coc_nvim_1.workspace.cwd;
        let u = coc_nvim_1.Uri.parse(uri);
        if (u.scheme == 'file') {
            let folder = coc_nvim_1.workspace.getWorkspaceFolder(uri);
            if (folder) {
                root = coc_nvim_1.Uri.parse(folder.uri).fsPath;
            }
            else {
                let filepath = coc_nvim_1.Uri.parse(uri).fsPath;
                if (!filepath.startsWith(root)) {
                    root = path_1.default.dirname(filepath);
                }
            }
        }
        if (root == os_1.default.homedir())
            return null;
        return root;
    }
    configurePlugin(pluginName, configuration) {
        if (this.apiVersion.gte(api_1.default.v314)) {
            if (!this.servicePromise)
                return;
            this.servicePromise.then(() => {
                // tslint:disable-next-line: no-floating-promises
                this.executeWithoutWaitingForResponse('configurePlugin', { pluginName, configuration });
            });
        }
    }
    interruptGetErr(f) {
        return this.bufferSyncSupport.interuptGetErr(f);
    }
}
exports.default = TypeScriptServiceClient;
function getDiagnosticsKind(event) {
    switch (event.event) {
        case 'syntaxDiag':
            return diagnostics_1.DiagnosticKind.Syntax;
        case 'semanticDiag':
            return diagnostics_1.DiagnosticKind.Semantic;
        case 'suggestionDiag':
            return diagnostics_1.DiagnosticKind.Suggestion;
    }
    throw new Error('Unknown dignostics kind');
}
const fenceCommands = new Set(['change', 'close', 'open']);
function getQueueingType(command, lowPriority) {
    if (fenceCommands.has(command)) {
        return requestQueue_1.RequestQueueingType.Fence;
    }
    return lowPriority ? requestQueue_1.RequestQueueingType.LowPriority : requestQueue_1.RequestQueueingType.Normal;
}


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ServerResponse;
(function (ServerResponse) {
    class Cancelled {
        constructor(reason) {
            this.reason = reason;
            this.type = 'cancelled';
        }
    }
    ServerResponse.Cancelled = Cancelled;
    // tslint:disable-next-line: new-parens
    ServerResponse.NoContent = new class {
        constructor() {
            this.type = 'noContent';
        }
    };
})(ServerResponse = exports.ServerResponse || (exports.ServerResponse = {}));


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const which_1 = __importDefault(__webpack_require__(68));
var TsServerLogLevel;
(function (TsServerLogLevel) {
    TsServerLogLevel[TsServerLogLevel["Off"] = 0] = "Off";
    TsServerLogLevel[TsServerLogLevel["Normal"] = 1] = "Normal";
    TsServerLogLevel[TsServerLogLevel["Terse"] = 2] = "Terse";
    TsServerLogLevel[TsServerLogLevel["Verbose"] = 3] = "Verbose";
})(TsServerLogLevel = exports.TsServerLogLevel || (exports.TsServerLogLevel = {}));
(function (TsServerLogLevel) {
    function fromString(value) {
        switch (value && value.toLowerCase()) {
            case 'normal':
                return TsServerLogLevel.Normal;
            case 'terse':
                return TsServerLogLevel.Terse;
            case 'verbose':
                return TsServerLogLevel.Verbose;
            case 'off':
            default:
                return TsServerLogLevel.Off;
        }
    }
    TsServerLogLevel.fromString = fromString;
    function toString(value) {
        switch (value) {
            case TsServerLogLevel.Normal:
                return 'normal';
            case TsServerLogLevel.Terse:
                return 'terse';
            case TsServerLogLevel.Verbose:
                return 'verbose';
            case TsServerLogLevel.Off:
            default:
                return 'off';
        }
    }
    TsServerLogLevel.toString = toString;
})(TsServerLogLevel = exports.TsServerLogLevel || (exports.TsServerLogLevel = {}));
class TypeScriptServiceConfiguration {
    constructor() {
        this._configuration = coc_nvim_1.workspace.getConfiguration('tsserver');
        coc_nvim_1.workspace.onDidChangeConfiguration(() => {
            this._configuration = coc_nvim_1.workspace.getConfiguration('tsserver');
        });
    }
    get locale() {
        return this._configuration.get('locale', null);
    }
    get globalTsdk() {
        return this._configuration.get('tsdk', null);
    }
    get ignoreLocalTsserver() {
        return this._configuration.get('ignoreLocalTsserver', false);
    }
    get tsServerLogLevel() {
        return TsServerLogLevel.fromString(this._configuration.get('log', null));
    }
    get typingsCacheLocation() {
        return this._configuration.get('typingsCacheLocation', '');
    }
    get tsServerPluginRoot() {
        return this._configuration.get('tsServerPluginRoot', null);
    }
    get checkJs() {
        return this._configuration.get('implicitProjectConfig.checkJs', false);
    }
    get experimentalDecorators() {
        return this._configuration.get('implicitProjectConfig.experimentalDecorators', false);
    }
    get disableAutomaticTypeAcquisition() {
        return this._configuration.get('disableAutomaticTypeAcquisition', false);
    }
    get formatOnType() {
        return this._configuration.get('formatOnType', false);
    }
    get debugPort() {
        return this._configuration.get('debugPort', parseInt(process.env['TSS_DEBUG'], 10));
    }
    get npmLocation() {
        let path = this._configuration.get('npm', '');
        if (path)
            return path;
        try {
            path = which_1.default.sync('npm');
        }
        catch (e) {
            return null;
        }
        return path;
    }
    static loadFromWorkspace() {
        return new TypeScriptServiceConfiguration();
    }
}
exports.TypeScriptServiceConfiguration = TypeScriptServiceConfiguration;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const is = __importStar(__webpack_require__(83));
class Logger {
    get output() {
        if (this._channel) {
            return this._channel;
        }
        this._channel = coc_nvim_1.workspace.createOutputChannel('tsserver');
        return this._channel;
    }
    dispose() {
        if (this._channel) {
            this._channel.dispose();
        }
    }
    data2String(data) {
        if (data instanceof Error) {
            if (is.string(data.stack)) {
                return data.stack;
            }
            return data.message;
        }
        if (is.boolean(data.success) && !data.success && is.string(data.message)) {
            return data.message;
        }
        if (is.string(data)) {
            return data;
        }
        return data.toString();
    }
    info(message, data) {
        this.logLevel('Info', message, data);
    }
    warn(message, data) {
        this.logLevel('Warn', message, data);
    }
    error(message, data) {
        // See https://github.com/Microsoft/TypeScript/issues/10496
        if (data && data.message === 'No content available.') {
            return;
        }
        this.logLevel('Error', message, data);
    }
    logLevel(level, message, data) {
        this.output.appendLine(`[${level}  - ${new Date().toLocaleTimeString()}] ${message}`);
        if (data) {
            this.output.appendLine(this.data2String(data));
        }
    }
}
exports.default = Logger;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const toString = Object.prototype.toString;
function defined(value) {
    return typeof value !== 'undefined';
}
exports.defined = defined;
function boolean(value) {
    return value === true || value === false;
}
exports.boolean = boolean;
function string(value) {
    return toString.call(value) === '[object String]';
}
exports.string = string;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const child_process_1 = __importDefault(__webpack_require__(76));
const net_1 = __importDefault(__webpack_require__(16));
const os_1 = __importDefault(__webpack_require__(14));
const path_1 = __importDefault(__webpack_require__(13));
function makeRandomHexString(length) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    let result = '';
    for (let i = 0; i < length; i++) {
        const idx = Math.floor(chars.length * Math.random());
        result += chars[idx];
    }
    return result;
}
exports.makeRandomHexString = makeRandomHexString;
function generatePipeName() {
    return getPipeName(makeRandomHexString(40));
}
function getPipeName(name) {
    const fullName = 'coc-tsc-' + name;
    if (process.platform === 'win32') {
        return '\\\\.\\pipe\\' + fullName + '-sock';
    }
    // Mac/Unix: use socket file
    return path_1.default.join(os_1.default.tmpdir(), fullName + '.sock');
}
function getTempFile(name) {
    const fullName = 'coc-nvim-' + name;
    return path_1.default.join(os_1.default.tmpdir(), fullName + '.sock');
}
exports.getTempFile = getTempFile;
function generatePatchedEnv(env, stdInPipeName, stdOutPipeName, stdErrPipeName) {
    const newEnv = Object.assign({}, env);
    // Set the two unique pipe names and the electron flag as process env
    newEnv['STDIN_PIPE_NAME'] = stdInPipeName; // tslint:disable-line
    newEnv['STDOUT_PIPE_NAME'] = stdOutPipeName; // tslint:disable-line
    newEnv['STDERR_PIPE_NAME'] = stdErrPipeName; // tslint:disable-line
    newEnv['TSS_LOG'] = `-level verbose -file ${path_1.default.join(os_1.default.tmpdir(), 'coc-nvim-tsc.log')}`; // tslint:disable-line
    // Ensure we always have a PATH set
    newEnv['PATH'] = newEnv['PATH'] || process.env.PATH; // tslint:disable-line
    return newEnv;
}
function fork(modulePath, args, options, logger, callback) {
    let callbackCalled = false;
    const resolve = (result) => {
        if (callbackCalled) {
            return;
        }
        callbackCalled = true;
        callback(null, result);
    };
    const reject = (err) => {
        if (callbackCalled) {
            return;
        }
        callbackCalled = true;
        callback(err, null);
    };
    // Generate three unique pipe names
    const stdInPipeName = generatePipeName();
    const stdOutPipeName = generatePipeName();
    const stdErrPipeName = generatePipeName();
    const newEnv = generatePatchedEnv(process.env, stdInPipeName, stdOutPipeName, stdErrPipeName);
    newEnv['NODE_PATH'] = path_1.default.join(modulePath, '..', '..', '..'); // tslint:disable-line
    let childProcess;
    // Begin listening to stderr pipe
    let stdErrServer = net_1.default.createServer(stdErrStream => {
        // From now on the childProcess.stderr is available for reading
        childProcess.stderr = stdErrStream;
    });
    stdErrServer.listen(stdErrPipeName);
    // Begin listening to stdout pipe
    let stdOutServer = net_1.default.createServer(stdOutStream => {
        // The child process will write exactly one chunk with content `ready` when it has installed a listener to the stdin pipe
        stdOutStream.once('data', (_chunk) => {
            // The child process is sending me the `ready` chunk, time to connect to the stdin pipe
            childProcess.stdin = net_1.default.connect(stdInPipeName);
            // From now on the childProcess.stdout is available for reading
            childProcess.stdout = stdOutStream;
            resolve(childProcess);
        });
    });
    stdOutServer.listen(stdOutPipeName);
    let serverClosed = false;
    const closeServer = () => {
        if (serverClosed) {
            return;
        }
        serverClosed = true;
        stdOutServer.close();
        stdErrServer.close();
    };
    // Create the process
    logger.info('Forking TSServer', `PATH: ${newEnv['PATH']} `);
    const bootstrapperPath = path_1.default.resolve(__dirname, '../bin/tsserverForkStart');
    childProcess = child_process_1.default.fork(bootstrapperPath, [modulePath].concat(args), {
        silent: true,
        env: newEnv,
        execArgv: options.execArgv
    });
    childProcess.once('error', (err) => {
        closeServer();
        reject(err);
    });
    childProcess.once('exit', (err) => {
        closeServer();
        reject(err);
    });
}
exports.fork = fork;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
var Trace;
(function (Trace) {
    Trace[Trace["Off"] = 0] = "Off";
    Trace[Trace["Messages"] = 1] = "Messages";
    Trace[Trace["Verbose"] = 2] = "Verbose";
})(Trace || (Trace = {}));
(function (Trace) {
    function fromString(value) {
        value = value || '';
        value = value.toLowerCase();
        switch (value) {
            case 'off':
                return Trace.Off;
            case 'messages':
                return Trace.Messages;
            case 'verbose':
                return Trace.Verbose;
            default:
                return Trace.Off;
        }
    }
    Trace.fromString = fromString;
})(Trace || (Trace = {}));
class Tracer {
    constructor(logger) {
        this.logger = logger;
        this.trace = Tracer.readTrace();
    }
    static readTrace() {
        let result = Trace.fromString(coc_nvim_1.workspace.getConfiguration('tsserver').get('trace.server', 'off'));
        if (result === Trace.Off && !!process.env.TSS_TRACE) {
            result = Trace.Messages;
        }
        return result;
    }
    traceRequest(request, responseExpected, queueLength) {
        if (this.trace === Trace.Off)
            return;
        let data;
        if (this.trace === Trace.Verbose && request.arguments) {
            data = `Arguments: ${JSON.stringify(request.arguments, null, 4)}`;
        }
        this.logTrace(`Sending request: ${request.command} (${request.seq}). Response expected: ${responseExpected ? 'yes' : 'no'}. Current queue length: ${queueLength}`, data);
    }
    traceResponse(response, startTime) {
        if (this.trace === Trace.Off) {
            return;
        }
        let data;
        if (this.trace === Trace.Verbose && response.body) {
            data = `Result: ${JSON.stringify(response.body, null, 4)}`;
        }
        this.logTrace(`Response received: ${response.command} (${response.request_seq}). Request took ${Date.now() - startTime} ms. Success: ${response.success} ${!response.success ? '. Message: ' + response.message : ''}`, data);
    }
    traceEvent(event) {
        if (this.trace === Trace.Off) {
            return;
        }
        let data;
        if (this.trace === Trace.Verbose && event.body) {
            data = `Data: ${JSON.stringify(event.body, null, 4)}`;
        }
        this.logTrace(`Event received: ${event.event} (${event.seq}).`, data);
    }
    logTrace(message, data) {
        if (this.trace !== Trace.Off) {
            this.logger.logLevel('Trace', message, data);
        }
    }
    traceRequestCompleted(command, request_seq, startTime) {
        if (this.trace === Trace.Off) {
            return;
        }
        this.logTrace(`Async response received: ${command} (${request_seq}). Request took ${Date.now() - startTime} ms.`);
    }
}
exports.default = Tracer;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function inferredProjectConfig(config) {
    const base = {
        module: 'commonjs',
        target: 'es2016',
        jsx: 'preserve'
    };
    if (config.checkJs) {
        base.checkJs = true;
    }
    if (config.experimentalDecorators) {
        base.experimentalDecorators = true;
    }
    return base;
}
exports.inferredProjectConfig = inferredProjectConfig;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const fs_1 = __importDefault(__webpack_require__(67));
const path_1 = __importDefault(__webpack_require__(13));
const coc_nvim_1 = __webpack_require__(1);
const api_1 = __importDefault(__webpack_require__(38));
const requireFunc =  true ? require : undefined;
class TypeScriptVersion {
    constructor(path, _pathLabel) {
        this.path = path;
        this._pathLabel = _pathLabel;
        this._api = null;
    }
    get tsServerPath() {
        return path_1.default.join(this.path, 'tsserver.js');
    }
    get pathLabel() {
        return typeof this._pathLabel === 'undefined' ? this.path : this._pathLabel;
    }
    get isValid() {
        return this.version != null;
    }
    get version() {
        if (this._api)
            return this._api;
        let api = this._api = this.getTypeScriptVersion(this.tsServerPath);
        return api;
    }
    get versionString() {
        const version = this.version;
        return version ? version.versionString : null;
    }
    getTypeScriptVersion(serverPath) {
        if (!fs_1.default.existsSync(serverPath)) {
            return undefined;
        }
        const p = serverPath.split(path_1.default.sep);
        if (p.length <= 2) {
            return undefined;
        }
        const p2 = p.slice(0, -2);
        const modulePath = p2.join(path_1.default.sep);
        let fileName = path_1.default.join(modulePath, 'package.json');
        if (!fs_1.default.existsSync(fileName)) {
            // Special case for ts dev versions
            if (path_1.default.basename(modulePath) === 'built') {
                fileName = path_1.default.join(modulePath, '..', 'package.json');
            }
        }
        if (!fs_1.default.existsSync(fileName)) {
            return undefined;
        }
        const contents = fs_1.default.readFileSync(fileName).toString();
        let desc = null;
        try {
            desc = JSON.parse(contents);
        }
        catch (err) {
            return undefined;
        }
        if (!desc || !desc.version) {
            return undefined;
        }
        return desc.version ? api_1.default.fromVersionString(desc.version) : undefined;
    }
}
exports.TypeScriptVersion = TypeScriptVersion;
class TypeScriptVersionProvider {
    constructor(configuration) {
        this.configuration = configuration;
    }
    updateConfiguration(configuration) {
        this.configuration = configuration;
    }
    getDefaultVersion() {
        // tsdk from configuration
        let { globalTsdk } = this.configuration;
        if (globalTsdk)
            return new TypeScriptVersion(globalTsdk);
        return this.bundledVersion;
    }
    get globalVersion() {
        let { globalTsdk } = this.configuration;
        if (globalTsdk)
            return new TypeScriptVersion(globalTsdk);
        return undefined;
    }
    getLocalVersion() {
        let folders = coc_nvim_1.workspace.workspaceFolders.map(f => coc_nvim_1.Uri.parse(f.uri).fsPath);
        for (let p of folders) {
            if (fs_1.default.existsSync(path_1.default.join(p, 'node_modules/typescript/lib'))) {
                let lib = path_1.default.join(p, 'node_modules/typescript/lib');
                let version = new TypeScriptVersion(lib);
                if (version.isValid)
                    return version;
            }
        }
        return null;
    }
    get bundledVersion() {
        try {
            const file = requireFunc.resolve('typescript');
            const bundledVersion = new TypeScriptVersion(path_1.default.dirname(file), '');
            return bundledVersion;
        }
        catch (e) {
            coc_nvim_1.workspace.showMessage('Bundled typescript module not found', 'error');
            return null;
        }
    }
}
exports.TypeScriptVersionProvider = TypeScriptVersionProvider;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
class VersionStatus {
    constructor(_normalizePath, enableJavascript) {
        this._normalizePath = _normalizePath;
        this.enableJavascript = enableJavascript;
        this._versionBarEntry = coc_nvim_1.workspace.createStatusBarItem(99);
        this._onChangeEditorSub = coc_nvim_1.events.on('BufEnter', this.showHideStatus, this);
        this._versionBarEntry.show();
    }
    dispose() {
        this._versionBarEntry.dispose();
        this._onChangeEditorSub.dispose();
    }
    onDidChangeTypeScriptVersion(_version) {
        this._versionBarEntry.text = `TSC`;
        this.showHideStatus().catch(_e => {
            // noop
        });
    }
    set loading(isLoading) {
        this._versionBarEntry.isProgress = isLoading;
    }
    showHideStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = yield coc_nvim_1.workspace.document;
            if (!document) {
                this._versionBarEntry.hide();
                return;
            }
            let filetypes = ['typescript', 'typescriptreact'];
            if (this.enableJavascript) {
                filetypes.push('javascript', 'javascriptreact');
            }
            if (filetypes.indexOf(document.filetype) !== -1) {
                if (this._normalizePath(coc_nvim_1.Uri.parse(document.uri))) {
                    this._versionBarEntry.show();
                }
                else {
                    this._versionBarEntry.hide();
                }
                return;
            }
            this._versionBarEntry.hide();
        });
    }
}
exports.default = VersionStatus;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const DefaultSize = 8192;
const ContentLength = 'Content-Length: ';
const ContentLengthSize = Buffer.byteLength(ContentLength, 'utf8');
const Blank = Buffer.from(' ', 'utf8')[0];
const BackslashR = Buffer.from('\r', 'utf8')[0];
const BackslashN = Buffer.from('\n', 'utf8')[0];
class ProtocolBuffer {
    constructor() {
        this.index = 0;
        this.buffer = Buffer.allocUnsafe(DefaultSize);
    }
    append(data) {
        let toAppend = null;
        if (Buffer.isBuffer(data)) {
            toAppend = data;
        }
        else {
            toAppend = Buffer.from(data, 'utf8');
        }
        if (this.buffer.length - this.index >= toAppend.length) {
            toAppend.copy(this.buffer, this.index, 0, toAppend.length);
        }
        else {
            let newSize = (Math.ceil((this.index + toAppend.length) / DefaultSize) + 1) *
                DefaultSize;
            if (this.index === 0) {
                this.buffer = Buffer.allocUnsafe(newSize);
                toAppend.copy(this.buffer, 0, 0, toAppend.length);
            }
            else {
                this.buffer = Buffer.concat([this.buffer.slice(0, this.index), toAppend], newSize);
            }
        }
        this.index += toAppend.length;
    }
    tryReadContentLength() {
        let result = -1;
        let current = 0;
        // we are utf8 encoding...
        while (current < this.index &&
            (this.buffer[current] === Blank ||
                this.buffer[current] === BackslashR ||
                this.buffer[current] === BackslashN)) {
            current++;
        }
        if (this.index < current + ContentLengthSize) {
            return result;
        }
        current += ContentLengthSize;
        let start = current;
        while (current < this.index && this.buffer[current] !== BackslashR) {
            current++;
        }
        if (current + 3 >= this.index ||
            this.buffer[current + 1] !== BackslashN ||
            this.buffer[current + 2] !== BackslashR ||
            this.buffer[current + 3] !== BackslashN) {
            return result;
        }
        let data = this.buffer.toString('utf8', start, current);
        result = parseInt(data, 10);
        this.buffer = this.buffer.slice(current + 4);
        this.index = this.index - (current + 4);
        return result;
    }
    tryReadContent(length) {
        if (this.index < length) {
            return null;
        }
        let result = this.buffer.toString('utf8', 0, length);
        let sourceStart = length;
        while (sourceStart < this.index &&
            (this.buffer[sourceStart] === BackslashR ||
                this.buffer[sourceStart] === BackslashN)) {
            sourceStart++;
        }
        this.buffer.copy(this.buffer, 0, sourceStart);
        this.index = this.index - sourceStart;
        return result;
    }
}
class Reader {
    constructor(readable, callback, onError) {
        this.readable = readable;
        this.callback = callback;
        this.onError = onError;
        this.buffer = new ProtocolBuffer();
        this.nextMessageLength = -1;
        this.readable.on('data', (data) => {
            this.onLengthData(data);
        });
    }
    onLengthData(data) {
        try {
            this.buffer.append(data);
            while (true) {
                if (this.nextMessageLength === -1) {
                    this.nextMessageLength = this.buffer.tryReadContentLength();
                    if (this.nextMessageLength === -1) {
                        return;
                    }
                }
                const msg = this.buffer.tryReadContent(this.nextMessageLength);
                if (msg === null) {
                    return;
                }
                this.nextMessageLength = -1;
                const json = JSON.parse(msg);
                this.callback(json);
            }
        }
        catch (e) {
            this.onError(e);
        }
    }
}
exports.Reader = Reader;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const typescriptService_1 = __webpack_require__(80);
class CallbackMap {
    constructor() {
        this._callbacks = new Map();
        this._asyncCallbacks = new Map();
    }
    destroy(cause) {
        const cancellation = new typescriptService_1.ServerResponse.Cancelled(cause);
        for (const callback of this._callbacks.values()) {
            callback.onSuccess(cancellation);
        }
        this._callbacks.clear();
        for (const callback of this._asyncCallbacks.values()) {
            callback.onSuccess(cancellation);
        }
        this._asyncCallbacks.clear();
    }
    add(seq, callback, isAsync) {
        if (isAsync) {
            this._asyncCallbacks.set(seq, callback);
        }
        else {
            this._callbacks.set(seq, callback);
        }
    }
    fetch(seq) {
        const callback = this._callbacks.get(seq) || this._asyncCallbacks.get(seq);
        this.delete(seq);
        return callback;
    }
    delete(seq) {
        if (!this._callbacks.delete(seq)) {
            this._asyncCallbacks.delete(seq);
        }
    }
}
exports.CallbackMap = CallbackMap;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
var RequestQueueingType;
(function (RequestQueueingType) {
    /**
     * Normal request that is executed in order.
     */
    RequestQueueingType[RequestQueueingType["Normal"] = 1] = "Normal";
    /**
     * Request that normal requests jump in front of in the queue.
     */
    RequestQueueingType[RequestQueueingType["LowPriority"] = 2] = "LowPriority";
    /**
     * A fence that blocks request reordering.
     *
     * Fences are not reordered. Unlike a normal request, a fence will never jump in front of a low priority request
     * in the request queue.
     */
    RequestQueueingType[RequestQueueingType["Fence"] = 3] = "Fence";
})(RequestQueueingType = exports.RequestQueueingType || (exports.RequestQueueingType = {}));
class RequestQueue {
    constructor() {
        this.queue = [];
        this.sequenceNumber = 0;
    }
    get length() {
        return this.queue.length;
    }
    enqueue(item) {
        if (item.queueingType === RequestQueueingType.Normal) {
            let index = this.queue.length - 1;
            while (index >= 0) {
                if (this.queue[index].queueingType !== RequestQueueingType.LowPriority) {
                    break;
                }
                --index;
            }
            this.queue.splice(index + 1, 0, item);
        }
        else {
            // Only normal priority requests can be reordered. All other requests just go to the end.
            this.queue.push(item);
        }
    }
    dequeue() {
        return this.queue.shift();
    }
    tryDeletePendingRequest(seq) {
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].request.seq === seq) {
                this.queue.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    createRequest(command, args) {
        return {
            seq: this.sequenceNumber++,
            type: 'request',
            command,
            arguments: args
        };
    }
}
exports.RequestQueue = RequestQueue;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const api_1 = __importDefault(__webpack_require__(38));
const async_1 = __webpack_require__(93);
const typeConverters = __importStar(__webpack_require__(35));
const languageModeIds = __importStar(__webpack_require__(50));
function mode2ScriptKind(mode) {
    switch (mode) {
        case languageModeIds.typescript:
            return 'TS';
        case languageModeIds.typescripttsx:
            return 'TSX';
        case languageModeIds.typescriptjsx:
            return 'TSX';
        case languageModeIds.typescriptreact:
            return 'TSX';
        case languageModeIds.javascript:
            return 'JS';
        case languageModeIds.javascriptreact:
            return 'JSX';
    }
    return undefined;
}
/**
 * Manages synchronization of buffers with the TS server.
 *
 * If supported, batches together file changes. This allows the TS server to more efficiently process changes.
 */
class BufferSynchronizer {
    constructor(client) {
        this.client = client;
        this._pending = {};
        this._pendingFiles = new Set();
    }
    open(args) {
        if (this.supportsBatching) {
            this.updatePending(args.file, pending => {
                if (!pending.openFiles) {
                    pending.openFiles = [];
                }
                pending.openFiles.push(args);
            });
        }
        else {
            this.client.executeWithoutWaitingForResponse('open', args);
        }
    }
    close(filepath) {
        if (this.supportsBatching) {
            this.updatePending(filepath, pending => {
                if (!pending.closedFiles) {
                    pending.closedFiles = [];
                }
                pending.closedFiles.push(filepath);
            });
        }
        else {
            const args = { file: filepath };
            this.client.executeWithoutWaitingForResponse('close', args);
        }
    }
    change(filepath, events) {
        if (!events.length) {
            return;
        }
        if (this.supportsBatching) {
            this.updatePending(filepath, pending => {
                if (!pending.changedFiles) {
                    pending.changedFiles = [];
                }
                pending.changedFiles.push({
                    fileName: filepath,
                    textChanges: events.map((change) => ({
                        newText: change.text,
                        start: typeConverters.Position.toLocation(change.range.start),
                        end: typeConverters.Position.toLocation(change.range.end),
                    })).reverse(),
                });
            });
        }
        else {
            for (const { range, text } of events) {
                const args = Object.assign({ insertString: text }, typeConverters.Range.toFormattingRequestArgs(filepath, range));
                this.client.executeWithoutWaitingForResponse('change', args);
            }
        }
    }
    beforeCommand(command) {
        if (command === 'updateOpen') {
            return;
        }
        this.flush();
    }
    flush() {
        if (!this.supportsBatching) {
            // We've already eagerly synchronized
            return;
        }
        if (this._pending.changedFiles || this._pending.closedFiles || this._pending.openFiles) {
            this.client.executeWithoutWaitingForResponse('updateOpen', this._pending);
            this._pending = {};
            this._pendingFiles.clear();
        }
    }
    get supportsBatching() {
        return this.client.apiVersion.gte(api_1.default.v340) && coc_nvim_1.workspace.getConfiguration('typescript').get('useBatchedBufferSync', true);
    }
    updatePending(filepath, f) {
        if (this.supportsBatching && this._pendingFiles.has(filepath)) {
            this.flush();
            this._pendingFiles.clear();
            f(this._pending);
            this._pendingFiles.add(filepath);
        }
        else {
            f(this._pending);
        }
    }
}
class BufferSyncSupport {
    constructor(client) {
        this.uris = new Set();
        this.disposables = [];
        this.pendingDiagnostics = new Map();
        this._validateJavaScript = true;
        this._validateTypeScript = true;
        this.listening = false;
        this._onDelete = new vscode_languageserver_protocol_1.Emitter();
        this.onDelete = this._onDelete.event;
        this.client = client;
        this.synchronizer = new BufferSynchronizer(client);
        this.modeIds = new Set(languageModeIds.languageIds);
        this.diagnosticDelayer = new async_1.Delayer(300);
    }
    listen() {
        if (this.listening) {
            return;
        }
        this.listening = true;
        coc_nvim_1.workspace.onDidOpenTextDocument(this.onDidOpenTextDocument, this, this.disposables);
        coc_nvim_1.workspace.onDidCloseTextDocument(this.onDidCloseTextDocument, this, this.disposables);
        coc_nvim_1.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument, this, this.disposables);
        coc_nvim_1.workspace.textDocuments.forEach(this.onDidOpenTextDocument, this);
        this.updateConfiguration();
        coc_nvim_1.workspace.onDidChangeConfiguration(this.updateConfiguration, this, this.disposables);
    }
    dispose() {
        this.pendingDiagnostics.clear();
        coc_nvim_1.disposeAll(this.disposables);
    }
    onDidOpenTextDocument(document) {
        if (!this.modeIds.has(document.languageId))
            return;
        let { uri } = document;
        let filepath = this.client.toPath(uri);
        this.uris.add(uri);
        const args = {
            file: filepath,
            fileContent: document.getText()
        };
        if (this.client.apiVersion.gte(api_1.default.v203)) {
            const scriptKind = mode2ScriptKind(document.languageId);
            if (scriptKind) {
                args.scriptKindName = scriptKind;
            }
        }
        if (this.client.apiVersion.gte(api_1.default.v230)) {
            let root = this.client.getProjectRootPath(document.uri);
            if (root)
                args.projectRootPath = root;
        }
        this.synchronizer.open(args);
        // this.client.executeWithoutWaitingForResponse('open', args)
        this.requestDiagnostic(uri);
    }
    onDidCloseTextDocument(document) {
        let { uri } = document;
        if (!this.uris.has(uri))
            return;
        let filepath = this.client.toPath(uri);
        this.uris.delete(uri);
        this.pendingDiagnostics.delete(uri);
        this.synchronizer.close(filepath);
        this._onDelete.fire(uri);
        this.requestAllDiagnostics();
        // this.client.executeWithoutWaitingForResponse('close', args)
    }
    onDidChangeTextDocument(e) {
        let { textDocument, contentChanges } = e;
        let { uri } = textDocument;
        if (!this.uris.has(uri))
            return;
        let filepath = this.client.toPath(uri);
        this.synchronizer.change(filepath, contentChanges);
        const didTrigger = this.requestDiagnostic(uri);
        if (!didTrigger && this.pendingGetErr) {
            // In this case we always want to re-trigger all diagnostics
            this.pendingGetErr.cancel();
            this.pendingGetErr = undefined;
            this.triggerDiagnostics();
        }
    }
    beforeCommand(command) {
        this.synchronizer.beforeCommand(command);
    }
    interuptGetErr(f) {
        if (!this.pendingGetErr) {
            return f();
        }
        this.pendingGetErr.cancel();
        this.pendingGetErr = undefined;
        const result = f();
        this.triggerDiagnostics();
        return result;
    }
    getErr(resources) {
        const handledResources = resources.filter(resource => this.uris.has(resource.toString()));
        if (!handledResources.length) {
            return;
        }
        for (const resource of handledResources) {
            let uri = resource.toString();
            if (this.shouldValidate(uri)) {
                this.pendingDiagnostics.set(uri, Date.now());
            }
        }
        this.triggerDiagnostics();
    }
    has(uri) {
        return this.uris.has(uri);
    }
    triggerDiagnostics(delay = 200) {
        this.diagnosticDelayer.trigger(() => {
            this.sendPendingDiagnostics();
        }, delay);
    }
    requestAllDiagnostics() {
        for (const uri of this.uris) {
            if (this.shouldValidate(uri)) {
                this.pendingDiagnostics.set(uri, Date.now());
            }
        }
        this.diagnosticDelayer.trigger(() => {
            this.sendPendingDiagnostics();
        }, 200);
    }
    requestDiagnostic(uri) {
        let document = coc_nvim_1.workspace.getDocument(uri);
        if (!document || !this.shouldValidate(uri))
            return false;
        this.pendingDiagnostics.set(uri, Date.now());
        const lineCount = document.lineCount;
        const delay = Math.min(Math.max(Math.ceil(lineCount / 20), 300), 800);
        this.triggerDiagnostics(delay);
        return true;
    }
    hasPendingDiagnostics(uri) {
        return this.pendingDiagnostics.has(uri);
    }
    sendPendingDiagnostics() {
        const uris = Array.from(this.pendingDiagnostics.entries())
            .sort((a, b) => a[1] - b[1])
            .map(entry => entry[0]);
        // Add all open TS buffers to the geterr request. They might be visible
        for (const uri of this.uris) {
            if (uris.indexOf(uri) == -1) {
                uris.push(uri);
            }
        }
        let files = uris.map(uri => this.client.toPath(uri));
        if (files.length) {
            if (this.pendingGetErr)
                this.pendingGetErr.cancel();
            const getErr = this.pendingGetErr = GetErrRequest.executeGetErrRequest(this.client, files, () => {
                if (this.pendingGetErr === getErr) {
                    this.pendingGetErr = undefined;
                }
            });
        }
        this.pendingDiagnostics.clear();
    }
    updateConfiguration() {
        const jsConfig = coc_nvim_1.workspace.getConfiguration('javascript', null);
        const tsConfig = coc_nvim_1.workspace.getConfiguration('typescript', null);
        this._validateJavaScript = jsConfig.get('validate.enable', true);
        this._validateTypeScript = tsConfig.get('validate.enable', true);
    }
    shouldValidate(uri) {
        let doc = coc_nvim_1.workspace.getDocument(uri);
        if (!doc)
            return false;
        if (languageModeIds.languageIds.indexOf(doc.filetype) == -1) {
            return false;
        }
        if (doc.filetype.startsWith('javascript')) {
            return this._validateJavaScript;
        }
        return this._validateTypeScript;
    }
}
exports.default = BufferSyncSupport;
class GetErrRequest {
    constructor(client, files, _token, onDone) {
        this.files = files;
        this._token = _token;
        this._done = false;
        const args = {
            delay: 0,
            files: this.files
        };
        const done = () => {
            if (this._done) {
                return;
            }
            this._done = true;
            onDone();
        };
        client.executeAsync('geterr', args, _token.token).then(done, done);
    }
    static executeGetErrRequest(client, files, onDone) {
        const token = new vscode_languageserver_protocol_1.CancellationTokenSource();
        return new GetErrRequest(client, files, token, onDone);
    }
    cancel() {
        if (!this._done) {
            this._token.cancel();
        }
        this._token.dispose();
    }
}


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Delayer {
    constructor(defaultDelay) {
        this.defaultDelay = defaultDelay;
        this.timeout = null;
        this.completionPromise = null;
        this.onSuccess = null;
        this.task = null;
    }
    trigger(task, delay = this.defaultDelay) {
        this.task = task;
        if (delay >= 0) {
            this.cancelTimeout();
        }
        if (!this.completionPromise) {
            this.completionPromise = new Promise(resolve => {
                this.onSuccess = resolve;
            }).then(() => {
                this.completionPromise = null;
                this.onSuccess = null;
                let result = this.task && this.task();
                this.task = null;
                return result;
            });
        }
        if (delay >= 0 || this.timeout === null) {
            this.timeout = setTimeout(() => {
                this.timeout = null;
                if (this.onSuccess) {
                    this.onSuccess(undefined);
                }
            }, delay >= 0 ? delay : this.defaultDelay);
        }
        return this.completionPromise;
    }
    cancelTimeout() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
}
exports.Delayer = Delayer;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const resourceMap_1 = __webpack_require__(95);
class DiagnosticSet {
    constructor() {
        this._map = new resourceMap_1.ResourceMap();
    }
    set(uri, diagnostics) {
        this._map.set(uri, diagnostics);
    }
    get(uri) {
        return this._map.get(uri) || [];
    }
    clear() {
        this._map = new resourceMap_1.ResourceMap();
    }
}
exports.DiagnosticSet = DiagnosticSet;
var DiagnosticKind;
(function (DiagnosticKind) {
    DiagnosticKind[DiagnosticKind["Syntax"] = 0] = "Syntax";
    DiagnosticKind[DiagnosticKind["Semantic"] = 1] = "Semantic";
    DiagnosticKind[DiagnosticKind["Suggestion"] = 2] = "Suggestion";
})(DiagnosticKind = exports.DiagnosticKind || (exports.DiagnosticKind = {}));
const allDiagnosticKinds = [
    DiagnosticKind.Syntax,
    DiagnosticKind.Semantic,
    DiagnosticKind.Suggestion
];
class DiagnosticsManager {
    constructor() {
        this._diagnostics = new Map();
        this._pendingUpdates = new resourceMap_1.ResourceMap();
        this._enableJavascriptSuggestions = true;
        this._enableTypescriptSuggestions = true;
        this.updateDelay = 200;
        for (const kind of allDiagnosticKinds) {
            this._diagnostics.set(kind, new DiagnosticSet());
        }
        this._currentDiagnostics = coc_nvim_1.languages.createDiagnosticCollection('tsserver');
    }
    dispose() {
        this._currentDiagnostics.dispose();
        for (const value of this._pendingUpdates.values) {
            clearTimeout(value);
        }
        this._pendingUpdates = new resourceMap_1.ResourceMap();
    }
    reInitialize() {
        this._currentDiagnostics.clear();
        for (const diagnosticSet of this._diagnostics.values()) {
            diagnosticSet.clear();
        }
    }
    setEnableSuggestions(languageId, value) {
        let curr = languageId == 'javascript' ? this._enableJavascriptSuggestions : this._enableTypescriptSuggestions;
        if (curr == value) {
            return;
        }
        if (languageId == 'javascript') {
            this._enableJavascriptSuggestions = value;
        }
        else {
            this._enableTypescriptSuggestions = value;
        }
    }
    diagnosticsReceived(kind, uri, diagnostics) {
        const collection = this._diagnostics.get(kind);
        if (!collection)
            return;
        if (diagnostics.length === 0) {
            const existing = collection.get(uri);
            if (existing.length === 0) {
                // No need to update
                return;
            }
        }
        collection.set(uri, diagnostics);
        this.scheduleDiagnosticsUpdate(uri);
    }
    configFileDiagnosticsReceived(uri, diagnostics) {
        this._currentDiagnostics.set(uri, diagnostics);
    }
    delete(uri) {
        this._currentDiagnostics.delete(uri);
    }
    getDiagnostics(uri) {
        return this._currentDiagnostics.get(uri) || [];
        return [];
    }
    scheduleDiagnosticsUpdate(uri) {
        if (!this._pendingUpdates.has(uri)) {
            this._pendingUpdates.set(uri, setTimeout(() => this.updateCurrentDiagnostics(uri), this.updateDelay));
        }
    }
    updateCurrentDiagnostics(uri) {
        if (this._pendingUpdates.has(uri)) {
            clearTimeout(this._pendingUpdates.get(uri));
            this._pendingUpdates.delete(uri);
        }
        const allDiagnostics = [
            ...this._diagnostics.get(DiagnosticKind.Syntax).get(uri),
            ...this._diagnostics.get(DiagnosticKind.Semantic).get(uri),
            ...this.getSuggestionDiagnostics(uri)
        ];
        this._currentDiagnostics.set(uri, allDiagnostics);
    }
    getSuggestionDiagnostics(uri) {
        const enabled = this.suggestionsEnabled(uri);
        return this._diagnostics
            .get(DiagnosticKind.Suggestion)
            .get(uri)
            .filter(x => {
            if (!enabled) {
                // Still show unused
                return x.tags && x.tags.includes(1);
            }
            return enabled;
        });
    }
    suggestionsEnabled(uri) {
        let doc = coc_nvim_1.workspace.getDocument(uri);
        if (!doc)
            return false;
        if (doc.filetype.startsWith('javascript')) {
            return this._enableJavascriptSuggestions;
        }
        if (doc.filetype.startsWith('typescript')) {
            return this._enableTypescriptSuggestions;
        }
        return true;
    }
}
exports.DiagnosticsManager = DiagnosticsManager;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Maps of file resources
 *
 * Attempts to handle correct mapping on both case sensitive and case in-sensitive
 * file systems.
 */
class ResourceMap {
    constructor(_normalizePath) {
        this._normalizePath = _normalizePath;
        this._map = new Map();
    }
    has(resource) {
        const file = this.toKey(resource);
        return !!file && this._map.has(file);
    }
    get(resource) {
        const file = this.toKey(resource);
        return file ? this._map.get(file) : undefined;
    }
    set(resource, value) {
        const file = this.toKey(resource);
        if (file) {
            this._map.set(file, value);
        }
    }
    delete(resource) {
        const file = this.toKey(resource);
        if (file) {
            this._map.delete(file);
        }
    }
    get values() {
        return this._map.values();
    }
    get keys() {
        return this._map.keys();
    }
    toKey(resource) {
        const key = this._normalizePath
            ? this._normalizePath(resource)
            : resource;
        if (!key) {
            return key;
        }
        return this.isCaseInsensitivePath(key) ? key.toLowerCase() : key;
    }
    isCaseInsensitivePath(path) {
        if (isWindowsPath(path)) {
            return true;
        }
        return path[0] === '/' && this.onIsCaseInsenitiveFileSystem;
    }
    get onIsCaseInsenitiveFileSystem() {
        if (process.platform === 'win32') {
            return true;
        }
        if (process.platform === 'darwin') {
            return true;
        }
        return false;
    }
}
exports.ResourceMap = ResourceMap;
function isWindowsPath(path) {
    return /^[a-zA-Z]:\\/.test(path);
}
exports.isWindowsPath = isWindowsPath;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const coc_nvim_1 = __webpack_require__(1);
const typingsInstallTimeout = 30 * 1000;
class TypingsStatus {
    constructor(client) {
        this._acquiringTypings = Object.create({});
        this._subscriptions = [];
        this._client = client;
        this._subscriptions.push(this._client.onDidBeginInstallTypings(event => this.onBeginInstallTypings(event.eventId)));
        this._subscriptions.push(this._client.onDidEndInstallTypings(event => this.onEndInstallTypings(event.eventId)));
    }
    dispose() {
        this._subscriptions.forEach(x => x.dispose());
        for (const eventId of Object.keys(this._acquiringTypings)) {
            clearTimeout(this._acquiringTypings[eventId]);
        }
    }
    get isAcquiringTypings() {
        return Object.keys(this._acquiringTypings).length > 0;
    }
    onBeginInstallTypings(eventId) {
        if (this._acquiringTypings[eventId]) {
            return;
        }
        this._acquiringTypings[eventId] = setTimeout(() => {
            this.onEndInstallTypings(eventId);
        }, typingsInstallTimeout);
    }
    onEndInstallTypings(eventId) {
        const timer = this._acquiringTypings[eventId];
        if (timer) {
            clearTimeout(timer);
        }
        delete this._acquiringTypings[eventId];
    }
}
exports.default = TypingsStatus;
class AtaProgressReporter {
    constructor(client) {
        this._promises = new Map();
        this._invalid = false;
        this.statusItem = coc_nvim_1.workspace.createStatusBarItem(10, { progress: true });
        const disposables = [];
        disposables.push(client.onDidBeginInstallTypings(e => this._onBegin(e.eventId)));
        disposables.push(client.onDidEndInstallTypings(e => this._onEndOrTimeout(e.eventId)));
        disposables.push(client.onTypesInstallerInitializationFailed(_ => this.onTypesInstallerInitializationFailed()));
        this._disposable = vscode_languageserver_protocol_1.Disposable.create(() => {
            disposables.forEach(disposable => {
                disposable.dispose();
            });
        });
    }
    dispose() {
        this._disposable.dispose();
        this._promises.forEach(value => value());
    }
    _onBegin(eventId) {
        const handle = setTimeout(() => this._onEndOrTimeout(eventId), typingsInstallTimeout);
        new Promise(resolve => {
            this._promises.set(eventId, () => {
                clearTimeout(handle);
                resolve();
            });
        });
        this.statusItem.text = 'Fetching data for better TypeScript IntelliSense';
        this.statusItem.show();
    }
    _onEndOrTimeout(eventId) {
        this.statusItem.hide();
        const resolve = this._promises.get(eventId);
        if (resolve) {
            this._promises.delete(eventId);
            resolve();
        }
    }
    onTypesInstallerInitializationFailed() {
        this.statusItem.hide();
        if (!this._invalid) {
            coc_nvim_1.workspace.showMessage('Could not install typings files for JavaScript language features. Please ensure that NPM is installed', 'error');
        }
        this._invalid = true;
    }
}
exports.AtaProgressReporter = AtaProgressReporter;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const vscode_languageserver_protocol_1 = __webpack_require__(3);
const typeConverters = __importStar(__webpack_require__(35));
const vscode_languageserver_types_1 = __webpack_require__(18);
const modules_1 = __webpack_require__(75);
const helper_1 = __webpack_require__(59);
class ReloadProjectsCommand {
    constructor(client) {
        this.client = client;
        this.id = 'tsserver.reloadProjects';
    }
    execute() {
        this.client.reloadProjects();
        coc_nvim_1.workspace.showMessage('projects reloaded');
    }
}
exports.ReloadProjectsCommand = ReloadProjectsCommand;
class OpenTsServerLogCommand {
    constructor(client) {
        this.client = client;
        this.id = 'tsserver.openTsServerLog';
    }
    execute() {
        this.client.serviceClient.openTsServerLogFile(); // tslint:disable-line
    }
}
exports.OpenTsServerLogCommand = OpenTsServerLogCommand;
class TypeScriptGoToProjectConfigCommand {
    constructor(client) {
        this.client = client;
        this.id = 'tsserver.goToProjectConfig';
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = yield coc_nvim_1.workspace.document;
            yield goToProjectConfig(this.client, doc.uri);
        });
    }
}
exports.TypeScriptGoToProjectConfigCommand = TypeScriptGoToProjectConfigCommand;
function goToProjectConfig(clientHost, uri) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!clientHost.handles(uri)) {
            coc_nvim_1.workspace.showMessage('Could not determine TypeScript or JavaScript project. Unsupported file type', 'warning');
            return;
        }
        const client = clientHost.serviceClient;
        const file = client.toPath(uri);
        let res;
        try {
            res = yield client.execute('projectInfo', { file, needFileNameList: false }, vscode_languageserver_protocol_1.CancellationToken.None);
        }
        catch (_a) {
            // noop
        }
        if (!res || !res.body) {
            coc_nvim_1.workspace.showMessage('Could not determine TypeScript or JavaScript project.', 'warning');
            return;
        }
        const { configFileName } = res.body;
        if (configFileName && !isImplicitProjectConfigFile(configFileName)) {
            yield coc_nvim_1.workspace.openResource(coc_nvim_1.Uri.file(configFileName).toString());
            return;
        }
        coc_nvim_1.workspace.showMessage('Config file not found', 'warning');
    });
}
function isImplicitProjectConfigFile(configFileName) {
    return configFileName.indexOf('/dev/null/') === 0;
}
const autoFixableDiagnosticCodes = new Set([
    2420,
    2552,
    2304,
]);
class AutoFixCommand {
    constructor(client) {
        this.client = client;
        this.id = 'tsserver.executeAutofix';
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let document = yield coc_nvim_1.workspace.document;
            if (!this.client.handles(document.uri)) {
                coc_nvim_1.workspace.showMessage('Document is not handled by tsserver.', 'warning');
                return;
            }
            let file = this.client.serviceClient.toPath(document.uri);
            let diagnostics = coc_nvim_1.diagnosticManager.getDiagnostics(document.uri);
            let missingDiagnostics = diagnostics.filter(o => o.code == 2307);
            if (missingDiagnostics.length) {
                let names = missingDiagnostics.map(o => {
                    let ms = o.message.match(/module\s'(.+)'\./);
                    return ms ? ms[1] : null;
                });
                names = names.filter(s => s != null);
                if (names.length) {
                    modules_1.installModules(document.uri, names).catch(e => {
                        console.error(e.message); // tslint:disable-line
                    });
                }
            }
            diagnostics = diagnostics.filter(x => autoFixableDiagnosticCodes.has(x.code));
            if (diagnostics.length == 0)
                return;
            diagnostics = diagnostics.reduce((arr, curr) => {
                if (curr.code == 2304 && arr.findIndex(o => o.message == curr.message) != -1)
                    return arr;
                arr.push(curr);
                return arr;
            }, []);
            let client = this.client.serviceClient;
            let edits = [];
            let command;
            let names = [];
            for (let diagnostic of diagnostics) {
                const args = Object.assign({}, typeConverters.Range.toFileRangeRequestArgs(file, diagnostic.range), { errorCodes: [+(diagnostic.code)] });
                const response = yield client.execute('getCodeFixes', args, vscode_languageserver_protocol_1.CancellationToken.None);
                if (response.type !== 'response' || !response.body || response.body.length < 1) {
                    if (diagnostic.code == 2304) {
                        let { range } = diagnostic;
                        let line = document.getline(range.start.line);
                        let name = line.slice(range.start.character, range.end.character);
                        if (helper_1.nodeModules.indexOf(name) !== -1 && names.indexOf(name) == -1) {
                            names.push(name);
                            edits.push({
                                range: vscode_languageserver_types_1.Range.create(0, 0, 0, 0),
                                newText: `import ${name} from '${name}'\n`
                            });
                            command = 'tsserver.organizeImports';
                        }
                    }
                    continue;
                }
                const fix = response.body[0];
                for (let change of fix.changes) {
                    if (change.fileName != file)
                        continue;
                    // change.fileName
                    for (let ch of change.textChanges) {
                        edits.push({
                            range: typeConverters.Range.fromTextSpan(ch),
                            newText: ch.newText
                        });
                    }
                }
            }
            if (edits.length)
                yield document.applyEdits(coc_nvim_1.workspace.nvim, edits);
            if (command)
                coc_nvim_1.commands.executeCommand(command);
        });
    }
}
exports.AutoFixCommand = AutoFixCommand;
class ConfigurePluginCommand {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        this.id = '_typescript.configurePlugin';
    }
    execute(pluginId, configuration) {
        this.pluginManager.setConfiguration(pluginId, configuration);
    }
}
exports.ConfigurePluginCommand = ConfigurePluginCommand;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const arrays = __importStar(__webpack_require__(47));
const vscode_languageserver_protocol_1 = __webpack_require__(3);
var TypeScriptServerPlugin;
(function (TypeScriptServerPlugin) {
    function equals(a, b) {
        return a.path === b.path
            && a.name === b.name
            && a.enableForWorkspaceTypeScriptVersions === b.enableForWorkspaceTypeScriptVersions
            && arrays.equals(a.languages, b.languages);
    }
    TypeScriptServerPlugin.equals = equals;
})(TypeScriptServerPlugin || (TypeScriptServerPlugin = {}));
class PluginManager {
    constructor() {
        this._pluginConfigurations = new Map();
        this._disposables = [];
        this._onDidUpdatePlugins = this._register(new vscode_languageserver_protocol_1.Emitter());
        this.onDidChangePlugins = this._onDidUpdatePlugins.event;
        this._onDidUpdateConfig = this._register(new vscode_languageserver_protocol_1.Emitter());
        this.onDidUpdateConfig = this._onDidUpdateConfig.event;
        let loadPlugins = () => {
            if (!this._plugins) {
                return;
            }
            const newPlugins = this.readPlugins();
            if (!arrays.equals(arrays.flatten(Array.from(this._plugins.values())), arrays.flatten(Array.from(newPlugins.values())), TypeScriptServerPlugin.equals)) {
                this._plugins = newPlugins;
                this._onDidUpdatePlugins.fire(this);
            }
        };
        coc_nvim_1.extensions.onDidActiveExtension(loadPlugins, undefined, this._disposables);
        coc_nvim_1.extensions.onDidUnloadExtension(loadPlugins, undefined, this._disposables);
    }
    dispose() {
        coc_nvim_1.disposeAll(this._disposables);
    }
    get plugins() {
        if (!this._plugins) {
            this._plugins = this.readPlugins();
        }
        return arrays.flatten(Array.from(this._plugins.values()));
    }
    _register(value) {
        this._disposables.push(value);
        return value;
    }
    setConfiguration(pluginId, config) {
        this._pluginConfigurations.set(pluginId, config);
        this._onDidUpdateConfig.fire({ pluginId, config });
    }
    configurations() {
        return this._pluginConfigurations.entries();
    }
    readPlugins() {
        const pluginMap = new Map();
        for (const extension of coc_nvim_1.extensions.all) {
            const pack = extension.packageJSON;
            if (pack.contributes && Array.isArray(pack.contributes.typescriptServerPlugins)) {
                const plugins = [];
                for (const plugin of pack.contributes.typescriptServerPlugins) {
                    plugins.push({
                        name: plugin.name,
                        enableForWorkspaceTypeScriptVersions: !!plugin.enableForWorkspaceTypeScriptVersions,
                        path: extension.extensionPath,
                        languages: Array.isArray(plugin.languages) ? plugin.languages : [],
                    });
                }
                if (plugins.length) {
                    pluginMap.set(extension.id, plugins);
                }
            }
        }
        return pluginMap;
    }
}
exports.PluginManager = PluginManager;


/***/ })
/******/ ])));