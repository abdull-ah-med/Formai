import { Shield, Lock, Server, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

const ApiKeyPolicy = () => {
    useDocumentTitle("API Key Policy");

    return (
        <div className='min-h-screen bg-black text-white'>
            <section className='relative pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
                <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse'></div>
                    <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
                </div>

                <div className='relative z-10 max-w-4xl mx-auto'>
                    <div className='text-center mb-16'>
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none'>
                            API Key Policy
                        </h1>
                        <p className='text-xl text-gray-300 max-w-3xl mx-auto'>Last Updated: January 28, 2026</p>
                    </div>

                    <div className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12'>
                        <div className='space-y-8'>
                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4'>1. Overview</h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>
                                        Formai uses the Anthropic Claude API to generate intelligent forms based on your
                                        prompts. To use this functionality, you need to provide your own Anthropic API
                                        key. This document explains how we handle, store, and protect your API key.
                                    </p>
                                    <p>
                                        <strong className='text-white'>Important:</strong> We never share your API key
                                        with any third party other than Anthropic (to make API calls on your behalf).
                                        Your key is used solely to generate forms for you.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4 flex items-center'>
                                    <Lock className='w-6 h-6 mr-3 text-green-400' />
                                    2. How We Protect Your API Key
                                </h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>
                                        We take the security of your API key very seriously. Here's how we protect it:
                                    </p>
                                    <ul className='list-disc list-inside space-y-3 ml-4'>
                                        <li>
                                            <strong className='text-white'>AES-256 Encryption:</strong> Your API key is
                                            encrypted using AES-256-CBC encryption before being stored in our database.
                                            This is the same encryption standard used by banks and governments.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Unique Initialization Vectors:</strong> Each
                                            API key is encrypted with a unique random IV, ensuring that even identical
                                            keys produce different encrypted outputs.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Server-Side Only:</strong> Your decrypted API
                                            key is never sent to your browser or any client-side application. It only
                                            exists in decrypted form briefly on our server during API calls.
                                        </li>
                                        <li>
                                            <strong className='text-white'>HTTPS Only:</strong> All communication
                                            between your browser and our servers uses TLS encryption.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4 flex items-center'>
                                    <Server className='w-6 h-6 mr-3 text-blue-400' />
                                    3. How We Use Your API Key
                                </h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>Your API key is used exclusively for the following purposes:</p>
                                    <ul className='list-disc list-inside space-y-3 ml-4'>
                                        <li>
                                            <strong className='text-white'>Form Generation:</strong> When you submit a
                                            prompt to create a new form, we use your API key to call the Anthropic
                                            Claude API.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Form Revision:</strong> When you request
                                            changes to an existing form, we use your API key to process those revisions.
                                        </li>
                                    </ul>
                                    <p className='mt-4'>
                                        <strong className='text-white'>We do NOT:</strong>
                                    </p>
                                    <ul className='list-disc list-inside space-y-2 ml-4'>
                                        <li>Use your API key for any purpose other than form generation</li>
                                        <li>Share your API key with third parties</li>
                                        <li>Store your API key in logs or analytics</li>
                                        <li>Access your Anthropic account or billing information</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4 flex items-center'>
                                    <Eye className='w-6 h-6 mr-3 text-yellow-400' />
                                    4. API Key Visibility
                                </h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>
                                        For security reasons, we never display your full API key after it has been
                                        saved. We only indicate whether you have a key configured or not. If you need to
                                        verify your API key, you should check your Anthropic Console.
                                    </p>
                                    <p>
                                        You can update or delete your API key at any time from your{" "}
                                        <Link to='/account-settings' className='text-purple-400 hover:underline'>
                                            Account Settings
                                        </Link>
                                        .
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4 flex items-center'>
                                    <Trash2 className='w-6 h-6 mr-3 text-red-400' />
                                    5. Deleting Your API Key
                                </h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>You have full control over your API key:</p>
                                    <ul className='list-disc list-inside space-y-3 ml-4'>
                                        <li>
                                            <strong className='text-white'>Manual Deletion:</strong> You can delete your
                                            API key at any time from your Account Settings. This immediately removes the
                                            encrypted key from our database.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Account Deletion:</strong> If you delete your
                                            Formai account, all your data including your API key is permanently removed.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Key Rotation:</strong> We recommend regularly
                                            rotating your API keys. You can generate a new key in your Anthropic Console
                                            and update it in your Formai Account Settings.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4 flex items-center'>
                                    <Shield className='w-6 h-6 mr-3 text-purple-400' />
                                    6. Your Responsibilities
                                </h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>To keep your API key secure, we recommend:</p>
                                    <ul className='list-disc list-inside space-y-3 ml-4'>
                                        <li>
                                            <strong className='text-white'>Set Usage Limits:</strong> Configure spending
                                            limits in your Anthropic Console to prevent unexpected charges.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Monitor Usage:</strong> Regularly check your
                                            Anthropic usage dashboard to ensure your key is only being used by Formai.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Rotate Keys:</strong> Periodically generate
                                            new API keys and delete old ones.
                                        </li>
                                        <li>
                                            <strong className='text-white'>Report Issues:</strong> If you notice
                                            suspicious activity, immediately revoke your API key in the Anthropic
                                            Console and contact us.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4'>7. Getting an API Key</h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>To get your Anthropic API key:</p>
                                    <ol className='list-decimal list-inside space-y-3 ml-4'>
                                        <li>
                                            Visit the{" "}
                                            <a
                                                href='https://console.anthropic.com/'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='text-purple-400 hover:underline'>
                                                Anthropic Console
                                            </a>
                                        </li>
                                        <li>Create an account or sign in</li>
                                        <li>Navigate to API Keys in Settings</li>
                                        <li>Create a new API key</li>
                                        <li>Copy the key (it starts with "sk-ant-")</li>
                                        <li>Paste it in your Formai Account Settings</li>
                                    </ol>
                                    <p className='mt-4'>
                                        <strong className='text-white'>Note:</strong> Anthropic may require you to add
                                        payment information and purchase credits before you can use the API.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className='text-2xl font-bold text-white mb-4'>8. Contact Us</h2>
                                <div className='text-gray-300 space-y-4'>
                                    <p>
                                        If you have any questions or concerns about how we handle your API key, please
                                        contact us at{" "}
                                        <a
                                            href='mailto:security@formai.com'
                                            className='text-purple-400 hover:underline'>
                                            security@formai.com
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className='mt-12 text-center'>
                        <Link
                            to='/'
                            className='inline-flex items-center text-gray-400 hover:text-white transition-colors'>
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ApiKeyPolicy;
