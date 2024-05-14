import { ProductItem } from "./ListProducts";

export default function DeleteProduct({
    productToDelete,
    setEditProductData,
    setProductToDelete,
    deleteThisProduct,
}: any) {
    return (
        <div
            id="delete_product_div"
            className="absolute z-20 w-full flex justify-center items-center h-full top-0 left-0 transition-all duration-200 bg-[rgba(0,0,0,0.03)] animate-fadeIn flex-col backdrop-blur-sm"
        >
            <div className="TopGradient"></div>
            <div className="BottomGradient"></div>
            <div className="w-auto p-5 h-auto flex flex-col gap-5 bg-background-light animate-scaleIn rounded-lg shadow-lg">
                <p className="font-medium text-xl text-center">
                    Are you sure you want to delete this product?
                </p>
                {/* PRODUCT */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <tbody>
                        {productToDelete && (
                            <ProductItem
                                product={productToDelete}
                                setEditProductData={setEditProductData}
                                setProductToDelete={setProductToDelete}
                            />
                        )}
                    </tbody>
                </table>
                <form
                    id="confirm_delete_product_form"
                    className="flex justify-between items-center mt-3"
                    onSubmit={(e: any) => {
                        e.preventDefault();

                        deleteThisProduct(
                            productToDelete.id,
                            e.target.admin_password_product_input.value
                        );
                    }}
                >
                    <input
                        className="text-sm h-7 bg-background text-text-inactive focus:text-text transition-all ease duration-300 border outline-gray-300 p-2 rounded-lg focus:outline-primary-light"
                        type="password"
                        name="admin_password_product_input"
                        spellCheck="false"
                        placeholder="admin password"
                        id="admin_password_product_input"
                        minLength={8}
                        maxLength={50}
                        required
                    />
                    <div className="text-sm">
                        <button
                            type="submit"
                            form="confirm_delete_product_form"
                            className="px-4 py-1 rounded-lg font-medium ml-14 bg-red-500 text-text-invert"
                        >
                            Confirm
                        </button>
                        <button
                            type="button"
                            onClick={() => setProductToDelete(null)}
                            className="px-4 ml-3 py-1 rounded-lg font-medium bg-primary text-text-invert"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
