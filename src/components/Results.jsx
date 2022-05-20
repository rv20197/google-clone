import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
	const { results, isLoading, getResults, searchTerm } = useResultContext();
	const location = useLocation();

	useEffect(() => {
		if (searchTerm) {
			if (location.pathname === '/video') {
				getResults(`/video/q=${searchTerm} videos`);
			} else {
				getResults(`${location.pathname}/q=${searchTerm}&num=10`);
			}
		}
	}, [searchTerm, location.pathname]);

	if (isLoading) {
		return <Loading />;
	}
	switch (location.pathname) {
		case '/search':
			return (
				<div className='sm:px-56 flex flex-wrap justify-between space-y-6'>
					{results?.map(({ link, title }, index) => (
						<div key={index} className='md:w-2/5 w-full'>
							<a href={link} target='_blank' rel='noreferrer'>
								<p className='text-sm text-black dark:text-gray-200'>
									{link.length > 30 ? link.substring(0, 30) : link}
								</p>
								<p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
									{title}
								</p>
							</a>
						</div>
					))}
				</div>
			);
			break;
		case '/image':
			return (
				<div className='flex flex-wrap justify-center items-center'>
					{results?.map(({ image, link: { href, title } }, index) => (
						<a
							className='sm:p-3 p-5'
							href={href}
							key={index}
							target='_blank'
							rel='noreferrer'>
							<img src={image?.src} alt={title} loading='lazy' />
							<p className='w-36 break-words text-sm mt-2'>{title}</p>
						</a>
					))}
				</div>
			);
			break;
		case '/news':
			return (
				<div className='sm:px-56 flex flex-wrap justify-between space-y-6 items-center'>
					{results?.map(({ links, id, source, title }) => (
						<div key={id} className='md:w-2/5 w-full'>
							<a
								href={links?.[0].href}
								target='_blank'
								rel='noreferrer'
								className='hover:underline'>
								<p className='text-lg dark:text-blue-300 text-blue-700'>
									{title}
								</p>
								<div className='flex gap-4'>
									<a href={source?.href} target='_blank' rel='noreferrer'>
										{source?.href}
									</a>
								</div>
							</a>
						</div>
					))}
				</div>
			);
			break;
		case '/video':
			return (
				<div className='flex flex-wrap'>
					{results.map((video, index) => (
						<div key={index} className='p-2'>
							{video?.additional_links?.[0]?.href && (
								<ReactPlayer
									url={video.additional_links?.[0].href}
									controls
									width='355px'
									height='200px'
								/>
							)}
						</div>
					))}
				</div>
			);
			break;

		default:
			return 'ERROR';
	}
};