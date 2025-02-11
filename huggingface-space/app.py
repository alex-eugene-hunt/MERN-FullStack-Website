import gradio as gr
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load model and tokenizer
print("Loading tokenizer...")
model_name = "gpt2"  # Using GPT-2 as a test
tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token  # Set pad token for GPT-2

print("Loading model...")
# Load model with CPU configuration
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map=None,  # Don't use device mapping
    torch_dtype=torch.float32,  # Use regular precision
    low_cpu_mem_usage=True
)
model.eval()
print("Model loaded successfully!")

def generate_response(message):
    try:
        print(f"Generating response for: {message}")
        # Encode the input
        inputs = tokenizer.encode(message, return_tensors='pt', max_length=512, truncation=True)
        
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_new_tokens=150,
                temperature=0.7,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id,
                num_return_sequences=1
            )
        
        # Decode and return the response
        response = tokenizer.decode(outputs[0][inputs.shape[1]:], skip_special_tokens=True)
        print(f"Generated response: {response}")
        return response.strip()
    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return f"Error generating response: {str(e)}"

# Create Gradio interface
iface = gr.Interface(
    fn=generate_response,
    inputs=gr.Textbox(label="Your message", placeholder="Type your message here..."),
    outputs=gr.Textbox(label="AI response"),
    title="Test AI Assistant",
    description="A test deployment using GPT-2. Once verified, we'll update to use your fine-tuned model.",
    examples=[
        ["Hi, how are you?"],
        ["What can you help me with?"],
        ["Tell me about yourself."]
    ],
    theme=gr.themes.Soft()
)

# Launch the app
iface.launch()
