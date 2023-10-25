import {pool} from './database.js';

class LibroController{
    
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor,
             categoria, anioPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.isbn]);
             res.json({"Id insertado": result.insertId});
    }

    async getOne(req, res){
        const libro = req.body;
        const id = parseInt(libro.id_libro);
        const [result] = await pool.query('SELECT * FROM libros WHERE id_libro = (?)', [id]);
        res.json(result);
    }



}

export const libros = new LibroController();
