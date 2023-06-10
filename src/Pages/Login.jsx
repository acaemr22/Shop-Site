import React from "react";
import { Form, useOutletContext, useActionData, redirect } from "react-router-dom";

const authStore = [{email: "iletisim@useinsider.com"}, {email: "iletisim@kodluyoruz.org"}]



export async function loginAction({request}) {
  let URLSearchParams = new URL(request.url).searchParams
  let formData = await request.formData();
  let emailAuth = authStore.some(obj => obj.email === formData.get("email") )

  if (emailAuth) {
    localStorage.setItem("isLoggedIn", true)
    return redirect(URLSearchParams.get("redirectTo") ? URLSearchParams.get("redirectTo") : "/shop-basket/checkout" )
  }
  
  else {
    return "E-posta adresiniz yanlış. Lütfen tekrar kontrol edin."
  }
}



const LogIn = () => {
  const {searchParamsList} = useOutletContext();
  const [searchParams, setSearchParams] = searchParamsList
  const errorMessage = useActionData() 
  return (
    <main className="py-28 pb-48 px-6 bg-slate-100">
      {errorMessage && <h2 className="text-red-500 text-center pb-2 font-semibold text-[18px]">{errorMessage}</h2>}
      {(searchParams.get("message")) && <h2 className="text-red-500 text-center pb-2 font-semibold text-[18px]">Öncesinde oturum açmanız gerekmektedir.</h2>}
      <Form replace method="POST" className="space-y-12 flex flex-col  items-center">
        <h2 className="font-bold text-center text-[30px]">Giriş Yap</h2>
        <div className="flex flex-col gap-3 w-full max-w-lg">
        <div className="relative">
              <input id="email" name="email" type="text" className="peer h-10 w-full bg-slate-100 border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-500" placeholder="john@doe.com" />
              <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600  autofill text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">E-posta</label>
            </div>
        <div className="relative mt-5">
              <input id="password" name="password" type="password" className="peer h-10  bg-slate-100 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-sky-500" placeholder="john@doe.com" />
              <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 autofill text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">Şifre</label>
            </div>

          <div className="pt-5">
            <button type="submit" className="bg-gray-900 hover:bg-gray-700 text-white w-full font-bold p-4 rounded-3xl">Giriş Yap</button>
          </div>
        </div>
      </Form>
    </main>
  );
};

export default LogIn;


