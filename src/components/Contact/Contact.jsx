import React from "react";

function Contact() {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "88ae5403-65f0-445c-90e4-4ffa06ba6b49");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            alert("Message sent successfully");
            console.log("Success", res);
            event.target.reset();
        } else {
            console.log("Error", res);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4 py-24 sm:px-8" >
            <div className="flex w-full max-w-xl flex-col rounded-3xl bg-white p-6 sm:p-8" >
                <h1 className="text-center text-3xl font-bold text-[#2F5E64]">Contact Us</h1>
                <form className="" onSubmit={onSubmit}>
                    <input type="email" name="email" required placeholder="Your email" className="mt-4 block w-full p-2 border border-gray-300 rounded-md " />
                    <input type="text" name="name" required placeholder="Your Name" className="mt-4 block w-full p-2 border border-gray-300 rounded-md " />
                    <textarea placeholder="Your Message" name="message" required className="mt-4 block w-full p-2 border border-gray-300 rounded-md " ></textarea>
                    <button type="submit" className="mt-4 bg-[#2F5E64] text-[#F7EFE8] px-4 py-2 rounded-md hover:shadow-lg hover:font-semibold ">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;