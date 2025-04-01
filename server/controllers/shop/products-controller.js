import Product from '../../models/Product.js';
export const getFilteredProducts = async (req, res) => { 
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            data : products,
        });
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}