import mongoose from "mongoose";

const lawyerSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true
    },
    description: { 
        type: String, 
        required: [true, 'Description is required'],
        minlength: [50, 'Description must be at least 50 characters']
    },
    mobile: { 
        type: String, 
        required: [true, 'Mobile number is required'],
        match: [/^\d{10,15}$/, 'Please fill a valid mobile number']
    },
    barNumber: { 
        type: String, 
        required: [true, 'Bar license number is required'],
        unique: true
    },
    firm: { 
        type: String, 
        trim: true
    },
    country: { 
        type: String, 
        required: [true, 'Country is required']
    },
    city: { 
        type: String, 
        required: [true, 'City is required']
    },
    specialization: { 
        type: String, 
        required: [true, 'Specialization is required']
    },
    qualification: { 
        type: String, 
        required: [true, 'Qualification is required']
    },
    experience: { 
        type: String, 
        required: [true, 'Experience is required']
    },
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'], 
        default: 'pending' 
    },
    profileImage: String,
    licenseDocument: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Update the updatedAt field before saving
lawyerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const LawyerDetails = mongoose.models.LawyerDetails || mongoose.model("LawyerDetails", lawyerSchema);
export default LawyerDetails;