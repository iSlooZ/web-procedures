import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormData {
  nameUser: string;
  email: string;
  phoneNumber: string;
  password: string;
  nameCompany?: string;
  logoCompany?: string;
}

export const FormCompany = ({ nameUser, email, phoneNumber, password, nameCompany }: FormData) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [step, setStep] = useState(1); // Estado para controlar el paso del formulario
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  // Función para manejar el cambio de la imagen seleccionada
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtener el primer archivo seleccionado
  
    // Verificar si hay un archivo seleccionado
    if (file) {
      setLogoFile(file);
      setLogoFileName(file.name); // Almacenar el archivo en el estado
    }
  };
  

  const onSubmitUser = async (data: FormData) => {
    try {
      const userResponse = await fetch('http://localhost:8000/knowhow/users/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name_user: data.nameUser,
          email_user: data.email,
          phone_user: data.phoneNumber,
          password_user: data.password,
          id_position_user: 1 // ID de posición de usuario predeterminado
        })
      });

      if (!userResponse.ok) {
        throw new Error('Error al crear el usuario');
      }

      const userData = await userResponse.json();
      console.log('Usuario creado:', userData);

 // Almacenar el ID del usuario creado

      
      
      const userEmail = data.email;
      const userDetailsResponse = await fetch(`http://localhost:8000/knowhow/users/${userEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!userDetailsResponse.ok) {
        throw new Error('Error al obtener los detalles del usuario');
      }

      const userDetailsData = await userDetailsResponse.json();
      console.log('Detalles del usuario:', userDetailsData);

      setUserId(userDetailsData.id_user);
      setStep(2);
      // Guardar el ID del usuario en el estado si es necesario
  // Cambiar al siguiente paso después de enviar el formulario
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      }
  };

  

  const onSubmitCompany = async (data: FormData) => {
    try {
      // Crear FormData y agregar el archivo
      const formData = new FormData();
      if (logoFile !== null) {
        formData.append('file', logoFile);
      }
  
      // Enviar la solicitud POST a la URL de carga de archivos
      const uploadResponse = await fetch('http://localhost:8000/knowhow/upload/', {
        method: 'POST',
        body: formData
      });
  
      if (!uploadResponse.ok) {
        throw new Error('Error al cargar el archivo');
      }
  
      // Obtener el nombre del archivo cargado desde la respuesta
      const fileNameData = await uploadResponse.json();
      const fileName = fileNameData.file_name;
  
      // Crear la empresa con el ID del usuario almacenado y el nombre del archivo cargado
      const companyResponse = await fetch('http://localhost:8000/knowhow/company/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          company_name: data.nameCompany,
          id_user: userId,
          logo_company: `http://localhost:8000/uploads/${fileName}` // Utiliza el nombre del archivo cargado desde la respuesta
        })
      });
  
      if (!companyResponse.ok) {
        throw new Error('Error al crear la empresa');
      }
  
      // Redirigir a alguna otra página, por ejemplo, la página de inicio
      router.push('/knowhow/login');
    } catch (error) {
      console.error('Error con la company:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  

  return (
    <section className="w-full flex justify-center items-center">
      <form className="w-[400px] flex flex-col justify-center items-center" onSubmit={step === 1 ? handleSubmit(onSubmitUser) : handleSubmit(onSubmitCompany)}>
        <legend className="text-xl font-bold mt-4">Abre tu cuenta en simples pasos</legend>
        <h2 className="text-lg text-stone-500 font-light">Agiliza tu tiempo y el de tus colaboradores</h2>

        {step === 1 && (
          <fieldset className="w-full flex flex-col justify-center items-center gap-2 my-8">
            <input
              className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
              type="text"
              placeholder={nameUser}
              {...register('nameUser', { required: true })}
            />
            {errors.nameUser && <span>Este campo es obligatorio</span>}
            <input
              className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
              type="email"
              placeholder={email}
              {...register('email', { required: true })}
            />
            {errors.email && <span>Este campo es obligatorio</span>}
            <input
              className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
              type="text"
              placeholder={phoneNumber}
              {...register('phoneNumber', { required: true })}
            />
            {errors.phoneNumber && <span>Este campo es obligatorio</span>}
            <input
              className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
              type="password"
              placeholder={password}
              {...register('password', { required: true })}
            />
            {errors.password && <span>Este campo es obligatorio</span>}
          </fieldset>
        )}

      {step === 2 && (
        <fieldset className="w-full flex flex-col justify-center items-center gap-2 my-8">
          <div className='w-full flex justify-center items-center'>
            {logoFile ? (
              <img className='w-[100px] h-[100px] rounded-full' src={URL.createObjectURL(logoFile)} alt="Logo de la empresa" />
            ) : (
              <img className='w-[100px] h-[100px] rounded-full' src="/iconCompany.png" alt="Icono de la empresa" />
            )}
          </div>
          <input
              className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
              type="text"
              placeholder={nameCompany}
              {...register('nameCompany', { required: true })}
          />

          <label className="w-[80%] bg-zinc-500 px-6 py-2 rounded-xl cursor-pointer text-center hover:bg-zinc-300">
            Seleccionar Logo
            <input
              className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
              type="file"
              accept=".png, .jpeg, .jpg, .webp"
              style={{ display: 'none' }} // Oculta el input file pero sigue siendo funcional
              
              {...register('logoCompany',{
                onChange: (handleLogoChange)
              })}
            />
          </label>
          {logoFileName && <span>Nombre del archivo: {logoFileName}</span>}
          <div className="w-[80%] my-2 flex gap-2 justify-between items-center">
            <button 
              className="w-[50%] rounded-xl py-3 bg-white text-black font-bold border border-black"
              type="button"
              onClick={() => setStep(1)}
            >
              Atrás
            </button>
            <button 
              className="w-[50%] rounded-xl py-3 bg-black text-white font-bold"
              type="submit"
            >
              Crear Cuenta
            </button>
          </div>
        </fieldset>
      )}
        <div className="w-full flex flex-col justify-center items-center">
        {step === 1 && ( // Mostrar el botón "Siguiente" solo en el primer paso
          <button 
            className="w-[80%] rounded-xl py-3 bg-black text-white font-bold"
            type="submit" // Usa type="button" para evitar que el botón haga submit// Cambia el estado de 'step' al hacer clic en el botón
          >
            Crear cuenta
          </button>
        )}
          <Link 
            className="w-[80%] rounded-xl py-3 bg-white border border-black flex justify-center items-center font-bold" 
            href={"/knowhow/login"}>
            Ya tengo cuenta
          </Link>
        </div>
      </form>
    </section>
  );
};


