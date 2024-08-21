import React, { useState } from 'react';
import { compressAndConvertMultipleToBase64 } from '../../utils/imageUtils';
import '../../styles/components/_CreatePromoModal.scss'

interface Category {
    id: number;
    name: string;
}

const CreatePromotionModal = ({
    isOpen,
    onClose,
    onSave,
    categories,
    partnerId
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (promotion: any) => void;
    categories: Category[];
    partnerId: number
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    // const [qrCode, setQrCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('');
    const [branchId, setBranchId] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [images, setImages] = useState<string[]>([]);

    // Obtén el partner_id desde el estado global
    console.log("categories al crear la promo", categories);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId: number) => {
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        }
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            try {
                const newImages = await compressAndConvertMultipleToBase64(e.target.files);
                setImages((prevImages) => [...prevImages, ...newImages]);
            } catch (error) {
                console.error('Error al procesar las imágenes:', error);
            }
        }
    };
    const handleImageRemove = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!partnerId) {
            console.error('El ID del partner no está disponible');
            return;
        }

        const newPromotion = {
            branch_id: parseInt(branchId),
            title,
            description,
            start_date: startDate,
            expiration_date: expirationDate,
            // qr_code: qrCode,
            discount_percentage: parseFloat(discountPercentage),
            available_quantity: parseInt(availableQuantity),
            partner_id: partnerId,
            category_ids: selectedCategories,
            images,
        };
        console.log("nueva promocion a crear", newPromotion);

        onSave(newPromotion);
                onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={`modalCreate ${isOpen ? 'is-open' : ''}`}>
                 <div className="modal-contentCreate">
                <h2>Crear Promoción</h2>
                <form>
                    <div className='campos'>

                    <div className='izquierda'>
                    <input placeholder='Título' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                    {/* <label>Descripción</label> */}
                    <textarea value={description} placeholder='Escribe una descripción de la promoción...' onChange={(e) => setDescription(e.target.value)} />

                    <label>Fecha de Inicio</label>
                    <input className='input_date' type="date" value={startDate} placeholder='Descripción' onChange={(e) => setStartDate(e.target.value)} />

                    <label>Fecha de Expiración</label>
                    <input className='input_date' type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />

                    {/* <label>Código QR</label>
                    <input type="text" value={qrCode} onChange={(e) => setQrCode(e.target.value)} /> */}
                    <div className='desc_disp_suc'>
                    <input placeholder="Descuento (%)" className='input_corto' type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} />

                    <input placeholder="Cantidad Disponible" className='input_corto' type="number" value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} />

                    <input placeholder="Sucursal" className='input_corto' type="number" value={branchId} onChange={(e) => setBranchId(e.target.value)} />    
                    </div>
                    

                    </div>

                    <div className='derecha'>

                        <label>Categorías</label>
                    <div >
                        {categories.map((category: any) => (
                            <div key={category.category_id}>
                                <input
                                    type="checkbox"
                                    id={`category-${category.category_id}`}
                                    onChange={(e) => handleCategoryChange(e, category.category_id)}
                                />
                                <label htmlFor={`category-${category.id}`}>{category.name}</label>
                            </div>
                        ))}
                    </div>
                    </div>
                    </div>
                    
                    

                    <label>Imágenes</label>
                    <input className='inputImg' type="file" multiple accept="image/*" onChange={handleImageChange} />
                    <div className="image-preview">
                            {images.map((image, index) => (
                                <div key={index} className="image-container">
                                    <img src={image} alt={`Image ${index + 1}`} className="preview-image" />
                                    <button type="button" onClick={() => handleImageRemove(index)} className="remove-imagebtn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 26 26"><path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                            <div className='btns_sub_cls'>
                               <button className='subBtn' type="button" onClick={handleSubmit}>
                        Guardar
                    </button>
                    <button className='clsBtn' type="button" onClick={onClose}>
                        Cancelar
                    </button> 
                            </div>
                    
                </form>
            </div>
        </div>
    );
};

export default CreatePromotionModal;