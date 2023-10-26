import {pool} from './database.js';

class LibroController{
    
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res){
        const libro = req.body;
        try{
        const [result] = await pool.query(`INSERT INTO libros(nombre, autor,
             categoria, anioPublicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.anioPublicacion, libro.isbn]);
             res.json({"Id insertado": result.insertId});
            } catch (error){
                console.log('Error, no se pudo agregar libro: ', error);
            }
    }

    async getOne(req, res){
        const libro = req.body;
        try{
        const id = parseInt(libro.id_libro);
        const [result] = await pool.query('SELECT * FROM libros WHERE id_libro = (?)', [id]);
        res.json(result);
    } catch (error) {
        console.log('Error, no se pudo encontrar el libro: ', error);
        }
    }

    async delete(req, res){
        const libro = req.body;
        try{
            const [result] = await pool.query(`DELETE FROM libros WHERE id_libro = (?)`, [libro.id_libro]);
            res.json({"Libros eliminados": result.affectedRows});
        }catch(error){
            console.log('Error, no se pudo borrar el libro: ', error);
        }

    }

    async update(req, res){
        const libro = req.body;
        const id = parseInt(libro.id_libro);
        try{
            const [result] = await pool.query(`UPDATE libros SET nombre=(?), autor=(?), 
            categoria=(?), anioPublicacion=(?), isbn=(?) WHERE id_libro = (?)`, [libro.nombre, libro.autor, libro.categoria, 
                libro.anioPublicacion, libro.isbn, id]);
            res.json({"Libro actualizado": result.changedRows});
        } catch (error) {
            console.log('Error, no se pudo actualizar el libro: ', error);
        }


    }



}//fin clase

export const libros = new LibroController();
