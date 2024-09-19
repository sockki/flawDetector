'use client';

import { SearchIcon } from '@/public/index';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function VulDbSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [searchValue, setSearchValue] = useState(search || '');
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSearchError(null);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    const trimValue = searchValue.trim();

    const specialCharRegex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]/;

    if (!trimValue) {
      setSearchError('공백이 아닌 문자를 입력해주세요');
      return;
    }

    if (specialCharRegex.test(trimValue)) {
      setSearchError('특수문자는 검색 할 수 없습니다');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: trimValue }),
      });

      if (response.ok) {
        params.set('search', trimValue);
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`);
      }
    } catch (error) {
      setSearchError('검색어 저장 실패');
    } finally {
      setSearchValue(trimValue);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[8.2rem] w-[134.7rem] items-center justify-center rounded-[1.4rem] bg-[linear-gradient(91.33deg,#6100FF,#4F6BFF)] p-[0.2rem]">
        <form
          onSubmit={handleSearch}
          className="flex h-full w-full items-center gap-[1rem] rounded-[1.16rem] bg-white p-[2.4rem]"
        >
          <input
            value={searchValue}
            onChange={handleChange}
            className="h-full w-full text-[2.4rem] font-regular leading-[3.36rem] placeholder:text-[#d6d6d6] focus:outline-none"
            placeholder="검색어를 입력해주세요"
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </form>
      </div>
      {searchError && (
        <p className="ml-[1rem] mt-[1rem] text-[1.6rem] text-system-warning">{searchError}</p>
      )}
    </div>
  );
}
