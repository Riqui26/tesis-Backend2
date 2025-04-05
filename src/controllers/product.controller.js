// controllers/product.controller.js

import productService from '../services/product.service.js';

export async function getAll(req, res) {
  try {
    const products = await productService.getAll();
    if (products.length > 0) {
      return res.status(200).json(products);
    }
    return res.status(200).json({ message: 'No se encontraron productos' });
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar productos' });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar el producto' });
  }
}

export async function create(req, res) {
  try {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const existingProduct = await productService.getByCode(code);
    if (existingProduct) {
      return res.status(400).json({ message: 'El código ya está registrado' });
    }

    const newProduct = await productService.create(req.body);

    return res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const product = await productService.getById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await productService.update(id, req.body);
    return res.status(200).json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
}

export async function deleteOne(req, res) {
  try {
    const { id } = req.params;

    const product = await productService.getById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await productService.deleteOne(id);
    return res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
}
