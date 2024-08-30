import busquedaEmp from "../models/busquedaEmp.model";


//Creamos un cv
export const crearCV = async (req, res) => {
  try {
    console.log("LLEGO")
      const { nombre, apellido, email, telefono, propuesta } = req.body;
      const nuevaBusquedaEmp = new busquedaEmp({ nombre, apellido, email, telefono, propuesta });
      const busquedaEmpGuardada = await nuevaBusquedaEmp.save();
      res.status(200).json({ message: 'CV guardado correctamente.' });
  } catch (error) {
      res.status(500).json({ message: "Error al guardar cv", error });
  }
};

  //Eliminamos un cv
export const eliminarCV = async (req, res) => {
    try {
      const { id } = req.params;
      await busquedaEmp.findByIdAndDelete(id);
      res.status(200).json({ message: 'CV eliminado correctamente.' });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar un CV", error });
    }
    };


//Obtenemos todos los cv
export const buscarCV = async (req, res) => {
    try {
      const busquedaEmps = await busquedaEmp.find();
      if (!busquedaEmps.length) {
        return res.status(404).json({ message: "No hay cv aún" });
      }
      res.json(busquedaEmps);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los", error });
    }
  };





    