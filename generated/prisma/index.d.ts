
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Restaurant
 * 
 */
export type Restaurant = $Result.DefaultSelection<Prisma.$RestaurantPayload>
/**
 * Model Schedule
 * 
 */
export type Schedule = $Result.DefaultSelection<Prisma.$SchedulePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model MenuItem
 * 
 */
export type MenuItem = $Result.DefaultSelection<Prisma.$MenuItemPayload>
/**
 * Model StoryCard
 * 
 */
export type StoryCard = $Result.DefaultSelection<Prisma.$StoryCardPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const DayOfWeek: {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]

}

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Restaurants
 * const restaurants = await prisma.restaurant.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Restaurants
   * const restaurants = await prisma.restaurant.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.restaurant`: Exposes CRUD operations for the **Restaurant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurants
    * const restaurants = await prisma.restaurant.findMany()
    * ```
    */
  get restaurant(): Prisma.RestaurantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schedule`: Exposes CRUD operations for the **Schedule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schedules
    * const schedules = await prisma.schedule.findMany()
    * ```
    */
  get schedule(): Prisma.ScheduleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.menuItem`: Exposes CRUD operations for the **MenuItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenuItems
    * const menuItems = await prisma.menuItem.findMany()
    * ```
    */
  get menuItem(): Prisma.MenuItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storyCard`: Exposes CRUD operations for the **StoryCard** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StoryCards
    * const storyCards = await prisma.storyCard.findMany()
    * ```
    */
  get storyCard(): Prisma.StoryCardDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Restaurant: 'Restaurant',
    Schedule: 'Schedule',
    Category: 'Category',
    MenuItem: 'MenuItem',
    StoryCard: 'StoryCard'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "restaurant" | "schedule" | "category" | "menuItem" | "storyCard"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Restaurant: {
        payload: Prisma.$RestaurantPayload<ExtArgs>
        fields: Prisma.RestaurantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestaurantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestaurantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          findFirst: {
            args: Prisma.RestaurantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestaurantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          findMany: {
            args: Prisma.RestaurantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>[]
          }
          create: {
            args: Prisma.RestaurantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          createMany: {
            args: Prisma.RestaurantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestaurantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>[]
          }
          delete: {
            args: Prisma.RestaurantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          update: {
            args: Prisma.RestaurantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          deleteMany: {
            args: Prisma.RestaurantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestaurantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RestaurantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>[]
          }
          upsert: {
            args: Prisma.RestaurantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          aggregate: {
            args: Prisma.RestaurantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestaurant>
          }
          groupBy: {
            args: Prisma.RestaurantGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestaurantGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestaurantCountArgs<ExtArgs>
            result: $Utils.Optional<RestaurantCountAggregateOutputType> | number
          }
        }
      }
      Schedule: {
        payload: Prisma.$SchedulePayload<ExtArgs>
        fields: Prisma.ScheduleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findFirst: {
            args: Prisma.ScheduleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          findMany: {
            args: Prisma.ScheduleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          create: {
            args: Prisma.ScheduleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          createMany: {
            args: Prisma.ScheduleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          delete: {
            args: Prisma.ScheduleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          update: {
            args: Prisma.ScheduleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          deleteMany: {
            args: Prisma.ScheduleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>[]
          }
          upsert: {
            args: Prisma.ScheduleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchedulePayload>
          }
          aggregate: {
            args: Prisma.ScheduleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchedule>
          }
          groupBy: {
            args: Prisma.ScheduleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      MenuItem: {
        payload: Prisma.$MenuItemPayload<ExtArgs>
        fields: Prisma.MenuItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findFirst: {
            args: Prisma.MenuItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findMany: {
            args: Prisma.MenuItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          create: {
            args: Prisma.MenuItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          createMany: {
            args: Prisma.MenuItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          delete: {
            args: Prisma.MenuItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          update: {
            args: Prisma.MenuItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          deleteMany: {
            args: Prisma.MenuItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenuItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          upsert: {
            args: Prisma.MenuItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          aggregate: {
            args: Prisma.MenuItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenuItem>
          }
          groupBy: {
            args: Prisma.MenuItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuItemCountArgs<ExtArgs>
            result: $Utils.Optional<MenuItemCountAggregateOutputType> | number
          }
        }
      }
      StoryCard: {
        payload: Prisma.$StoryCardPayload<ExtArgs>
        fields: Prisma.StoryCardFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoryCardFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoryCardFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>
          }
          findFirst: {
            args: Prisma.StoryCardFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoryCardFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>
          }
          findMany: {
            args: Prisma.StoryCardFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>[]
          }
          create: {
            args: Prisma.StoryCardCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>
          }
          createMany: {
            args: Prisma.StoryCardCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoryCardCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>[]
          }
          delete: {
            args: Prisma.StoryCardDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>
          }
          update: {
            args: Prisma.StoryCardUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>
          }
          deleteMany: {
            args: Prisma.StoryCardDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoryCardUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoryCardUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>[]
          }
          upsert: {
            args: Prisma.StoryCardUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoryCardPayload>
          }
          aggregate: {
            args: Prisma.StoryCardAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStoryCard>
          }
          groupBy: {
            args: Prisma.StoryCardGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoryCardGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoryCardCountArgs<ExtArgs>
            result: $Utils.Optional<StoryCardCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    restaurant?: RestaurantOmit
    schedule?: ScheduleOmit
    category?: CategoryOmit
    menuItem?: MenuItemOmit
    storyCard?: StoryCardOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RestaurantCountOutputType
   */

  export type RestaurantCountOutputType = {
    schedules: number
    categories: number
    menuItems: number
    storyCards: number
  }

  export type RestaurantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | RestaurantCountOutputTypeCountSchedulesArgs
    categories?: boolean | RestaurantCountOutputTypeCountCategoriesArgs
    menuItems?: boolean | RestaurantCountOutputTypeCountMenuItemsArgs
    storyCards?: boolean | RestaurantCountOutputTypeCountStoryCardsArgs
  }

  // Custom InputTypes
  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCountOutputType
     */
    select?: RestaurantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeCountSchedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
  }

  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeCountMenuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
  }

  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeCountStoryCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoryCardWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    menuItems: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menuItems?: boolean | CategoryCountOutputTypeCountMenuItemsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountMenuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Restaurant
   */

  export type AggregateRestaurant = {
    _count: RestaurantCountAggregateOutputType | null
    _min: RestaurantMinAggregateOutputType | null
    _max: RestaurantMaxAggregateOutputType | null
  }

  export type RestaurantMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    phone: string | null
    logo: string | null
    heroImage: string | null
    tagline: string | null
    story: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RestaurantMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    phone: string | null
    logo: string | null
    heroImage: string | null
    tagline: string | null
    story: string | null
    description: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RestaurantCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    phone: number
    logo: number
    heroImage: number
    tagline: number
    story: number
    description: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RestaurantMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    phone?: true
    logo?: true
    heroImage?: true
    tagline?: true
    story?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RestaurantMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    phone?: true
    logo?: true
    heroImage?: true
    tagline?: true
    story?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RestaurantCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    phone?: true
    logo?: true
    heroImage?: true
    tagline?: true
    story?: true
    description?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RestaurantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurant to aggregate.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Restaurants
    **/
    _count?: true | RestaurantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantMaxAggregateInputType
  }

  export type GetRestaurantAggregateType<T extends RestaurantAggregateArgs> = {
        [P in keyof T & keyof AggregateRestaurant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestaurant[P]>
      : GetScalarType<T[P], AggregateRestaurant[P]>
  }




  export type RestaurantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantWhereInput
    orderBy?: RestaurantOrderByWithAggregationInput | RestaurantOrderByWithAggregationInput[]
    by: RestaurantScalarFieldEnum[] | RestaurantScalarFieldEnum
    having?: RestaurantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestaurantCountAggregateInputType | true
    _min?: RestaurantMinAggregateInputType
    _max?: RestaurantMaxAggregateInputType
  }

  export type RestaurantGroupByOutputType = {
    id: string
    slug: string
    name: string
    phone: string | null
    logo: string | null
    heroImage: string | null
    tagline: string | null
    story: string | null
    description: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: RestaurantCountAggregateOutputType | null
    _min: RestaurantMinAggregateOutputType | null
    _max: RestaurantMaxAggregateOutputType | null
  }

  type GetRestaurantGroupByPayload<T extends RestaurantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestaurantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestaurantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestaurantGroupByOutputType[P]>
            : GetScalarType<T[P], RestaurantGroupByOutputType[P]>
        }
      >
    >


  export type RestaurantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    phone?: boolean
    logo?: boolean
    heroImage?: boolean
    tagline?: boolean
    story?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    schedules?: boolean | Restaurant$schedulesArgs<ExtArgs>
    categories?: boolean | Restaurant$categoriesArgs<ExtArgs>
    menuItems?: boolean | Restaurant$menuItemsArgs<ExtArgs>
    storyCards?: boolean | Restaurant$storyCardsArgs<ExtArgs>
    _count?: boolean | RestaurantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurant"]>

  export type RestaurantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    phone?: boolean
    logo?: boolean
    heroImage?: boolean
    tagline?: boolean
    story?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["restaurant"]>

  export type RestaurantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    phone?: boolean
    logo?: boolean
    heroImage?: boolean
    tagline?: boolean
    story?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["restaurant"]>

  export type RestaurantSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    phone?: boolean
    logo?: boolean
    heroImage?: boolean
    tagline?: boolean
    story?: boolean
    description?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RestaurantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "phone" | "logo" | "heroImage" | "tagline" | "story" | "description" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["restaurant"]>
  export type RestaurantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedules?: boolean | Restaurant$schedulesArgs<ExtArgs>
    categories?: boolean | Restaurant$categoriesArgs<ExtArgs>
    menuItems?: boolean | Restaurant$menuItemsArgs<ExtArgs>
    storyCards?: boolean | Restaurant$storyCardsArgs<ExtArgs>
    _count?: boolean | RestaurantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RestaurantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RestaurantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RestaurantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Restaurant"
    objects: {
      schedules: Prisma.$SchedulePayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      menuItems: Prisma.$MenuItemPayload<ExtArgs>[]
      storyCards: Prisma.$StoryCardPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      phone: string | null
      logo: string | null
      heroImage: string | null
      tagline: string | null
      story: string | null
      description: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["restaurant"]>
    composites: {}
  }

  type RestaurantGetPayload<S extends boolean | null | undefined | RestaurantDefaultArgs> = $Result.GetResult<Prisma.$RestaurantPayload, S>

  type RestaurantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RestaurantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RestaurantCountAggregateInputType | true
    }

  export interface RestaurantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Restaurant'], meta: { name: 'Restaurant' } }
    /**
     * Find zero or one Restaurant that matches the filter.
     * @param {RestaurantFindUniqueArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantFindUniqueArgs>(args: SelectSubset<T, RestaurantFindUniqueArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Restaurant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestaurantFindUniqueOrThrowArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantFindUniqueOrThrowArgs>(args: SelectSubset<T, RestaurantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindFirstArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantFindFirstArgs>(args?: SelectSubset<T, RestaurantFindFirstArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindFirstOrThrowArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantFindFirstOrThrowArgs>(args?: SelectSubset<T, RestaurantFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Restaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Restaurants
     * const restaurants = await prisma.restaurant.findMany()
     * 
     * // Get first 10 Restaurants
     * const restaurants = await prisma.restaurant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RestaurantFindManyArgs>(args?: SelectSubset<T, RestaurantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Restaurant.
     * @param {RestaurantCreateArgs} args - Arguments to create a Restaurant.
     * @example
     * // Create one Restaurant
     * const Restaurant = await prisma.restaurant.create({
     *   data: {
     *     // ... data to create a Restaurant
     *   }
     * })
     * 
     */
    create<T extends RestaurantCreateArgs>(args: SelectSubset<T, RestaurantCreateArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Restaurants.
     * @param {RestaurantCreateManyArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurant = await prisma.restaurant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestaurantCreateManyArgs>(args?: SelectSubset<T, RestaurantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Restaurants and returns the data saved in the database.
     * @param {RestaurantCreateManyAndReturnArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurant = await prisma.restaurant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Restaurants and only return the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestaurantCreateManyAndReturnArgs>(args?: SelectSubset<T, RestaurantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Restaurant.
     * @param {RestaurantDeleteArgs} args - Arguments to delete one Restaurant.
     * @example
     * // Delete one Restaurant
     * const Restaurant = await prisma.restaurant.delete({
     *   where: {
     *     // ... filter to delete one Restaurant
     *   }
     * })
     * 
     */
    delete<T extends RestaurantDeleteArgs>(args: SelectSubset<T, RestaurantDeleteArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Restaurant.
     * @param {RestaurantUpdateArgs} args - Arguments to update one Restaurant.
     * @example
     * // Update one Restaurant
     * const restaurant = await prisma.restaurant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestaurantUpdateArgs>(args: SelectSubset<T, RestaurantUpdateArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Restaurants.
     * @param {RestaurantDeleteManyArgs} args - Arguments to filter Restaurants to delete.
     * @example
     * // Delete a few Restaurants
     * const { count } = await prisma.restaurant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestaurantDeleteManyArgs>(args?: SelectSubset<T, RestaurantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Restaurants
     * const restaurant = await prisma.restaurant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestaurantUpdateManyArgs>(args: SelectSubset<T, RestaurantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants and returns the data updated in the database.
     * @param {RestaurantUpdateManyAndReturnArgs} args - Arguments to update many Restaurants.
     * @example
     * // Update many Restaurants
     * const restaurant = await prisma.restaurant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Restaurants and only return the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RestaurantUpdateManyAndReturnArgs>(args: SelectSubset<T, RestaurantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Restaurant.
     * @param {RestaurantUpsertArgs} args - Arguments to update or create a Restaurant.
     * @example
     * // Update or create a Restaurant
     * const restaurant = await prisma.restaurant.upsert({
     *   create: {
     *     // ... data to create a Restaurant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Restaurant we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantUpsertArgs>(args: SelectSubset<T, RestaurantUpsertArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCountArgs} args - Arguments to filter Restaurants to count.
     * @example
     * // Count the number of Restaurants
     * const count = await prisma.restaurant.count({
     *   where: {
     *     // ... the filter for the Restaurants we want to count
     *   }
     * })
    **/
    count<T extends RestaurantCountArgs>(
      args?: Subset<T, RestaurantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestaurantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Restaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantAggregateArgs>(args: Subset<T, RestaurantAggregateArgs>): Prisma.PrismaPromise<GetRestaurantAggregateType<T>>

    /**
     * Group by Restaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RestaurantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestaurantGroupByArgs['orderBy'] }
        : { orderBy?: RestaurantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RestaurantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Restaurant model
   */
  readonly fields: RestaurantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Restaurant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestaurantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schedules<T extends Restaurant$schedulesArgs<ExtArgs> = {}>(args?: Subset<T, Restaurant$schedulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Restaurant$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Restaurant$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    menuItems<T extends Restaurant$menuItemsArgs<ExtArgs> = {}>(args?: Subset<T, Restaurant$menuItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    storyCards<T extends Restaurant$storyCardsArgs<ExtArgs> = {}>(args?: Subset<T, Restaurant$storyCardsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Restaurant model
   */
  interface RestaurantFieldRefs {
    readonly id: FieldRef<"Restaurant", 'String'>
    readonly slug: FieldRef<"Restaurant", 'String'>
    readonly name: FieldRef<"Restaurant", 'String'>
    readonly phone: FieldRef<"Restaurant", 'String'>
    readonly logo: FieldRef<"Restaurant", 'String'>
    readonly heroImage: FieldRef<"Restaurant", 'String'>
    readonly tagline: FieldRef<"Restaurant", 'String'>
    readonly story: FieldRef<"Restaurant", 'String'>
    readonly description: FieldRef<"Restaurant", 'String'>
    readonly isActive: FieldRef<"Restaurant", 'Boolean'>
    readonly createdAt: FieldRef<"Restaurant", 'DateTime'>
    readonly updatedAt: FieldRef<"Restaurant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Restaurant findUnique
   */
  export type RestaurantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant findUniqueOrThrow
   */
  export type RestaurantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant findFirst
   */
  export type RestaurantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantScalarFieldEnum | RestaurantScalarFieldEnum[]
  }

  /**
   * Restaurant findFirstOrThrow
   */
  export type RestaurantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantScalarFieldEnum | RestaurantScalarFieldEnum[]
  }

  /**
   * Restaurant findMany
   */
  export type RestaurantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Restaurants.
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    distinct?: RestaurantScalarFieldEnum | RestaurantScalarFieldEnum[]
  }

  /**
   * Restaurant create
   */
  export type RestaurantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * The data needed to create a Restaurant.
     */
    data: XOR<RestaurantCreateInput, RestaurantUncheckedCreateInput>
  }

  /**
   * Restaurant createMany
   */
  export type RestaurantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantCreateManyInput | RestaurantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurant createManyAndReturn
   */
  export type RestaurantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantCreateManyInput | RestaurantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurant update
   */
  export type RestaurantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * The data needed to update a Restaurant.
     */
    data: XOR<RestaurantUpdateInput, RestaurantUncheckedUpdateInput>
    /**
     * Choose, which Restaurant to update.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant updateMany
   */
  export type RestaurantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantUpdateManyMutationInput, RestaurantUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurant updateManyAndReturn
   */
  export type RestaurantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantUpdateManyMutationInput, RestaurantUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurant upsert
   */
  export type RestaurantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * The filter to search for the Restaurant to update in case it exists.
     */
    where: RestaurantWhereUniqueInput
    /**
     * In case the Restaurant found by the `where` argument doesn't exist, create a new Restaurant with this data.
     */
    create: XOR<RestaurantCreateInput, RestaurantUncheckedCreateInput>
    /**
     * In case the Restaurant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestaurantUpdateInput, RestaurantUncheckedUpdateInput>
  }

  /**
   * Restaurant delete
   */
  export type RestaurantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter which Restaurant to delete.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant deleteMany
   */
  export type RestaurantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurants to delete
     */
    where?: RestaurantWhereInput
    /**
     * Limit how many Restaurants to delete.
     */
    limit?: number
  }

  /**
   * Restaurant.schedules
   */
  export type Restaurant$schedulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    cursor?: ScheduleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Restaurant.categories
   */
  export type Restaurant$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Restaurant.menuItems
   */
  export type Restaurant$menuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    cursor?: MenuItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * Restaurant.storyCards
   */
  export type Restaurant$storyCardsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    where?: StoryCardWhereInput
    orderBy?: StoryCardOrderByWithRelationInput | StoryCardOrderByWithRelationInput[]
    cursor?: StoryCardWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoryCardScalarFieldEnum | StoryCardScalarFieldEnum[]
  }

  /**
   * Restaurant without action
   */
  export type RestaurantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
  }


  /**
   * Model Schedule
   */

  export type AggregateSchedule = {
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  export type ScheduleMinAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    opensAt: string | null
    closesAt: string | null
    isClosed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleMaxAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    dayOfWeek: $Enums.DayOfWeek | null
    opensAt: string | null
    closesAt: string | null
    isClosed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ScheduleCountAggregateOutputType = {
    id: number
    restaurantId: number
    dayOfWeek: number
    opensAt: number
    closesAt: number
    isClosed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ScheduleMinAggregateInputType = {
    id?: true
    restaurantId?: true
    dayOfWeek?: true
    opensAt?: true
    closesAt?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleMaxAggregateInputType = {
    id?: true
    restaurantId?: true
    dayOfWeek?: true
    opensAt?: true
    closesAt?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ScheduleCountAggregateInputType = {
    id?: true
    restaurantId?: true
    dayOfWeek?: true
    opensAt?: true
    closesAt?: true
    isClosed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ScheduleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedule to aggregate.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schedules
    **/
    _count?: true | ScheduleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleMaxAggregateInputType
  }

  export type GetScheduleAggregateType<T extends ScheduleAggregateArgs> = {
        [P in keyof T & keyof AggregateSchedule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchedule[P]>
      : GetScalarType<T[P], AggregateSchedule[P]>
  }




  export type ScheduleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleWhereInput
    orderBy?: ScheduleOrderByWithAggregationInput | ScheduleOrderByWithAggregationInput[]
    by: ScheduleScalarFieldEnum[] | ScheduleScalarFieldEnum
    having?: ScheduleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleCountAggregateInputType | true
    _min?: ScheduleMinAggregateInputType
    _max?: ScheduleMaxAggregateInputType
  }

  export type ScheduleGroupByOutputType = {
    id: string
    restaurantId: string
    dayOfWeek: $Enums.DayOfWeek
    opensAt: string
    closesAt: string
    isClosed: boolean
    createdAt: Date
    updatedAt: Date
    _count: ScheduleCountAggregateOutputType | null
    _min: ScheduleMinAggregateOutputType | null
    _max: ScheduleMaxAggregateOutputType | null
  }

  type GetScheduleGroupByPayload<T extends ScheduleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    dayOfWeek?: boolean
    opensAt?: boolean
    closesAt?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    dayOfWeek?: boolean
    opensAt?: boolean
    closesAt?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    dayOfWeek?: boolean
    opensAt?: boolean
    closesAt?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["schedule"]>

  export type ScheduleSelectScalar = {
    id?: boolean
    restaurantId?: boolean
    dayOfWeek?: boolean
    opensAt?: boolean
    closesAt?: boolean
    isClosed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ScheduleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "restaurantId" | "dayOfWeek" | "opensAt" | "closesAt" | "isClosed" | "createdAt" | "updatedAt", ExtArgs["result"]["schedule"]>
  export type ScheduleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }
  export type ScheduleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }

  export type $SchedulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Schedule"
    objects: {
      restaurant: Prisma.$RestaurantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      restaurantId: string
      dayOfWeek: $Enums.DayOfWeek
      opensAt: string
      closesAt: string
      isClosed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["schedule"]>
    composites: {}
  }

  type ScheduleGetPayload<S extends boolean | null | undefined | ScheduleDefaultArgs> = $Result.GetResult<Prisma.$SchedulePayload, S>

  type ScheduleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleCountAggregateInputType | true
    }

  export interface ScheduleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Schedule'], meta: { name: 'Schedule' } }
    /**
     * Find zero or one Schedule that matches the filter.
     * @param {ScheduleFindUniqueArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleFindUniqueArgs>(args: SelectSubset<T, ScheduleFindUniqueArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Schedule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleFindUniqueOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleFindFirstArgs>(args?: SelectSubset<T, ScheduleFindFirstArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Schedule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindFirstOrThrowArgs} args - Arguments to find a Schedule
     * @example
     * // Get one Schedule
     * const schedule = await prisma.schedule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Schedules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schedules
     * const schedules = await prisma.schedule.findMany()
     * 
     * // Get first 10 Schedules
     * const schedules = await prisma.schedule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleWithIdOnly = await prisma.schedule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleFindManyArgs>(args?: SelectSubset<T, ScheduleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Schedule.
     * @param {ScheduleCreateArgs} args - Arguments to create a Schedule.
     * @example
     * // Create one Schedule
     * const Schedule = await prisma.schedule.create({
     *   data: {
     *     // ... data to create a Schedule
     *   }
     * })
     * 
     */
    create<T extends ScheduleCreateArgs>(args: SelectSubset<T, ScheduleCreateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Schedules.
     * @param {ScheduleCreateManyArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleCreateManyArgs>(args?: SelectSubset<T, ScheduleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schedules and returns the data saved in the database.
     * @param {ScheduleCreateManyAndReturnArgs} args - Arguments to create many Schedules.
     * @example
     * // Create many Schedules
     * const schedule = await prisma.schedule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Schedule.
     * @param {ScheduleDeleteArgs} args - Arguments to delete one Schedule.
     * @example
     * // Delete one Schedule
     * const Schedule = await prisma.schedule.delete({
     *   where: {
     *     // ... filter to delete one Schedule
     *   }
     * })
     * 
     */
    delete<T extends ScheduleDeleteArgs>(args: SelectSubset<T, ScheduleDeleteArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Schedule.
     * @param {ScheduleUpdateArgs} args - Arguments to update one Schedule.
     * @example
     * // Update one Schedule
     * const schedule = await prisma.schedule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleUpdateArgs>(args: SelectSubset<T, ScheduleUpdateArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Schedules.
     * @param {ScheduleDeleteManyArgs} args - Arguments to filter Schedules to delete.
     * @example
     * // Delete a few Schedules
     * const { count } = await prisma.schedule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleDeleteManyArgs>(args?: SelectSubset<T, ScheduleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleUpdateManyArgs>(args: SelectSubset<T, ScheduleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schedules and returns the data updated in the database.
     * @param {ScheduleUpdateManyAndReturnArgs} args - Arguments to update many Schedules.
     * @example
     * // Update many Schedules
     * const schedule = await prisma.schedule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schedules and only return the `id`
     * const scheduleWithIdOnly = await prisma.schedule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Schedule.
     * @param {ScheduleUpsertArgs} args - Arguments to update or create a Schedule.
     * @example
     * // Update or create a Schedule
     * const schedule = await prisma.schedule.upsert({
     *   create: {
     *     // ... data to create a Schedule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Schedule we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleUpsertArgs>(args: SelectSubset<T, ScheduleUpsertArgs<ExtArgs>>): Prisma__ScheduleClient<$Result.GetResult<Prisma.$SchedulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Schedules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleCountArgs} args - Arguments to filter Schedules to count.
     * @example
     * // Count the number of Schedules
     * const count = await prisma.schedule.count({
     *   where: {
     *     // ... the filter for the Schedules we want to count
     *   }
     * })
    **/
    count<T extends ScheduleCountArgs>(
      args?: Subset<T, ScheduleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleAggregateArgs>(args: Subset<T, ScheduleAggregateArgs>): Prisma.PrismaPromise<GetScheduleAggregateType<T>>

    /**
     * Group by Schedule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Schedule model
   */
  readonly fields: ScheduleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Schedule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    restaurant<T extends RestaurantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantDefaultArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Schedule model
   */
  interface ScheduleFieldRefs {
    readonly id: FieldRef<"Schedule", 'String'>
    readonly restaurantId: FieldRef<"Schedule", 'String'>
    readonly dayOfWeek: FieldRef<"Schedule", 'DayOfWeek'>
    readonly opensAt: FieldRef<"Schedule", 'String'>
    readonly closesAt: FieldRef<"Schedule", 'String'>
    readonly isClosed: FieldRef<"Schedule", 'Boolean'>
    readonly createdAt: FieldRef<"Schedule", 'DateTime'>
    readonly updatedAt: FieldRef<"Schedule", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Schedule findUnique
   */
  export type ScheduleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findUniqueOrThrow
   */
  export type ScheduleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule findFirst
   */
  export type ScheduleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findFirstOrThrow
   */
  export type ScheduleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedule to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schedules.
     */
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule findMany
   */
  export type ScheduleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter, which Schedules to fetch.
     */
    where?: ScheduleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schedules to fetch.
     */
    orderBy?: ScheduleOrderByWithRelationInput | ScheduleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schedules.
     */
    cursor?: ScheduleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schedules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schedules.
     */
    skip?: number
    distinct?: ScheduleScalarFieldEnum | ScheduleScalarFieldEnum[]
  }

  /**
   * Schedule create
   */
  export type ScheduleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to create a Schedule.
     */
    data: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
  }

  /**
   * Schedule createMany
   */
  export type ScheduleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Schedule createManyAndReturn
   */
  export type ScheduleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to create many Schedules.
     */
    data: ScheduleCreateManyInput | ScheduleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule update
   */
  export type ScheduleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The data needed to update a Schedule.
     */
    data: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
    /**
     * Choose, which Schedule to update.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule updateMany
   */
  export type ScheduleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
  }

  /**
   * Schedule updateManyAndReturn
   */
  export type ScheduleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * The data used to update Schedules.
     */
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyInput>
    /**
     * Filter which Schedules to update
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Schedule upsert
   */
  export type ScheduleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * The filter to search for the Schedule to update in case it exists.
     */
    where: ScheduleWhereUniqueInput
    /**
     * In case the Schedule found by the `where` argument doesn't exist, create a new Schedule with this data.
     */
    create: XOR<ScheduleCreateInput, ScheduleUncheckedCreateInput>
    /**
     * In case the Schedule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleUpdateInput, ScheduleUncheckedUpdateInput>
  }

  /**
   * Schedule delete
   */
  export type ScheduleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
    /**
     * Filter which Schedule to delete.
     */
    where: ScheduleWhereUniqueInput
  }

  /**
   * Schedule deleteMany
   */
  export type ScheduleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schedules to delete
     */
    where?: ScheduleWhereInput
    /**
     * Limit how many Schedules to delete.
     */
    limit?: number
  }

  /**
   * Schedule without action
   */
  export type ScheduleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Schedule
     */
    select?: ScheduleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Schedule
     */
    omit?: ScheduleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    order: number | null
  }

  export type CategorySumAggregateOutputType = {
    order: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    name: string | null
    visible: boolean | null
    order: number | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    name: string | null
    visible: boolean | null
    order: number | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    restaurantId: number
    name: number
    visible: number
    order: number
    isActive: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    order?: true
  }

  export type CategorySumAggregateInputType = {
    order?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    restaurantId?: true
    name?: true
    visible?: true
    order?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    restaurantId?: true
    name?: true
    visible?: true
    order?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    restaurantId?: true
    name?: true
    visible?: true
    order?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    restaurantId: string
    name: string
    visible: boolean
    order: number
    isActive: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    name?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    menuItems?: boolean | Category$menuItemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    name?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    name?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    restaurantId?: boolean
    name?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "restaurantId" | "name" | "visible" | "order" | "isActive" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    menuItems?: boolean | Category$menuItemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      restaurant: Prisma.$RestaurantPayload<ExtArgs>
      menuItems: Prisma.$MenuItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      restaurantId: string
      name: string
      visible: boolean
      order: number
      isActive: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    restaurant<T extends RestaurantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantDefaultArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    menuItems<T extends Category$menuItemsArgs<ExtArgs> = {}>(args?: Subset<T, Category$menuItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly restaurantId: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly visible: FieldRef<"Category", 'Boolean'>
    readonly order: FieldRef<"Category", 'Int'>
    readonly isActive: FieldRef<"Category", 'Boolean'>
    readonly deletedAt: FieldRef<"Category", 'DateTime'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.menuItems
   */
  export type Category$menuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    cursor?: MenuItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model MenuItem
   */

  export type AggregateMenuItem = {
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  export type MenuItemAvgAggregateOutputType = {
    price: Decimal | null
  }

  export type MenuItemSumAggregateOutputType = {
    price: Decimal | null
  }

  export type MenuItemMinAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    image: string | null
    available: boolean | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenuItemMaxAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    categoryId: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    image: string | null
    available: boolean | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MenuItemCountAggregateOutputType = {
    id: number
    restaurantId: number
    categoryId: number
    name: number
    description: number
    price: number
    image: number
    available: number
    isActive: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MenuItemAvgAggregateInputType = {
    price?: true
  }

  export type MenuItemSumAggregateInputType = {
    price?: true
  }

  export type MenuItemMinAggregateInputType = {
    id?: true
    restaurantId?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    image?: true
    available?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenuItemMaxAggregateInputType = {
    id?: true
    restaurantId?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    image?: true
    available?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MenuItemCountAggregateInputType = {
    id?: true
    restaurantId?: true
    categoryId?: true
    name?: true
    description?: true
    price?: true
    image?: true
    available?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MenuItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItem to aggregate.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenuItems
    **/
    _count?: true | MenuItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuItemMaxAggregateInputType
  }

  export type GetMenuItemAggregateType<T extends MenuItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMenuItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenuItem[P]>
      : GetScalarType<T[P], AggregateMenuItem[P]>
  }




  export type MenuItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithAggregationInput | MenuItemOrderByWithAggregationInput[]
    by: MenuItemScalarFieldEnum[] | MenuItemScalarFieldEnum
    having?: MenuItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuItemCountAggregateInputType | true
    _avg?: MenuItemAvgAggregateInputType
    _sum?: MenuItemSumAggregateInputType
    _min?: MenuItemMinAggregateInputType
    _max?: MenuItemMaxAggregateInputType
  }

  export type MenuItemGroupByOutputType = {
    id: string
    restaurantId: string
    categoryId: string
    name: string
    description: string
    price: Decimal
    image: string | null
    available: boolean
    isActive: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  type GetMenuItemGroupByPayload<T extends MenuItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
            : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
        }
      >
    >


  export type MenuItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    available?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    available?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    available?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectScalar = {
    id?: boolean
    restaurantId?: boolean
    categoryId?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    image?: boolean
    available?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MenuItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "restaurantId" | "categoryId" | "name" | "description" | "price" | "image" | "available" | "isActive" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["menuItem"]>
  export type MenuItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type MenuItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type MenuItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $MenuItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenuItem"
    objects: {
      restaurant: Prisma.$RestaurantPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      restaurantId: string
      categoryId: string
      name: string
      description: string
      price: Prisma.Decimal
      image: string | null
      available: boolean
      isActive: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["menuItem"]>
    composites: {}
  }

  type MenuItemGetPayload<S extends boolean | null | undefined | MenuItemDefaultArgs> = $Result.GetResult<Prisma.$MenuItemPayload, S>

  type MenuItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenuItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenuItemCountAggregateInputType | true
    }

  export interface MenuItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenuItem'], meta: { name: 'MenuItem' } }
    /**
     * Find zero or one MenuItem that matches the filter.
     * @param {MenuItemFindUniqueArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuItemFindUniqueArgs>(args: SelectSubset<T, MenuItemFindUniqueArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MenuItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuItemFindUniqueOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuItemFindFirstArgs>(args?: SelectSubset<T, MenuItemFindFirstArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MenuItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MenuItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuItems
     * const menuItems = await prisma.menuItem.findMany()
     * 
     * // Get first 10 MenuItems
     * const menuItems = await prisma.menuItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuItemFindManyArgs>(args?: SelectSubset<T, MenuItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MenuItem.
     * @param {MenuItemCreateArgs} args - Arguments to create a MenuItem.
     * @example
     * // Create one MenuItem
     * const MenuItem = await prisma.menuItem.create({
     *   data: {
     *     // ... data to create a MenuItem
     *   }
     * })
     * 
     */
    create<T extends MenuItemCreateArgs>(args: SelectSubset<T, MenuItemCreateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MenuItems.
     * @param {MenuItemCreateManyArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuItemCreateManyArgs>(args?: SelectSubset<T, MenuItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenuItems and returns the data saved in the database.
     * @param {MenuItemCreateManyAndReturnArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenuItems and only return the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MenuItem.
     * @param {MenuItemDeleteArgs} args - Arguments to delete one MenuItem.
     * @example
     * // Delete one MenuItem
     * const MenuItem = await prisma.menuItem.delete({
     *   where: {
     *     // ... filter to delete one MenuItem
     *   }
     * })
     * 
     */
    delete<T extends MenuItemDeleteArgs>(args: SelectSubset<T, MenuItemDeleteArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MenuItem.
     * @param {MenuItemUpdateArgs} args - Arguments to update one MenuItem.
     * @example
     * // Update one MenuItem
     * const menuItem = await prisma.menuItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuItemUpdateArgs>(args: SelectSubset<T, MenuItemUpdateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MenuItems.
     * @param {MenuItemDeleteManyArgs} args - Arguments to filter MenuItems to delete.
     * @example
     * // Delete a few MenuItems
     * const { count } = await prisma.menuItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuItemDeleteManyArgs>(args?: SelectSubset<T, MenuItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuItems
     * const menuItem = await prisma.menuItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuItemUpdateManyArgs>(args: SelectSubset<T, MenuItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems and returns the data updated in the database.
     * @param {MenuItemUpdateManyAndReturnArgs} args - Arguments to update many MenuItems.
     * @example
     * // Update many MenuItems
     * const menuItem = await prisma.menuItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MenuItems and only return the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MenuItemUpdateManyAndReturnArgs>(args: SelectSubset<T, MenuItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MenuItem.
     * @param {MenuItemUpsertArgs} args - Arguments to update or create a MenuItem.
     * @example
     * // Update or create a MenuItem
     * const menuItem = await prisma.menuItem.upsert({
     *   create: {
     *     // ... data to create a MenuItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuItem we want to update
     *   }
     * })
     */
    upsert<T extends MenuItemUpsertArgs>(args: SelectSubset<T, MenuItemUpsertArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemCountArgs} args - Arguments to filter MenuItems to count.
     * @example
     * // Count the number of MenuItems
     * const count = await prisma.menuItem.count({
     *   where: {
     *     // ... the filter for the MenuItems we want to count
     *   }
     * })
    **/
    count<T extends MenuItemCountArgs>(
      args?: Subset<T, MenuItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuItemAggregateArgs>(args: Subset<T, MenuItemAggregateArgs>): Prisma.PrismaPromise<GetMenuItemAggregateType<T>>

    /**
     * Group by MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuItemGroupByArgs['orderBy'] }
        : { orderBy?: MenuItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenuItem model
   */
  readonly fields: MenuItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenuItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    restaurant<T extends RestaurantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantDefaultArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MenuItem model
   */
  interface MenuItemFieldRefs {
    readonly id: FieldRef<"MenuItem", 'String'>
    readonly restaurantId: FieldRef<"MenuItem", 'String'>
    readonly categoryId: FieldRef<"MenuItem", 'String'>
    readonly name: FieldRef<"MenuItem", 'String'>
    readonly description: FieldRef<"MenuItem", 'String'>
    readonly price: FieldRef<"MenuItem", 'Decimal'>
    readonly image: FieldRef<"MenuItem", 'String'>
    readonly available: FieldRef<"MenuItem", 'Boolean'>
    readonly isActive: FieldRef<"MenuItem", 'Boolean'>
    readonly deletedAt: FieldRef<"MenuItem", 'DateTime'>
    readonly createdAt: FieldRef<"MenuItem", 'DateTime'>
    readonly updatedAt: FieldRef<"MenuItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MenuItem findUnique
   */
  export type MenuItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findUniqueOrThrow
   */
  export type MenuItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findFirst
   */
  export type MenuItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findFirstOrThrow
   */
  export type MenuItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findMany
   */
  export type MenuItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem create
   */
  export type MenuItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MenuItem.
     */
    data: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
  }

  /**
   * MenuItem createMany
   */
  export type MenuItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenuItem createManyAndReturn
   */
  export type MenuItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItem update
   */
  export type MenuItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MenuItem.
     */
    data: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
    /**
     * Choose, which MenuItem to update.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem updateMany
   */
  export type MenuItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
  }

  /**
   * MenuItem updateManyAndReturn
   */
  export type MenuItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItem upsert
   */
  export type MenuItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MenuItem to update in case it exists.
     */
    where: MenuItemWhereUniqueInput
    /**
     * In case the MenuItem found by the `where` argument doesn't exist, create a new MenuItem with this data.
     */
    create: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
    /**
     * In case the MenuItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
  }

  /**
   * MenuItem delete
   */
  export type MenuItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter which MenuItem to delete.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem deleteMany
   */
  export type MenuItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItems to delete
     */
    where?: MenuItemWhereInput
    /**
     * Limit how many MenuItems to delete.
     */
    limit?: number
  }

  /**
   * MenuItem without action
   */
  export type MenuItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: MenuItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
  }


  /**
   * Model StoryCard
   */

  export type AggregateStoryCard = {
    _count: StoryCardCountAggregateOutputType | null
    _avg: StoryCardAvgAggregateOutputType | null
    _sum: StoryCardSumAggregateOutputType | null
    _min: StoryCardMinAggregateOutputType | null
    _max: StoryCardMaxAggregateOutputType | null
  }

  export type StoryCardAvgAggregateOutputType = {
    order: number | null
  }

  export type StoryCardSumAggregateOutputType = {
    order: number | null
  }

  export type StoryCardMinAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    title: string | null
    subtitle: string | null
    image: string | null
    visible: boolean | null
    order: number | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoryCardMaxAggregateOutputType = {
    id: string | null
    restaurantId: string | null
    title: string | null
    subtitle: string | null
    image: string | null
    visible: boolean | null
    order: number | null
    isActive: boolean | null
    deletedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoryCardCountAggregateOutputType = {
    id: number
    restaurantId: number
    title: number
    subtitle: number
    image: number
    visible: number
    order: number
    isActive: number
    deletedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StoryCardAvgAggregateInputType = {
    order?: true
  }

  export type StoryCardSumAggregateInputType = {
    order?: true
  }

  export type StoryCardMinAggregateInputType = {
    id?: true
    restaurantId?: true
    title?: true
    subtitle?: true
    image?: true
    visible?: true
    order?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoryCardMaxAggregateInputType = {
    id?: true
    restaurantId?: true
    title?: true
    subtitle?: true
    image?: true
    visible?: true
    order?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoryCardCountAggregateInputType = {
    id?: true
    restaurantId?: true
    title?: true
    subtitle?: true
    image?: true
    visible?: true
    order?: true
    isActive?: true
    deletedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StoryCardAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoryCard to aggregate.
     */
    where?: StoryCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoryCards to fetch.
     */
    orderBy?: StoryCardOrderByWithRelationInput | StoryCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoryCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoryCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoryCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StoryCards
    **/
    _count?: true | StoryCardCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoryCardAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoryCardSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoryCardMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoryCardMaxAggregateInputType
  }

  export type GetStoryCardAggregateType<T extends StoryCardAggregateArgs> = {
        [P in keyof T & keyof AggregateStoryCard]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStoryCard[P]>
      : GetScalarType<T[P], AggregateStoryCard[P]>
  }




  export type StoryCardGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoryCardWhereInput
    orderBy?: StoryCardOrderByWithAggregationInput | StoryCardOrderByWithAggregationInput[]
    by: StoryCardScalarFieldEnum[] | StoryCardScalarFieldEnum
    having?: StoryCardScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoryCardCountAggregateInputType | true
    _avg?: StoryCardAvgAggregateInputType
    _sum?: StoryCardSumAggregateInputType
    _min?: StoryCardMinAggregateInputType
    _max?: StoryCardMaxAggregateInputType
  }

  export type StoryCardGroupByOutputType = {
    id: string
    restaurantId: string
    title: string
    subtitle: string
    image: string | null
    visible: boolean
    order: number
    isActive: boolean
    deletedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: StoryCardCountAggregateOutputType | null
    _avg: StoryCardAvgAggregateOutputType | null
    _sum: StoryCardSumAggregateOutputType | null
    _min: StoryCardMinAggregateOutputType | null
    _max: StoryCardMaxAggregateOutputType | null
  }

  type GetStoryCardGroupByPayload<T extends StoryCardGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoryCardGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoryCardGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoryCardGroupByOutputType[P]>
            : GetScalarType<T[P], StoryCardGroupByOutputType[P]>
        }
      >
    >


  export type StoryCardSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    title?: boolean
    subtitle?: boolean
    image?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storyCard"]>

  export type StoryCardSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    title?: boolean
    subtitle?: boolean
    image?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storyCard"]>

  export type StoryCardSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    restaurantId?: boolean
    title?: boolean
    subtitle?: boolean
    image?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storyCard"]>

  export type StoryCardSelectScalar = {
    id?: boolean
    restaurantId?: boolean
    title?: boolean
    subtitle?: boolean
    image?: boolean
    visible?: boolean
    order?: boolean
    isActive?: boolean
    deletedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StoryCardOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "restaurantId" | "title" | "subtitle" | "image" | "visible" | "order" | "isActive" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["storyCard"]>
  export type StoryCardInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }
  export type StoryCardIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }
  export type StoryCardIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }

  export type $StoryCardPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StoryCard"
    objects: {
      restaurant: Prisma.$RestaurantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      restaurantId: string
      title: string
      subtitle: string
      image: string | null
      visible: boolean
      order: number
      isActive: boolean
      deletedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["storyCard"]>
    composites: {}
  }

  type StoryCardGetPayload<S extends boolean | null | undefined | StoryCardDefaultArgs> = $Result.GetResult<Prisma.$StoryCardPayload, S>

  type StoryCardCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoryCardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoryCardCountAggregateInputType | true
    }

  export interface StoryCardDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StoryCard'], meta: { name: 'StoryCard' } }
    /**
     * Find zero or one StoryCard that matches the filter.
     * @param {StoryCardFindUniqueArgs} args - Arguments to find a StoryCard
     * @example
     * // Get one StoryCard
     * const storyCard = await prisma.storyCard.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoryCardFindUniqueArgs>(args: SelectSubset<T, StoryCardFindUniqueArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StoryCard that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoryCardFindUniqueOrThrowArgs} args - Arguments to find a StoryCard
     * @example
     * // Get one StoryCard
     * const storyCard = await prisma.storyCard.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoryCardFindUniqueOrThrowArgs>(args: SelectSubset<T, StoryCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoryCard that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCardFindFirstArgs} args - Arguments to find a StoryCard
     * @example
     * // Get one StoryCard
     * const storyCard = await prisma.storyCard.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoryCardFindFirstArgs>(args?: SelectSubset<T, StoryCardFindFirstArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoryCard that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCardFindFirstOrThrowArgs} args - Arguments to find a StoryCard
     * @example
     * // Get one StoryCard
     * const storyCard = await prisma.storyCard.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoryCardFindFirstOrThrowArgs>(args?: SelectSubset<T, StoryCardFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StoryCards that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCardFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StoryCards
     * const storyCards = await prisma.storyCard.findMany()
     * 
     * // Get first 10 StoryCards
     * const storyCards = await prisma.storyCard.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storyCardWithIdOnly = await prisma.storyCard.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoryCardFindManyArgs>(args?: SelectSubset<T, StoryCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StoryCard.
     * @param {StoryCardCreateArgs} args - Arguments to create a StoryCard.
     * @example
     * // Create one StoryCard
     * const StoryCard = await prisma.storyCard.create({
     *   data: {
     *     // ... data to create a StoryCard
     *   }
     * })
     * 
     */
    create<T extends StoryCardCreateArgs>(args: SelectSubset<T, StoryCardCreateArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StoryCards.
     * @param {StoryCardCreateManyArgs} args - Arguments to create many StoryCards.
     * @example
     * // Create many StoryCards
     * const storyCard = await prisma.storyCard.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoryCardCreateManyArgs>(args?: SelectSubset<T, StoryCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StoryCards and returns the data saved in the database.
     * @param {StoryCardCreateManyAndReturnArgs} args - Arguments to create many StoryCards.
     * @example
     * // Create many StoryCards
     * const storyCard = await prisma.storyCard.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StoryCards and only return the `id`
     * const storyCardWithIdOnly = await prisma.storyCard.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoryCardCreateManyAndReturnArgs>(args?: SelectSubset<T, StoryCardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StoryCard.
     * @param {StoryCardDeleteArgs} args - Arguments to delete one StoryCard.
     * @example
     * // Delete one StoryCard
     * const StoryCard = await prisma.storyCard.delete({
     *   where: {
     *     // ... filter to delete one StoryCard
     *   }
     * })
     * 
     */
    delete<T extends StoryCardDeleteArgs>(args: SelectSubset<T, StoryCardDeleteArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StoryCard.
     * @param {StoryCardUpdateArgs} args - Arguments to update one StoryCard.
     * @example
     * // Update one StoryCard
     * const storyCard = await prisma.storyCard.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoryCardUpdateArgs>(args: SelectSubset<T, StoryCardUpdateArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StoryCards.
     * @param {StoryCardDeleteManyArgs} args - Arguments to filter StoryCards to delete.
     * @example
     * // Delete a few StoryCards
     * const { count } = await prisma.storyCard.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoryCardDeleteManyArgs>(args?: SelectSubset<T, StoryCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoryCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCardUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StoryCards
     * const storyCard = await prisma.storyCard.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoryCardUpdateManyArgs>(args: SelectSubset<T, StoryCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoryCards and returns the data updated in the database.
     * @param {StoryCardUpdateManyAndReturnArgs} args - Arguments to update many StoryCards.
     * @example
     * // Update many StoryCards
     * const storyCard = await prisma.storyCard.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StoryCards and only return the `id`
     * const storyCardWithIdOnly = await prisma.storyCard.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoryCardUpdateManyAndReturnArgs>(args: SelectSubset<T, StoryCardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StoryCard.
     * @param {StoryCardUpsertArgs} args - Arguments to update or create a StoryCard.
     * @example
     * // Update or create a StoryCard
     * const storyCard = await prisma.storyCard.upsert({
     *   create: {
     *     // ... data to create a StoryCard
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StoryCard we want to update
     *   }
     * })
     */
    upsert<T extends StoryCardUpsertArgs>(args: SelectSubset<T, StoryCardUpsertArgs<ExtArgs>>): Prisma__StoryCardClient<$Result.GetResult<Prisma.$StoryCardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StoryCards.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCardCountArgs} args - Arguments to filter StoryCards to count.
     * @example
     * // Count the number of StoryCards
     * const count = await prisma.storyCard.count({
     *   where: {
     *     // ... the filter for the StoryCards we want to count
     *   }
     * })
    **/
    count<T extends StoryCardCountArgs>(
      args?: Subset<T, StoryCardCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoryCardCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StoryCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCardAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoryCardAggregateArgs>(args: Subset<T, StoryCardAggregateArgs>): Prisma.PrismaPromise<GetStoryCardAggregateType<T>>

    /**
     * Group by StoryCard.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoryCardGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoryCardGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoryCardGroupByArgs['orderBy'] }
        : { orderBy?: StoryCardGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoryCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoryCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StoryCard model
   */
  readonly fields: StoryCardFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StoryCard.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoryCardClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    restaurant<T extends RestaurantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantDefaultArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StoryCard model
   */
  interface StoryCardFieldRefs {
    readonly id: FieldRef<"StoryCard", 'String'>
    readonly restaurantId: FieldRef<"StoryCard", 'String'>
    readonly title: FieldRef<"StoryCard", 'String'>
    readonly subtitle: FieldRef<"StoryCard", 'String'>
    readonly image: FieldRef<"StoryCard", 'String'>
    readonly visible: FieldRef<"StoryCard", 'Boolean'>
    readonly order: FieldRef<"StoryCard", 'Int'>
    readonly isActive: FieldRef<"StoryCard", 'Boolean'>
    readonly deletedAt: FieldRef<"StoryCard", 'DateTime'>
    readonly createdAt: FieldRef<"StoryCard", 'DateTime'>
    readonly updatedAt: FieldRef<"StoryCard", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StoryCard findUnique
   */
  export type StoryCardFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * Filter, which StoryCard to fetch.
     */
    where: StoryCardWhereUniqueInput
  }

  /**
   * StoryCard findUniqueOrThrow
   */
  export type StoryCardFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * Filter, which StoryCard to fetch.
     */
    where: StoryCardWhereUniqueInput
  }

  /**
   * StoryCard findFirst
   */
  export type StoryCardFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * Filter, which StoryCard to fetch.
     */
    where?: StoryCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoryCards to fetch.
     */
    orderBy?: StoryCardOrderByWithRelationInput | StoryCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoryCards.
     */
    cursor?: StoryCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoryCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoryCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoryCards.
     */
    distinct?: StoryCardScalarFieldEnum | StoryCardScalarFieldEnum[]
  }

  /**
   * StoryCard findFirstOrThrow
   */
  export type StoryCardFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * Filter, which StoryCard to fetch.
     */
    where?: StoryCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoryCards to fetch.
     */
    orderBy?: StoryCardOrderByWithRelationInput | StoryCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoryCards.
     */
    cursor?: StoryCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoryCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoryCards.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoryCards.
     */
    distinct?: StoryCardScalarFieldEnum | StoryCardScalarFieldEnum[]
  }

  /**
   * StoryCard findMany
   */
  export type StoryCardFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * Filter, which StoryCards to fetch.
     */
    where?: StoryCardWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoryCards to fetch.
     */
    orderBy?: StoryCardOrderByWithRelationInput | StoryCardOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StoryCards.
     */
    cursor?: StoryCardWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoryCards from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoryCards.
     */
    skip?: number
    distinct?: StoryCardScalarFieldEnum | StoryCardScalarFieldEnum[]
  }

  /**
   * StoryCard create
   */
  export type StoryCardCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * The data needed to create a StoryCard.
     */
    data: XOR<StoryCardCreateInput, StoryCardUncheckedCreateInput>
  }

  /**
   * StoryCard createMany
   */
  export type StoryCardCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StoryCards.
     */
    data: StoryCardCreateManyInput | StoryCardCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoryCard createManyAndReturn
   */
  export type StoryCardCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * The data used to create many StoryCards.
     */
    data: StoryCardCreateManyInput | StoryCardCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoryCard update
   */
  export type StoryCardUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * The data needed to update a StoryCard.
     */
    data: XOR<StoryCardUpdateInput, StoryCardUncheckedUpdateInput>
    /**
     * Choose, which StoryCard to update.
     */
    where: StoryCardWhereUniqueInput
  }

  /**
   * StoryCard updateMany
   */
  export type StoryCardUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StoryCards.
     */
    data: XOR<StoryCardUpdateManyMutationInput, StoryCardUncheckedUpdateManyInput>
    /**
     * Filter which StoryCards to update
     */
    where?: StoryCardWhereInput
    /**
     * Limit how many StoryCards to update.
     */
    limit?: number
  }

  /**
   * StoryCard updateManyAndReturn
   */
  export type StoryCardUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * The data used to update StoryCards.
     */
    data: XOR<StoryCardUpdateManyMutationInput, StoryCardUncheckedUpdateManyInput>
    /**
     * Filter which StoryCards to update
     */
    where?: StoryCardWhereInput
    /**
     * Limit how many StoryCards to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoryCard upsert
   */
  export type StoryCardUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * The filter to search for the StoryCard to update in case it exists.
     */
    where: StoryCardWhereUniqueInput
    /**
     * In case the StoryCard found by the `where` argument doesn't exist, create a new StoryCard with this data.
     */
    create: XOR<StoryCardCreateInput, StoryCardUncheckedCreateInput>
    /**
     * In case the StoryCard was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoryCardUpdateInput, StoryCardUncheckedUpdateInput>
  }

  /**
   * StoryCard delete
   */
  export type StoryCardDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
    /**
     * Filter which StoryCard to delete.
     */
    where: StoryCardWhereUniqueInput
  }

  /**
   * StoryCard deleteMany
   */
  export type StoryCardDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoryCards to delete
     */
    where?: StoryCardWhereInput
    /**
     * Limit how many StoryCards to delete.
     */
    limit?: number
  }

  /**
   * StoryCard without action
   */
  export type StoryCardDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoryCard
     */
    select?: StoryCardSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoryCard
     */
    omit?: StoryCardOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoryCardInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RestaurantScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    phone: 'phone',
    logo: 'logo',
    heroImage: 'heroImage',
    tagline: 'tagline',
    story: 'story',
    description: 'description',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RestaurantScalarFieldEnum = (typeof RestaurantScalarFieldEnum)[keyof typeof RestaurantScalarFieldEnum]


  export const ScheduleScalarFieldEnum: {
    id: 'id',
    restaurantId: 'restaurantId',
    dayOfWeek: 'dayOfWeek',
    opensAt: 'opensAt',
    closesAt: 'closesAt',
    isClosed: 'isClosed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ScheduleScalarFieldEnum = (typeof ScheduleScalarFieldEnum)[keyof typeof ScheduleScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    restaurantId: 'restaurantId',
    name: 'name',
    visible: 'visible',
    order: 'order',
    isActive: 'isActive',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const MenuItemScalarFieldEnum: {
    id: 'id',
    restaurantId: 'restaurantId',
    categoryId: 'categoryId',
    name: 'name',
    description: 'description',
    price: 'price',
    image: 'image',
    available: 'available',
    isActive: 'isActive',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MenuItemScalarFieldEnum = (typeof MenuItemScalarFieldEnum)[keyof typeof MenuItemScalarFieldEnum]


  export const StoryCardScalarFieldEnum: {
    id: 'id',
    restaurantId: 'restaurantId',
    title: 'title',
    subtitle: 'subtitle',
    image: 'image',
    visible: 'visible',
    order: 'order',
    isActive: 'isActive',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StoryCardScalarFieldEnum = (typeof StoryCardScalarFieldEnum)[keyof typeof StoryCardScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RestaurantWhereInput = {
    AND?: RestaurantWhereInput | RestaurantWhereInput[]
    OR?: RestaurantWhereInput[]
    NOT?: RestaurantWhereInput | RestaurantWhereInput[]
    id?: StringFilter<"Restaurant"> | string
    slug?: StringFilter<"Restaurant"> | string
    name?: StringFilter<"Restaurant"> | string
    phone?: StringNullableFilter<"Restaurant"> | string | null
    logo?: StringNullableFilter<"Restaurant"> | string | null
    heroImage?: StringNullableFilter<"Restaurant"> | string | null
    tagline?: StringNullableFilter<"Restaurant"> | string | null
    story?: StringNullableFilter<"Restaurant"> | string | null
    description?: StringNullableFilter<"Restaurant"> | string | null
    isActive?: BoolFilter<"Restaurant"> | boolean
    createdAt?: DateTimeFilter<"Restaurant"> | Date | string
    updatedAt?: DateTimeFilter<"Restaurant"> | Date | string
    schedules?: ScheduleListRelationFilter
    categories?: CategoryListRelationFilter
    menuItems?: MenuItemListRelationFilter
    storyCards?: StoryCardListRelationFilter
  }

  export type RestaurantOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    heroImage?: SortOrderInput | SortOrder
    tagline?: SortOrderInput | SortOrder
    story?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    schedules?: ScheduleOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
    menuItems?: MenuItemOrderByRelationAggregateInput
    storyCards?: StoryCardOrderByRelationAggregateInput
  }

  export type RestaurantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: RestaurantWhereInput | RestaurantWhereInput[]
    OR?: RestaurantWhereInput[]
    NOT?: RestaurantWhereInput | RestaurantWhereInput[]
    name?: StringFilter<"Restaurant"> | string
    phone?: StringNullableFilter<"Restaurant"> | string | null
    logo?: StringNullableFilter<"Restaurant"> | string | null
    heroImage?: StringNullableFilter<"Restaurant"> | string | null
    tagline?: StringNullableFilter<"Restaurant"> | string | null
    story?: StringNullableFilter<"Restaurant"> | string | null
    description?: StringNullableFilter<"Restaurant"> | string | null
    isActive?: BoolFilter<"Restaurant"> | boolean
    createdAt?: DateTimeFilter<"Restaurant"> | Date | string
    updatedAt?: DateTimeFilter<"Restaurant"> | Date | string
    schedules?: ScheduleListRelationFilter
    categories?: CategoryListRelationFilter
    menuItems?: MenuItemListRelationFilter
    storyCards?: StoryCardListRelationFilter
  }, "id" | "slug">

  export type RestaurantOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    heroImage?: SortOrderInput | SortOrder
    tagline?: SortOrderInput | SortOrder
    story?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RestaurantCountOrderByAggregateInput
    _max?: RestaurantMaxOrderByAggregateInput
    _min?: RestaurantMinOrderByAggregateInput
  }

  export type RestaurantScalarWhereWithAggregatesInput = {
    AND?: RestaurantScalarWhereWithAggregatesInput | RestaurantScalarWhereWithAggregatesInput[]
    OR?: RestaurantScalarWhereWithAggregatesInput[]
    NOT?: RestaurantScalarWhereWithAggregatesInput | RestaurantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Restaurant"> | string
    slug?: StringWithAggregatesFilter<"Restaurant"> | string
    name?: StringWithAggregatesFilter<"Restaurant"> | string
    phone?: StringNullableWithAggregatesFilter<"Restaurant"> | string | null
    logo?: StringNullableWithAggregatesFilter<"Restaurant"> | string | null
    heroImage?: StringNullableWithAggregatesFilter<"Restaurant"> | string | null
    tagline?: StringNullableWithAggregatesFilter<"Restaurant"> | string | null
    story?: StringNullableWithAggregatesFilter<"Restaurant"> | string | null
    description?: StringNullableWithAggregatesFilter<"Restaurant"> | string | null
    isActive?: BoolWithAggregatesFilter<"Restaurant"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Restaurant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Restaurant"> | Date | string
  }

  export type ScheduleWhereInput = {
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    id?: StringFilter<"Schedule"> | string
    restaurantId?: StringFilter<"Schedule"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"Schedule"> | $Enums.DayOfWeek
    opensAt?: StringFilter<"Schedule"> | string
    closesAt?: StringFilter<"Schedule"> | string
    isClosed?: BoolFilter<"Schedule"> | boolean
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
  }

  export type ScheduleOrderByWithRelationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    dayOfWeek?: SortOrder
    opensAt?: SortOrder
    closesAt?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    restaurant?: RestaurantOrderByWithRelationInput
  }

  export type ScheduleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    restaurantId_dayOfWeek?: ScheduleRestaurantIdDayOfWeekCompoundUniqueInput
    AND?: ScheduleWhereInput | ScheduleWhereInput[]
    OR?: ScheduleWhereInput[]
    NOT?: ScheduleWhereInput | ScheduleWhereInput[]
    restaurantId?: StringFilter<"Schedule"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"Schedule"> | $Enums.DayOfWeek
    opensAt?: StringFilter<"Schedule"> | string
    closesAt?: StringFilter<"Schedule"> | string
    isClosed?: BoolFilter<"Schedule"> | boolean
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
  }, "id" | "restaurantId_dayOfWeek">

  export type ScheduleOrderByWithAggregationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    dayOfWeek?: SortOrder
    opensAt?: SortOrder
    closesAt?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ScheduleCountOrderByAggregateInput
    _max?: ScheduleMaxOrderByAggregateInput
    _min?: ScheduleMinOrderByAggregateInput
  }

  export type ScheduleScalarWhereWithAggregatesInput = {
    AND?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    OR?: ScheduleScalarWhereWithAggregatesInput[]
    NOT?: ScheduleScalarWhereWithAggregatesInput | ScheduleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Schedule"> | string
    restaurantId?: StringWithAggregatesFilter<"Schedule"> | string
    dayOfWeek?: EnumDayOfWeekWithAggregatesFilter<"Schedule"> | $Enums.DayOfWeek
    opensAt?: StringWithAggregatesFilter<"Schedule"> | string
    closesAt?: StringWithAggregatesFilter<"Schedule"> | string
    isClosed?: BoolWithAggregatesFilter<"Schedule"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Schedule"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    restaurantId?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    visible?: BoolFilter<"Category"> | boolean
    order?: IntFilter<"Category"> | number
    isActive?: BoolFilter<"Category"> | boolean
    deletedAt?: DateTimeNullableFilter<"Category"> | Date | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    menuItems?: MenuItemListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    name?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    restaurant?: RestaurantOrderByWithRelationInput
    menuItems?: MenuItemOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    restaurantId_name?: CategoryRestaurantIdNameCompoundUniqueInput
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    restaurantId?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    visible?: BoolFilter<"Category"> | boolean
    order?: IntFilter<"Category"> | number
    isActive?: BoolFilter<"Category"> | boolean
    deletedAt?: DateTimeNullableFilter<"Category"> | Date | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    menuItems?: MenuItemListRelationFilter
  }, "id" | "restaurantId_name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    name?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    restaurantId?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    visible?: BoolWithAggregatesFilter<"Category"> | boolean
    order?: IntWithAggregatesFilter<"Category"> | number
    isActive?: BoolWithAggregatesFilter<"Category"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Category"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type MenuItemWhereInput = {
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    id?: StringFilter<"MenuItem"> | string
    restaurantId?: StringFilter<"MenuItem"> | string
    categoryId?: StringFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringFilter<"MenuItem"> | string
    price?: DecimalFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    image?: StringNullableFilter<"MenuItem"> | string | null
    available?: BoolFilter<"MenuItem"> | boolean
    isActive?: BoolFilter<"MenuItem"> | boolean
    deletedAt?: DateTimeNullableFilter<"MenuItem"> | Date | string | null
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"MenuItem"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type MenuItemOrderByWithRelationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrderInput | SortOrder
    available?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    restaurant?: RestaurantOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type MenuItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    restaurantId?: StringFilter<"MenuItem"> | string
    categoryId?: StringFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringFilter<"MenuItem"> | string
    price?: DecimalFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    image?: StringNullableFilter<"MenuItem"> | string | null
    available?: BoolFilter<"MenuItem"> | boolean
    isActive?: BoolFilter<"MenuItem"> | boolean
    deletedAt?: DateTimeNullableFilter<"MenuItem"> | Date | string | null
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"MenuItem"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id">

  export type MenuItemOrderByWithAggregationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrderInput | SortOrder
    available?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MenuItemCountOrderByAggregateInput
    _avg?: MenuItemAvgOrderByAggregateInput
    _max?: MenuItemMaxOrderByAggregateInput
    _min?: MenuItemMinOrderByAggregateInput
    _sum?: MenuItemSumOrderByAggregateInput
  }

  export type MenuItemScalarWhereWithAggregatesInput = {
    AND?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    OR?: MenuItemScalarWhereWithAggregatesInput[]
    NOT?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MenuItem"> | string
    restaurantId?: StringWithAggregatesFilter<"MenuItem"> | string
    categoryId?: StringWithAggregatesFilter<"MenuItem"> | string
    name?: StringWithAggregatesFilter<"MenuItem"> | string
    description?: StringWithAggregatesFilter<"MenuItem"> | string
    price?: DecimalWithAggregatesFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    image?: StringNullableWithAggregatesFilter<"MenuItem"> | string | null
    available?: BoolWithAggregatesFilter<"MenuItem"> | boolean
    isActive?: BoolWithAggregatesFilter<"MenuItem"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"MenuItem"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MenuItem"> | Date | string
  }

  export type StoryCardWhereInput = {
    AND?: StoryCardWhereInput | StoryCardWhereInput[]
    OR?: StoryCardWhereInput[]
    NOT?: StoryCardWhereInput | StoryCardWhereInput[]
    id?: StringFilter<"StoryCard"> | string
    restaurantId?: StringFilter<"StoryCard"> | string
    title?: StringFilter<"StoryCard"> | string
    subtitle?: StringFilter<"StoryCard"> | string
    image?: StringNullableFilter<"StoryCard"> | string | null
    visible?: BoolFilter<"StoryCard"> | boolean
    order?: IntFilter<"StoryCard"> | number
    isActive?: BoolFilter<"StoryCard"> | boolean
    deletedAt?: DateTimeNullableFilter<"StoryCard"> | Date | string | null
    createdAt?: DateTimeFilter<"StoryCard"> | Date | string
    updatedAt?: DateTimeFilter<"StoryCard"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
  }

  export type StoryCardOrderByWithRelationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    image?: SortOrderInput | SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    restaurant?: RestaurantOrderByWithRelationInput
  }

  export type StoryCardWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    restaurantId_title?: StoryCardRestaurantIdTitleCompoundUniqueInput
    AND?: StoryCardWhereInput | StoryCardWhereInput[]
    OR?: StoryCardWhereInput[]
    NOT?: StoryCardWhereInput | StoryCardWhereInput[]
    restaurantId?: StringFilter<"StoryCard"> | string
    title?: StringFilter<"StoryCard"> | string
    subtitle?: StringFilter<"StoryCard"> | string
    image?: StringNullableFilter<"StoryCard"> | string | null
    visible?: BoolFilter<"StoryCard"> | boolean
    order?: IntFilter<"StoryCard"> | number
    isActive?: BoolFilter<"StoryCard"> | boolean
    deletedAt?: DateTimeNullableFilter<"StoryCard"> | Date | string | null
    createdAt?: DateTimeFilter<"StoryCard"> | Date | string
    updatedAt?: DateTimeFilter<"StoryCard"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
  }, "id" | "restaurantId_title">

  export type StoryCardOrderByWithAggregationInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    image?: SortOrderInput | SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StoryCardCountOrderByAggregateInput
    _avg?: StoryCardAvgOrderByAggregateInput
    _max?: StoryCardMaxOrderByAggregateInput
    _min?: StoryCardMinOrderByAggregateInput
    _sum?: StoryCardSumOrderByAggregateInput
  }

  export type StoryCardScalarWhereWithAggregatesInput = {
    AND?: StoryCardScalarWhereWithAggregatesInput | StoryCardScalarWhereWithAggregatesInput[]
    OR?: StoryCardScalarWhereWithAggregatesInput[]
    NOT?: StoryCardScalarWhereWithAggregatesInput | StoryCardScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StoryCard"> | string
    restaurantId?: StringWithAggregatesFilter<"StoryCard"> | string
    title?: StringWithAggregatesFilter<"StoryCard"> | string
    subtitle?: StringWithAggregatesFilter<"StoryCard"> | string
    image?: StringNullableWithAggregatesFilter<"StoryCard"> | string | null
    visible?: BoolWithAggregatesFilter<"StoryCard"> | boolean
    order?: IntWithAggregatesFilter<"StoryCard"> | number
    isActive?: BoolWithAggregatesFilter<"StoryCard"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"StoryCard"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StoryCard"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StoryCard"> | Date | string
  }

  export type RestaurantCreateInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutRestaurantInput
    categories?: CategoryCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRestaurantInput
    categories?: CategoryUncheckedCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutRestaurantNestedInput
    categories?: CategoryUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRestaurantNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantCreateManyInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    opensAt: string
    closesAt: string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutSchedulesInput
  }

  export type ScheduleUncheckedCreateInput = {
    id?: string
    restaurantId: string
    dayOfWeek: $Enums.DayOfWeek
    opensAt: string
    closesAt: string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    opensAt?: StringFieldUpdateOperationsInput | string
    closesAt?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutSchedulesNestedInput
  }

  export type ScheduleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    opensAt?: StringFieldUpdateOperationsInput | string
    closesAt?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleCreateManyInput = {
    id?: string
    restaurantId: string
    dayOfWeek: $Enums.DayOfWeek
    opensAt: string
    closesAt: string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    opensAt?: StringFieldUpdateOperationsInput | string
    closesAt?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    opensAt?: StringFieldUpdateOperationsInput | string
    closesAt?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutCategoriesInput
    menuItems?: MenuItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    restaurantId: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutCategoriesNestedInput
    menuItems?: MenuItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    menuItems?: MenuItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    restaurantId: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateInput = {
    id?: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutMenuItemsInput
    category: CategoryCreateNestedOneWithoutMenuItemsInput
  }

  export type MenuItemUncheckedCreateInput = {
    id?: string
    restaurantId: string
    categoryId: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutMenuItemsNestedInput
    category?: CategoryUpdateOneRequiredWithoutMenuItemsNestedInput
  }

  export type MenuItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateManyInput = {
    id?: string
    restaurantId: string
    categoryId: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoryCardCreateInput = {
    id?: string
    title: string
    subtitle: string
    image?: string | null
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutStoryCardsInput
  }

  export type StoryCardUncheckedCreateInput = {
    id?: string
    restaurantId: string
    title: string
    subtitle: string
    image?: string | null
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoryCardUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutStoryCardsNestedInput
  }

  export type StoryCardUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoryCardCreateManyInput = {
    id?: string
    restaurantId: string
    title: string
    subtitle: string
    image?: string | null
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoryCardUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoryCardUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ScheduleListRelationFilter = {
    every?: ScheduleWhereInput
    some?: ScheduleWhereInput
    none?: ScheduleWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type MenuItemListRelationFilter = {
    every?: MenuItemWhereInput
    some?: MenuItemWhereInput
    none?: MenuItemWhereInput
  }

  export type StoryCardListRelationFilter = {
    every?: StoryCardWhereInput
    some?: StoryCardWhereInput
    none?: StoryCardWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ScheduleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenuItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoryCardOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RestaurantCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    heroImage?: SortOrder
    tagline?: SortOrder
    story?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    heroImage?: SortOrder
    tagline?: SortOrder
    story?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    logo?: SortOrder
    heroImage?: SortOrder
    tagline?: SortOrder
    story?: SortOrder
    description?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type RestaurantScalarRelationFilter = {
    is?: RestaurantWhereInput
    isNot?: RestaurantWhereInput
  }

  export type ScheduleRestaurantIdDayOfWeekCompoundUniqueInput = {
    restaurantId: string
    dayOfWeek: $Enums.DayOfWeek
  }

  export type ScheduleCountOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    dayOfWeek?: SortOrder
    opensAt?: SortOrder
    closesAt?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleMaxOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    dayOfWeek?: SortOrder
    opensAt?: SortOrder
    closesAt?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ScheduleMinOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    dayOfWeek?: SortOrder
    opensAt?: SortOrder
    closesAt?: SortOrder
    isClosed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CategoryRestaurantIdNameCompoundUniqueInput = {
    restaurantId: string
    name: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    name?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    name?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    name?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type MenuItemCountOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    available?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuItemAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type MenuItemMaxOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    available?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuItemMinOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    categoryId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    image?: SortOrder
    available?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MenuItemSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type StoryCardRestaurantIdTitleCompoundUniqueInput = {
    restaurantId: string
    title: string
  }

  export type StoryCardCountOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoryCardAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type StoryCardMaxOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoryCardMinOrderByAggregateInput = {
    id?: SortOrder
    restaurantId?: SortOrder
    title?: SortOrder
    subtitle?: SortOrder
    image?: SortOrder
    visible?: SortOrder
    order?: SortOrder
    isActive?: SortOrder
    deletedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoryCardSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ScheduleCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<ScheduleCreateWithoutRestaurantInput, ScheduleUncheckedCreateWithoutRestaurantInput> | ScheduleCreateWithoutRestaurantInput[] | ScheduleUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRestaurantInput | ScheduleCreateOrConnectWithoutRestaurantInput[]
    createMany?: ScheduleCreateManyRestaurantInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<CategoryCreateWithoutRestaurantInput, CategoryUncheckedCreateWithoutRestaurantInput> | CategoryCreateWithoutRestaurantInput[] | CategoryUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRestaurantInput | CategoryCreateOrConnectWithoutRestaurantInput[]
    createMany?: CategoryCreateManyRestaurantInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type MenuItemCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<MenuItemCreateWithoutRestaurantInput, MenuItemUncheckedCreateWithoutRestaurantInput> | MenuItemCreateWithoutRestaurantInput[] | MenuItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutRestaurantInput | MenuItemCreateOrConnectWithoutRestaurantInput[]
    createMany?: MenuItemCreateManyRestaurantInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type StoryCardCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<StoryCardCreateWithoutRestaurantInput, StoryCardUncheckedCreateWithoutRestaurantInput> | StoryCardCreateWithoutRestaurantInput[] | StoryCardUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: StoryCardCreateOrConnectWithoutRestaurantInput | StoryCardCreateOrConnectWithoutRestaurantInput[]
    createMany?: StoryCardCreateManyRestaurantInputEnvelope
    connect?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
  }

  export type ScheduleUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<ScheduleCreateWithoutRestaurantInput, ScheduleUncheckedCreateWithoutRestaurantInput> | ScheduleCreateWithoutRestaurantInput[] | ScheduleUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRestaurantInput | ScheduleCreateOrConnectWithoutRestaurantInput[]
    createMany?: ScheduleCreateManyRestaurantInputEnvelope
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<CategoryCreateWithoutRestaurantInput, CategoryUncheckedCreateWithoutRestaurantInput> | CategoryCreateWithoutRestaurantInput[] | CategoryUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRestaurantInput | CategoryCreateOrConnectWithoutRestaurantInput[]
    createMany?: CategoryCreateManyRestaurantInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type MenuItemUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<MenuItemCreateWithoutRestaurantInput, MenuItemUncheckedCreateWithoutRestaurantInput> | MenuItemCreateWithoutRestaurantInput[] | MenuItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutRestaurantInput | MenuItemCreateOrConnectWithoutRestaurantInput[]
    createMany?: MenuItemCreateManyRestaurantInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type StoryCardUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<StoryCardCreateWithoutRestaurantInput, StoryCardUncheckedCreateWithoutRestaurantInput> | StoryCardCreateWithoutRestaurantInput[] | StoryCardUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: StoryCardCreateOrConnectWithoutRestaurantInput | StoryCardCreateOrConnectWithoutRestaurantInput[]
    createMany?: StoryCardCreateManyRestaurantInputEnvelope
    connect?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ScheduleUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<ScheduleCreateWithoutRestaurantInput, ScheduleUncheckedCreateWithoutRestaurantInput> | ScheduleCreateWithoutRestaurantInput[] | ScheduleUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRestaurantInput | ScheduleCreateOrConnectWithoutRestaurantInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutRestaurantInput | ScheduleUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: ScheduleCreateManyRestaurantInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutRestaurantInput | ScheduleUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutRestaurantInput | ScheduleUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<CategoryCreateWithoutRestaurantInput, CategoryUncheckedCreateWithoutRestaurantInput> | CategoryCreateWithoutRestaurantInput[] | CategoryUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRestaurantInput | CategoryCreateOrConnectWithoutRestaurantInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutRestaurantInput | CategoryUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: CategoryCreateManyRestaurantInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutRestaurantInput | CategoryUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutRestaurantInput | CategoryUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type MenuItemUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<MenuItemCreateWithoutRestaurantInput, MenuItemUncheckedCreateWithoutRestaurantInput> | MenuItemCreateWithoutRestaurantInput[] | MenuItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutRestaurantInput | MenuItemCreateOrConnectWithoutRestaurantInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutRestaurantInput | MenuItemUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: MenuItemCreateManyRestaurantInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutRestaurantInput | MenuItemUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutRestaurantInput | MenuItemUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type StoryCardUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<StoryCardCreateWithoutRestaurantInput, StoryCardUncheckedCreateWithoutRestaurantInput> | StoryCardCreateWithoutRestaurantInput[] | StoryCardUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: StoryCardCreateOrConnectWithoutRestaurantInput | StoryCardCreateOrConnectWithoutRestaurantInput[]
    upsert?: StoryCardUpsertWithWhereUniqueWithoutRestaurantInput | StoryCardUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: StoryCardCreateManyRestaurantInputEnvelope
    set?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    disconnect?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    delete?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    connect?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    update?: StoryCardUpdateWithWhereUniqueWithoutRestaurantInput | StoryCardUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: StoryCardUpdateManyWithWhereWithoutRestaurantInput | StoryCardUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: StoryCardScalarWhereInput | StoryCardScalarWhereInput[]
  }

  export type ScheduleUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<ScheduleCreateWithoutRestaurantInput, ScheduleUncheckedCreateWithoutRestaurantInput> | ScheduleCreateWithoutRestaurantInput[] | ScheduleUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: ScheduleCreateOrConnectWithoutRestaurantInput | ScheduleCreateOrConnectWithoutRestaurantInput[]
    upsert?: ScheduleUpsertWithWhereUniqueWithoutRestaurantInput | ScheduleUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: ScheduleCreateManyRestaurantInputEnvelope
    set?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    disconnect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    delete?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    connect?: ScheduleWhereUniqueInput | ScheduleWhereUniqueInput[]
    update?: ScheduleUpdateWithWhereUniqueWithoutRestaurantInput | ScheduleUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: ScheduleUpdateManyWithWhereWithoutRestaurantInput | ScheduleUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<CategoryCreateWithoutRestaurantInput, CategoryUncheckedCreateWithoutRestaurantInput> | CategoryCreateWithoutRestaurantInput[] | CategoryUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutRestaurantInput | CategoryCreateOrConnectWithoutRestaurantInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutRestaurantInput | CategoryUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: CategoryCreateManyRestaurantInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutRestaurantInput | CategoryUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutRestaurantInput | CategoryUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<MenuItemCreateWithoutRestaurantInput, MenuItemUncheckedCreateWithoutRestaurantInput> | MenuItemCreateWithoutRestaurantInput[] | MenuItemUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutRestaurantInput | MenuItemCreateOrConnectWithoutRestaurantInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutRestaurantInput | MenuItemUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: MenuItemCreateManyRestaurantInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutRestaurantInput | MenuItemUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutRestaurantInput | MenuItemUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type StoryCardUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<StoryCardCreateWithoutRestaurantInput, StoryCardUncheckedCreateWithoutRestaurantInput> | StoryCardCreateWithoutRestaurantInput[] | StoryCardUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: StoryCardCreateOrConnectWithoutRestaurantInput | StoryCardCreateOrConnectWithoutRestaurantInput[]
    upsert?: StoryCardUpsertWithWhereUniqueWithoutRestaurantInput | StoryCardUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: StoryCardCreateManyRestaurantInputEnvelope
    set?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    disconnect?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    delete?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    connect?: StoryCardWhereUniqueInput | StoryCardWhereUniqueInput[]
    update?: StoryCardUpdateWithWhereUniqueWithoutRestaurantInput | StoryCardUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: StoryCardUpdateManyWithWhereWithoutRestaurantInput | StoryCardUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: StoryCardScalarWhereInput | StoryCardScalarWhereInput[]
  }

  export type RestaurantCreateNestedOneWithoutSchedulesInput = {
    create?: XOR<RestaurantCreateWithoutSchedulesInput, RestaurantUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutSchedulesInput
    connect?: RestaurantWhereUniqueInput
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type RestaurantUpdateOneRequiredWithoutSchedulesNestedInput = {
    create?: XOR<RestaurantCreateWithoutSchedulesInput, RestaurantUncheckedCreateWithoutSchedulesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutSchedulesInput
    upsert?: RestaurantUpsertWithoutSchedulesInput
    connect?: RestaurantWhereUniqueInput
    update?: XOR<XOR<RestaurantUpdateToOneWithWhereWithoutSchedulesInput, RestaurantUpdateWithoutSchedulesInput>, RestaurantUncheckedUpdateWithoutSchedulesInput>
  }

  export type RestaurantCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<RestaurantCreateWithoutCategoriesInput, RestaurantUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutCategoriesInput
    connect?: RestaurantWhereUniqueInput
  }

  export type MenuItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type MenuItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RestaurantUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<RestaurantCreateWithoutCategoriesInput, RestaurantUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutCategoriesInput
    upsert?: RestaurantUpsertWithoutCategoriesInput
    connect?: RestaurantWhereUniqueInput
    update?: XOR<XOR<RestaurantUpdateToOneWithWhereWithoutCategoriesInput, RestaurantUpdateWithoutCategoriesInput>, RestaurantUncheckedUpdateWithoutCategoriesInput>
  }

  export type MenuItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutCategoryInput | MenuItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutCategoryInput | MenuItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutCategoryInput | MenuItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type MenuItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutCategoryInput | MenuItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutCategoryInput | MenuItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutCategoryInput | MenuItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type RestaurantCreateNestedOneWithoutMenuItemsInput = {
    create?: XOR<RestaurantCreateWithoutMenuItemsInput, RestaurantUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutMenuItemsInput
    connect?: RestaurantWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutMenuItemsInput = {
    create?: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutMenuItemsInput
    connect?: CategoryWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type RestaurantUpdateOneRequiredWithoutMenuItemsNestedInput = {
    create?: XOR<RestaurantCreateWithoutMenuItemsInput, RestaurantUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutMenuItemsInput
    upsert?: RestaurantUpsertWithoutMenuItemsInput
    connect?: RestaurantWhereUniqueInput
    update?: XOR<XOR<RestaurantUpdateToOneWithWhereWithoutMenuItemsInput, RestaurantUpdateWithoutMenuItemsInput>, RestaurantUncheckedUpdateWithoutMenuItemsInput>
  }

  export type CategoryUpdateOneRequiredWithoutMenuItemsNestedInput = {
    create?: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutMenuItemsInput
    upsert?: CategoryUpsertWithoutMenuItemsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutMenuItemsInput, CategoryUpdateWithoutMenuItemsInput>, CategoryUncheckedUpdateWithoutMenuItemsInput>
  }

  export type RestaurantCreateNestedOneWithoutStoryCardsInput = {
    create?: XOR<RestaurantCreateWithoutStoryCardsInput, RestaurantUncheckedCreateWithoutStoryCardsInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutStoryCardsInput
    connect?: RestaurantWhereUniqueInput
  }

  export type RestaurantUpdateOneRequiredWithoutStoryCardsNestedInput = {
    create?: XOR<RestaurantCreateWithoutStoryCardsInput, RestaurantUncheckedCreateWithoutStoryCardsInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutStoryCardsInput
    upsert?: RestaurantUpsertWithoutStoryCardsInput
    connect?: RestaurantWhereUniqueInput
    update?: XOR<XOR<RestaurantUpdateToOneWithWhereWithoutStoryCardsInput, RestaurantUpdateWithoutStoryCardsInput>, RestaurantUncheckedUpdateWithoutStoryCardsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type ScheduleCreateWithoutRestaurantInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    opensAt: string
    closesAt: string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUncheckedCreateWithoutRestaurantInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    opensAt: string
    closesAt: string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleCreateOrConnectWithoutRestaurantInput = {
    where: ScheduleWhereUniqueInput
    create: XOR<ScheduleCreateWithoutRestaurantInput, ScheduleUncheckedCreateWithoutRestaurantInput>
  }

  export type ScheduleCreateManyRestaurantInputEnvelope = {
    data: ScheduleCreateManyRestaurantInput | ScheduleCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutRestaurantInput = {
    id?: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    menuItems?: MenuItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutRestaurantInput = {
    id?: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutRestaurantInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutRestaurantInput, CategoryUncheckedCreateWithoutRestaurantInput>
  }

  export type CategoryCreateManyRestaurantInputEnvelope = {
    data: CategoryCreateManyRestaurantInput | CategoryCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type MenuItemCreateWithoutRestaurantInput = {
    id?: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    category: CategoryCreateNestedOneWithoutMenuItemsInput
  }

  export type MenuItemUncheckedCreateWithoutRestaurantInput = {
    id?: string
    categoryId: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemCreateOrConnectWithoutRestaurantInput = {
    where: MenuItemWhereUniqueInput
    create: XOR<MenuItemCreateWithoutRestaurantInput, MenuItemUncheckedCreateWithoutRestaurantInput>
  }

  export type MenuItemCreateManyRestaurantInputEnvelope = {
    data: MenuItemCreateManyRestaurantInput | MenuItemCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type StoryCardCreateWithoutRestaurantInput = {
    id?: string
    title: string
    subtitle: string
    image?: string | null
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoryCardUncheckedCreateWithoutRestaurantInput = {
    id?: string
    title: string
    subtitle: string
    image?: string | null
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoryCardCreateOrConnectWithoutRestaurantInput = {
    where: StoryCardWhereUniqueInput
    create: XOR<StoryCardCreateWithoutRestaurantInput, StoryCardUncheckedCreateWithoutRestaurantInput>
  }

  export type StoryCardCreateManyRestaurantInputEnvelope = {
    data: StoryCardCreateManyRestaurantInput | StoryCardCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: ScheduleWhereUniqueInput
    update: XOR<ScheduleUpdateWithoutRestaurantInput, ScheduleUncheckedUpdateWithoutRestaurantInput>
    create: XOR<ScheduleCreateWithoutRestaurantInput, ScheduleUncheckedCreateWithoutRestaurantInput>
  }

  export type ScheduleUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: ScheduleWhereUniqueInput
    data: XOR<ScheduleUpdateWithoutRestaurantInput, ScheduleUncheckedUpdateWithoutRestaurantInput>
  }

  export type ScheduleUpdateManyWithWhereWithoutRestaurantInput = {
    where: ScheduleScalarWhereInput
    data: XOR<ScheduleUpdateManyMutationInput, ScheduleUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type ScheduleScalarWhereInput = {
    AND?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    OR?: ScheduleScalarWhereInput[]
    NOT?: ScheduleScalarWhereInput | ScheduleScalarWhereInput[]
    id?: StringFilter<"Schedule"> | string
    restaurantId?: StringFilter<"Schedule"> | string
    dayOfWeek?: EnumDayOfWeekFilter<"Schedule"> | $Enums.DayOfWeek
    opensAt?: StringFilter<"Schedule"> | string
    closesAt?: StringFilter<"Schedule"> | string
    isClosed?: BoolFilter<"Schedule"> | boolean
    createdAt?: DateTimeFilter<"Schedule"> | Date | string
    updatedAt?: DateTimeFilter<"Schedule"> | Date | string
  }

  export type CategoryUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutRestaurantInput, CategoryUncheckedUpdateWithoutRestaurantInput>
    create: XOR<CategoryCreateWithoutRestaurantInput, CategoryUncheckedCreateWithoutRestaurantInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutRestaurantInput, CategoryUncheckedUpdateWithoutRestaurantInput>
  }

  export type CategoryUpdateManyWithWhereWithoutRestaurantInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    restaurantId?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    visible?: BoolFilter<"Category"> | boolean
    order?: IntFilter<"Category"> | number
    isActive?: BoolFilter<"Category"> | boolean
    deletedAt?: DateTimeNullableFilter<"Category"> | Date | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type MenuItemUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: MenuItemWhereUniqueInput
    update: XOR<MenuItemUpdateWithoutRestaurantInput, MenuItemUncheckedUpdateWithoutRestaurantInput>
    create: XOR<MenuItemCreateWithoutRestaurantInput, MenuItemUncheckedCreateWithoutRestaurantInput>
  }

  export type MenuItemUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: MenuItemWhereUniqueInput
    data: XOR<MenuItemUpdateWithoutRestaurantInput, MenuItemUncheckedUpdateWithoutRestaurantInput>
  }

  export type MenuItemUpdateManyWithWhereWithoutRestaurantInput = {
    where: MenuItemScalarWhereInput
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type MenuItemScalarWhereInput = {
    AND?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    OR?: MenuItemScalarWhereInput[]
    NOT?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    id?: StringFilter<"MenuItem"> | string
    restaurantId?: StringFilter<"MenuItem"> | string
    categoryId?: StringFilter<"MenuItem"> | string
    name?: StringFilter<"MenuItem"> | string
    description?: StringFilter<"MenuItem"> | string
    price?: DecimalFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    image?: StringNullableFilter<"MenuItem"> | string | null
    available?: BoolFilter<"MenuItem"> | boolean
    isActive?: BoolFilter<"MenuItem"> | boolean
    deletedAt?: DateTimeNullableFilter<"MenuItem"> | Date | string | null
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    updatedAt?: DateTimeFilter<"MenuItem"> | Date | string
  }

  export type StoryCardUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: StoryCardWhereUniqueInput
    update: XOR<StoryCardUpdateWithoutRestaurantInput, StoryCardUncheckedUpdateWithoutRestaurantInput>
    create: XOR<StoryCardCreateWithoutRestaurantInput, StoryCardUncheckedCreateWithoutRestaurantInput>
  }

  export type StoryCardUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: StoryCardWhereUniqueInput
    data: XOR<StoryCardUpdateWithoutRestaurantInput, StoryCardUncheckedUpdateWithoutRestaurantInput>
  }

  export type StoryCardUpdateManyWithWhereWithoutRestaurantInput = {
    where: StoryCardScalarWhereInput
    data: XOR<StoryCardUpdateManyMutationInput, StoryCardUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type StoryCardScalarWhereInput = {
    AND?: StoryCardScalarWhereInput | StoryCardScalarWhereInput[]
    OR?: StoryCardScalarWhereInput[]
    NOT?: StoryCardScalarWhereInput | StoryCardScalarWhereInput[]
    id?: StringFilter<"StoryCard"> | string
    restaurantId?: StringFilter<"StoryCard"> | string
    title?: StringFilter<"StoryCard"> | string
    subtitle?: StringFilter<"StoryCard"> | string
    image?: StringNullableFilter<"StoryCard"> | string | null
    visible?: BoolFilter<"StoryCard"> | boolean
    order?: IntFilter<"StoryCard"> | number
    isActive?: BoolFilter<"StoryCard"> | boolean
    deletedAt?: DateTimeNullableFilter<"StoryCard"> | Date | string | null
    createdAt?: DateTimeFilter<"StoryCard"> | Date | string
    updatedAt?: DateTimeFilter<"StoryCard"> | Date | string
  }

  export type RestaurantCreateWithoutSchedulesInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateWithoutSchedulesInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantCreateOrConnectWithoutSchedulesInput = {
    where: RestaurantWhereUniqueInput
    create: XOR<RestaurantCreateWithoutSchedulesInput, RestaurantUncheckedCreateWithoutSchedulesInput>
  }

  export type RestaurantUpsertWithoutSchedulesInput = {
    update: XOR<RestaurantUpdateWithoutSchedulesInput, RestaurantUncheckedUpdateWithoutSchedulesInput>
    create: XOR<RestaurantCreateWithoutSchedulesInput, RestaurantUncheckedCreateWithoutSchedulesInput>
    where?: RestaurantWhereInput
  }

  export type RestaurantUpdateToOneWithWhereWithoutSchedulesInput = {
    where?: RestaurantWhereInput
    data: XOR<RestaurantUpdateWithoutSchedulesInput, RestaurantUncheckedUpdateWithoutSchedulesInput>
  }

  export type RestaurantUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateWithoutSchedulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantCreateWithoutCategoriesInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateWithoutCategoriesInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantCreateOrConnectWithoutCategoriesInput = {
    where: RestaurantWhereUniqueInput
    create: XOR<RestaurantCreateWithoutCategoriesInput, RestaurantUncheckedCreateWithoutCategoriesInput>
  }

  export type MenuItemCreateWithoutCategoryInput = {
    id?: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutMenuItemsInput
  }

  export type MenuItemUncheckedCreateWithoutCategoryInput = {
    id?: string
    restaurantId: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemCreateOrConnectWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    create: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput>
  }

  export type MenuItemCreateManyCategoryInputEnvelope = {
    data: MenuItemCreateManyCategoryInput | MenuItemCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantUpsertWithoutCategoriesInput = {
    update: XOR<RestaurantUpdateWithoutCategoriesInput, RestaurantUncheckedUpdateWithoutCategoriesInput>
    create: XOR<RestaurantCreateWithoutCategoriesInput, RestaurantUncheckedCreateWithoutCategoriesInput>
    where?: RestaurantWhereInput
  }

  export type RestaurantUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: RestaurantWhereInput
    data: XOR<RestaurantUpdateWithoutCategoriesInput, RestaurantUncheckedUpdateWithoutCategoriesInput>
  }

  export type RestaurantUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type MenuItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    update: XOR<MenuItemUpdateWithoutCategoryInput, MenuItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput>
  }

  export type MenuItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    data: XOR<MenuItemUpdateWithoutCategoryInput, MenuItemUncheckedUpdateWithoutCategoryInput>
  }

  export type MenuItemUpdateManyWithWhereWithoutCategoryInput = {
    where: MenuItemScalarWhereInput
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type RestaurantCreateWithoutMenuItemsInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutRestaurantInput
    categories?: CategoryCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateWithoutMenuItemsInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRestaurantInput
    categories?: CategoryUncheckedCreateNestedManyWithoutRestaurantInput
    storyCards?: StoryCardUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantCreateOrConnectWithoutMenuItemsInput = {
    where: RestaurantWhereUniqueInput
    create: XOR<RestaurantCreateWithoutMenuItemsInput, RestaurantUncheckedCreateWithoutMenuItemsInput>
  }

  export type CategoryCreateWithoutMenuItemsInput = {
    id?: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutMenuItemsInput = {
    id?: string
    restaurantId: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutMenuItemsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
  }

  export type RestaurantUpsertWithoutMenuItemsInput = {
    update: XOR<RestaurantUpdateWithoutMenuItemsInput, RestaurantUncheckedUpdateWithoutMenuItemsInput>
    create: XOR<RestaurantCreateWithoutMenuItemsInput, RestaurantUncheckedCreateWithoutMenuItemsInput>
    where?: RestaurantWhereInput
  }

  export type RestaurantUpdateToOneWithWhereWithoutMenuItemsInput = {
    where?: RestaurantWhereInput
    data: XOR<RestaurantUpdateWithoutMenuItemsInput, RestaurantUncheckedUpdateWithoutMenuItemsInput>
  }

  export type RestaurantUpdateWithoutMenuItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutRestaurantNestedInput
    categories?: CategoryUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateWithoutMenuItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRestaurantNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutRestaurantNestedInput
    storyCards?: StoryCardUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type CategoryUpsertWithoutMenuItemsInput = {
    update: XOR<CategoryUpdateWithoutMenuItemsInput, CategoryUncheckedUpdateWithoutMenuItemsInput>
    create: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutMenuItemsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutMenuItemsInput, CategoryUncheckedUpdateWithoutMenuItemsInput>
  }

  export type CategoryUpdateWithoutMenuItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutMenuItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantCreateWithoutStoryCardsInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleCreateNestedManyWithoutRestaurantInput
    categories?: CategoryCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateWithoutStoryCardsInput = {
    id?: string
    slug: string
    name: string
    phone?: string | null
    logo?: string | null
    heroImage?: string | null
    tagline?: string | null
    story?: string | null
    description?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    schedules?: ScheduleUncheckedCreateNestedManyWithoutRestaurantInput
    categories?: CategoryUncheckedCreateNestedManyWithoutRestaurantInput
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantCreateOrConnectWithoutStoryCardsInput = {
    where: RestaurantWhereUniqueInput
    create: XOR<RestaurantCreateWithoutStoryCardsInput, RestaurantUncheckedCreateWithoutStoryCardsInput>
  }

  export type RestaurantUpsertWithoutStoryCardsInput = {
    update: XOR<RestaurantUpdateWithoutStoryCardsInput, RestaurantUncheckedUpdateWithoutStoryCardsInput>
    create: XOR<RestaurantCreateWithoutStoryCardsInput, RestaurantUncheckedCreateWithoutStoryCardsInput>
    where?: RestaurantWhereInput
  }

  export type RestaurantUpdateToOneWithWhereWithoutStoryCardsInput = {
    where?: RestaurantWhereInput
    data: XOR<RestaurantUpdateWithoutStoryCardsInput, RestaurantUncheckedUpdateWithoutStoryCardsInput>
  }

  export type RestaurantUpdateWithoutStoryCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUpdateManyWithoutRestaurantNestedInput
    categories?: CategoryUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateWithoutStoryCardsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    heroImage?: NullableStringFieldUpdateOperationsInput | string | null
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    story?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schedules?: ScheduleUncheckedUpdateManyWithoutRestaurantNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutRestaurantNestedInput
    menuItems?: MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type ScheduleCreateManyRestaurantInput = {
    id?: string
    dayOfWeek: $Enums.DayOfWeek
    opensAt: string
    closesAt: string
    isClosed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryCreateManyRestaurantInput = {
    id?: string
    name: string
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemCreateManyRestaurantInput = {
    id?: string
    categoryId: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoryCardCreateManyRestaurantInput = {
    id?: string
    title: string
    subtitle: string
    image?: string | null
    visible?: boolean
    order?: number
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ScheduleUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    opensAt?: StringFieldUpdateOperationsInput | string
    closesAt?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    opensAt?: StringFieldUpdateOperationsInput | string
    closesAt?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleUncheckedUpdateManyWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    opensAt?: StringFieldUpdateOperationsInput | string
    closesAt?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    menuItems?: MenuItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    menuItems?: MenuItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutMenuItemsNestedInput
  }

  export type MenuItemUncheckedUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUncheckedUpdateManyWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoryCardUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoryCardUncheckedUpdateWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoryCardUncheckedUpdateManyWithoutRestaurantInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    subtitle?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    order?: IntFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateManyCategoryInput = {
    id?: string
    restaurantId: string
    name: string
    description?: string
    price: Decimal | DecimalJsLike | number | string
    image?: string | null
    available?: boolean
    isActive?: boolean
    deletedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MenuItemUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutMenuItemsNestedInput
  }

  export type MenuItemUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    restaurantId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}