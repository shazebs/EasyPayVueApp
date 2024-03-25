<template>
    <div id="about-page">
        <h1 style="color:#635bff; 
                   margin:10px; 
                   text-align:center;">
            About
        </h1>

        <section style="width:100%; margin: 20px 0px; text-align:center; display:flex; justify-content: center;">
            <!-- <div></div> -->
            <div>
                <iframe class="youtube-embed" src="https://www.youtube.com/embed/fQtak_CDV4s?si=GADFaMzHuP-JBh1q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <!-- <div></div> -->
        </section>

        <h2 align="center">What is <span style="color:#635bff">Stripe EasyPay</span>?</h2>
        <blockquote style="line-height:1.85;">Sometimes you need to receive payment from someone, but you can’t because: they are too far away, they don’t have cash, they can’t pay now but can pay later, they only have their card on them, or they don’t use popular money-transfer apps like (CashApp, Venmo, Zelle). Most people, if not cash, will have at least their credit or debit card on them. At the same time, people are always on their phone and at any moment can engage in online purchasing. My idea for Stripe EasyPay is for non-coding savvy people to be able to set up secure online credit/debit card payments at the drop of a hat. The problem I want to try and solve is for people who don’t run e-commerce stores or have storefront card-reading machines to be able to quickly secure payments at any time of the day, without any interaction whatsoever, and without hassle. Whether you need to secure a payment in-person, or online, the EasyPay application hopes to make that process better and accessible at any time through the web.</blockquote>

        <section style="text-align:center;">
            <h2>GitHub Repositories</h2>
            <p><a href="https://github.com/shazebs/EasyPayVueApp" target="_blank">EasyPay Vue App</a></p>
            <p><a href="https://github.com/shazebs/EasyPayApi" target="_blank">EasyPay C# API</a></p>
        </section>

        <section style="margin-top:30px; text-align:center;">
            <h2 align="center">EasyPay Architecture</h2>
            <img src="https://easypaytestblobstorage.blob.core.windows.net/photos/203a1ceb-f7b2-4d7d-9351-a7756dfb95e4.png" style="width:100%;" />
        </section>

        <section style="margin-top:30px; text-align:center;">
            <h2 align="center">Sitemap</h2>
            <img src="https://easypaytestblobstorage.blob.core.windows.net/photos/d49150bb-c2a9-4794-ac01-44e4d6cabaa1.png" style="width:100%;" />
        </section>

        <section style="margin-top:30px; text-align:center;">
            <h2 align="center">Agile Process Flow</h2>
            <img src="https://easypaytestblobstorage.blob.core.windows.net/photos/b590dce9-ddd5-48a8-a0f6-7dee43bbdc6c.png" style="width:100%;" />
        </section>

        <section style="margin-top:30px; text-align:center;">
            <h2 align="center">Database Entity Relationship Diagram</h2>
            <img src="https://easypaytestblobstorage.blob.core.windows.net/photos/7332a6a5-29f6-4913-94e2-02c1b4fab439.png" style="width:100%;" />
        </section>

        <section style="margin-top:30px; text-align:center;">
            <h2>UML Relationship Diagram</h2>
            <img src="https://easypaytestblobstorage.blob.core.windows.net/photos/9d807737-729a-415b-9f71-400a13e85eed.png" style="width:100%;" />
        </section>

        <section v-for="(value, key) in apps" :key="key" style="margin-top:30px;">
            <h1 align="center">{{ value.name }}</h1>
            <section class="class-item" v-for="(item, index) in value.classes" :key="index">
                <h2>{{ item.name }}</h2>
                <p>Module: <span style="color:#635bff">{{ item.module }}</span></p>
                <p v-if="item.variables">Variables: 
                    <ol class="methods-list">
                        <li v-for="(variable, i) in item.variables" :key="i">
                            {{ variable }}
                        </li>
                    </ol>
                </p>
                <p v-if="item.methods">Methods: 
                    <ol class="methods-list">
                        <li v-for="(method, i) in item.methods" :key="i">
                            {{ method }}
                        </li>
                    </ol>
                </p>
            </section>
        </section>
        <p style="text-align:center;">End.</p>
    </div>
</template>

<script>
export default {
    name: 'AboutPage',
    data() {
        return {
            apps: {
                frontend: {
                    name: 'Vue App classes',
                    classes: [
                        {
                            name: 'App.vue',
                            module: 'App'
                        },
                        {
                            name: 'NavigationBar.vue',
                            module: 'Navigation',
                            methods: [
                                'handleLogout(): void'
                            ]
                        },
                        {
                            name: 'SignupPage.vue',
                            module: 'Registration',
                            variables: [
                                'email: "string"',
                                'password: "string"',
                                'password_retype: "string"',
                                'stripeApiKey: "string"',
                                'username: "string"',
                                'errors: "object with booleans and string"'
                            ],
                            methods: [
                                'checkValidations(): boolean',
                                'closeError(errorKey): void',
                                'handleSignup(): void'
                            ]
                        },
                        {
                            name: 'LoginPage.vue',
                            module: 'Login',
                            variables: [
                                'username: "string"',
                                'password: "string"',
                                'loginStatus: "object with boolean and string"'
                            ],
                            methods: [
                                'handleLogin(): void'
                            ]
                        },
                        {
                            name: 'HomePage.vue',
                            module: 'Home',
                            variables: [
                                'username: "string"',
                                'userCatalog: "array of objects"'
                            ],
                            methods: [
                                'checkoutItem(item): void',
                                'currentURL(): void',
                                'getUserCatalog(): void'
                            ]
                        },
                        {
                            name: 'UserCatalog.vue',
                            module: 'Home',
                            variables: [
                                'salesOrder: "object with strings and numbers"',
                                'catalog: "array of objects"',
                                'netprofit: "number"'
                            ],
                            methods: [
                                'calculateProfit(price): number',
                                'checkoutFromForm(): void',
                                'checkoutItem(item): void',
                                'clearImage(): void',
                                'clearSalesOrder(): void',
                                'deleteItem(item): void',
                                'editItem(item): void',
                                'removeNonNumbers(): void',
                                'resetForm(): void',
                                'resetLayout(): void',
                                'submitPayment(): void',
                                'uploadImage(): void'
                            ]
                        },
                        {
                            name: 'AccountPage.vue',
                            module: 'Account',
                            variables: [
                                'username: "string"',
                                'username_password: "string"',
                                'current_password: "string"',
                                'new_password: "string"',
                                'retype_password: "string"',
                                'errors: "object with booleans"',
                                'email: "string"',
                                'email_password: "string"',
                                'stripe_key: "string"',
                                'stripe_password: "string"',
                            ],
                            methods: [
                                'checkValidations(): boolean',
                                'closeError(errorKey): void',
                                'updateEmail(): void',
                                'updatePassword(): void',
                                'updateStripeKey(): void',
                                'updateUsername(): void'
                            ]
                        }
                    ]
                },
                backend: {
                    name: 'C# API classes',
                    classes: [
                        {
                            name: 'EasyPayController.cs',
                            module: 'ApiController',
                            variables: [
                                '- blobService: AzureBlobStorageService',
                                '- dbService: DatabaseService',
                                '- logger: ILogger',
                            ],
                            methods: [
                                '+ EasyPayController(ILogger, DatabaseService, AzureBlobStorageService)',
                                '+ Checkout(SalesOrderForm): IActionResult',
                                '+ DeleteCatalogItem(SalesOrderForm): IActionResult',
                                '+ DeletePhoto(string): Task<ActionResult>',
                                '+ EasyPay(SalesOrder): IActionResult',
                                '+ EasyPay_v2(SalesOrderForm): IActionResult',
                                '+ GetAllBlobPhotoUrls(): Task<ActionResult<List<string>>>',
                                '+ GetCatalog(UserCatalogRequest): IActionResult',
                                '+ Login(LoginForm): IActionResult',
                                '+ Register(Account): IActionResult',
                                '- SalesOrderProcess(SalesOrder): string',
                                '+ UpdateEmail(UpdateEmailRequest): IActionResult',
                                '+ UpdatePassword(UpdatePasswordRequest): IActionResult',
                                '+ UpdateStripeKey(UpdateStripeKeyRequest): IActionResult',
                                '+ UpdateUsername(UpdateUsernameRequest): IActionResult',
                                '+ UploadImage(): Task<IActionResult>',
                                '+ WebhookHandler(): Task<ActionResult>'
                            ]
                        },
                        {
                            name: 'DatabaseService.cs',
                            module: 'Database',
                            variables: [
                                '+ logger: ILogger',
                                '- rsa: RSAEncryptionService',
                                '- connectionString: string'
                            ],
                            methods: [
                                '+ DatabaseService(ILogger)',
                                '+ AddToCatalog(SalesOrderForm): List<SalesOrderForm>',
                                '+ CheckUsernameExists(string): bool',
                                '+ DeleteCatalogID(SalesOrderForm): bool',
                                '+ GetCatalogByUsername(string): List<SalesOrderForm>',
                                '+ GetPasswordByUsername(string), string',
                                '+ GetStripeKey(string): string',
                                '+ LoginAccount(LoginForm): Account',
                                '+ RegisterAccount(Account): bool',
                                '+ UpdateEmail(UpdateEmailRequest): bool',
                                '+ UpdatePassword(UpdatePasswordRequest): bool',
                                '+ UpdateStripeKey(UpdateStripeKeyRequest): bool',
                                '+ UpdateUsername(UpdateUsernameRequest): bool',
                                '+ UpdateUsernameInCatalog(string, string): bool'
                            ]
                        },
                        {
                            name: 'RSAEncryptionService.cs',
                            module: 'Encryption',
                            variables: [
                                '- rsa: RSACryptoServiceProvider',
                                '- publicKey: string',
                                '- privateKey: string'
                            ],
                            methods: [
                                '+ RSAEncryptionService()',
                                '+ Decrypt(string): string',
                                '+ Encrypt(string): string',
                                '+ GenerateKeys(): void',
                                '+ GetPrivateKey(): string',
                                '+ GetPublicKey(): string'
                            ]
                        },
                        {
                            name: 'StripeService.cs',
                            module: 'StripeAPI',
                            variables: [
                                '- disposed: bool'
                            ],
                            methods: [
                                '+ StripeService(string)',
                                '+ Close(): void',
                                '+ Dispose(): void',
                                '+ Dispose(bool): void',
                                '+ GeneratePaymentPortal(SalesOrder): string',
                                '+ GeneratePaymentPortal_v2(SalesOrderForm): string',
                                '~ StripeService()'
                            ]
                        },
                        {
                            name: 'AzureBlobStorageService.cs',
                            module: 'BlobStorage',
                            variables: [
                                '- _blobContainer: CloudBlobContainer',
                            ],
                            methods: [                                
                                '+ AzureBlobStorageService()',
                                '+ DeletePhotoAsync(string): Task',
                                '+ GetAllPhotoUrlsAsync(): Task<List<string>>',
                                '+ UploadPhotoAsync(Stream, string): Task<string>'
                            ]
                        },
                        {
                            name: 'Account.cs',
                            module: 'DataModel',
                            variables: [
                                '+ email: string',
                                '+ username: string',
                                '+ password: string',
                                '+ stripe_key: string'
                            ]
                        },
                        {
                            name: 'LoginForm.cs',
                            module: 'DataModel',
                            variables: [
                                '+ username: string',
                                '+ password: string'
                            ]
                        },
                        {
                            name: 'SalesOrderForm.cs',
                            module: 'DataModel',
                            variables: [
                                '+ id: int',
                                '+ username: string',
                                '+ name: string',
                                '+ price: decimal',
                                '+ currency: string',
                                '+ image: string',
                                '+ return_url: string'
                            ]
                        },
                        {
                            name: 'UserCatalogRequest.cs',
                            module: 'DataModel',
                            variables: [
                                '+ username: string'
                            ]
                        },
                        {
                            name: 'UpdateUsernameRequest.cs',
                            module: 'DataModel',
                            variables: [
                                '+ current_username: string',
                                '+ new_username: string',
                                '+ password: string'
                            ]
                        },
                        {
                            name: 'UpdatePasswordRequest.cs',
                            module: 'DataModel',
                            variables: [
                                '+ username: string',
                                '+ current_password: string',
                                '+ new_password: string'
                            ]
                        },
                        {
                            name: 'UpdateEmailRequest.cs',
                            module: 'DataModel',
                            variables: [
                                '+ username: string',
                                '+ new_email: string',
                                '+ password: string'
                            ]
                        },
                        {
                            name: 'UpdateStripeKeyRequest.cs',
                            module: 'DataModel',
                            variables: [
                                '+ username: string',
                                '+ password: string',
                                '+ stripe_key: string'
                            ]
                        },
                        {
                            name: 'SalesOrder.cs',
                            module: 'DataModel',
                            variables: [
                                '+ SalesOrderId: int',
                                '+ Datetime: string',
                                '+ Username: string',
                                '+ Currency: string',
                                '+ LineItems: List<LineItem>',
                                '+ ShippingId: ShippingMethod',
                                '+ StripeApiKey: string',
                                '+ SuccessUrl: string',
                                '+ CancelUrl: string'
                            ]
                        },
                        {
                            name: 'LineItem.cs',
                            module: 'DataModel',
                            variables: [
                                '+ Price: decimal',
                                '+ Name: string',
                                '+ Image: string',
                                '+ Quantity: int'
                            ]
                        },
                        {
                            name: 'ShippingMethod.cs',
                            module: 'DataModel',
                            variables: [
                                '+ ShippingId: int',
                                '+ Price: decimal',
                                '+ Title: string',
                                '+ DaysMini: int',
                                '+ DaysMaxi: int'
                            ]
                        }
                    ]
                }
            }
        }
    }
}
</script>

<style scoped>
    #about-page {
        padding:10px;
        padding-top:0px;
    }
    #about-page h2 {
        text-decoration:underline;
    }
    .class-item {
        border-bottom:2px dashed black;
    }
    .methods-list {
        line-height:1.85;
    }
    img {
        max-width:900px;
    }
    .youtube-embed {
        width:500px;
        min-height: 250px;
    }

    @media (max-width:500px) {
        .youtube-embed {
            width:100%;
        }
    }
</style>
