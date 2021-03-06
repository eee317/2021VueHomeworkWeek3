let productModal=null;
let delProductModal=null
import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';
const app={
    data(){
        return{
            url:'https://vue3-course-api.hexschool.io',
            api_path:'peiying',
            isNew:false,
            products:[],
            tempProduct:{
                imagesUrl:[]
            }
        }
    },
    methods: {
        check(){
            const apiUrl=`${this.url}/v2/api/user/check`
            axios.post(apiUrl).then(res=>{
                this.getProducts()
            })
            .catch(err=>{
                console.dir(err)
                window.location='index.html'
            })
        },
        getProducts(){
            const apiUrl=`${this.url}/v2/api/${this.api_path}/admin/products/all`
            axios.get(apiUrl).then(res=>{
                this.products=res.data.products
                console.log(this.products)
            })
            .catch(err=>{
                console.dir(err)
            })
        },
        openModal(state,item){
            if(state==='new'){
                this.tempProduct={
                    imagesUrl:[]
                };
                this.isNew=true;
                productModal.show();

            }else if(state==='edit'){
                this.tempProduct={...item};
                this.isNew=false;
                productModal.show();

            }else if(state==='delete'){
                this.tempProduct={...item};
                delProductModal.show();
            }

        },
        creatImg(){
            this.tempProduct.imagesUrl=[];
            this.tempProduct.imagesUrl.push('');
        },
        updata(){
            let apiUrl=`${this.url}/v2/api/${this.api_path}/admin/product`;
            let http='post';
            if(!this.isNew){
                apiUrl=`${this.url}/v2/api/${this.api_path}/admin/product/${this.tempProduct.id}`
                http='put'
            }
            axios[http](apiUrl,{data:this.tempProduct})
            .then(res=>{
                console.log(res)
                this.getProducts();
                productModal.hide();
            })
            .catch(err=>{
                console.dir(err)
            })

        },
        delProduct(){
            const apiUrl=`${this.url}/v2/api/${this.api_path}/admin/product/${this.tempProduct.id}`
            axios.delete(apiUrl)
            .then(res=>{
                console.log(res.data)
                delProductModal.hide();
                alert(res.data.message)
                this.getProducts();
            })
            .catch(err=>{
                console.dir(err)
            })
        }

    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
            });
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
            });

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.check()
    }
}

createApp(app).mount('#app')