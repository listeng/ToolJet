// Generated by dts-bundle-generator v6.7.0

declare type PyProxyCache = {
	cacheId: number;
	refcnt: number;
	leaked?: boolean;
};
declare type PyProxyProps = {
	/**
	 * captureThis tracks whether this should be passed as the first argument to
	 * the Python function or not. We keep it false by default. To make a PyProxy
	 * where the ``this`` argument is included, call the :js:meth:`captureThis` method.
	 */
	captureThis: boolean;
	/**
	 * isBound tracks whether bind has been called
	 */
	isBound: boolean;
	/**
	 * the ``this`` value that has been bound to the PyProxy
	 */
	boundThis?: any;
	/**
	 * Any extra arguments passed to bind are used for partial function
	 * application. These are stored here.
	 */
	boundArgs: any[];
	roundtrip: boolean;
};
interface PyProxy {
	[x: string]: any;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` is an object that allows idiomatic use of a Python object from
 * JavaScript. See :ref:`type-translations-pyproxy`.
 */
declare class PyProxy {
	/** @private */
	$$: {
		ptr: number;
		cache: PyProxyCache;
		destroyed_msg?: string;
	};
	/** @private */
	$$props: PyProxyProps;
	/** @private */
	$$flags: number;
	/**
	 * @private
	 * @hideconstructor
	 */
	constructor();
	/** @private */
	get [Symbol.toStringTag](): string;
	/**
	 * The name of the type of the object.
	 *
	 * Usually the value is ``"module.name"`` but for builtins or
	 * interpreter-defined types it is just ``"name"``. As pseudocode this is:
	 *
	 * .. code-block:: python
	 *
	 *    ty = type(x)
	 *    if ty.__module__ == 'builtins' or ty.__module__ == "__main__":
	 *        return ty.__name__
	 *    else:
	 *        ty.__module__ + "." + ty.__name__
	 *
	 */
	get type(): string;
	toString(): string;
	/**
	 * Destroy the :js:class:`~pyodide.ffi.PyProxy`. This will release the memory. Any further attempt
	 * to use the object will raise an error.
	 *
	 * In a browser supporting :js:data:`FinalizationRegistry`, Pyodide will
	 * automatically destroy the :js:class:`~pyodide.ffi.PyProxy` when it is garbage collected, however
	 * there is no guarantee that the finalizer will be run in a timely manner so
	 * it is better to destroy the proxy explicitly.
	 *
	 * @param options
	 * @param options.message The error message to print if use is attempted after
	 *        destroying. Defaults to "Object has already been destroyed".
	 *
	 */
	destroy(options?: {
		message?: string;
		destroyRoundtrip?: boolean;
	}): void;
	/**
	 * Make a new :js:class:`~pyodide.ffi.PyProxy` pointing to the same Python object.
	 * Useful if the :js:class:`~pyodide.ffi.PyProxy` is destroyed somewhere else.
	 */
	copy(): PyProxy;
	/**
	 * Converts the :js:class:`~pyodide.ffi.PyProxy` into a JavaScript object as best as possible. By
	 * default does a deep conversion, if a shallow conversion is desired, you can
	 * use ``proxy.toJs({depth : 1})``. See :ref:`Explicit Conversion of PyProxy
	 * <type-translations-pyproxy-to-js>` for more info.
	 * @param options
	 * @return The JavaScript object resulting from the conversion.
	 */
	toJs({ depth, pyproxies, create_pyproxies, dict_converter, default_converter, }?: {
		/** How many layers deep to perform the conversion. Defaults to infinite */
		depth?: number;
		/**
		 * If provided, :js:meth:`toJs` will store all PyProxies created in this
		 * list. This allows you to easily destroy all the PyProxies by iterating
		 * the list without having to recurse over the generated structure. The most
		 * common use case is to create a new empty list, pass the list as
		 * ``pyproxies``, and then later iterate over ``pyproxies`` to destroy all of
		 * created proxies.
		 */
		pyproxies?: PyProxy[];
		/**
		 * If false, :js:meth:`toJs` will throw a
		 * :py:exc:`~pyodide.ffi.ConversionError` rather than producing a
		 * :js:class:`~pyodide.ffi.PyProxy`.
		 */
		create_pyproxies?: boolean;
		/**
		 * A function to be called on an iterable of pairs ``[key, value]``. Convert
		 * this iterable of pairs to the desired output. For instance,
		 * :js:func:`Object.fromEntries` would convert the dict to an object,
		 * :js:func:`Array.from` converts it to an :js:class:`Array` of pairs, and
		 * ``(it) => new Map(it)`` converts it to a :js:class:`Map` (which is the
		 * default behavior).
		 */
		dict_converter?: (array: Iterable<[
			key: string,
			value: any
		]>) => any;
		/**
		 * Optional argument to convert objects with no default conversion. See the
		 * documentation of :meth:`~pyodide.ffi.to_js`.
		 */
		default_converter?: (obj: PyProxy, convert: (obj: PyProxy) => any, cacheConversion: (obj: PyProxy, result: any) => void) => any;
	}): any;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a :js:class:`~pyodide.ffi.PyProxyWithLength`.
	 * @deprecated Use ``obj instanceof pyodide.ffi.PyProxyWithLength`` instead.
	 */
	supportsLength(): this is PyProxyWithLength;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a :js:class:`~pyodide.ffi.PyProxyWithGet`.
	 * @deprecated Use ``obj instanceof pyodide.ffi.PyProxyWithGet`` instead.
	 */
	supportsGet(): this is PyProxyWithGet;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a :js:class:`~pyodide.ffi.PyProxyWithSet`.
	 * @deprecated Use ``obj instanceof pyodide.ffi.PyProxyWithSet`` instead.
	 */
	supportsSet(): this is PyProxyWithSet;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a :js:class:`~pyodide.ffi.PyProxyWithHas`.
	 * @deprecated Use ``obj instanceof pyodide.ffi.PyProxyWithHas`` instead.
	 */
	supportsHas(): this is PyProxyWithHas;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a
	 * :js:class:`~pyodide.ffi.PyIterable`.
	 * @deprecated Use ``obj instanceof pyodide.ffi.PyIterable`` instead.
	 */
	isIterable(): this is PyIterable;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a
	 * :js:class:`~pyodide.ffi.PyIterator`
	 * @deprecated Use ``obj instanceof pyodide.ffi.PyIterator`` instead.
	 */
	isIterator(): this is PyIterator;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a :js:class:`~pyodide.ffi.PyAwaitable`
	 * @deprecated Use :js:class:`obj instanceof pyodide.ffi.PyAwaitable <pyodide.ffi.PyAwaitable>` instead.
	 */
	isAwaitable(): this is PyAwaitable;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a :js:class:`~pyodide.ffi.PyBuffer`.
	 * @deprecated Use ``obj instanceof pyodide.ffi.PyBuffer`` instead.
	 */
	isBuffer(): this is PyBuffer;
	/**
	 * Check whether the :js:class:`~pyodide.ffi.PyProxy` is a :js:class:`~pyodide.ffi.PyCallable`.
	 * @deprecated ``obj instanceof pyodide.ffi.PyCallable`` instead.
	 */
	isCallable(): this is PyCallable;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object has a :meth:`~object.__len__`
 * method.
 */
declare class PyProxyWithLength extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyProxyWithLength extends PyLengthMethods {
}
declare class PyLengthMethods {
	/**
	 * The length of the object.
	 */
	get length(): number;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object has a
 * :meth:`~object.__getitem__` method.
 */
declare class PyProxyWithGet extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyProxyWithGet extends PyGetItemMethods {
}
declare class PyGetItemMethods {
	/**
	 * This translates to the Python code ``obj[key]``.
	 *
	 * @param key The key to look up.
	 * @returns The corresponding value.
	 */
	get(key: any): any;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object has a
 * :meth:`~object.__setitem__` or :meth:`~object.__delitem__` method.
 */
declare class PyProxyWithSet extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyProxyWithSet extends PySetItemMethods {
}
declare class PySetItemMethods {
	/**
	 * This translates to the Python code ``obj[key] = value``.
	 *
	 * @param key The key to set.
	 * @param value The value to set it to.
	 */
	set(key: any, value: any): void;
	/**
	 * This translates to the Python code ``del obj[key]``.
	 *
	 * @param key The key to delete.
	 */
	delete(key: any): void;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object has a
 * :meth:`~object.__contains__` method.
 */
declare class PyProxyWithHas extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyProxyWithHas extends PyContainsMethods {
}
declare class PyContainsMethods {
	/**
	 * This translates to the Python code ``key in obj``.
	 *
	 * @param key The key to check for.
	 * @returns Is ``key`` present?
	 */
	has(key: any): boolean;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is :std:term:`iterable`
 * (i.e., it has an :meth:`~object.__iter__` method).
 */
declare class PyIterable extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyIterable extends PyIterableMethods {
}
declare class PyIterableMethods {
	/**
	 * This translates to the Python code ``iter(obj)``. Return an iterator
	 * associated to the proxy. See the documentation for
	 * :js:data:`Symbol.iterator`.
	 *
	 * This will be used implicitly by ``for(let x of proxy){}``.
	 */
	[Symbol.iterator](): Iterator<any, any, any>;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is :std:term:`asynchronous
 * iterable` (i.e., has an :meth:`~object.__aiter__` method).
 */
declare class PyAsyncIterable extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyAsyncIterable extends PyAsyncIterableMethods {
}
declare class PyAsyncIterableMethods {
	/**
	 * This translates to the Python code ``aiter(obj)``. Return an async iterator
	 * associated to the proxy. See the documentation for :js:data:`Symbol.asyncIterator`.
	 *
	 * This will be used implicitly by ``for(await let x of proxy){}``.
	 */
	[Symbol.asyncIterator](): AsyncIterator<any, any, any>;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is an :term:`iterator`
 * (i.e., has a :meth:`~generator.send` or :meth:`~iterator.__next__` method).
 */
declare class PyIterator extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyIterator extends PyIteratorMethods {
}
declare class PyIteratorMethods {
	/** @private */
	[Symbol.iterator](): this;
	/**
	 * This translates to the Python code ``next(obj)``. Returns the next value of
	 * the generator. See the documentation for :js:meth:`Generator.next` The
	 * argument will be sent to the Python generator.
	 *
	 * This will be used implicitly by ``for(let x of proxy){}``.
	 *
	 * @param any The value to send to the generator. The value will be assigned
	 * as a result of a yield expression.
	 * @returns An Object with two properties: ``done`` and ``value``. When the
	 * generator yields ``some_value``, ``next`` returns ``{done : false, value :
	 * some_value}``. When the generator raises a :py:exc:`StopIteration`
	 * exception, ``next`` returns ``{done : true, value : result_value}``.
	 */
	next(arg?: any): IteratorResult<any, any>;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is a :std:term:`generator`
 * (i.e., it is an instance of :py:class:`~collections.abc.Generator`).
 */
declare class PyGenerator extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyGenerator extends PyGeneratorMethods {
}
declare class PyGeneratorMethods {
	/**
	 * Throws an exception into the Generator.
	 *
	 * See the documentation for :js:meth:`Generator.throw`.
	 *
	 * @param exception Error The error to throw into the generator. Must be an
	 * instanceof ``Error``.
	 * @returns An Object with two properties: ``done`` and ``value``. When the
	 * generator yields ``some_value``, ``return`` returns ``{done : false, value
	 * : some_value}``. When the generator raises a
	 * ``StopIteration(result_value)`` exception, ``return`` returns ``{done :
	 * true, value : result_value}``.
	 */
	throw(exc: any): IteratorResult<any, any>;
	/**
	 * Throws a :py:exc:`GeneratorExit` into the generator and if the
	 * :py:exc:`GeneratorExit` is not caught returns the argument value ``{done:
	 * true, value: v}``. If the generator catches the :py:exc:`GeneratorExit` and
	 * returns or yields another value the next value of the generator this is
	 * returned in the normal way. If it throws some error other than
	 * :py:exc:`GeneratorExit` or :py:exc:`StopIteration`, that error is propagated. See
	 * the documentation for :js:meth:`Generator.return`.
	 *
	 * @param any The value to return from the generator.
	 * @returns An Object with two properties: ``done`` and ``value``. When the
	 * generator yields ``some_value``, ``return`` returns ``{done : false, value
	 * : some_value}``. When the generator raises a
	 * ``StopIteration(result_value)`` exception, ``return`` returns ``{done :
	 * true, value : result_value}``.
	 */
	return(v: any): IteratorResult<any, any>;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is an
 * :std:term:`asynchronous iterator`
 */
declare class PyAsyncIterator extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyAsyncIterator extends PyAsyncIteratorMethods {
}
declare class PyAsyncIteratorMethods {
	/** @private */
	[Symbol.asyncIterator](): this;
	/**
	 * This translates to the Python code ``anext(obj)``. Returns the next value
	 * of the asynchronous iterator. The argument will be sent to the Python
	 * iterator (if it's a generator for instance).
	 *
	 * This will be used implicitly by ``for(let x of proxy){}``.
	 *
	 * @param any The value to send to a generator. The value will be assigned as
	 * a result of a yield expression.
	 * @returns An Object with two properties: ``done`` and ``value``. When the
	 * iterator yields ``some_value``, ``next`` returns ``{done : false, value :
	 * some_value}``. When the giterator is done, ``next`` returns
	 * ``{done : true }``.
	 */
	next(arg?: any): Promise<IteratorResult<any, any>>;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is an
 * :std:term:`asynchronous generator` (i.e., it is an instance of
 * :py:class:`~collections.abc.AsyncGenerator`)
 */
declare class PyAsyncGenerator extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyAsyncGenerator extends PyAsyncGeneratorMethods {
}
declare class PyAsyncGeneratorMethods {
	/**
	 * Throws an exception into the Generator.
	 *
	 * See the documentation for :js:meth:`AsyncGenerator.throw`.
	 *
	 * @param exception Error The error to throw into the generator. Must be an
	 * instanceof ``Error``.
	 * @returns An Object with two properties: ``done`` and ``value``. When the
	 * generator yields ``some_value``, ``return`` returns ``{done : false, value
	 * : some_value}``. When the generator raises a
	 * ``StopIteration(result_value)`` exception, ``return`` returns ``{done :
	 * true, value : result_value}``.
	 */
	throw(exc: any): Promise<IteratorResult<any, any>>;
	/**
	 * Throws a :py:exc:`GeneratorExit` into the generator and if the
	 * :py:exc:`GeneratorExit` is not caught returns the argument value ``{done:
	 * true, value: v}``. If the generator catches the :py:exc:`GeneratorExit` and
	 * returns or yields another value the next value of the generator this is
	 * returned in the normal way. If it throws some error other than
	 * :py:exc:`GeneratorExit` or :py:exc:`StopAsyncIteration`, that error is
	 * propagated. See the documentation for :js:meth:`AsyncGenerator.throw`
	 *
	 * @param any The value to return from the generator.
	 * @returns An Object with two properties: ``done`` and ``value``. When the
	 * generator yields ``some_value``, ``return`` returns ``{done : false, value
	 * : some_value}``. When the generator raises a :py:exc:`StopAsyncIteration`
	 * exception, ``return`` returns ``{done : true, value : result_value}``.
	 */
	return(v: any): Promise<IteratorResult<any, any>>;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is :ref:`awaitable
 * <asyncio-awaitables>` (i.e., has an :meth:`~object.__await__` method).
 */
declare class PyAwaitable extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyAwaitable extends Promise<any> {
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is
 * :std:term:`callable` (i.e., has an :py:meth:`~operator.__call__` method).
 */
declare class PyCallable extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyCallable;
}
interface PyCallable extends PyCallableMethods {
	(...args: any[]): any;
}
declare class PyCallableMethods {
	/**
	 * The ``apply()`` method calls the specified function with a given this
	 * value, and arguments provided as an array (or an array-like object). Like
	 * :js:meth:`Function.apply`.
	 *
	 * @param thisArg The ``this`` argument. Has no effect unless the
	 * :js:class:`~pyodide.ffi.PyCallable` has :js:meth:`captureThis` set. If
	 * :js:meth:`captureThis` is set, it will be passed as the first argument to
	 * the Python function.
	 * @param jsargs The array of arguments
	 * @returns The result from the function call.
	 */
	apply(thisArg: any, jsargs: any): any;
	/**
	 * Calls the function with a given this value and arguments provided
	 * individually. See :js:meth:`Function.call`.
	 *
	 * @param thisArg The ``this`` argument. Has no effect unless the
	 * :js:class:`~pyodide.ffi.PyCallable` has :js:meth:`captureThis` set. If
	 * :js:meth:`captureThis` is set, it will be passed as the first argument to
	 * the Python function.
	 * @param jsargs The arguments
	 * @returns The result from the function call.
	 */
	call(thisArg: any, ...jsargs: any): any;
	/**
	 * Call the function with key word arguments. The last argument must be an
	 * object with the keyword arguments.
	 */
	callKwargs(...jsargs: any): any;
	/**
	 * The ``bind()`` method creates a new function that, when called, has its
	 * ``this`` keyword set to the provided value, with a given sequence of
	 * arguments preceding any provided when the new function is called. See
	 * :js:meth:`Function.bind`.
	 *
	 * If the :js:class:`~pyodide.ffi.PyCallable` does not have
	 * :js:meth:`captureThis` set, the ``this`` parameter will be discarded. If it
	 * does have :js:meth:`captureThis` set, ``thisArg`` will be set to the first
	 * argument of the Python function. The returned proxy and the original proxy
	 * have the same lifetime so destroying either destroys both.
	 *
	 * @param thisArg The value to be passed as the ``this`` parameter to the
	 * target function ``func`` when the bound function is called.
	 * @param jsargs Extra arguments to prepend to arguments provided to the bound
	 * function when invoking ``func``.
	 * @returns
	 */
	bind(thisArg: any, ...jsargs: any): PyProxy;
	/**
	 * Returns a :js:class:`~pyodide.ffi.PyProxy` that passes ``this`` as the first argument to the
	 * Python function. The returned :js:class:`~pyodide.ffi.PyProxy` has the internal ``captureThis``
	 * property set.
	 *
	 * It can then be used as a method on a JavaScript object. The returned proxy
	 * and the original proxy have the same lifetime so destroying either destroys
	 * both.
	 *
	 * For example:
	 *
	 * .. code-block:: pyodide
	 *
	 *    let obj = { a : 7 };
	 *    pyodide.runPython(`
	 *      def f(self):
	 *        return self.a
	 *    `);
	 *    // Without captureThis, it doesn't work to use f as a method for obj:
	 *    obj.f = pyodide.globals.get("f");
	 *    obj.f(); // raises "TypeError: f() missing 1 required positional argument: 'self'"
	 *    // With captureThis, it works fine:
	 *    obj.f = pyodide.globals.get("f").captureThis();
	 *    obj.f(); // returns 7
	 *
	 * @returns The resulting :js:class:`~pyodide.ffi.PyProxy`. It has the same lifetime as the
	 * original :js:class:`~pyodide.ffi.PyProxy` but passes ``this`` to the wrapped function.
	 *
	 */
	captureThis(): PyProxy;
}
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object supports the
 * Python :external:doc:`c-api/buffer`.
 *
 * Examples of buffers include {py:class}`bytes` objects and numpy
 * {external+numpy:ref}`arrays`.
 */
declare class PyBuffer extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyBuffer;
}
interface PyBuffer extends PyBufferMethods {
}
declare class PyBufferMethods {
	/**
	 * Get a view of the buffer data which is usable from JavaScript. No copy is
	 * ever performed.
	 *
	 * We do not support suboffsets, if the buffer requires suboffsets we will
	 * throw an error. JavaScript nd array libraries can't handle suboffsets
	 * anyways. In this case, you should use the :js:meth:`~PyProxy.toJs` api or
	 * copy the buffer to one that doesn't use suboffsets (using e.g.,
	 * :py:func:`numpy.ascontiguousarray`).
	 *
	 * If the buffer stores big endian data or half floats, this function will
	 * fail without an explicit type argument. For big endian data you can use
	 * :js:meth:`~PyProxy.toJs`. :js:class:`DataView` has support for big endian
	 * data, so you might want to pass ``'dataview'`` as the type argument in that
	 * case.
	 *
	 * @param type The type of the :js:attr:`~pyodide.ffi.PyBufferView.data` field
	 * in the output. Should be one of: ``"i8"``, ``"u8"``, ``"u8clamped"``,
	 * ``"i16"``, ``"u16"``, ``"i32"``, ``"u32"``, ``"i32"``, ``"u32"``,
	 * ``"i64"``, ``"u64"``, ``"f32"``, ``"f64``, or ``"dataview"``. This argument
	 * is optional, if absent :js:meth:`~pyodide.ffi.PyBuffer.getBuffer` will try
	 * to determine the appropriate output type based on the buffer format string
	 * (see :std:ref:`struct-format-strings`).
	 */
	getBuffer(type?: string): PyBufferView;
}
export declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array;
/**
 * A :js:class:`~pyodide.ffi.PyProxy` whose proxied Python object is a :py:class:`dict`.
 */
declare class PyDict extends PyProxy {
	/** @private */
	static [Symbol.hasInstance](obj: any): obj is PyProxy;
}
interface PyDict extends PyProxyWithGet, PyProxyWithSet, PyProxyWithHas, PyProxyWithLength, PyIterable {
}
/**
 * A class to allow access to Python data buffers from JavaScript. These are
 * produced by :js:meth:`~pyodide.ffi.PyBuffer.getBuffer` and cannot be constructed directly.
 * When you are done, release it with the :js:func:`~PyBufferView.release` method.
 * See the Python :external:doc:`c-api/buffer` documentation for more
 * information.
 *
 * To find the element ``x[a_1, ..., a_n]``, you could use the following code:
 *
 * .. code-block:: js
 *
 *    function multiIndexToIndex(pybuff, multiIndex){
 *       if(multindex.length !==pybuff.ndim){
 *          throw new Error("Wrong length index");
 *       }
 *       let idx = pybuff.offset;
 *       for(let i = 0; i < pybuff.ndim; i++){
 *          if(multiIndex[i] < 0){
 *             multiIndex[i] = pybuff.shape[i] - multiIndex[i];
 *          }
 *          if(multiIndex[i] < 0 || multiIndex[i] >= pybuff.shape[i]){
 *             throw new Error("Index out of range");
 *          }
 *          idx += multiIndex[i] * pybuff.stride[i];
 *       }
 *       return idx;
 *    }
 *    console.log("entry is", pybuff.data[multiIndexToIndex(pybuff, [2, 0, -1])]);
 *
 * .. admonition:: Converting between TypedArray types
 *    :class: warning
 *
 *    The following naive code to change the type of a typed array does not
 *    work:
 *
 *    .. code-block:: js
 *
 *        // Incorrectly convert a TypedArray.
 *        // Produces a Uint16Array that points to the entire WASM memory!
 *        let myarray = new Uint16Array(buffer.data.buffer);
 *
 *    Instead, if you want to convert the output TypedArray, you need to say:
 *
 *    .. code-block:: js
 *
 *        // Correctly convert a TypedArray.
 *        let myarray = new Uint16Array(
 *            buffer.data.buffer,
 *            buffer.data.byteOffset,
 *            buffer.data.byteLength
 *        );
 */
declare class PyBufferView {
	/**
	 * The offset of the first entry of the array. For instance if our array
	 * is 3d, then you will find ``array[0,0,0]`` at
	 * ``pybuf.data[pybuf.offset]``
	 */
	offset: number;
	/**
	 * If the data is read only, you should not modify it. There is no way for us
	 * to enforce this, but it may cause very weird behavior. See
	 * :py:attr:`memoryview.readonly`.
	 */
	readonly: boolean;
	/**
	 * The format string for the buffer. See :ref:`struct-format-strings`
	 * and :py:attr:`memoryview.format`.
	 */
	format: string;
	/**
	 * How large is each entry in bytes? See :py:attr:`memoryview.itemsize`.
	 */
	itemsize: number;
	/**
	 * The number of dimensions of the buffer. If ``ndim`` is 0, the buffer
	 * represents a single scalar or struct. Otherwise, it represents an
	 * array. See :py:attr:`memoryview.ndim`.
	 */
	ndim: number;
	/**
	 * The total number of bytes the buffer takes up. This is equal to
	 * :js:attr:`buff.data.byteLength <TypedArray.byteLength>`. See :py:attr:`memoryview.nbytes`.
	 */
	nbytes: number;
	/**
	 * The shape of the buffer, that is how long it is in each dimension.
	 * The length will be equal to ``ndim``. For instance, a 2x3x4 array
	 * would have shape ``[2, 3, 4]``. See :py:attr:`memoryview.shape`.
	 */
	shape: number[];
	/**
	 * An array of of length ``ndim`` giving the number of elements to skip
	 * to get to a new element in each dimension. See the example definition
	 * of a ``multiIndexToIndex`` function above. See :py:attr:`memoryview.strides`.
	 */
	strides: number[];
	/**
	 * The actual data. A typed array of an appropriate size backed by a segment
	 * of the WASM memory.
	 *
	 * The ``type`` argument of :js:meth:`~pyodide.ffi.PyBuffer.getBuffer` determines
	 * which sort of :js:class:`TypedArray` or :js:class:`DataView` to return. By
	 * default :js:meth:`~pyodide.ffi.PyBuffer.getBuffer` will look at the format string
	 * to determine the most appropriate option. Most often the result is a
	 * :js:class:`Uint8Array`.
	 *
	 * .. admonition:: Contiguity
	 *    :class: warning
	 *
	 *    If the buffer is not contiguous, the :js:attr:`~PyBufferView.readonly`
	 *    TypedArray will contain data that is not part of the buffer. Modifying
	 *    this data leads to undefined behavior.
	 *
	 * .. admonition:: Read only buffers
	 *    :class: warning
	 *
	 *    If :js:attr:`buffer.readonly <PyBufferView.readonly>` is ``true``, you
	 *    should not modify the buffer. Modifying a read only buffer leads to
	 *    undefined behavior.
	 *
	 */
	data: TypedArray;
	/**
	 * Is it C contiguous? See :py:attr:`memoryview.c_contiguous`.
	 */
	c_contiguous: boolean;
	/**
	 * Is it Fortran contiguous? See :py:attr:`memoryview.f_contiguous`.
	 */
	f_contiguous: boolean;
	/** @private */
	_released: boolean;
	/** @private */
	_view_ptr: number;
	/** @private */
	constructor();
	/**
	 * Release the buffer. This allows the memory to be reclaimed.
	 */
	release(): void;
}
/**
 * A JavaScript error caused by a Python exception.
 *
 * In order to reduce the risk of large memory leaks, the :py:exc:`PythonError`
 * contains no reference to the Python exception that caused it. You can find
 * the actual Python exception that caused this error as
 * :py:data:`sys.last_value`.
 *
 * See :ref:`type translations of errors <type-translations-errors>` for more
 * information.
 *
 * .. admonition:: Avoid leaking stack Frames
 *    :class: warning
 *
 *    If you make a :js:class:`~pyodide.ffi.PyProxy` of
 *    :py:data:`sys.last_value`, you should be especially careful to
 *    :js:meth:`~pyodide.ffi.PyProxy.destroy` it when you are done. You may leak a large
 *    amount of memory including the local variables of all the stack frames in
 *    the traceback if you don't. The easiest way is to only handle the
 *    exception in Python.
 *
 * @hideconstructor
 */
declare class PythonError extends Error {
	/**
	 * The address of the error we are wrapping. We may later compare this
	 * against sys.last_value.
	 * WARNING: we don't own a reference to this pointer, dereferencing it
	 * may be a use-after-free error!
	 * @private
	 */
	__error_address: number;
	/**
	 * The name of the Python error class, e.g, :py:exc:`RuntimeError` or
	 * :py:exc:`KeyError`.
	 */
	type: string;
	constructor(type: string, message: string, error_address: number);
}
/**
 * See :ref:`js-api-pyodide-ffi`
 * @hidetype
 */
declare const ffi: {
	PyProxy: typeof PyProxy;
	PyProxyWithLength: typeof PyProxyWithLength;
	PyProxyWithGet: typeof PyProxyWithGet;
	PyProxyWithSet: typeof PyProxyWithSet;
	PyProxyWithHas: typeof PyProxyWithHas;
	PyDict: typeof PyDict;
	PyIterable: typeof PyIterable;
	PyAsyncIterable: typeof PyAsyncIterable;
	PyIterator: typeof PyIterator;
	PyAsyncIterator: typeof PyAsyncIterator;
	PyGenerator: typeof PyGenerator;
	PyAsyncGenerator: typeof PyAsyncGenerator;
	PyAwaitable: typeof PyAwaitable;
	PyCallable: typeof PyCallable;
	PyBuffer: typeof PyBuffer;
	PyBufferView: typeof PyBufferView;
	PythonError: typeof PythonError;
};

export type {};
export type {PyAsyncGenerator, PyAsyncIterable, PyAsyncIterator, PyAwaitable, PyBuffer, PyBufferView, PyCallable, PyDict, PyGenerator, PyIterable, PyIterator, PyProxy, PyProxyWithGet, PyProxyWithHas, PyProxyWithLength, PyProxyWithSet, PythonError};