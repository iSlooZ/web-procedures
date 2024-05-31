'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { SHA256 } from 'crypto-js';

interface FormData {
  name_owner: string;
  email_owner: string;
  phone_owner: string;
  password_owner: string;
  nameHolding?: string;
  logoHolding?: string;
}

export const FormHolding = ({ name_owner, email_owner, phone_owner, password_owner, nameHolding }: FormData) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const [step, setStep] = useState(1); // Estado para controlar el paso del formulario
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [ownerId, setOwnerId] = useState<number>(0);

  const getFileExtension = (fileName: string): string => {
    return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  const generateUniqueName = (file: File): string => {
    const timestamp = Date.now().toString(); // Marca de tiempo actual
    const fileExtension = getFileExtension(file.name); // Obtener la extensión del archivo original
    const hash = SHA256(file.name + timestamp).toString(); // Convertir el hash a cadena
    return hash + '.' + fileExtension; // Devuelve el nombre único con la extensión original del archivo
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtener el primer archivo seleccionado
  
    // Verificar si hay un archivo seleccionado
    if (file) {
      setLogoFile(file);
      
      const uniqueFileName = generateUniqueName(file);
      console.log('Nombre del archivo encriptado:', uniqueFileName);
      setLogoFileName(uniqueFileName);
      console.log("file name", file.name)
    }
  };

  const onSubmitOwner = async (data: FormData) => {
    try {
      // Aquí agregamos el console.log() para mostrar los datos que estás enviando
      console.log('Datos del owner a enviar:', data);
  
      const ownerResponse = await fetch('http://localhost:8000/knowhow/owner/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name_owner: data.name_owner,
          email_owner: data.email_owner,
          phone_owner: data.phone_owner,
          password_owner: data.password_owner,
          id_position_owner: 1 // ID de posición de usuario predeterminado
        })
      });
  
      if (!ownerResponse.ok) {
        throw new Error('Error al crear el owner');
      }
  
      const ownerData = await ownerResponse.json();
      console.log('Owner creado:', ownerData);
      
      const ownerEmail = data.email_owner;
      const ownerDetailsResponse = await fetch(`http://localhost:8000/knowhow/owner/owner-by-email/${ownerEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!ownerDetailsResponse.ok) {
        throw new Error('Error al obtener los detalles del usuario');
      }
  
      const ownerDetailsData = await ownerDetailsResponse.json();
      console.log('Detalles del usuario:', ownerDetailsData);
  
      setOwnerId(ownerDetailsData.id_owner);
      setStep(2);
      // Guardar el ID del usuario en el estado si es necesario
      // Cambiar al siguiente paso después de enviar el formulario
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  const onDeleteOwner = async () => {
    try {
      const deleteResponse = await fetch(`http://localhost:8000/knowhow/owner/delete/${ownerId}`, {
        method: 'DELETE',
      });

      if (!deleteResponse.ok) {
        throw new Error('Error al eliminar el owner');
      }

      console.log('Owner eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el owner:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };
    
  const onSubmitHolding = async (data: FormData) => {
    try {
      // Crear FormData y agregar el archivo
      const formData = new FormData();
      if (logoFile !== null) {
        // Usar el nombre encriptado en lugar del nombre original del archivo
        const uniqueFileName = generateUniqueName(logoFile);
        formData.append('file', logoFile, uniqueFileName);
      }
    
      // Enviar la solicitud POST a la URL de carga de archivos
      const uploadResponse = await fetch('http://localhost:8000/knowhow/upload/', {
        method: 'POST',
        body: formData
      });
  
      if (!uploadResponse.ok) {
        throw new Error('Error al cargar el archivo');
      }
  
      const fileNameData = await uploadResponse.json();
      const fileName = fileNameData.file_name;
      
      console.log('EL ID DEL OWNER', ownerId);
      console.log('Data para enviar:', data); // Aquí agregamos el console.log() para ver los datos que estás enviando
    
      const holdingResponse = await fetch('http://localhost:8000/knowhow/holding/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          holding_name: data.nameHolding,
          id_owner: ownerId,
          logo_holding: `http://localhost:8000/uploads/${fileName}`
        })
      });
  
      if (!holdingResponse.ok) {
        throw new Error('Error al crear el holding');
      }
  
      router.push('/knowhow/login');
    } catch (error) {
      console.error('Error con el holding:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };
  

  return (
    <section className="w-full flex justify-center items-center">
      <form className="w-[400px] flex flex-col justify-center items-center" onSubmit={step === 1 ? handleSubmit(onSubmitOwner) : handleSubmit(onSubmitHolding)}>
        <legend className="text-xl font-bold mt-8">Abre tu cuenta en simples pasos</legend>
        <h2 className="text-lg text-center text-stone-500 font-light">Agiliza tu tiempo y el de tus colaboradores.</h2>
        {step === 1 && (
          <fieldset className="w-full flex flex-col justify-center items-center gap-2 mb-[32px] mt-[32px]">
            <input
              className="w-[80%] border border-primary-color px-6 py-2 rounded-xl"
              type="text"
              placeholder={name_owner}
              {...register('name_owner', { required: true })}
            />
            {errors.name_owner && <span>Este campo es obligatorio</span>}
            <input
              className="w-[80%] border border-primary-color px-6 py-2 rounded-xl"
              type="email"
              placeholder={email_owner}
              {...register('email_owner', { required: true })}
            />
            {errors.email_owner && <span>Este campo es obligatorio</span>}
            <input
              className="w-[80%] border border-primary-color px-6 py-2 rounded-xl"
              type="text"
              placeholder={phone_owner}
              {...register('phone_owner', { required: true })}
            />
            {errors.phone_owner && <span>Este campo es obligatorio</span>}
            <input
              className="w-[80%] border border-primary-color px-6 py-2 rounded-xl"
              type="password"
              placeholder={password_owner}
              {...register('password_owner', { required: true })}
            />
            {errors.password_owner && <span>Este campo es obligatorio</span>}
          </fieldset>
        )}
        {step === 2 && (
          <fieldset className="w-full flex flex-col justify-center items-center gap-2 my-8">
          <div className='w-full flex justify-center items-center'>
            {logoFile ? (
              <img className='w-[150px] h-[150px] rounded-full mb-8' src={URL.createObjectURL(logoFile)} alt="Logo de la empresa" />
            ) : (
              <img className='w-[150px] h-[150px] rounded-full mb-8' src="/icon_logo_company.svg" alt="Icono de la empresa" />
            )}
          </div>
          <input
              className="w-[80%] border border-primary-color px-6 py-2 rounded-xl"
              type="text"
              placeholder={nameHolding}
              {...register('nameHolding', { required: true })}
          />

          <label className="w-[80%] primary-color text-white px-6 py-2 rounded-xl cursor-pointer text-center hover:opacity-75">
            Seleccionar Logo
            <input
              className="w-[80%] bg-zinc-300 px-6 py-2 rounded-xl"
              type="file"
              accept=".png, .jpeg, .jpg, .webp"
              style={{ display: 'none' }} // Oculta el input file pero sigue siendo funcional
              
              {...register('logoHolding',{
                onChange: (handleLogoChange)
              })}
            />
          </label>
          
          <div className="w-[80%] my-2 flex gap-2 justify-between items-center">
            <button 
              className="w-[50%] rounded-xl py-3 bg-white primary-color-text font-bold border border-primary-color"
              type="button"
              onClick={async () => {
                await onDeleteOwner();
                setStep(1);
              }}
            >
              Atrás
            </button>
            <button 
              className="w-[50%] rounded-xl py-3 primary-color text-white font-bold"
              type="submit"
            >
              Crear Cuenta
            </button>
          </div>
        </fieldset>

          
        )}

        <div className="w-full flex flex-col justify-center items-center">
          <button 
            className="w-[80%] rounded-full my-2 py-3 primary-color text-white font-bold"
            type="submit"
          >
            Crear cuenta
          </button>
          {step === 2 && (
            <button 
              className="w-[80%] rounded-full my-2 py-3 bg-white primary-color-text font-bold border border-primary-color"
              type="button"
              onClick={async () => {
                await onDeleteOwner();
                setStep(1);
              }}
            >
              Atrás
            </button>
          )}
          <Link 
            className="w-[80%] rounded-full py-3 bg-white border border-primary-color primary-color-text flex justify-center items-center font-bold" 
            href="/knowhow/login"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </form>
    </section>
  );
};
